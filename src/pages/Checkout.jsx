import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../store/cartContext";
import AuthContext from "../store/auth.context";
import Navbar from "../components/Navbar";

// Custom CSS (inline styles) with enhanced Order Summary design
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  pageTitle: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
    borderBottom: "1px solid #dee2e6",
    paddingBottom: "1rem",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
  },
  colLeft: {
    flex: "1 1 60%",
    minWidth: "300px",
  },
  colRight: {
    flex: "1 1 35%",
    minWidth: "280px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "0.25rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  rowTwoCols: {
    display: "flex",
    gap: "1rem",
  },
  half: {
    flex: "1",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
  },
  btnOutline: {
    padding: "0.5rem 1.5rem",
    backgroundColor: "transparent",
    border: "1px solid #6c757d",
    borderRadius: "4px",
    color: "#6c757d",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  },
  btnSuccess: {
    padding: "0.5rem 2rem",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  btnSuccessDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  // ----- Enhanced Order Summary Styles -----
  summaryCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: "1.5rem",
    border: "1px solid #e9ecef",
  },
  summaryTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  listGroup: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.6rem 0",
    borderBottom: "1px dashed #dee2e6",
    fontSize: "0.95rem",
  },
  itemName: {
    fontWeight: "500",
  },
  itemQty: {
    color: "#6c757d",
    marginLeft: "0.3rem",
  },
  itemPrice: {
    fontWeight: "500",
  },
  summaryDivider: {
    border: "none",
    borderTop: "2px solid #dee2e6",
    margin: "0.75rem 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.3rem 0",
    fontSize: "1rem",
  },
  summaryRowLabel: {
    color: "#6c757d",
  },
  summaryRowValue: {
    fontWeight: "500",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.25rem",
    fontWeight: "bold",
    paddingTop: "0.5rem",
    borderTop: "2px solid #343a40",
    marginTop: "0.5rem",
  },
  totalLabel: {
    fontSize: "1.1rem",
  },
  totalValue: {
    color: "#28a745",
  },
  alert: {
    backgroundColor: "#cce5ff",
    color: "#004085",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    marginTop: "1rem",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  modalIcon: {
    fontSize: "4rem",
    color: "#28a745",
    marginBottom: "1rem",
  },
  modalTitle: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  modalText: {
    color: "#6c757d",
    marginBottom: "1.5rem",
  },
  modalBtn: {
    padding: "0.5rem 2rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, dispatch } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  // Calculate subtotal, shipping, and total
  const subtotal = cart.reduce((acc, item) => {
    const quantity = item.qty || 1;
    return acc + item.price * quantity;
  }, 0);
  const shipping = 30;
  const totalAmount = subtotal + shipping;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const { fullName, email, address, city, postalCode, country } = formData;
    return fullName && email && address && city && postalCode && country;
  };

  const clearCart = () => {
    dispatch({ type: "SETCART", payload: [] });
  };

  const placeOrderHandler = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill in all shipping details.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty. Add some items first!");
      return;
    }

    setIsPlacingOrder(true);

    setTimeout(() => {
      clearCart();
      setIsPlacingOrder(false);
      setShowModal(true);
    }, 1500);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  if (cart.length === 0 && !showModal) {
    return (
      <>
        <Navbar />
        <div style={styles.emptyState}>
          <div style={styles.card}>
            <h2>Your Cart is Empty</h2>
            <p style={{ color: "#6c757d" }}>
              Add some products before checking out.
            </p>
            <Link to="/" style={styles.btnSuccess}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.pageTitle}>Checkout</h1>

        <div style={styles.row}>
          {/* Left Column - Shipping Form */}
          <div style={styles.colLeft}>
            <div style={styles.card}>
              <h4 style={styles.cardTitle}>Shipping Details</h4>
              <form onSubmit={placeOrderHandler}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    style={styles.input}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    style={styles.input}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    required
                  />
                </div>

                <div style={styles.rowTwoCols}>
                  <div style={styles.half}>
                    <label style={styles.label}>City</label>
                    <input
                      type="text"
                      style={styles.input}
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div style={styles.half}>
                    <label style={styles.label}>Postal Code</label>
                    <input
                      type="text"
                      style={styles.input}
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Country</label>
                  <input
                    type="text"
                    style={styles.input}
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="USA"
                    required
                  />
                </div>

                <div style={styles.btnGroup}>
                  <Link to="/cart" style={styles.btnOutline}>
                    ← Back to Cart
                  </Link>
                  <button
                    type="submit"
                    style={{
                      ...styles.btnSuccess,
                      ...(!isFormValid() || isPlacingOrder
                        ? styles.btnSuccessDisabled
                        : {}),
                    }}
                    disabled={isPlacingOrder || !isFormValid()}
                  >
                    {isPlacingOrder
                      ? "Placing Order..."
                      : `Place Order ($${totalAmount.toFixed(2)})`}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Enhanced Order Summary */}
          <div style={styles.colRight}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryTitle}>
                <span>🛒</span> Order Summary
              </div>
              <ul style={styles.listGroup}>
                {cart.map((item) => (
                  <li key={item.id} style={styles.listItem}>
                    <span>
                      <span style={styles.itemName}>
                        {item.title || item.name}
                      </span>
                      <span style={styles.itemQty}>× {item.qty}</span>
                    </span>
                    <span style={styles.itemPrice}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <hr style={styles.summaryDivider} />

              {/* Subtotal */}
              <div style={styles.summaryRow}>
                <span style={styles.summaryRowLabel}>Subtotal</span>
                <span style={styles.summaryRowValue}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Shipping */}
              <div style={styles.summaryRow}>
                <span style={styles.summaryRowLabel}>Shipping</span>
                <span style={styles.summaryRowValue}>
                  ${shipping.toFixed(2)}
                </span>
              </div>

              {/* Total */}
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>${totalAmount.toFixed(2)}</span>
              </div>

              <p
                style={{
                  color: "#6c757d",
                  fontSize: "0.8rem",
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                * Taxes and fees may apply
              </p>

              {!isLoggedIn && (
                <div style={styles.alert}>
                  You are not logged in. Your order will be placed as a guest.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalIcon}>✅</div>
            <h2 style={styles.modalTitle}>Order Received!</h2>
            <p style={styles.modalText}>
              Thank you for your purchase. Your order has been placed
              successfully. You will receive a confirmation email shortly.
            </p>
            <button style={styles.modalBtn} onClick={closeModal}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
