import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const authAPI {
    login: (email, password) => {
        return axios.post(`${API_URL}/login`, {
            email,
            password
        }).then(res => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }

            return res.data;
        })
    }
}

