import React from 'react';
import { useSelector } from 'react-redux';

function PurchaseHistory() {
  const purchaseHistory = useSelector((state) => state.purchaseHistory);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p className="text-center">No purchase history available.</p>
      ) : (
        <div className="list-group">
          {purchaseHistory.map((purchase, index) => {
            // Calculate the total amount for this purchase based on items
            const totalAmount = purchase.items.reduce((total, item) => {
              const itemPrice = item.price ? parseFloat(item.price) : 0; // Ensure price is a number
              const itemQuantity = item.quantity ? parseInt(item.quantity, 10) : 0; // Ensure quantity is an integer
              return total + itemPrice * itemQuantity;
            }, 0).toFixed(2); // Total amount for the purchase

            return (
              <div key={index} className="list-group-item mb-3">
                <h4 className="fw-bold">Purchase Date: {purchase.date}</h4>
                <ul className="list-group list-group-flush">
                  {purchase.items.map((item, idx) => {
                    // Safely handle item price and quantity
                    const itemPrice = item.price ? parseFloat(item.price) : 0;
                    const itemQuantity = item.quantity ? parseInt(item.quantity, 10) : 0;
                    const itemTotal = (itemPrice * itemQuantity).toFixed(2); // Calculate item total

                    return (
                      <li key={idx} className="list-group-item">
                        {item.name} - ${itemPrice.toFixed(2)} x {itemQuantity} = ${itemTotal}
                      </li>
                    );
                  })}
                </ul>
                <p className="fw-bold mt-2">
                  {/* Display total amount for this purchase */}
                  Total Amount Paid: ${totalAmount}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PurchaseHistory;
