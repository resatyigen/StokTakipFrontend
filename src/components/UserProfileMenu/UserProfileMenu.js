import React, { useEffect } from 'react';
import {
    Menu,
    MenuItem,
    Avatar,
    Divider,
    ListItemIcon,
    Tooltip,
    IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/slices/userSlice';
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { clearUserToken } from '../../redux/token';

function UserProfileMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getUserInfoState: { user, loading, success } } = useSelector(state => state.userSlice);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // useEffect(() => {
    //     console.log(user);
    //     console.log("success", success);
    //     console.log("loading", loading);
    // }, [loading])


    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch])


    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserProfile = () => {
        setAnchorEl(null);
        navigate("/dashboard/user-profile")
    }

    const handleUserLogout = () => {
        clearUserToken();
        navigate("/");
    }

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {
                            loading === false && success === true && (user?.photoPath !== null && user?.photoPath !== undefined && user?.photoPath !== "")
                                ? <img src={`https://stokapi.rakunsoft.xyz/app-images/${user?.photoPath}`} className='w-12' />
                                : <FaUserCircle size={32} color='#969696' />
                        }
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleUserProfile}>
                    <Avatar /> Profil
                </MenuItem>
                <MenuItem onClick={handleUserLogout}>
                    <ListItemIcon>
                        <MdLogout size={32} />
                    </ListItemIcon>
                    Çıkış Yap
                </MenuItem>
            </Menu>
        </>

    )
}

export default UserProfileMenu