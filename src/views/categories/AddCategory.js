import React, { useRef, useState, useEffect } from 'react';
import Panel from '../../components/Panel/Panel';
import { TextField, Input, Button } from '@mui/material';
import { FiUpload } from "react-icons/fi";
import { AiFillFolder } from "react-icons/ai";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AddCategoryValidation from '../../validations/AddCategoryValidation';
import { postAddCategory } from '../../redux/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import Toast from "react-hot-toast"

function AddCategory() {
    const dispatch = useDispatch();
    const { postAddCategoryState: { loading, success, error } } = useSelector(state => state.categorySlice);

    const [image, setImage] = useState(null);


    useEffect(() => {
        if (!loading && success) {
            Toast.success("Kategori Eklendi");
        }
    }, [loading])

    const handleSubmit = (values, actions) => {
        console.log(values);
        dispatch(postAddCategory(values));
        actions.resetForm({
            categoryName: "",
            description: "",
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
        <Panel title="Kategori Ekle">

            <Formik
                // validationSchema={LoginSchema}
                initialValues={{
                    categoryName: "",
                    description: "",
                    imageFile: null
                }}
                validationSchema={AddCategoryValidation}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, isValid, dirty, ...props }) => (

                    <Form className="grid gap-y-3">
                        <TextField
                            label="Kategori Adı"
                            name="categoryName"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            value={values.categoryName}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="categoryName" />}
                            error={props.errors.categoryName && props.touched.categoryName}
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

export default AddCategory