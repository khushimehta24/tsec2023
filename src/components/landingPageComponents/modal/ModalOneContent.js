import { Button, CardMedia, Grid, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useWeb3React } from '@web3-react/core'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import axiosHandler from '../../../helpers/axiosHandler'
import { offerContext } from '../../../offerContext'
import { connectMetaMask, connectWalletConnect, fetchAccount, walletlink } from '../../../services/connectors'
import { isMobile } from "react-device-detect";
import { InjectedConnector } from '@web3-react/injected-connector'

const style = {
    btn: { display: 'flex', padding: { md: '5px', xs: '0px' }, width: '100%', cursor: 'pointer', borderRadius: '10px', backgroundColor: '#f2f2f2', height: '100%', flexDirection: 'column', alignItems: 'center', textTransform: 'none' },
    img: { width: '50px' },
    heading: { fontFamily: 'Poppins', margin: 0, padding: 0, fontWeight: 'bold', color: 'black' },
    ptag: { margin: 0, padding: 0, fontSize: '10px', color: '#4e4e4e' },
    gridItem: { padding: { md: '10px', xs: '5px' }, height: { md: '100%', xs: 'auto' } },
    gridContainer: { margin: '5% 0' },
}

function ModalOneContent({ activeStep, setActiveStep }) {
    const { activate } = useWeb3React();
    const { user, setUser, account, setAccount, token, setToken, setUserBrand } = useContext(offerContext)

    const Injected = new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42]
    });
    useEffect(() => {
        if (user !== null && user.walletAddress) {
            if (!(user.email) || user.email === '' || user.email === null || user.email === undefined) {
                setActiveStep(activeStep + 1);
            } else {
                setActiveStep(activeStep + 2);
            }
        }
    }, [user])
    // console.log(user, account, "modalonek")

    return (
        <>
            <Grid container sx={style.gridContainer}>
                <Grid item container md={12}>
                    <Grid item md={4} sm={4} xs={12} sx={style.gridItem}>
                        <Button onClick={() => {
                            activate(Injected)
                            connectMetaMask(user, setUser, account, setAccount, token, setToken, setUserBrand)
                        }} sx={style.btn}>
                            <CardMedia sx={style.img} component='img' image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" />
                            <Typography variant='h6' sx={style.heading}>MetaMask</Typography>
                            <p style={style.ptag}>Connect to your MetaMask Wallet</p>
                        </Button>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} sx={style.gridItem}>
                        <Button onClick={() => {
                            try {
                                activate(walletlink)
                                fetchAccount(user, setUser, account, setAccount, token, setToken, setUserBrand)
                            } catch (err) {
                                axiosHandler("Coin Base Extension not found")
                            }
                        }} sx={style.btn}>
                            <CardMedia sx={style.img} component='img' image="https://login.xyz/img/coinbase.svg" />
                            <Typography variant='h6' sx={style.heading}>Coin Base</Typography>
                            <p style={style.ptag}>Connect your Coin Base Wallet</p>
                        </Button>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} sx={style.gridItem} >
                        {isMobile ?
                            <Button onClick={() => { window.open('https://link.trustwallet.com/open_url?url=http://192.168.0.102:3000') }} sx={style.btn}>
                                <CardMedia sx={style.img} component='img' image="https://trustwallet.com/assets/images/media/assets/trust_platform.svg" />
                                <Typography variant='h6' sx={style.heading}>Trust Wallet</Typography>
                                <p style={style.ptag}>Connect with your Trust wallet account</p>
                            </Button>
                            :
                            <Tooltip title="Only available on mobile">
                                <Button sx={style.btn}>
                                    <CardMedia sx={style.img} component='img' image="https://trustwallet.com/assets/images/media/assets/trust_platform.svg" />
                                    <Typography variant='h6' sx={style.heading}>Trust Wallet</Typography>
                                    <p style={style.ptag}>Connect with your Trust wallet account</p>
                                </Button>
                            </Tooltip>
                        }
                    </Grid>
                </Grid>
                <Grid item container md={12}>
                    <Grid item md={12} sm={12} xs={12} sx={{ padding: '10px' }}>
                        <Button onClick={() => connectWalletConnect(user, setUser, account, setAccount)} sx={{ display: 'flex', padding: '5px', width: '100%', cursor: 'pointer', borderRadius: '10px', backgroundColor: '#f2f2f2', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}>
                            <CardMedia sx={style.img} component='img' image="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png" />
                            <Typography variant='h6' sx={style.heading}>Wallet Connect</Typography>
                            <p style={style.ptag}>Scan or Connect through Wallet Connect</p>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ModalOneContent