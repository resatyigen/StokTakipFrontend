import React from 'react'
import { Modal, Fade, Box, Backdrop, Button } from '@mui/material'
import { RiAlertFill } from "react-icons/ri";

function DeleteProductModal({ productName, isOpen, onClose, onYes, onCancel }) {
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
                    <div className='p-5 flex flex-col items-center justify-center gap-y-1'>
                        <RiAlertFill color="#ffae00" size={56} />
                        <h1 className='font-semibold text-[25px]'>Uyarı</h1>
                    </div>
                    <div className='py-2 px-5 '>
                        <p>
                            <b className='font-bold'>{productName}</b> Ürününü Silmek İstediğine Eminmisin?
                        </p>
                    </div>
                    <div className='py-2 px-5 border-t border-t-gray-500 flex flex-row gap-x-5 justify-end'>
                        <Button variant="contained" color="info" onClick={onCancel}>
                            İptal
                        </Button>
                        <Button variant="contained" color="error" onClick={onYes}>
                            Evet
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default DeleteProductModal