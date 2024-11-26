import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  addPurchase,
} from "./store";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [discountPercentageAmount, setDiscountPercentageAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);

  // Handle coupon code application
  const handleApplyCoupon = () => {
    switch (couponCode.trim()) {
      case "SA78610":
        setCouponDiscountPercentage(10);
        break;
      case "SA78620":
        setCouponDiscountPercentage(20);
        break;
      case "SS78630":
        setCouponDiscountPercentage(30);
        break;
      default:
        alert("Invalid coupon code");
        setCouponDiscountPercentage(0);
    }
    setCouponCode(""); // Clear coupon code input after applying
  };

  // Calculate total amount and discounts
  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const percentageDiscount = (total * discountPercentageAmount) / 100;
    const couponDiscount = (total * couponDiscountPercentage) / 100;
    const totalDiscount = percentageDiscount + couponDiscount;
    const finalAmount = Math.max(total - totalDiscount, 0); // Ensure final amount is not negative

    return { total, totalDiscount, finalAmount };
  };

  const handleCompletePurchase = () => {
    const { finalAmount } = calculateTotal();
    const purchaseDate = new Date().toLocaleDateString();

    const purchaseDetails = {
      date: purchaseDate,
      items: [...cartItems],
      totalAmount: Number(finalAmount),
    };

    dispatch(addPurchase(purchaseDetails));
    dispatch(clearCart());
  };

  const { total, totalDiscount, finalAmount } = cartItems.length > 0 ? calculateTotal() : { total: 0, totalDiscount: 0, finalAmount: 0 };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li key={item.name} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-secondary mx-2" onClick={() => dispatch(decrementQuantity(item))}>-</button>
                  <span>Quantity: {item.quantity}</span>
                  <button className="btn btn-sm btn-secondary mx-2" onClick={() => dispatch(incrementQuantity(item))}>+</button>
                  <button className="btn btn-sm btn-danger mx-2" onClick={() => dispatch(removeFromCart(item))}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mb-4">
            <h5>Total before discounts: ${total.toFixed(2)}</h5>
            {[10, 20, 30].map((discount) => (
              <button
                key={discount}
                className="btn btn-outline-primary mr-2"
                onClick={() => setDiscountPercentageAmount(discount)}
              >
                Apply {discount}% Discount
              </button>
            ))}
          </div>

          <div className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter the coupon code"
              />
              <button className="btn btn-success" onClick={handleApplyCoupon}>
                Apply Coupon
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p>Regular Discount: {discountPercentageAmount}%</p>
            <p>Coupon Discount: {couponDiscountPercentage}%</p>
            <p>Total Discount Amount: ${totalDiscount.toFixed(2)}</p>
            <p><strong>Final Amount: ${finalAmount.toFixed(2)}</strong></p>
          </div>

          <div className="text-center">
            <button className="btn btn-primary" onClick={handleCompletePurchase}>
              Complete Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
