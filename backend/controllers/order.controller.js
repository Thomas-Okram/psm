import { codesModel } from "../models/codesModel.js"
import { cartModel } from "../models/cartModel.js";
import { orderModel } from "../models/orderModel.js";

export const fetchOrder = async (req, res) => {
  const user_id = req.query.user_id;
  try {
    const orderCollection = await orderModel.find({ user_id })
    .populate({
      path: 'items.variant_id', populate: { path: 'type_id' }
    }).lean()
    const orders = orderCollection.map(({ user_id, ...rest }) => {
      return {
        ...rest,
        items: rest.items.map(item => {
          return {
            ...item,
            name: item.variant_id.type_id.name,
            value: item.variant_id.name,
            variant_id: undefined,
            type_id: undefined
          };
        })
      }
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "error in fetch order", error })
  }
}

function payment() {
  return true
}
export const newOrder = async (req, res) => {
  const { user_id } = req.query;

  try {
    const cartDetails = await cartModel.findOne({ user_id })
    .populate({ path: 'cart.variant_id', populate: { path: 'type_id' } })
    .exec();

    if (cartDetails.user_id != user_id || !cartDetails) {
      return res.status(400).json({ success: false, message: "Cart is empty"})

      
    } else if (cartDetails.user_id == user_id) {
      // check the stock is available
      const  unavailableStock = [];
      for (const item of cartDetails.cart) {
        const stocks = await codesModel.find({ variant_id: item.variant_id.id, status: "available" })
        .limit(item.qty)
        .exec();
        // exit if the stok is unavailable
        if (stocks.length < item.qty) {
          unavailableStock.push(item.variant_id.id);
        }
      }

      // if stock is unavailable
      if (unavailableStock.length > 0) {
        return res.json({success: false, message: unavailableStock})


      } 
      // if stock is available
      else if (unavailableStock.length === 0) {
        const items = [];
        for (const item of cartDetails.cart) {
          // hold the codes until payment confirmation
          const collectedCodes = await codesModel.find({
            variant_id: item.variant_id.id,
            status: "available"
          })
          .limit(item.qty)
          .exec();
          
          const updatedCodes = collectedCodes.map(code => {
            code.status = "hold";
            code.buyer = user_id;
            return code;
          });
          
          await codesModel.bulkWrite(updatedCodes.map(code => ({
            updateOne: {
              filter: { _id: code._id },
              update: { $set: code }
            }
          })));

          
          // collect all the hold codes
          const codeCollection = collectedCodes.map(code => code.redeemCode)


          // insert the formatted item inside the item array
          items.push({
            variant_id: item.variant_id._id,
            qty: item.qty,
            priceINR: item.variant_id.priceINR,
            priceUSDT: item.variant_id.priceUSDT,
            codes: codeCollection
          })
        }

        const { totalINR, totalUSDT } = cartDetails.cart.reduce((acc, current) => {
          acc.totalINR += current.variant_id.priceINR * current.qty;
          acc.totalUSDT += current.variant_id.priceUSDT * current.qty;
          return acc;
        }, { totalINR: 0, totalUSDT: 0 });

        
        // pass the necessary data to the payment function (eg. totals)
        const paymentStatus = await payment()
        const paymentMethod = "UPI"
        
        const formattedOrder = {
          user_id,
          items,
          paymentMethod,
          totalINR: totalINR.toFixed(2),
          totalUSDT: totalUSDT.toFixed(2),
        }

        const holdCodes = await codesModel.find({
          status: "hold",
          buyer: user_id
        })

        if (!paymentStatus) {

          const updatedCodes = holdCodes.map(code => {
            code.status = "available";
            code.buyer = undefined;
            return code;
          });
          
          await codesModel.bulkWrite(updatedCodes.map(code => ({
            updateOne: {
              filter: { _id: code._id },
              update: { $set: code }
            }
          })));

          const removedCodes = formattedOrder.items.map((varient) => {
            return {
              ...varient,
              codes: undefined
            }
          })
          const withStatus = new orderModel({...formattedOrder, items: removedCodes, status: "Failed"})
          
          await withStatus.save()
          
          return res.json({success: false, message: "payment failed"})
        }

        if (paymentStatus) {
          const withStatus = new orderModel({...formattedOrder, status: "Success"})
          await withStatus.save()

          const updatedCodes = holdCodes.map(code => {
            code.status = "sold";
            return code;
          });
          
          await codesModel.bulkWrite(updatedCodes.map(code => ({
            updateOne: {
              filter: { _id: code._id },
              update: { $set: code }
            }
          })));


          await cartModel.deleteOne({ user_id });

          return res.json({ success: true, message: withStatus});
        }
      }
    }
    res.json({ success: true, message: cartDetails });

  } catch (error) {
    res.status(500).json({ success: false, message: "error in new order", error: error.message})
  }
}




export const unholdDev = async (req, res) => {
  try {
    const allHoldCodes = await codesModel.find();

    const updatedCodes = allHoldCodes.map(code => {
      code.status = "available";
      code.buyer = undefined;
      return code;
    });
    
    await codesModel.bulkWrite(updatedCodes.map(code => ({
      updateOne: {
        filter: { _id: code._id },
        update: { $set: code }
      }
    })));

    res.json({ status: true, message: "updated"})
  } catch (error) {
    res.json({ status: false, message: "error in unholdDev", error})
  }
}