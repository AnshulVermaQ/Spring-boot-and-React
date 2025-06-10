import React, { useContext, useState } from "react";
import "./Explore.css";
import { AppContext } from "../../context/AppContext";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory";
import DisplayItems from "../../components/DisplayItems/DisplayItems";
import CustomerForm from "../../components/CustomerForm/CustomerForm";
import CartItems from "../../components/CartItems/CartItems";
import CartSummary from "../../components/CartSummary/CartSummary";

const Explore = () => {
  const { categories } = useContext(AppContext);
  console.log(categories);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  return (
    <div>
      <div className="explore-container text-light">
        <div className="left-column">
          <div className="first-row" style={{ overflowY: "auto" }}>
            <DisplayCategory
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="horizontal-line"></div>
          <div className="second-row" style={{ overflowY: "auto" }}>
            <DisplayItems selectedCategory={selectedCategory} />
          </div>
        </div>

        <div className="right-column">
          <div className="customer-form-container" style={{ height: "20%" }}>
            <CustomerForm
              customerName={customerName}
              customerNumber={customerNumber}
              setCustomerName={setCustomerName}
              setCustomerNumber={setCustomerNumber}
            />
          </div>

          <hr className="my-3 text-light" />

          <div
            className="card-items-container"
            style={{ height: "55%", overflowY: "auto" }}
          >
            <CartItems />
          </div>

          <div
            className="card-summary-container"
            style={{ height: "30%" }}
          ></div>
          <CartSummary
            customerName={customerName}
            customerNumber={customerNumber}
            setCustomerName={setCustomerName}
            setCustomerNumber={setCustomerNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
