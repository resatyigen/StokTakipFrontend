import React, { useEffect, useRef, useState } from 'react';
import Panel from '../../components/Panel/Panel';
import { TextField, Input, Button } from '@mui/material';
import { FiUpload } from "react-icons/fi";
import { AiFillFolder } from "react-icons/ai";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AddCategoryValidation from '../../validations/AddCategoryValidation';
import { getCategory, putEditCategory } from '../../redux/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Toast from 'react-hot-toast';

function EditCategory() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const {
        getCategoryState: { loading, success, error, category },
        putEditCategoryState
    } = useSelector(state => state.categorySlice);

    const [image, setImage] = useState(null);
    const imageInputRef = useRef();

    useEffect(() => {
        dispatch(getCategory({ id: id }));
    }, [dispatch])

    useEffect(() => {
        if (category !== null) {
            if (category?.imagePath !== "" || category?.imagePath !== null) {
                setImage(`https://stokapi.rakunsoft.xyz/app-images/${category.imagePath}`);
            }
        }

    }, [category])


    useEffect(() => {
        if (!putEditCategoryState.loading && putEditCategoryState.success) {
            Toast.success("Kategori Düzenlendi");
        }
    }, [putEditCategoryState.loading])

    const handleSubmit = (values, actions) => {
        console.log(values);
        dispatch(putEditCategory(values));
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    if (loading) {
        return <div>Yükleniyor....</div>
    }

    if (category === null) {
        return <div>Yükleniyor....</div>
    }

    return (
        <Panel title="Kategori Düzenle">

            <Formik
                // validationSchema={LoginSchema}
                initialValues={{
                    id: category.id,
                    categoryName: category.categoryName,
                    description: category.description,
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

export default EditCategory