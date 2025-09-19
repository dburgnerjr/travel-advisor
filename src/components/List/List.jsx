import React, { useState } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { styled } from "@mui/material/styles";

import PlaceDetails from '../PlaceDetails/PlaceDetails'

import useStyles from './styles';

const Container = styled("div")(({ theme }) => ({
    padding: '25px',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px',
}));

const GridList = styled(Grid)(({ theme }) => ({
    height: '75vh', 
    overflow: 'auto',
}));

const List = () => {
    const classes = useStyles();
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    const places = [
        { name: 'Cool Place' },
        { name: 'Best Beer' },
        { name: 'Best Steak' },
        { name: 'Cool Place' },
        { name: 'Best Beer' },
        { name: 'Best Steak' },
        { name: 'Cool Place' },
        { name: 'Best Beer' },
        { name: 'Best Steak' },
    ];

    return (
        <Container>
            <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
            <StyledFormControl>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </StyledFormControl>
            <StyledFormControl>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </StyledFormControl>
            <GridList container spacing={3}>
                {places?.map((place, i) => (
                    <Grid key={i} size={{ xs: 12 }}>
                        <PlaceDetails place={place} />
                    </Grid>
                ))}
            </GridList>
        </Container>
    );
}

export default List;