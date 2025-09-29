import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Rating } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import { styled } from "@mui/material/styles";

import useStyles from './styles';

const MapContainer = styled("div")(({ theme }) => ({
    height: '85vh',
    width: '100%',
}));

const MarkerContainer = styled("div")(({ theme }) => ({
    position: 'absolute', 
    transform: 'translate(-50%, -50%)', 
    zIndex: 1, 
    '&:hover': { zIndex: 2 },
}));

const Pointer = styled("img")(({ theme }) => ({
    cursor: 'pointer',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '10px', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    width: '100px',
}));

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <MapContainer>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                center={coordinates}
                defaultZoom={14}
                margins={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    console.log(e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}               
               onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <MarkerContainer
                        lat={place.latitude}
                        lng={place.longitude}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlined color="primary" fontSize="large" />
                            ) : (
                                <StyledPaper elevation={3}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <Pointer
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                                </StyledPaper>
                            )
                        }
                    </MarkerContainer>
                ))}
                {/* {weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lng}>
                        <img src={`https://open-weather13.p.rapidapi.com/img/w/${data.weather[0].icon}.png`}></img>
                    </div>
                ))} */}
            </GoogleMapReact>
        </MapContainer>
    );
}

export default Map;