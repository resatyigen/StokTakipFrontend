import React, { useState, useEffect } from 'react';
import Panel from "../../components/Panel/Panel";
import {
    Form,
    Formik,
    ErrorMessage
} from 'formik';
import {
    TextField,
    Button
} from '@mui/material';
import { FaUserCircle } from "react-icons/fa";
import { putEditUserInfo, putChangePassword } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import EditUserInfoValidation from '../../validations/EditUserInfoValidation';
import Toast from 'react-hot-toast';
import ChangePasswordModal from '../../components/Modal/ChangePasswordModal';

function UserProfile() {
    const dispatch = useDispatch();
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const { getUserInfoState, putEditUserInfoState, putChangePasswordState } = useSelector(state => state.userSlice);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const { user } = getUserInfoState;
        if (user !== null) {
            if (user.photoPath !== "" && user.photoPath !== null) {
                setImage(`https://stokapi.rakunsoft.xyz/app-images/${user.photoPath}`);
            } else {
                setImage(null);
            }
        }
    }, [getUserInfoState.user])

    useEffect(() => {
        const { loading, success } = putEditUserInfoState;
        if (loading === false && success === true) {
            Toast.success("Kullanıcı Bilgileri Düzenlendi");
        }
    }, [putEditUserInfoState.loading])

    useEffect(() => {
        const { loading, success } = putChangePasswordState;
        if (loading === false && success === true) {
            Toast.success("Şifre Değiştirildi");
        }
    }, [putChangePasswordState.loading])

    const handleSubmit = (values, actions) => {
        dispatch(putEditUserInfo(values));
    }

    const handleChangePasswordSubmit = (values) => {
        dispatch(putChangePassword(values));
        setShowChangePasswordModal(false);
    }

    const handleOpenChangePassword = () => {
        setShowChangePasswordModal(true);
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    if (getUserInfoState.loading || getUserInfoState.user === null)
        return <div>Yükleniyor ...</div>

    return (
        <Panel title="Kullanıcı Profili">
            <ChangePasswordModal
                isOpen={showChangePasswordModal}
                onClose={() => { setShowChangePasswordModal(false) }}
                onSubmit={handleChangePasswordSubmit}
            />
            <Formik
                initialValues={{
                    fullName: getUserInfoState.user.fullName,
                    imageFile: null
                }}
                validationSchema={EditUserInfoValidation}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, isValid, dirty, ...props }) => (
                    <Form className="grid gap-y-3">
                        <div className='p-5 border-2 border-zinc-300 border-dashed rounded-md'>
                            <div className='mb-4'>
                                {
                                    (image === null || image === "") ? (
                                        <div className='w-48 h-48 bg-white p-5 items-center justify-center flex'>
                                            <FaUserCircle size={250} />
                                        </div>
                                    ) : (
                                        <>
                                            <img src={image} width={250} height={250} />
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
                        <TextField
                            label="Ad Soyad"
                            name="fullName"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            value={values.fullName}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="fullName" />}
                            error={props.errors.fullName && props.touched.fullName}
                        />
                        <TextField
                            label="Kullanıcı Adı"
                            fullWidth
                            variant="filled"
                            margin="dense"
                            value={getUserInfoState.user.userName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            label="E-Posta Adresi"
                            fullWidth
                            variant="filled"
                            margin="dense"
                            value={getUserInfoState.user.email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <div className='flex flex-row gap-x-3'>
                            <Button variant="outlined" type='submit' className='w-full'>
                                Kaydet
                            </Button>
                            <Button
                                variant='outlined'
                                type='button'
                                color='error'
                                className='w-[200px]'
                                onClick={handleOpenChangePassword}
                            >
                                Şifre Değiştir
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Panel>
    )
}

export default UserProfile