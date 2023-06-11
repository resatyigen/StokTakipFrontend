import axios from "axios";
import { getUserToken } from "../token";
import { JsonToQueryParameter } from "../../Utils/HttpQuery";
const API_URL = "https://stokapi.rakunsoft.xyz";
//const API_URL = "http://localhost:5092";

async function PostLogin(loginData) {
    return await axios.post(`${API_URL}/Auth/Login`, loginData);
}

async function GetCategoryList() {
    const token = getUserToken();
    console.log("User Token :", token);
    return await axios.get(`${API_URL}/Category/List`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

async function PostAddCategory(data) {
    const token = getUserToken();
    console.log("User Token :", token);
    return await axios.post(`${API_URL}/Category/Add`,
        data,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
}

async function PutEditCategory(data) {
    const token = getUserToken();
    console.log("User Token :", token);

    return await axios.put(`${API_URL}/Category/Edit`,
        data,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
}

async function DeleteCategory(data) {
    const token = getUserToken();
    console.log("User Token :", token);
    const filterQuery = JsonToQueryParameter(data);
    return await axios.delete(`${API_URL}/Category/Delete?${filterQuery}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
}

async function GetCategoryFilterList(filter) {
    const token = getUserToken();
    console.log("User Token :", token);
    const filterQuery = JsonToQueryParameter(filter);

    console.log("FILTER QUERY : ", filterQuery);
    return await axios.get(`${API_URL}/Category/FilterList?${filterQuery}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

async function GetCategory(filter) {
    const token = getUserToken();
    console.log("User Token :", token);
    const filterQuery = JsonToQueryParameter(filter);

    console.log("FILTER QUERY : ", filterQuery);
    return await axios.get(`${API_URL}/Category?${filterQuery}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

async function PostAddProduct(data) {
    const token = getUserToken();
    console.log("User Token :", token);
    return await axios.post(`${API_URL}/Product/Add`,
        data,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
}

async function GetProductFilterList(filter) {
    const token = getUserToken();
    console.log("User Token :", token);
    const filterQuery = JsonToQueryParameter(filter);

    console.log("FILTER QUERY : ", filterQuery);
    return await axios.get(`${API_URL}/Product/FilterList?${filterQuery}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

async function GetProduct(filter) {
    const token = getUserToken();
    console.log("User Token :", token);
    const filterQuery = JsonToQueryParameter(filter);

    console.log("FILTER QUERY : ", filterQuery);
    return await axios.get(`${API_URL}/Product?${filterQuery}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

async function PutEditProduct(data) {
    const token = getUserToken();
    console.log("User Token :", token);

    return await axios.put(`${API_URL}/Product/Edit`,
        data,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
}

async function DeleteProduct(data) {
    const token = getUserToken();
    console.log("User Token :", token);
    const filterQuery = JsonToQueryParameter(data);
    return await axios.delete(`${API_URL}/Product/Delete?${filterQuery}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
}

export {
    PostLogin,
    GetCategoryList,
    PostAddCategory,
    GetCategoryFilterList,
    GetCategory,
    PutEditCategory,
    DeleteCategory,
    PostAddProduct,
    GetProductFilterList,
    GetProduct,
    PutEditProduct,
    DeleteProduct
}