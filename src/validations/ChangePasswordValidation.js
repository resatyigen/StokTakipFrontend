import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

export default yup.object().shape({
    password: yup
        .string()
        .min(8, 'Şifre En Az 8 Karakterli Olmalıdır'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Şifreler Eşleşmiyor'),
});
