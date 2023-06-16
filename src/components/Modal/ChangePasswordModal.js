import React from 'react';
import {
    Form,
    Formik,
    ErrorMessage
} from 'formik';
import {
    TextField,
    InputLabel,
    Button,
    Modal,
    Fade,
    Backdrop,
} from '@mui/material';
import ChangePasswordValidation from '../../validations/ChangePasswordValidation';

function ChangePasswordModal({ isOpen, onClose, onSubmit }) {

    const handleSubmit = (values, actions) => {
        console.log(values);
        onSubmit(values);
        actions.resetForm({
            password: "",
            confirmPassword: ""
        });
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpen}>
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] h-auto bg-white rounded-md felx flex-col gap-y-10'>
                    <div className='px-5 pt-5 flex items-center justify-center'>
                        <h1 className='font-semibold'>Şifre Değiştir</h1>
                    </div>
                    <div className='p-5'>
                        <Formik
                            initialValues={{
                                password: "",
                                confirmPassword: ""
                            }}
                            validationSchema={ChangePasswordValidation}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, values, isValid, dirty, ...props }) => (

                                <Form className="grid gap-y-3">

                                    <TextField
                                        label="Şifre"
                                        name="password"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        value={values.password}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        helperText={<ErrorMessage name="password" />}
                                        error={props.errors.password && props.touched.password}
                                        required
                                    />

                                    <TextField
                                        label="Şifre Tekrarı"
                                        name="confirmPassword"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        value={values.confirmPassword}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        helperText={<ErrorMessage name="confirmPassword" />}
                                        error={props.errors.confirmPassword && props.touched.confirmPassword}
                                        required
                                    />

                                    <Button variant="outlined" type='submit'>
                                        Kaydet
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ChangePasswordModal