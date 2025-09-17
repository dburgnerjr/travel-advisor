import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import Rating from '@mui/material';

import useStyles from './styles';

const Map = ({ setCoordinates, setBounds, coordinates }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCSBI1qxePUu4jLU2HpwCYy4grV4b4m0BM' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margins={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    console.log(e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={''}
            >

            </GoogleMapReact>
        </div>
    );
}

export default Map;