import { Badge, Button, Card, CardContent, CardMedia, Divider, Grid, Skeleton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState, createContext, useContext } from 'react'
// import { getCommFromContract } from '../../../utils/helper';
import Countdown from "react-countdown";
import { useNavigate } from 'react-router';
import moment from 'moment';
// import OfferServices from '../../../services/OfferServices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { offerContext } from '../../../offerContext';
// import Web3 from 'web3';

const style = {
    cardCss: { borderRadius: { md: '10px', xs: '4px' }, width: { xs: '100%' }, height: '100%', cursor: 'pointer' },
    cardCont: { padding: { sm: '9px', xs: '3px' } },
    img: { objectPosition: 'top', borderRadius: '5px', height: { md: '25vh', sm: '25vh', xs: '25vh' }, objectFit: 'cover', width: '100%' },
    heading: { margin: '0px', color: '#292D32', fontFamily: 'Poppins', fontWeight: 'bolder', padding: '0px', fontSize: { sm: '15px', xs: '8px' } },
    p: { margin: '0px', color: '#636363', fontFamily: 'Poppins', fontSize: { md: '12px', sm: '10px', xs: '6px' }, padding: '0px' },
    communityImg: { width: { md: '40px', sm: '30px', xs: '15px' }, border: '2px solid black', height: { md: '40px', sm: '30px', xs: '15px' }, borderRadius: '50%' },
    countdown: { fontSize: { md: '12px', xs: '7px' }, margin: 0, padding: '0', fontWeight: 'bold' },
    btn: { backgroundColor: '#292D32', color: 'white !important', textTransform: 'none', '&:hover': { color: 'black !important' }, fontSize: { md: '15px', sm: '10px', xs: '6px' }, padding: '10% 20%', minWidth: '50%' },
}

export const FilterContext = createContext([])

