import { createContext, useEffect, useState } from "react";
import {fetchCategories} from "../services/CategoryService";
import { fetchItems } from "../Services/ItemService";


export const AppContext = createContext(null);

export const AppContextProvider = (props) =>{

    const[categories, setCategories] = useState([]);

    const[auth,setAuth] = useState({token:null,role:null});

    const[itemData,setItemData] = useState([]);

    const[cartItems,setCartItems]  = useState([]);

    const addToCart = (item) =>{
        const exitingItems = cartItems.find(cartItems => cartItems.name == item.name);
        if(exitingItems){
            setCartItems(cartItems.map(cartItems => cartItems.name == item.name ? {...cartItems,quantity: 
                cartItems.quantity+1
            }: cartItems));
        }

        else{

            setCartItems([...cartItems,{...item,quantity:1}]);

        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }

   const updateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
        item.itemId === itemId ? {...item, quantity: newQuantity} : item
    ));
};


    useEffect(() =>{

        async function loadData(){

            if(localStorage.getItem('token') && localStorage.getItem('role')){
                setAuthData(
                    localStorage.getItem('token'),
                    localStorage.getItem('role')
                );
            }

            const response = await fetchCategories();
            const itemResponse = await fetchItems();
            setItemData(itemResponse.data);
            setCategories(response.data);
        }

        loadData();
    },[]);

    const setAuthData = (token,role) =>{
        setAuth({token,role});
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemData,
        setItemData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}