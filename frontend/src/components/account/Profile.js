import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
export default function Profile() {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 ">
              <div className="card  profile" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0 ">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <img
                      src="https://www.pngkey.com/png/full/157-1579943_no-profile-picture-round.png"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>{userDetails.name}</h5>
                    <p>{userDetails.role}</p>
                    <i className="far fa-edit mb-5" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{userDetails.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Role</h6>
                          <p className="text-muted">{userDetails.role}</p>
                        </div>
                      </div>
                      <h6>More</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <Link to="/cart">
                            <p className="text ">Click here to open cart</p>
                          </Link>
                        </div>
                        <div className="col-6 mb-3">
                          <Link>
                            <p className="">Watch your orders </p>
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <AiFillFacebook size={30} />
                        </a>
                        <a href="#!">
                          <AiFillInstagram size={30} />
                        </a>
                        <a href="#!">
                          <AiFillTwitterSquare size={30} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
