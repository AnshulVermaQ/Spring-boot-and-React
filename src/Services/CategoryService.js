import axios from "axios";

const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const addCategory = async(category) => {

   return await axios.post("http://localhost:8080/category", category,authHeaders());
}



export const deleteCategory = async (id) => {
    return await axios.delete(`http://localhost:8080/category/${id}`, authHeaders());
};

export const fetchCategories = async () => {
    return await axios.get("http://localhost:8080/category", authHeaders());
};
