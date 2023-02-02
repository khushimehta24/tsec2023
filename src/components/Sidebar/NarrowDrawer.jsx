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
import { Badge, Tooltip } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useState } from 'react'
import { useContext } from 'react'
import { offerContext } from '../../offerContext'
import { useEffect } from 'react'
import { isObject } from 'url/util'

function NarrowDrawer() {
    const navigate = useNavigate()
    const { user } = useContext(offerContext)


    return (
        <>
            {
                user ? <div style={{ overflowX: 'hidden' }}>

                    <Divider />
                    <Tooltip title="User Profile">

                        <List >
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/userprofile')}  >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }} >
                                    <PersonIcon sx={{ backgroundColor: '#BC09C7', padding: '5px', color: 'white', borderRadius: '50%' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Tooltip>
                    <Divider />
                    <Tooltip title="Dashboard">
                        <List>
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/')}>
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <DashboardIcon sx={{ color: '#7382989c' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>

                    </Tooltip>
                    <Divider />
                    <Tooltip title="Create Offer">
                        <List>
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/addtoipfs')} >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <AddIcon sx={{ color: '#7382989c' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Tooltip>
                    <Divider />
                    <Tooltip title="All Offers">

                        <List>
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/offers')} >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CollectionsBookmarkIcon sx={{ color: '#7382989c' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Tooltip>

                    <Divider />

                    <Tooltip title="Settings">
                        <List>
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/createprofile')} >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ManageAccountsIcon sx={{ color: '#7382989c' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Tooltip>
                    {/* <Divider />

                    <Tooltip title="User Transactions">
                        <List>
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/usertransactions')} >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ReceiptLongIcon sx={{ color: '#7382989c' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Tooltip> */}

                </div> : <div style={{ overflowX: 'hidden' }}>

                    <Divider />
                    <Tooltip title="profile">

                        <List >
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/userprofile')}  >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }} >
                                    <PersonIcon sx={{ backgroundColor: '#BC09C7', padding: '5px', color: 'white', borderRadius: '50%' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Tooltip>
                    <Divider />
                    <Tooltip title="Dashboard">
                        <List>
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/')}>
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <DashboardIcon sx={{ color: '#7382989c' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>

                    </Tooltip>
                    <Divider />
                    <Tooltip title="Create Offer">
                        <List>
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/addtoipfs')} >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <AddIcon sx={{ color: '#7382989c' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Tooltip>
                    <Divider />
                    <Tooltip title="All Offers">

                        <List>
                            <ListItem button sx={{ paddingLeft: '0px' }} onClick={() => navigate('/offers')} >
                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CollectionsBookmarkIcon sx={{ color: '#7382989c' }} />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Tooltip>
                </div>
            }
        </>
    )
}

export default NarrowDrawer