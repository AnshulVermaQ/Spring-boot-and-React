import axios from "axios";


const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getOrders  =async () => {
    return await axios.get("http://localhost:8080/orders", authHeaders()); 
}


export const createOrder  = async (order) => {
    return await axios.post("http://localhost:8080/orders", order, authHeaders());
}

export const deleteOrder = async(id) =>{
    return await axios.delete(`http://localhost:8080/orders/${id}`, authHeaders());
}