import { codesModel } from "../models/codesModel.js"
import { typesModel } from "../models/typesModel.js";
import { variantsModel } from "../models/variantsModel.js";


// get all types of redeem codes
export const types = async (req, res) => {
  try {
    const types = await typesModel.find()
    res.status(200).json({success: true, types});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching Types' });
  }
}

// get all variants of a selected Redeem code type
export const variants = async (req, res) => {
  try {
    const id = req.query.id
  
    const type = await typesModel.findById(id);
    const allVariants = await variantsModel.find({ type_id: id }).lean();
    const allFormattedVariants = await Promise.all(
      allVariants.map(async(variant) => {
        const stock = await codesModel.countDocuments({status: "available", variant_id: variant._id});
        return {...variant, stock}
      })
    ) 

    res
      .status(200)
      .json({
        success: true,
        type: [type],
        variants: allFormattedVariants
      });
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching allVariants' });
  }
}


