import React, { useContext } from 'react';
import './Item.css';
import { AppContext } from '../../context/AppContext';

const Item = ({ itemName, itemPrice, imageUrl, itemId }) => {

  const{addToCart} = useContext(AppContext);

  const addToCartHandler = () => {
    addToCart({
      name: itemName,
      price: itemPrice,
      quantity: 1,
      itemId: itemId

    })
  }
  
  return (

    <div className="item-card bg-dark rounded shadow-sm position-relative p-2">
      <div className="item-actions position-absolute top-0 end-0 mt-2 me-2 d-flex flex-column align-items-center gap-1">
        <i className="bi bi-cart-plus text-warning fs-5"></i>
        <button className="btn btn-success btn-sm p-1" onClick={addToCartHandler}>
          <i className="bi bi-plus fs-6"></i>
        </button>
      </div>
      

      <div className="d-flex align-items-center h-100">
        <img src={imageUrl} alt={itemName} className="item-image me-2" />
        <div>
          <h6 className="mb-1 text-light">{itemName}</h6>
          <p className="mb-0 fw-bold text-light" style={{ fontSize: '0.85rem' }}>
            &#8377;{itemPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
