import axios from "axios";
import { getUserToken } from "../token";

async function PostLogin(loginData) {
    return await axios.post('https://stokapi.rakunsoft.xyz/Auth/Login', loginData);
}

async function GetCategoryList() {
    const token = getUserToken();
    console.log("User Token :", token);
    return await axios.get('https://stokapi.rakunsoft.xyz/Category/List', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export {
    PostLogin,
    GetCategoryList
}