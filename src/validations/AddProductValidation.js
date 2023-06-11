import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

export default yup.object().shape({

    categoryId: yup
        .number()
        .required("Gerekli !"),

    productName: yup
        .string()
        .min(3, "Çok Kısa !")
        .max(30, "Çok Uzun !")
        .required("Gerekli !"),

    description: yup.string()
        .max(500, "Uzun !"),

    productUrl: yup
        .string()
        .notRequired()
        .min(10, "Çok Kısa !")
        .max(200, "Çok Uzun !"),

    quantity: yup
        .number()
        .required()

    // imageFile: yup
    //     .mixed()
    //     // .test(
    //     //     "fileSize",
    //     //     "File more than 0.5 MB not Allowed",
    //     //     (value) => value && value.size <= 524288
    //     // )
    //     .test(
    //         "fileFormat",
    //         "Unsupported Format",
    //         (value) => {
    //             if (value !== null)
    //                 return SUPPORTED_FORMATS.includes(value.type)
    //         }
    //     )
});
