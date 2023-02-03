import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';
import '../../assets/SideDrawer.css'
import PersonIcon from '@mui/icons-material/Person';
import { Badge, ListItemText, Tooltip } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useState } from 'react'
import { useContext } from 'react'
import { offerContext } from '../../offerContext'
import { useEffect } from 'react'

function BroadDrawer() {
    const navigate = useNavigate()
    const { user } = useContext(offerContext)

    return (
        <>
            {
                user ? <div>
                    <Box className="logoBox" >
                    </Box>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => navigate('/userprofile')}>
                            <ListItemIcon>
                                <PersonIcon sx={{ backgroundColor: '#BC09C7', padding: '5px', color: 'white', borderRadius: '50%' }} />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ color: '#000', textDecoration: 'none!important' }}
                                primary="User Profile"
                            />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => navigate('/')} >
                            <ListItemIcon>
                                <DashboardIcon sx={{ color: '#7382989c' }} />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => navigate('/create')} >
                            <ListItemIcon>
                                <AddIcon sx={{ color: '#7382989c' }} />
                            </ListItemIcon>
                            <ListItemText primary="Register Property" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => navigate('/offers')} >
                            <ListItemIcon>
                                <CollectionsBookmarkIcon sx={{ color: '#7382989c' }} />
                            </ListItemIcon>
                            <ListItemText primary="All Properties" />
                        </ListItem>
                    </List>
                    <Divider />
                    {/* <List>
                        <ListItem button onClick={() => navigate('/createprofile')} >
                            <ListItemIcon>
                                <ManageAccountsIcon sx={{ color: '#7382989c' }} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </List> */}
                </div> : <div>
                    <Box className="logoBox" >
                    </Box>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => navigate('/userprofile')}>
                            <ListItemIcon>
                                <PersonIcon sx={{ backgroundColor: '#BC09C7', padding: '5px', color: 'white', borderRadius: '50%' }} />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ color: '#000', textDecoration: 'none!important' }}
                                primary="User Profile"
                            />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => navigate('/')} >
                            <ListItemIcon>
                                <DashboardIcon sx={{ color: '#7382989c' }} />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => navigate('/create')} >
                            <ListItemIcon>
                                <AddIcon sx={{ color: '#7382989c' }} />
                            </ListItemIcon>
                            <ListItemText primary="Register Property" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => navigate('/offers')} >
                            <ListItemIcon>
                                <CollectionsBookmarkIcon sx={{ color: '#7382989c' }} />
                            </ListItemIcon>
                            <ListItemText primary="All Properties" />
                        </ListItem>
                    </List>
                </div>
            }
        </>
    )
}

export default BroadDrawer