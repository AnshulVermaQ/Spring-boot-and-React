import axios from "axios";


const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});


export const fetchDashBoardData = async() =>{
    return axios.get("http://localhost:8080/dashboard", authHeaders());
}