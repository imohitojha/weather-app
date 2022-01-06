import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    // Footer Container
    <footer className="mb-md-0 mt-3 bg-dimdark">
      <div className="container-fluid">
          <div className="row" data-testid="rowdiv">
            <div className="col-md-6 my-auto">
              <div className="text-white-50 font-weight-normal p-2 text-center">
                <p>Copyrights © 2021 Weather App </p>
              </div>
              {/* Footer Form for Email */}
                <form action="">
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-6 col-8">
                      <div className="form-outline form-white mb-4">
                        <input type="email" id="form5Example2" className="form-control" placeholder="Email Address" />
                      </div>
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn btn-outline-light mb-4">
                        Subscribe
                     </button>
                    </div>
                  </div>
                </form>
            </div>
            {/* Social Media Icons */}
            <div className="col-md-6 my-auto">
              <div className=" font-weight-normal float text-center text-white-50 p-2 ">

                <a
                  className="btn btn-primary btn-floating m-1 rounded-circle p-0.5"
                  style={{ backgroundColor: "#3b5998", padding: "2px 10px" }}
                  href="#!"
                  role="button">
                  <i className="fa fa-facebook-f"></i>
                </a>


                <a
                  className="btn btn-primary btn-floating m-1 rounded-circle"
                  style={{ backgroundColor: "#55acee", padding: "2px 7px" }}
                  href="#!"
                  role="button">
                  <i className="fab fa-twitter"></i>
                </a>


                <a
                  className="btn btn-primary btn-floating m-1 rounded-circle"
                  style={{ backgroundColor: "#dd4b39", padding: "2px 7px" }}
                  href="#!"
                  role="button">
                  <i className="fab fa-google"></i>
                </a>


                <a
                  className="btn btn-primary btn-floating m-1 rounded-circle"
                  style={{ backgroundColor: "#ac2bac", padding: "2px 7px" }}
                  href="#!"
                  role="button">
                  <i className="fab fa-instagram"></i>
                </a>


                <a
                  className="btn btn-primary btn-floating m-1 rounded-circle"
                  style={{ backgroundColor: "#0082ca", padding: "2px 7px" }}
                  href="#!"
                  role="button">
                  <i className="fab fa-linkedin-in"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1 rounded-circle"
                  style={{ backgroundColor: "#333333", padding: "2px 7px" }}
                  href="#!"
                  role="button">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
      </div>
    </footer>

  )

}
export default Footer;