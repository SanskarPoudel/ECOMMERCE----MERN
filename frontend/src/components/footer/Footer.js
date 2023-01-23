import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillGoogleSquare,
  AiFillHome,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillPhone,
  AiFillPrinter,
  AiFillRedEnvelope,
  AiFillTwitterSquare,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div>
      <div className=" mt-5">
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#f9a825" }}
        >
          <section
            className="d-flex justify-content-between p-4 text-white"
            style={{ backgroundColor: "#212121" }}
          >
            <div className="me-5">
              <span>Get connected with us on social networks:</span>
            </div>
            <div>
              <a href className="text-white me-4">
                <AiFillFacebook color="f9a825" size={24} />
              </a>
              <a href className="text-white me-4">
                <AiFillTwitterSquare color="f9a825" size={24} />
              </a>
              <a href className="text-white me-4">
                <AiFillGoogleSquare color="f9a825" size={24} />
              </a>
              <a href className="text-white me-4">
                <AiFillInstagram color="f9a825" size={24} />
              </a>
              <a href className="text-white me-4">
                <AiFillLinkedin color="f9a825" size={24} />
              </a>
              <a href className="text-white me-4">
                <AiFillGithub color="f9a825" size={24} />
              </a>
            </div>
          </section>
          <section className="text-white">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold text-dark">
                    Click & Collect
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "80px",
                      backgroundColor: "#7c4dff",
                      color: "black",
                      height: "2px",
                    }}
                  />
                  <p>
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold text-dark">Products</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "80px",
                      backgroundColor: "#7c4dff",
                      color: "black",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-white">
                      Product Page
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Categories
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Product Queries
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Product search
                    </a>
                  </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold text-dark">
                    Useful links
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "80px",
                      backgroundColor: "#7c4dff",
                      color: "black",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-white">
                      Your Account
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Become an Affiliate
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Shipping Rates
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Help
                    </a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold text-dark">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "80px",
                      backgroundColor: "#7c4dff",
                      color: "black",
                      height: "2px",
                    }}
                  />
                  <p>
                    <AiFillHome /> POKHARA - LEKHNATH, NP
                  </p>
                  <p>
                    <AiFillRedEnvelope /> clickandcollect@gmail.com
                  </p>
                  <p>
                    <AiFillPhone /> + 061 62 1930
                  </p>
                  <p>
                    <AiFillPrinter /> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "#212121" }}
          >
            © 2020 Copyright: Sanskar Paudel
          </div>
        </footer>
      </div>
    </div>
  );
}
