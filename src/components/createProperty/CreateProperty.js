import React, { useState, useEffect } from 'react'
import { Grid, TextField, MenuItem, Select, Button } from '@mui/material'
import axiosHandler from '../../helpers/axiosHandler';


const CreateProperty = () => {
    const textField = { width: '100%' };
    const areatypes = ['Super Area', 'Built Area', 'Carpet Area']
    const Cities = ['Kolkata', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai', 'Hyderabad']
    const POC = ['Contact Owner', 'Contact Agent', 'Contact Builder']
    const Tenant = ['Bachelors/Family', 'Bachelors', 'Family']
    const Furnishing = ['Unfurnished', 'Semi-Furnished', 'Furnished']
    const [areaType, setAreaType] = useState('Super Area')
    const [furnishing, setFurnishing] = useState('Furnished')
    const [tenant, setTenant] = useState('Bachelors/Family')
    const [poc, setPoc] = useState('Contact Owner')
    const [city, setCity] = useState('Kolkata')
    const [floor, setFloor] = useState()
    const [maxFloor, setMaxfloor] = useState(0)
    const [rentCheck, setRentCheck] = useState(true)
    const [json, setJson] = useState({
        "posted_on": `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
        "name": "",
        "bhk": 1,
        "size": 0,
        "floor": "Ground out of 1",
        "area_type": "Super Area",
        "area_location": "",
        "city": "",
        "furnishing_status": "Semi-Furnished",
        "tenant_preferred": "Bachelors/Family",
        "bathroom": 1,
        "point_of_contact": "Contact Owner",
        "max_occupants": 0,
        "description": "",
    })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }

    const handleChangeNegative = (e) => {
        if (e.target.value >= 0) {
            const name = e.target.name;
            const value = e.target.value;
            setJson({ ...json, [name]: value });
        } else {
            axiosHandler("Enter a valid number")
        }
    }
    console.log(maxFloor)
    const handleChangeMaxFloor = (e) => {
        setMaxfloor(e.target.value)
    }
    const [floorArray, setFloorArray] = useState([]);
    useEffect(() => {
        console.log(Array.from(Array(parseInt(maxFloor + 1)).keys()))
        setFloorArray(Array.from(Array(parseInt(maxFloor) + 1).keys()))
        console.log(floorArray)
    }, [maxFloor])

    const checkRent = () => {
        console.log('hi')
    }
    console.log(floorArray)
    console.log(json)
    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item container md={8} sx={{ height: '80vh', overflow: 'scroll', "&::-webkit-scrollbar": { display: 'none' } }} >
                    <Grid item md={12} >

                    </Grid>

                    <p style={{ fontSize: '12px', marginTop: '3%' }}>City</p>
                    <Select
                        id="demo-simple-select"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value)
                            setJson({
                                ...json, 'city': city
                            })
                        }}
                        sx={{ width: '100%' }}
                    >
                        {
                            Cities.map((item, key) => (
                                <MenuItem key={key} value={item}>{item}</MenuItem>
                            ))
                        }
                    </Select>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Area Location</p>
                    <TextField required value={json.area_location} sx={textField} name='areaLocation' placeholder='Enter Area Location' id='areaLocation' onChange={handleChange} />
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Area Type</p>
                    <Select
                        id="demo-simple-select"
                        value={areaType}
                        onChange={(e) => {
                            setAreaType(e.target.value)
                            setJson({
                                ...json, 'area_type': areaType
                            })
                        }}
                        sx={{ width: '100%' }}
                    >
                        {
                            areatypes.map((item, key) => (
                                <MenuItem key={key} value={item}>{item}</MenuItem>
                            ))
                        }
                    </Select>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Furnishing</p>
                    <Select
                        id="demo-simple-select"
                        value={furnishing}
                        onChange={(e) => {
                            setFurnishing(e.target.value)
                            setJson({
                                ...json, 'furnishing_status': furnishing
                            })
                        }}
                        sx={{ width: '100%' }}
                    >
                        {
                            Furnishing.map((item, key) => (
                                <MenuItem key={key} value={item}>{item}</MenuItem>
                            ))
                        }
                    </Select>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Point of Contact</p>
                    <Select
                        id="demo-simple-select"
                        value={poc}
                        onChange={(e) => {
                            setPoc(e.target.value)
                            setJson({
                                ...json, 'point_of_contact': poc
                            })
                        }}
                        sx={{ width: '100%' }}
                    >
                        {
                            POC.map((item, key) => (
                                <MenuItem key={key} value={item}>{item}</MenuItem>
                            ))
                        }
                    </Select>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Preferred Tenant</p>
                    <Select
                        id="demo-simple-select"
                        value={tenant}
                        onChange={(e) => {
                            setTenant(e.target.value)
                            setJson({
                                ...json, 'tenant_preferred': tenant
                            })
                        }}
                        sx={{ width: '100%' }}
                    >
                        {
                            Tenant.map((item, key) => (
                                <MenuItem key={key} value={item}>{item}</MenuItem>
                            ))
                        }
                    </Select>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Area Location</p>
                    <TextField required sx={textField} name='maximum floor' placeholder='Enter Maximum Floor' id='maxFloor' onChange={handleChangeMaxFloor} />
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Floor</p>
                    <Select
                        id="demo-simple-select"
                        value={floor}
                        onChange={(e) => {
                            setFloor(e.target.value)
                            setJson({
                                ...json, 'floor': `${e.target.value} out of ${maxFloor}`
                            })
                        }}
                        sx={{ width: '100%' }}
                    >
                        {
                            floorArray.map((no) => {
                                return <MenuItem key={no} value={no === 0 ? 'Ground' : no}>{no === 0 ? 'Ground' : no}</MenuItem>
                            })
                        }
                    </Select>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>BHK</p>
                    <TextField required value={json.bhk} sx={textField} name='bhk' placeholder='Enter BHK' id='BHK' onChange={handleChange} />
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Size in Sq. ft.</p>
                    <TextField required value={json.size} sx={textField} name='size' placeholder='Enter Size of Flat' id='size' onChange={handleChange} />

                    {
                        rentCheck == true ? <>
                            <p style={{ fontSize: '12px', marginTop: '3%' }}>Max Occupants</p>
                            <TextField required value={json.max_occupants} sx={textField} name='max_occupants' placeholder='Enter Max Occupants' id='max_occupants' onChange={handleChange} />
                            <p style={{ fontSize: '12px', marginTop: '3%' }}>Description</p>
                            <TextField multiline rows={4} required value={json.desc} sx={textField} name='desc' placeholder="Enter description" id='desc' onChange={handleChange} />
                        </> :
                            <>
                                <Button onClick={() => checkRent()}>Hi</Button>
                            </>
                    }

                </Grid>
            </Grid>
        </>
    )
}

export default CreateProperty