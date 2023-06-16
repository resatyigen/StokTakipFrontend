import Toast from "react-hot-toast";

const ERRORS = [
    {
        key: "USER_NOT_FOUND",
        description: "Kullnıcı Bulunamadı"
    },
    {
        key: "ERR_USER_ID",
        description: "Kullanıcı ID Hatası"
    },
    {
        key: "ERR_CATEGORY_NOT_FOUND",
        description: "Kategori Bulunamadı"
    },
    {
        key: "ERR_CATEGORY_ACCESS_DENIED",
        description: "Kategoriye Erişimin Yetkiniz Bulnmamaktadır"
    },
    {
        key: "ERR_PRODUCT_NOT_FOUND",
        description: "Ürün Bulunamadı"
    },
    {
        key: "ERR_PRODUCT_ACCESS_DENIED",
        description: "Ürüne Erişimin Yetkiniz Bulnmamaktadır"
    },
    {
        key: "ERR_USERNAME_FOUND",
        description: "Bu Kullanıcı Adı Zaten Kayıtlı"
    },
    {
        key: "ERR_EMAIL_FOUND",
        description: "Bu E-Posta Adresi Zaten Kayıtlı"
    }
]

export const HttpError = (error) => {
    switch (error.response.status) {
        case 404:

            break;

        default:
            break;
    }

    const errorResponseData = error.response.data;

    if (errorResponseData !== "") {
        const errorName = ERRORS.find(x => x.key === errorResponseData);
        if (errorName) {
            Toast.error(errorName.description);
        }
    }

    console.log("error response status", error.response.status);
    //    switch(error.type)
}