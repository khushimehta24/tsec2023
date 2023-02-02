import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Avatar, Card, CardContent, CardMedia, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, Popper, TextField } from '@mui/material';
// import Navbar from '../Navbar';
import { Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { offerContext } from '../../offerContext';
import logo from '../../images/logo.png'

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function ElevateAppBar(props) {
    const { openDrawer, narrowDrawerWidth, drawerWidth, handleDrawerToggle } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? event.currentTarget : event.currentTarget);
    };
    const navigate = useNavigate()
    const { user, setUser, token, setToken } = useContext(offerContext)


    return (
        <Box>
            <AppBar
                position="fixed"
                sx={openDrawer ? { flexGrow: 1, width: { sm: `calc(100% - ${narrowDrawerWidth}px)` }, boxShadow: 'none', backgroundColor: '#F5F6F8', color: 'black' } : { flexGrow: 1, boxShadow: 'none', width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: '#F5F6F8', color: 'black' }}

            >
                <Toolbar>
                    <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid md={3} sm={5} item sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <CardMedia component='img' onClick={() => navigate('/')} image={logo} sx={{ width: '90px', cursor: 'pointer' }} />

                        </Grid>
                        {/* <Grid item>
                            <Navbar currentUser={props.currentUser} loadWeb3={props.loadWeb3} />
                        </Grid> */}
                        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '20%' }}>
                            {user !== null ? <Avatar>{user.name.substring(0, 1)}</Avatar> : <Avatar src="/broken-image.jpg" />}
                            {user === null ? <Button onClick={() => navigate('/login')} sx={{ backgroundColor: '#BC09C7', color: 'white', border: '2px solid #BC09C7', textTransform: 'none', '&:hover': { color: '#BC09C7', border: '2px solid #BC09C7' }, fontSize: { md: '15px', sm: '10px', xs: '10px' }, width: '40%', marginLeft: '5%' }}>Login</Button> : <Button onClick={() => {
                                setUser(null)
                                setToken('')
                                localStorage.setItem("ccpUser", null)
                                localStorage.setItem("ccpToken", "")
                                navigate('/')
                            }} sx={{ color: '#BC09C7' }}>Logout</Button>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
