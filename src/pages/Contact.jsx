import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email (replace with actual API call)
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 my-4">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="text-muted lead">
            Have questions? We'd love to hear from you!
          </p>
          <hr className="w-25 mx-auto" />
        </div>

        <div className="row g-5">
          {/* Contact Form */}
          <div className="col-md-7">
            <div className="card shadow-sm border-0 p-4">
              <h3 className="mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label fw-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Order inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 p-4 h-100">
              <h3 className="mb-4">Get in Touch</h3>
              <div className="d-flex mb-3">
                <i className="bi bi-geo-alt fs-4 me-3 text-dark"></i>
                <div>
                  <h6 className="fw-bold mb-0">Address</h6>
                  <p className="text-muted">
                    123 Shopping Street,
                    <br />
                    City, State 12345
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <i className="bi bi-envelope fs-4 me-3 text-dark"></i>
                <div>
                  <h6 className="fw-bold mb-0">Email</h6>
                  <p className="text-muted">support@yourstore.com</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <i className="bi bi-telephone fs-4 me-3 text-dark"></i>
                <div>
                  <h6 className="fw-bold mb-0">Phone</h6>
                  <p className="text-muted">+1 234 567 8900</p>
                </div>
              </div>
              <div className="d-flex">
                <i className="bi bi-clock fs-4 me-3 text-dark"></i>
                <div>
                  <h6 className="fw-bold mb-0">Working Hours</h6>
                  <p className="text-muted">
                    Mon–Fri: 9:00 AM – 6:00 PM
                    <br />
                    Sat–Sun: Closed
                  </p>
                </div>
              </div>

              <hr />
              <h6 className="fw-bold mb-2">Follow Us</h6>
              <div className="d-flex gap-3 fs-4">
                <a href="#" className="text-dark" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-dark" aria-label="Twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="text-dark" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-dark" aria-label="YouTube">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
