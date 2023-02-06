import React, { useState, useEffect, useContext } from 'react'
import { Grid, TextField, MenuItem, Select, Button, Card, CardMedia, CircularProgress } from '@mui/material'
import errorHandler from '../../helpers/errorHandler';
import Map2 from './Map';
import ImageUploading from "react-images-uploading";
import HorizontalScroll from 'react-horizontal-scrolling'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { json, useNavigate } from 'react-router';
import PredictServices from '../../services/PredictServices';
import { Box } from '@mui/system';
import { offerContext } from '../../offerContext';
import successHandler from '../../helpers/successHandler';
import MapAdd from './MapAdd';

const AddBtn = {
    color: 'white', background: '#BC09C7',
    fontFamily: 'Poppins', padding: '0px 2.6%'
}

const CreateProperty = () => {
    const navigate = useNavigate()
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
    const [file, setFile] = useState([])
    const { token, center } = useContext(offerContext)
    const [maxFloor, setMaxfloor] = useState(0)
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)
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
        // setLoading(false)

        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }

    const handleChangeNegative = (e) => {
        if (e.target.value >= 0) {
            const name = e.target.name;
            const value = e.target.value;
            setJson({ ...json, [name]: value });
        } else {
            errorHandler("Enter a valid number")
        }
    }
    console.log(maxFloor)
    const handleChangeMaxFloor = (e) => {
        if (e.target.value !== undefined) {
            setMaxfloor(e.target.value)
        }
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
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList)
        const arr = imageList.map((item) => item.file)
        setFile(arr)
    };
    const rentPredict = async () => {
        setLoading(true)
        const data = {
            "name": json.name,
            "posted_on": json.posted_on,
            "bhk": parseInt(json.bhk),
            "size": parseInt(json.size),
            "floor": json.floor,
            "area_type": json.area_type,
            "area_location": json.area_location,
            "city": json.city,
            "furnishing_status": json.furnishing_status,
            "tenant_preferred": json.tenant_preferred,
            "bathroom": json.bathroom,
            "point_of_contact": json.point_of_contact,
            "max_occupants": json.max_occupants,
            "rent": 0,
            'description': ''
        }
        await PredictServices.predict(data)
            .then((res) => {
                console.log(res);
                setJson({ ...json, 'rent': res.data.rent, 'description': res.data.description.replace(/(\r\n|\n|\r)/gm, "") })

                setLoading(false)
            })
            .catch((e) => {
                console.log(e)
                setLoading(false)

            })

    }

    const register = async () => {
        setLoad(true)
        var FormData = require('form-data');
        var data = new FormData();
        data.append("posted_on", json.posted_on);
        data.append("bhk", parseInt(json.bhk));
        data.append("size", parseFloat(json.size))
        data.append("floor", json.floor)
        data.append("area_type", json.area_type)
        data.append("area_location", json.area_location)
        data.append("city", json.city)
        data.append("furnishing_status", json.furnishing_status)
        data.append("tenant_preferred", json.tenant_preferred)
        data.append("bathroom", parseInt(json.bathroom))
        data.append("point_of_contact", json.point_of_contact)
        data.append("max_occupants", json.max_occupants)
        for (let i = 0; i < images.length; i++) {
            data.append("pictures", file[i])
        }
        data.append("name", json.name)
        data.append("rent", parseFloat(json.rent))
        data.append("description", json.description)
        data.append("lat", center.lat)
        data.append("lon", center.lon)

        await PredictServices.registerProperty(data, token)
            .then((res) => {
                setLoad(false)
                console.log(res);
                successHandler('Property successfully registered')
                navigate('/')
            })
            .catch((e) => {
                setLoad(false)
                console.log(e)
            })
    }

    console.log(images);
    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

                <Grid item container md={7} sx={{ height: '80vh', overflow: 'scroll', "&::-webkit-scrollbar": { display: 'none' } }} >
                    <Grid item container md={12} columnSpacing={2} >
                        <Grid item md={12} sx={{ width: '300px', height: '300px' }}>
                            <MapAdd />
                        </Grid>
                        <Grid item md={12} >
                            <div className="App">
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                    acceptType={["jpg"]}
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps
                                    }) => (
                                        // write your building UI
                                        <div className="upload__image-wrapper">
                                            <Button
                                                style={isDragging ? { color: "red" } : null}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Click or Drop here
                                            </Button>
                                            &nbsp;
                                            <Button onClick={onImageRemoveAll}>Remove all images</Button>
                                            <Grid container columnSpacing={2}>
                                                {imageList.map((image2, index) => (
                                                    <Grid item key={index} className="image-item">
                                                        <Card>
                                                            <CardMedia sx={{ width: '10rem', height: '100px' }} component='img' image={image2.data_url} />
                                                            <div className="image-item__btn-wrapper" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <EditIcon style={{ cursor: 'pointer', color: '#B5DD43' }} onClick={() => onImageUpdate(index)}></EditIcon>
                                                                <DeleteIcon style={{ cursor: 'pointer', color: '#DD4343' }} onClick={() => onImageRemove(index)}></DeleteIcon>
                                                            </div>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Name</p>
                            <TextField required value={json.name} sx={textField} name='name' placeholder='Enter Name' id='name' onChange={handleChange} />
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Max Occupants</p>
                            <TextField required value={json.max_occupants} sx={textField} name='max_occupants' placeholder='Enter Max Occupants' id='max_occupants' onChange={handleChange} />
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>City</p>
                            <Select
                                id="demo-simple-select"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value)
                                    setJson({
                                        ...json, 'city': e.target.value
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
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Area Location</p>
                            <TextField required value={json.area_location} sx={textField} name='area_location' placeholder='Enter Area Location' id='area_location' onChange={handleChange} />
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Area Type</p>
                            <Select
                                id="demo-simple-select"
                                value={areaType}
                                onChange={(e) => {
                                    setAreaType(e.target.value)
                                    setJson({
                                        ...json, 'area_type': e.target.value
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
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Furnishing</p>
                            <Select
                                id="demo-simple-select"
                                value={furnishing}
                                onChange={(e) => {
                                    setFurnishing(e.target.value)
                                    setJson({
                                        ...json, 'furnishing_status': e.target.value
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
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Point of Contact</p>
                            <Select
                                id="demo-simple-select"
                                value={poc}
                                onChange={(e) => {
                                    setPoc(e.target.value)
                                    setJson({
                                        ...json, 'point_of_contact': e.target.value
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
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Preferred Tenant</p>
                            <Select
                                id="demo-simple-select"
                                value={tenant}
                                onChange={(e) => {
                                    setTenant(e.target.value)
                                    setJson({
                                        ...json, 'tenant_preferred': e.target.value
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
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Maximum no. of floors</p>
                            <TextField required sx={textField} name='maximum floor' placeholder='Enter Maximum Floor' id='maxFloor' onChange={handleChangeMaxFloor} />
                        </Grid>
                        <Grid item md={6}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Floor</p>
                            <Select
                                id="demo-simple-select"
                                value={floor}
                                onChange={(e) => {
                                    try {
                                        setFloor(e.target.value)
                                        setJson({
                                            ...json, 'floor': `${e.target.value} out of ${maxFloor}`
                                        })
                                    } catch {
                                        console.log('error')
                                    }
                                }}
                                sx={{ width: '100%' }}
                            >
                                {
                                    floorArray.map((no) => {
                                        return <MenuItem key={no} value={no === 0 ? 'Ground' : no}>{no === 0 ? 'Ground' : no}</MenuItem>
                                    })
                                }
                            </Select>
                        </Grid>
                        <Grid item md={3} sx={{ marginTop: '2.7%' }}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>BHK</p>
                            <TextField required value={json.bhk} sx={textField} name='bhk' placeholder='Enter BHK' id='BHK' onChange={handleChange} />
                        </Grid>
                        <Grid item md={9}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Size in Sq. ft.</p>
                            <TextField required value={json.size} sx={textField} name='size' placeholder='Enter Size of Flat' id='size' onChange={handleChange} />
                        </Grid>
                        <Grid item md={9}>
                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Rent</p>
                            <TextField required value={json.rent} sx={textField} name='rent' placeholder='Enter Rent' id='rent' onChange={handleChange} />
                        </Grid>
                        <Grid item md={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            {!loading ? <Button onClick={rentPredict} sx={{ textTransform: 'none', height: '3.5rem', width: '100%', border: '2px solid #BC09C7', '&:hover': { border: '2px solid #BC09C7 !important', backgroundColor: 'white !important', color: '#BC09C7 !important' }, ...AddBtn }} > Predict Rent</Button> : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress sx={{ backgroundColor: '#BC09C7', color: 'white', padding: '5px', borderRadius: '50%' }} />
                            </Box>}
                        </Grid>
                        <Grid item md={12}>

                            <p style={{ fontSize: '12px', marginTop: '5%' }}>Description</p>
                            <TextField multiline rows={4} required value={json.description} sx={textField} name='description' placeholder="Enter description" id='description' onChange={handleChange} />

                        </Grid>
                        <Grid item md={12} sx={{ marginTop: '3%' }}>
                            {!load ? <Button onClick={register} sx={{ textTransform: 'none', height: '3.5rem', width: '100%', border: '2px solid #BC09C7', '&:hover': { border: '2px solid #BC09C7 !important', backgroundColor: 'white !important', color: '#BC09C7 !important' }, ...AddBtn }} > Register Property</Button> : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress sx={{ backgroundColor: '#BC09C7', color: 'white', padding: '5px', borderRadius: '50%' }} />
                            </Box>}
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </>
    )
}

export default CreateProperty