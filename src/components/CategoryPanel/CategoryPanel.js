import React, { useLayoutEffect, useEffect } from 'react';
import {
    TextField,
    List,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListItemButton,
    Box,
    ListItemIcon,
    Divider,

} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryList } from "../../redux/slices/categorySlice";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

function CategoryPanel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategoryList());
    }, [dispatch])

    const { getCategoryListState: { success, loading, categoryList } } = useSelector(state => state.categorySlice);

    const handleListItemClick = (event, id) => {
        navigate(`/dashboard/products/${id}`);
    }

    return (
        <div className='flex flex-col w-full'>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Divider />
                <div className='text-center py-3'>
                    Kategoriler
                </div>
                <Divider />
                <div className='p-3'>
                    <TextField id="outlined-basic" size='small' label="Kategori Ara" variant="outlined" />
                </div>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    {
                        (!loading && success) && categoryList.map((category) => {
                            return (
                                <ListItemButton
                                    key={category.id}
                                    // selected={selectedIndex === 0}
                                    onClick={(event) => handleListItemClick(event, category.id)}
                                >
                                    <ListItemAvatar>
                                        <Avatar variant='rounded'>
                                            {
                                                (category.imagePath === null || category.imagePath === "")
                                                    ? <RxQuestionMarkCircled size={31} color='#ffff' />
                                                    : <img src={`https://stokapi.rakunsoft.xyz/app-images/${category.imagePath}`} className='w-12' />
                                            }
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={category.categoryName} />
                                </ListItemButton>
                            )
                        })
                    }
                </List>
            </Box>
        </div>
    )
}

export default CategoryPanel