import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from "react-router";
import '../../assets/SideDrawer.css'
import NarrowDrawer from './NarrowDrawer'
import BroadDrawer from './BroadDrawer';
import { Button, Grid } from '@mui/material';
import ElevateAppBar from '../navbar/Elevation'
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand } from 'react-icons/tb'
import { IconContext } from 'react-icons'
import { offerContext } from '../../offerContext'

const drawerWidth = 240;
const narrowDrawerWidth = 60;

function ResponsiveDrawer(props) {
    let navigate = useNavigate()
    const { windows, currentUser } = props
    const [mobileOpen, setMobileOpen] = useState(false)
    const { children } = props
    const [value, setValue] = useState(0)
    const [openDrawer, setOpenDrawer] = useState(true)
    const { user, setUser, setOpen, setToken } = useContext(offerContext)
    let connectWC = async () => {
        setOpen(true)
    }
    const theme = useTheme()
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    }

    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const narrowDrawer = (
        <NarrowDrawer />
    )

    const drawer = (
        <BroadDrawer />
    )

    const container =
        windows !== undefined ? () => windows().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>

            <Box component="nav" sx={openDrawer ? { width: { sm: narrowDrawerWidth }, flexShrink: { sm: 0 } } : { width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .css-4t3x6l-MuiPaper-root-MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            margin: '0%',
                            padding: '0',
                            width: '70vw',
                            height: '100% !important',
                            borderRadius: '10px'
                        },
                    }}
                >
                    <Grid container sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Grid item>
                            {drawer}
                        </Grid>
                        <Grid item sx={{ margin: '5%' }}>
                            {
                                <Grid item >{
                                    user === null ? <Button onClick={() => navigate('/login')} sx={{ backgroundColor: '#BC09C7', color: 'white', border: '2px solid #BC09C7', width: '100%', textTransform: 'none', '&:hover': { color: '#BC09C7', border: '2px solid #BC09C7' }, fontSize: { md: '15px', sm: '10px', xs: '10px' } }}>Login</Button> : <Button onClick={() => {
                                        setUser(null);
                                        setToken('');
                                        localStorage.setItem("ccpUser", JSON.stringify(null))
                                        localStorage.setItem("ccpToken", JSON.stringify(''))
                                    }} sx={{ backgroundColor: '#BC09C7', color: 'white', border: '2px solid #BC09C7', width: '100%', textTransform: 'none', '&:hover': { color: '#BC09C7', border: '2px solid #BC09C7' }, fontSize: { md: '15px', sm: '10px', xs: '10px' } }}>Logout</Button>
                                }

                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Drawer>
                {
                    openDrawer ? <Drawer
                        variant="permanent"
                        className='borderSidebar'
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: narrowDrawerWidth, margin: '10px', borderRadius: '10px'
                            },
                        }}
                        open
                    >
                        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', height: '100%', justifyContent: 'space-between' }}>

                            <Grid>
                                {narrowDrawer}
                            </Grid>
                            <Grid onClick={() => setOpenDrawer(!openDrawer)} sx={{ display: 'flex', justifyContent: 'center', padding: '20%', cursor: 'pointer' }}>
                                <IconContext.Provider value={{ size: '1.5em', color: '757575' }}>
                                    <TbLayoutSidebarLeftExpand />
                                </IconContext.Provider>
                            </Grid>
                        </Grid>
                    </Drawer> : <Drawer
                        variant="permanent"
                        className='borderSidebar'
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth, margin: '10px', borderRadius: '10px'
                            },
                        }}
                        open
                    >
                        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', height: '100%', justifyContent: 'space-between' }}>

                            <Grid>
                                {drawer}
                            </Grid>
                            <Grid onClick={() => setOpenDrawer(!openDrawer)} sx={{ display: 'flex', alignItems: 'center', padding: '5%', cursor: 'pointer' }}>
                                <IconContext.Provider value={{ size: '1.5em', color: '757575', paddingRight: '12%' }}>
                                    <TbLayoutSidebarRightExpand />
                                </IconContext.Provider>
                                <p>Minimize</p>
                            </Grid>
                        </Grid>
                    </Drawer>
                }

            </Box>
            <Box
                component="main"
                sx={openDrawer ? {
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${narrowDrawerWidth}px)` },
                } : {
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <ElevateAppBar openDrawer={openDrawer} narrowDrawerWidth={narrowDrawerWidth} drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} />
                <Toolbar />
                {children}
            </Box>

        </Box>
    )
}

ResponsiveDrawer.propTypes = {
    windows: PropTypes.func,
}

export default ResponsiveDrawer