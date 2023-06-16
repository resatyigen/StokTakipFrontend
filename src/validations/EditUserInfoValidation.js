import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

export default yup.object().shape({
    fullName: yup
        .string()
        .min(3, "Çok Kısa !")
        .max(250, "Çok Uzun !")
        .required("Gerekli !")
});
