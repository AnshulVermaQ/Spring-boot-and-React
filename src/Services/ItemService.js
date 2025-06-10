
import axios from "axios";


const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});


export const addItem = async (item) => {
    return await axios.post("http://localhost:8080/item", item, authHeaders());
}

export const deleteItem = async (id) => {
    return await axios.delete(`http://localhost:8080/item/${id}`, authHeaders());
}

export const fetchItems = async () => {
    return await axios.get("http://localhost:8080/item", authHeaders());
}