import React, { useRef, useState } from 'react';
import Panel from '../../components/Panel/Panel';
import { Formik, Form } from 'formik';
import { TextField, Input, Button } from '@mui/material';
import { FiUpload } from "react-icons/fi";
import { AiFillFolder } from "react-icons/ai";
import { RxQuestionMarkCircled } from "react-icons/rx";

function AddCategory() {

    const [image, setImage] = useState(null);
    const imageInputRef = useRef();

    const handleSubmit = (values, actions) => {
        console.log(values);


    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const fileOpenDialogClick = () => {
        imageInputRef.current.click();
    }


    return (
        <Panel title="Kategori Ekle">

            <Formik
                // validationSchema={LoginSchema}
                initialValues={{
                    username: "",
                    password: "",
                    categoryImage: ""
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, isValid, dirty }) => (

                    <Form className="grid gap-y-3">
                        <TextField name='username' label="Kategori Adı" variant="outlined" />
                        <TextField name='password' label="Açıklama" variant="outlined" />
                        <input ref={input => input.focus()} />
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
                            <Button variant="outlined" startIcon={<FiUpload />} onClick={fileOpenDialogClick}>
                                Kategori Resmi Yükle
                            </Button>
                            <input name='categoryImage' hidden type='file' accept=".png, .jpeg, .jpg" onChange={onImageChange} multiple={false} ref={imageInputRef} />
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