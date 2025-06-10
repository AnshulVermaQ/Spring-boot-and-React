import axios from "axios";


const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});


export const addUser = async (user) => {
    return await axios.post("http://localhost:8080/users/register", user, authHeaders());
}

export const deleteUser = async (id) => {
    return await axios.delete(`http://localhost:8080/users/${id}`, authHeaders());
}

export const fetchUsers = async () => {
    return await axios.get("http://localhost:8080/users", authHeaders());
}