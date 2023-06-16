import React from 'react';
import {
    IconButton
} from '@mui/material';

import { RxQuestionMarkCircled } from "react-icons/rx";
import { MdCancel } from "react-icons/md";

function CategoryItem({ category, handleRemoveSelectedCategory }) {
    return (
        <div className='flex flex-row gap-x-2 items-center bg-zinc-100 p-2 border-2 border-zinc-200 rounded-lg'>
            <div>
                {
                    (category?.imagePath !== null && category?.imagePath !== "")
                        ? <img src={`https://stokapi.rakunsoft.xyz/app-images/${category?.imagePath}`} className='w-8' />
                        : <RxQuestionMarkCircled size={31} color='#ffff' />
                }
            </div>
            <span className='font-semibold'>{category?.categoryName}</span>
            <IconButton onClick={() => handleRemoveSelectedCategory()}>
                <MdCancel color='black' />
            </IconButton>
        </div>
    )
}

export default CategoryItem