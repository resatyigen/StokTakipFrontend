import React, { useEffect, useRef, useState } from 'react';
import Panel from '../../components/Panel/Panel';
import { TextField, Input, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Formik, Form, ErrorMessage } from "formik";
import AddProductValidation from '../../validations/AddProductValidation';
import { getProduct, postAddProduct, putEditProduct } from '../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import Toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { putEditCategory } from '../../redux/slices/categorySlice';

function EditProduct() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const { getCategoryListState } = useSelector(state => state.categorySlice);
    const {
        putEditProductState: { loading, error, success },
        getProductState: { product }
    } = useSelector(state => state.productSlice);


    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(getProduct({ id: id }));
    }, [dispatch])

    useEffect(() => {
        if (product !== null) {
            if (product?.imagePath !== "" && product?.imagePath !== null) {
                setImage(`https://stokapi.rakunsoft.xyz/app-images/${product.imagePath}`);
            } else {
                setImage(null);
            }
        }
    }, [product])

    useLayoutEffect(() => {
        if (getCategoryListState.categoryList.length == 0) {

        }
    }, [])

    useEffect(() => {
        if (!loading && success) {
            Toast.success("Ürün Düzenlendi");
        }
    }, [loading])

    const handleSubmit = (values, actions) => {
        console.log(values);
        dispatch(putEditProduct(values));
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    if (loading) {
        return <div>Yükleniyor....</div>
    }

    if (product === null) {
        return <div>Yükleniyor....</div>
    }

    return (
        <Panel title="Ürün Düzenle">

            <Formik
                initialValues={{
                    id: product.id,
                    categoryId: product.categoryID,
                    productName: product.productName,
                    description: product.description ?? "",
                    productUrl: product.productUrl,
                    quantity: product.quantity,
                    imageFile: null
                }}
                validationSchema={AddProductValidation}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, isValid, dirty, ...props }) => (

                    <Form className="grid gap-y-3">

                        <FormControl fullWidth>
                            <InputLabel id="category-select-label">Kategori Seç</InputLabel>
                            <Select
                                labelId="category-select-label"
                                name="categoryId"
                                margin="dense"
                                value={values.categoryId}
                                label="Katgori Seç"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            >
                                {
                                    getCategoryListState.categoryList.length != 0 ?
                                        getCategoryListState.categoryList.map((category) => {
                                            return <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                                        }) :
                                        <MenuItem value={null}>Kategori Yok</MenuItem>
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            label="Ürün Adı"
                            name="productName"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            value={values.productName}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="productName" />}
                            error={props.errors.productName && props.touched.productName}
                            required
                        />


                        <TextField
                            label="Açıklama"
                            name="description"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            value={values.description}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="description" />}
                            error={props.errors.description && props.touched.description}
                        />

                        <TextField
                            label="Ürün linki"
                            name="productUrl"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            value={values.productUrl}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="productUrl" />}
                            error={props.errors.productUrl && props.touched.productUrl}
                        />

                        <TextField
                            label="Başlangıç Stok Adeti"
                            name="quantity"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            type='number'
                            value={values.quantity}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="quantity" />}
                            error={props.errors.quantity && props.touched.quantity}
                        />

                        <div className='p-5 border-2 border-zinc-300 border-dashed rounded-md'>
                            <div className='mb-4'>
                                {
                                    (image === null || image === "") ? (
                                        <div className='w-20 h-20 bg-white p-5 items-center justify-center flex'>
                                            <RxQuestionMarkCircled size={28} />
                                        </div>
                                    ) : (
                                        <>
                                            <img src={image} width={30} height={30} />
                                        </>
                                    )
                                }
                            </div>

                            <TextField
                                name="imageFile"
                                type="file"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                onChange={(event) => {
                                    props.setFieldValue("imageFile", event.target.files[0])
                                    onImageChange(event)
                                }}
                                onBlur={props.handleBlur}
                                helperText={<ErrorMessage name="imageFile" />}
                                error={props.errors.imageFile && props.touched.imageFile}
                            />
                        </div>

                        <Button variant="outlined" type='submit'>
                            Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </Panel>
    )
}

export default EditProduct