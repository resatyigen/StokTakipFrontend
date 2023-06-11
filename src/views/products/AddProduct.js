import React, { useEffect, useRef, useState } from 'react';
import Panel from '../../components/Panel/Panel';
import { TextField, Input, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Formik, Form, ErrorMessage } from "formik";
import AddProductValidation from '../../validations/AddProductValidation';
import { postAddProduct } from '../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import Toast from "react-hot-toast"

function AddProduct() {
    const dispatch = useDispatch();
    const { getCategoryListState } = useSelector(state => state.categorySlice);
    const { postAddProductState: { loading, error, success } } = useSelector(state => state.productSlice);

    const [image, setImage] = useState(null);

    useLayoutEffect(() => {
        if (getCategoryListState.categoryList.length == 0) {

        }
    }, [])

    useEffect(() => {
        if (!loading && success) {
            Toast.success("Ürün Eklendi");
        }
    }, [loading])


    const handleSubmit = (values, actions) => {
        console.log(values);
        dispatch(postAddProduct(values));
        actions.resetForm({
            categoryId: null,
            productName: "",
            description: "",
            productUrl: "",
            quantity: 0,
            imageFile: null
        });
        setImage(null);
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <Panel title="Ürün Ekle">

            <Formik
                // validationSchema={LoginSchema}
                initialValues={{
                    categoryId: "",
                    productName: "",
                    description: "",
                    productUrl: "",
                    quantity: 0,
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
                                    image === null ? (
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

export default AddProduct