function OfferCard(props) {
    const { offer, communities } = props
    const disable = props.disable && props.disable
    const showIcon = props.showIcon && props.showIcon
    const redemption = props.redemption ? props.redemption : false
    const create = props.create ? props.create : false
    const navigate = useNavigate();
    const [now, setNow] = useState(moment().unix());
    const [display, setDisplay] = useState(now < offer.startsAt ? offer.startsAt : offer.endsAt);
    const [targetComm, setTargetComm] = useState([]);
    const [isCross, setIsCross] = useState(false);
    const [offerId, setOfferId] = useState(null);
    const [loadImg, setLoadImg] = useState(false)
    const [save, setSave] = useState(true)
    const { user, setUser, token } = useContext(offerContext)
    const [withdrawableAmount, setWithdrawableAmount] = useState()
    const [redeemed, setRedeemed] = useState(user && offer && user.redeemed.includes(offer._id) ? true : false)
    const [cardButton, setCardButton] = useState(offer && offer.inAppRedemption)



    return (
        <>
            <FilterContext.Provider value={{ offerId }}>
                {offer ? (
                    <Card sx={style.cardCss} onClick={() => redemption ? !redeemed ? navigate(`/redeemoffer`, { state: { offer: offer } }) : navigate(`/offerdetails/${offer._id}`) : navigate(`/offerdetails/${offer._id}`)} >
                        <CardContent sx={style.cardCont}>
                            {/* {showIcon && save ? <BookmarkIcon onClick={() => {
                                OfferServices.removeFromFav(user, offer, setUser, setSave, token)
                            }} sx={{ zIndex: 1000, position: 'absolute', padding: '4px', fontSize: '30px', backgroundColor: 'rgba(164, 163, 164, 0.4)', boxShadow: 'inset 19.2333px -19.2333px 19.2333px rgba(124, 124, 124, 0.1), inset -19.2333px 19.2333px 19.2333px rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(19.2333px)', color: 'white', borderRadius: '50%' }} />
                                : <BookmarkBorderIcon onClick={() => {
                                    OfferServices.addToFav(user, offer, setUser, setSave, token)
                                }} sx={{ zIndex: 1000, position: 'absolute', padding: '4px', fontSize: '30px', backgroundColor: 'rgba(164, 163, 164, 0.4)', boxShadow: 'inset 19.2333px -19.2333px 19.2333px rgba(124, 124, 124, 0.1), inset -19.2333px 19.2333px 19.2333px rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(19.2333px)', color: 'white', borderRadius: '50%' }} />
                            } */}

                            <CardMedia component='img' sx={loadImg ? style.img : { display: 'none' }} onLoad={() => setLoadImg(true)} image={offer.bannerUri} />
                            {
                                !loadImg && <Skeleton animation="wave" variant="rectangular" width="100%" height="25vh" />
                            }
                            <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='p' sx={style.heading}>{offer.offerName ? offer.offerName.length > 10 ? offer.offerName.substring(0, 10) + '...' : offer.offerName : offer.creatorName.length > 10 ? offer.creatorName.substring(0, 10) + '...' : offer.creatorName}</Typography>
                                    <Typography variant='p' sx={style.p}>From {offer.brand && offer.brand.name}</Typography>
                                </Grid>
                                <Grid item xs={2} sx={{ padding: '2%' }}>
                                    <Divider orientation='vertical' />
                                </Grid>
                                <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='p' sx={style.p}>Price</Typography>
                                    <Typography variant='p' sx={style.heading}>{(String(offer.price))} Eth</Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} sx={{ margin: '2% 0%' }}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>

                                    {targetComm.map((community, index) => (
                                        community !== undefined ? <CardMedia key={index} onClick={() => navigate(`/communitydetails/${community._id}`, { state: { id: community._id } })} component='img' sx={style.communityImg} image={community.img} /> : <CardMedia onClick={() => navigate(`/communitydetails/${community._id}`, { state: { id: community._id } })} key={index} component='img' sx={style.communityImg} image='https://www.southcharlottefamilycounseling.com/wp-content/uploads/2015/10/cropped-logo-dummy.png' />

                                    ))}


                                </Grid>

                                {
                                    redemption ? cardButton ? redeemed ? <>
                                        <Grid item md={12} sm={12} xs={12} sx={{ margin: '2% 0%' }}>
                                            <Divider />
                                        </Grid>
                                        <Button sx={{ color: '#342E57 !important', fontWeight: 'bold', backgroundColor: '#E2E2E2 !important', width: '100%' }} disabled>Redeemed</Button>
                                    </> : <>
                                        <Grid item md={12} sm={12} xs={12} sx={{ margin: '2% 0%' }}>
                                            <Divider />
                                        </Grid>
                                        <Button sx={{ backgroundColor: '#292D32', color: 'white', textTransform: 'none', width: '100%' }}>Redeem</Button>
                                    </> : <>
                                        <Grid item md={12} sm={12} xs={12} sx={{ margin: '2% 0%' }}>
                                            <Divider />
                                        </Grid>
                                        <Button sx={{ color: '#342E57 !important', fontWeight: 'bold', backgroundColor: '#E2E2E2 !important', width: '100%' }} disabled>Not live for redeeming</Button>
                                    </> : ""
                                }
                                {
                                    create && <>
                                        <Grid item md={12} sm={12} xs={12} sx={{ margin: '2% 0%' }}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography variant='p' sx={style.p}>withdrawable Amount</Typography>
                                            <Typography variant='p' sx={style.heading}>{withdrawableAmount} Eth</Typography>
                                        </Grid>
                                    </>
                                }
                                {
                                    !disable && <>
                                        <Grid item md={12} sm={12} xs={12} sx={{ margin: '2% 0%' }}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography variant='p' sx={style.p}> {
                                                (now > offer.endsAt ? "Expired" : (offer.startsAt > now ? "Starts In" : "Ends In"))
                                            } </Typography>
                                            {now < offer.startsAt ? display === offer.startsAt && <Countdown date={Number(`${display.toString()}000`)} renderer={({ days, hours, minutes, seconds, completed }) => completed ? "" : <Typography variant='p' sx={style.countdown}>{days}d : {hours}h : {minutes}m : {seconds}s</Typography>} /> : display === offer.endsAt && <Countdown date={Number(`${display.toString()}000`)} renderer={({ days, hours, minutes, seconds, completed }) => completed ? "" : <Typography variant='p' sx={style.countdown}>{days}d : {hours}h : {minutes}m : {seconds}s</Typography>} />}

                                        </Grid>
                                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            {
                                                (now > offer.endsAt ? <Button sx={style.btn} disabled>Expired!</Button> : (offer.startsAt > now ? <Button sx={style.btn} disabled>Upcoming!</Button> : <Button sx={style.btn}>Claim</Button>))
                                            }
                                        </Grid>
                                    </>
                                }
                                {/* {
                                    show && save ? <Tooltip title="Remove From Favourites" onClick={() => {
                                        OfferServices.removeFromFav(user, offer, setUser, setSave, token)
                                    }}>
                                        <BookmarkIcon />
                                    </Tooltip> : <Tooltip title="Add to favourites" onClick={() => {
                                        OfferServices.addToFav(user, offer, setUser, setSave, token)
                                    }}>
                                        <BookmarkBorderIcon />
                                    </Tooltip>
                                } */}

                            </Grid>
                        </CardContent>
                    </Card>
                ) : (<>Loading</>)}
            </FilterContext.Provider>
        </>
    )
}


export default OfferCard;