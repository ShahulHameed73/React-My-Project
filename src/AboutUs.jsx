import React from 'react';

function AboutUs() {
  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">About Us</h2>
        <p className="lead">
          Welcome to our online store! We are dedicated to providing the best quality products at affordable prices. Our goal is to make shopping a convenient and enjoyable experience for all our customers.
        </p>
        <p className="lead">
          We offer a wide variety of products, from fresh vegetables to delicious non-vegetarian items, all sourced from trusted suppliers. Our mission is to offer high-quality items that fit every budget and taste.
        </p>
        <p className="lead">
          Thank you for choosing us for your shopping needs. We look forward to serving you again!
        </p>
        <h3 className="mt-4 text-primary">Our Values</h3>
        <ul className="list-group">
          <li className="list-group-item">Quality: We ensure the best quality products for our customers.</li>
          <li className="list-group-item">Customer Satisfaction: We prioritize customer satisfaction above all else.</li>
          <li className="list-group-item">Integrity: We believe in honest and transparent business practices.</li>
          <li className="list-group-item">Innovation: We are always striving to innovate and improve our services.</li>
        </ul>
      </div>
    </>
  );
}

export default AboutUs;
