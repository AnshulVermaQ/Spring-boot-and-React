import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import './DisplayItems.css';
import Item from '../Item/Item';
import SearchBox from '../SearchBox/SearchBox';

const DisplayItems = ({selectedCategory}) => {

  const { itemData } = useContext(AppContext);

  const[searchText, setSearchText] = useState("");

  console.log("itemsData:", itemData);

  const filteredItems = itemData.filter(item =>{
    if(!selectedCategory) return true;
    return item.categoryId === selectedCategory;
  }).filter(item =>{ return item.name.toLowerCase().includes(searchText.toLowerCase());})

  return (
    <div className='p-3'>

      <div className="d-flex justify-content-between align-items-center mb-3">

        <div></div>

        <div>
          <SearchBox onSearch = {setSearchText}/>
        </div>
      </div>


      <div className="row g-3">
        {(filteredItems || []).map((item,index) => (
          <div key={index} className="col-md-4 col-sm-6">
            <Item
              itemName={item.name}
              itemPrice={item.price}
              imageUrl={item.imageUrl}
              itemId={item.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItems;
