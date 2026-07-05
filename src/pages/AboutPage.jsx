import React from "react";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold text-center">About Us</h1>
            <hr className="w-50 mx-auto" />
            <p className="lead text-center">
              Welcome to our store! We offer the best products at competitive
              prices.
            </p>
            <div className="mt-4">
              <h4>Our Mission</h4>
              <p>
                To provide high-quality products with exceptional customer
                service.
              </p>
              <h4>Our Team</h4>
              <p>
                We are a passionate group of developers and designers committed
                to creating a seamless shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
