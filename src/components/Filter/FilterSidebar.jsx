import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import { Button, Card, CardContent, Chip, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Checkbox from '@mui/material/Checkbox';
import CancelIcon from '@mui/icons-material/Cancel';

const drawerWidth = 260;
export const FilterContext = createContext([])
function FilterSidebar(props) {
    const { children, brandName, platformName } = props
    const [brands, setBrands] = useState([]);
    const [searchBrand, setSearchBrand] = useState('')
    const [platforms, setPlatforms] = useState([]);
    const [searchPlatform, setSearchPlatform] = useState('')
    const [toggle, setToggle] = useState(false)
    const Drawer_Paper = {
        display: { xs: 'none', sm: 'block' }, '& .css-1ciwpa8 ': { marginTop: '4.7rem !important', "&::-webkit-scrollbar": { display: 'none' }, overflowY: 'scroll', height: '88% !important', zIndex: -1 },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', "&::-webkit-scrollbar": { display: 'none' }, width: drawerWidth, borderLeft: '1px solid #1A73E8', margin: '10px', height: '97%', borderRadius: '10px' },
    }

    const Mobile_Toggle_Drawer = {
        display: { xs: toggle ? 'block' : 'none', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', "&::-webkit-scrollbar": { display: 'none' }, width: drawerWidth, borderLeft: '1px solid #1A73E8', margin: '10px', height: '97%', borderRadius: '10px' },
    }

    useEffect(() => {
        setBrands(brandName);
    }, [brandName])
    useEffect(() => {
        setPlatforms(platformName);
    }, [platformName])
    useEffect(() => {
        if (searchBrand) {
            setBrands(Object.keys(brands)
                .filter((key) => key.toLowerCase().includes(searchBrand))
                .reduce((obj, key) => {
                    return Object.assign(obj, {
                        [key]: brands[key]
                    });
                }, {}))
        } else {
            setBrands(brandName)
        }
    }, [searchBrand])
    useEffect(() => {
        if (searchPlatform) {
            setPlatforms(Object.keys(platforms)
                .filter((key) => key.toLowerCase().includes(searchPlatform))
                .reduce((obj, key) => {
                    return Object.assign(obj, {
                        [key]: platforms[key]
                    });
                }, {}))
        } else {
            setPlatforms(platformName)
        }
    }, [searchPlatform])

    let status = { "Active": false, "Expired": false, "Upcoming": false };

    const [statuses, setStatuses] = useState(status)
    const [HL, setHL] = useState("")
    const [checked, setChecked] = useState({ hightolow: false, lowtohigh: false, newtoold: false, oldtonew: false })

    const handleChange = (event) => {
        if (event.target.value === "HighToLow") {
            if (!checked.hightolow) {
                setHL(event.target.value);
                setChecked({ hightolow: true, lowtohigh: false, newtoold: false, oldtonew: false })
            }
            else if (checked.hightolow) {
                setHL("");
                setChecked({ hightolow: false, lowtohigh: false, newtoold: false, oldtonew: false })
            }
        }
        else if (event.target.value === "LowToHigh") {
            if (!checked.lowtohigh) {
                setHL(event.target.value);
                setChecked({ hightolow: false, lowtohigh: true, newtoold: false, oldtonew: false })
            }
            else if (checked.lowtohigh) {
                setHL("");
                setChecked({ hightolow: false, lowtohigh: false, newtoold: false, oldtonew: false })
            }
        }
        else if (event.target.value === "NewToOld") {
            if (!checked.newtoold) {
                setHL(event.target.value);
                setChecked({ hightolow: false, lowtohigh: false, newtoold: true, oldtonew: false })
            }
            else if (checked.newtoold) {
                setHL("");
                setChecked({ hightolow: false, lowtohigh: false, newtoold: false, oldtonew: false })
            }
        }
        else {
            if (!checked.oldtonew) {
                setHL(event.target.value);
                setChecked({ hightolow: false, lowtohigh: false, newtoold: false, oldtonew: true })
            }
            else if (checked.oldtonew) {
                setHL("");
                setChecked({ hightolow: false, lowtohigh: false, newtoold: false, oldtonew: false })
            }
        }
    };

    const drawer = (<>
        <Box sx={{ margin: '2%' }}>
            <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 'bold', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>Filters
                <Button sx={{ display: { md: 'none', sm: 'none', xs: 'block' } }} onClick={() => setToggle(!toggle)}>
                    <CancelIcon sx={{ fontSize: '20px', color: '#738298' }} />
                </Button>
            </Typography>
            <Typography variant='p' sx={{ fontFamily: 'Poppins', fontSize: '12px' }}>Found results</Typography>
            <Grid container sx={{ marginTop: '5%' }}>
                <Grid item md={12}>
                    <Card sx={{ boxShadow: 'none' }}>
                        <CardContent sx={{ margin: '0', padding: '0' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold' }}>Brands</Typography>
                            <Box>
                                {
                                    Object.keys(brands).filter((key) => brands[key]).map((brand, index) => {
                                        return <Chip key={index} label={brand} sx={{ marginRight: '10px', marginBottom: '10px' }} variant="outlined" onDelete={() => setBrands({ ...brands, [brand]: !brands[brand] })} />
                                    })
                                }
                            </Box>
                            <TextField placeholder='Search Brand' size='small' sx={{ width: '100%' }} value={searchBrand} id="searchBrand" onChange={(e) => setSearchBrand(e.target.value)} />

                            <Grid container sx={{ marginTop: '0.5px', maxHeight: '146px', overflowY: 'scroll', backgroundColor: '#E2E2E2', "&::-webkit-scrollbar": { display: 'none' } }}>

                                {Object.keys(brands).map((brand, index) => {
                                    return (
                                        <Grid item sx={{ width: '100%', margin: '0', padding: '0' }} key={index}>
                                            <Box style={{ backgroundColor: '#E2E2E2', margin: '0', padding: '5px 10px', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                                <Checkbox value={brand} onClick={() => setBrands({ ...brands, [brand]: !brands[brand] })} sx={{ margin: '0', padding: '0' }} size="small" checked={brands[brand]} />
                                                <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>{brand}</span>
                                            </Box>
                                        </Grid>
                                    );
                                })}


                            </Grid>

                        </CardContent>
                    </Card>

                </Grid>
                <Grid item md={12}>
                    <Card sx={{ boxShadow: 'none' }}>
                        <CardContent sx={{ margin: '0', padding: '0' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold' }}>Platforms</Typography>
                            <Box>
                                {
                                    Object.keys(platforms).filter((key) => platforms[key]).map((platform, index) => {
                                        return <Chip key={index} label={platform} sx={{ marginRight: '10px', marginBottom: '10px' }} variant="outlined" onDelete={() => setPlatforms({ ...platforms, [platform]: !platforms[platform] })} />
                                    })
                                }
                            </Box>
                            <TextField placeholder='Search Platform' size='small' sx={{ width: '100%' }} value={searchPlatform} id="searchPlatform" onChange={(e) => setSearchPlatform(e.target.value)} />
                            <Grid container sx={{ marginTop: '0.5px', maxHeight: '146px', overflowY: 'scroll', backgroundColor: '#E2E2E2', "&::-webkit-scrollbar": { display: 'none' } }}>
                                {Object.keys(platforms).map((platform, index) => {
                                    return (
                                        <Grid item key={index} sx={{ width: '100%', margin: '0', padding: '0' }}>
                                            <Box style={{ backgroundColor: '#E2E2E2', margin: '0', padding: '5px 10px', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                                <Checkbox value={platform} onClick={() => setPlatforms({ ...platforms, [platform]: !platforms[platform] })} sx={{ margin: '0', padding: '0' }} size="small" checked={platforms[platform]} />
                                                <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>{platform}</span>
                                            </Box>
                                        </Grid>
                                    );
                                })}


                            </Grid>

                        </CardContent>
                    </Card>

                </Grid>

                <Grid item md={12}>
                    <Card sx={{ boxShadow: 'none' }}>
                        <CardContent sx={{ margin: '0', padding: '0' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold' }}>Status</Typography>
                            <Grid container spacing={1} rowSpacing={2} sx={{ marginTop: '0.5px' }}>

                                {Object.keys(status).map((stat, index) => {
                                    return (
                                        <Grid item key={index}>
                                            <span style={{ backgroundColor: '#E2E2E2', borderRadius: '15px', padding: '5px 10px', justifyContent: 'flex-start', alignItems: 'center', width: 'auto' }}>
                                                <Checkbox value={stat} onClick={() => setStatuses({ ...statuses, [stat]: !statuses[stat] })} sx={{ margin: '0', padding: '0' }} size="small" />
                                                <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>{stat}</span>
                                            </span>
                                        </Grid>
                                    );

                                })}

                            </Grid>

                        </CardContent>
                    </Card>

                </Grid>
                <Grid item md={12}>
                    <Card sx={{ boxShadow: 'none' }}>
                        <CardContent sx={{ margin: '0', padding: '0' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold' }}>Sort</Typography>
                            <Box sx={{ marginTop: '0.5px' }}>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={HL}
                                    onClick={handleChange}>
                                    <FormControlLabel value="HighToLow" checked={checked.hightolow} control={<Radio />} label="High To Low" />
                                    <FormControlLabel value="LowToHigh" checked={checked.lowtohigh} control={<Radio />} label="Low To High" />
                                    <FormControlLabel value="NewToOld" checked={checked.newtoold} control={<Radio />} label="New To Old" />
                                    <FormControlLabel value="OldToNew" checked={checked.oldtonew} control={<Radio />} label="Old To New" />
                                </RadioGroup>

                            </Box>

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </Box>
    </>
    );

    return (
        <FilterContext.Provider value={{ brands, statuses, platforms, HL, toggle, setToggle }}>
            <Box sx={{ display: 'flex' }}>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` }, overflowX: 'hidden', margin: '0' }}
                >
                    {children}
                </Box>


                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, zIndex: 10, flexShrink: { sm: 0 }, display: { md: 'flex', sm: toggle ? 'block' : 'none', xs: 'none' } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="permanent"
                        sx={Drawer_Paper}
                        open
                        anchor="right"
                    >
                        {drawer}
                    </Drawer>


                </Box>

                {toggle && <Drawer
                    anchor='right'
                    open='right'
                    variant="temporary"
                    sx={Mobile_Toggle_Drawer}
                >

                    {drawer}
                </Drawer>}

            </Box>
        </FilterContext.Provider>
    );
}

FilterSidebar.propTypes = {
    window: PropTypes.func,
};

export default FilterSidebar;