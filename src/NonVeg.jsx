import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "./store"; // Ensure fetchProducts is imported correctly

function NonVeg() {
  const nonVegProducts = useSelector((state) => state.products.nonVeg); // Assuming 'nonVeg' is the key for non-veg products in the store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Fetching products when the component mounts
  }, [dispatch]);

  const items = nonVegProducts.length > 0 ? (
    nonVegProducts.map((product, index) => (
      <div key={index} className="col-md-4 mb-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">Price: ${product.price.toFixed(2)}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-12">
      <div className="alert alert-warning" role="alert">
        No non-vegetable products available.
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Non-Veg Products</h2>
      <div className="row">
        {items}
      </div>
    </div>
  );
}

export default NonVeg;
