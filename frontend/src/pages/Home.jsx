import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCodeStore } from "../store/codeStore.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";


function Home() {
  const { fetchTypes, types } = useCodeStore();


  useEffect(() => {
    const handleFetchTypes = async () => {
      try {
        await fetchTypes();
      } catch (error) {
        console.log(error);
      }
    };

    handleFetchTypes();
  }, [fetchTypes]);

  if (!types || !types.length) {
    
    return <LoadingSpinner />;
  }

  return (
    <>
      <div>
        <img className="hero" src="/img/hero1.png" alt="Hero" />
      </div>
      <section className="products">
        <h3 className="my-5">Our Products</h3>
        <div className="productsWrapper">
          {types && types.length ? (
            types.map((element, index) => (
              <Link to={`/products/${element._id}`} key={index}>
                <div
                  style={{
                    backgroundImage: `url(${element.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="hanger">
                    <div></div>
                  </div>
                  <h4>{element.name}</h4>
                  <p>
                    {element.region}
                    <img src={element.flag} alt="" />
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>


      <section className="help">
        <h3 className="my-5">Need help ?</h3>
        <h4>Frequently asked questions:</h4>
        <p>How to order?</p>
        <p>How to check my redeem codes?</p>
        <p>How to report a problem?</p>
      </section>


      <section className="why">
        <h4 className="my-5">Why choose Slim Kells?</h4>
        <div>
          <div>
            <i className="fa-solid fa-truck-fast"></i>
            <p>Instant delivery</p>
          </div>
          <div>
            <i className="fa-solid fa-microchip"></i>
            <p>24/7 services</p>
          </div>
          <div>
            <i className="fa-solid fa-shield-halved"></i>
            <p>High security</p>
          </div>
          <div>
            <i className="fa-solid fa-tag"></i>
            <p>Cheapest</p>
          </div>
        </div>
      </section>


      <footer>
        <h4 className="my-5">Follow us:</h4>
        <div>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-square-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
        <h4 className="my-5">Contact</h4>
        <p>www.slimkellscode.com</p>
        <p>slimkellsredeemcode@gmail.com</p>
        <p>Itanagar, Arunachal Pradesh, 791112 | India</p>
        <p>Web Developer | Salam Priyansu Meitei</p>


        <section className="logo">
          <img src="/img/logo.png" alt="Logo" />
          <div>
            <p>Slim Kells</p>
            <p>Redeem Codes</p>
          </div>
        </section>
      </footer>
    </>
  );
}


export default Home;