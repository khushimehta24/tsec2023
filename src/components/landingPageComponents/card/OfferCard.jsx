import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Carousel from '../carousel/Carousel';

const OfferCard = ({ property }) => {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 345, height: '100%' }} onClick={() => { navigate(`/propertydetails/${property._id}`) }}>
            <Carousel pics={property.pictures}/>

            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {property.name.length > 13 ? property.name.substring(0, 13) + '...' : property.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {property.description.length>50?property.name.substring(0,50)+'...':property.name}
                </Typography>
            </CardContent>
        </Card>
        
    );
}
export default OfferCard