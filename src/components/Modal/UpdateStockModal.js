import React, { useState, useEffect } from 'react';
import { Modal, Fade, Box, Backdrop, Button, TextField } from '@mui/material';
import { RiAlertFill } from "react-icons/ri";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RxQuestionMarkCircled } from "react-icons/rx";

const fastNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


function UpdateStockModal({ product, isOpen, onClose, onUpdate }) {
    const [fastQuantity, setFastQuantity] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(0);

    useEffect(() => {
        setFastQuantity(0);
        setCurrentQuantity(product?.quantity);
    }, [product])


    const handleFastNumber = (number) => {
        setFastQuantity(number);
    }

    const handleIncrease = () => {
        setCurrentQuantity((prevState) => prevState - fastQuantity);
    }

    const handleDecrease = () => {
        setCurrentQuantity((prevState) => prevState + fastQuantity);
    }

    const handleFastQuantityChanged = (event) => {
        setFastQuantity(parseInt(event.target.value));
    }

    if (product === null)
        return false;

    const { quantity } = product;
    const quantityDiff = (currentQuantity - quantity);

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
                        <BsFillBoxSeamFill size={100} color='#9999' />
                        <h1 className='font-semibold text-[25px]'>Stok Güncelle</h1>
                    </div>
                    <div className='py-2 px-5'>
                        <div className='flex flex-row gap-x-2 items-center bg-zinc-100 p-2 border-2 border-zinc-200 rounded-lg'>
                            <div>
                                {
                                    (product?.imagePath !== null && product?.imagePath !== "")
                                        ? <img src={`https://stokapi.rakunsoft.xyz/app-images/${product?.imagePath}`} className='w-14' />
                                        : <RxQuestionMarkCircled size={31} color='#ffff' />
                                }
                            </div>
                            <span className='font-semibold'>{product?.productName}</span>
                        </div>
                    </div>
                    <div className='py-2 px-5 '>
                        <div className='flex flex-wrap gap-x-1 gap-y-1 justify-center'>
                            {
                                fastNumbers.map((number, index) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size='small'
                                            onClick={() => handleFastNumber(number)}
                                        >
                                            {number}
                                        </Button>
                                    )
                                })
                            }
                        </div>
                        <div className='flex flex-row mt-3 gap-x-2 items-center'>
                            <div>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={handleIncrease}
                                >
                                    Azalt
                                </Button>
                            </div>

                            <div>
                                <TextField
                                    value={fastQuantity}
                                    label="Adet"
                                    name="quantity"
                                    variant="outlined"
                                    margin="dense"
                                    size='small'
                                    type='number'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleFastQuantityChanged}
                                />
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleDecrease}
                                >
                                    Arttır
                                </Button>
                            </div>

                        </div>
                        <div className='mt-3 flex flex-col gap-y-3 border-t border-b border-zinc-400 py-3'>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row gap-x-1 items-center'>
                                    <BsFillBoxSeamFill size={20} color='#9999' />
                                    <span className='font-semibold'>İLK STOK</span>
                                </div>

                                <span>{quantity}</span>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row gap-x-1 items-center'>
                                    <BsFillBoxSeamFill size={20} color='#FF0060' />
                                    <span className='font-semibold'>GÜNCEL STOK</span>
                                </div>

                                <span className='font-bold'>{currentQuantity}</span>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row gap-x-1 items-center'>
                                    <BsFillBoxSeamFill size={20} color='#116A7B' />
                                    <span className='font-semibold'>GÜNCEL STOK FARKI</span>
                                </div>

                                <span className='font-bold'>
                                    {(quantityDiff > 0) && "+"}
                                    {(currentQuantity - quantity)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='py-3 px-5'>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => onUpdate({ productId: product?.id, quantity: currentQuantity })}
                            fullWidth
                        >
                            Kaydet
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal >
    )
}

export default UpdateStockModal