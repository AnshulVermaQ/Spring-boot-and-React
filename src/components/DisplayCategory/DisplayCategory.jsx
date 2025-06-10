import React from 'react';
import './DisplayCategory.css';
import Category from '../Category/Category';

const DisplayCategory = ({ categories,selectedCategory,setSelectedCategory }) => {
  return (
    <div
      className="d-flex flex-wrap justify-content-start"
      style={{
        width: '100%',
        gap: '16px',
      }}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          categoryName={category.name}
          imageUrl={category.imageUrl}
          numberOfItems={category.items}
          bgColor={category.bgColor}
          isSelected={selectedCategory === category.categoryId}
            onClick={() => setSelectedCategory(category.categoryId)}
        />
      ))}
    </div>
  );
};

export default DisplayCategory;
