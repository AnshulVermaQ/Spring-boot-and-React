import React from 'react';
import './Category.css';

const Category = ({ categoryName, imageUrl, numberOfItems, bgColor, index, isSelected, onClick }) => {
  return (
    <div
      className="category-card d-flex align-items-center"
      style={{
        backgroundColor: bgColor,
        borderRadius: '12px',
        padding: '10px',
        minWidth: '250px',
        maxWidth: '300px',
        flex: '1 0 auto',
        position: 'relative',
        animationDelay: `${index * 100}ms`
      }}
      onClick={onClick}
    >
      {isSelected && (
        <div className="checkmark-icon">✅</div>
      )}

      <img
        src={imageUrl}
        alt={categoryName}
        className="category-img"
      />
      <div>
        <h6 className="mb-1 text-white">{categoryName}</h6>
        <p className="mb-0 text-white" style={{ fontSize: '0.85rem' }}>
          {numberOfItems} Items
        </p>
      </div>
    </div>
  );
};

export default Category;
