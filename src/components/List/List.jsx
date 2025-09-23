import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { styled } from "@mui/material/styles";

import PlaceDetails from '../PlaceDetails/PlaceDetails'

import useStyles from './styles';

const Container = styled("div")(({ theme }) => ({
    padding: '25px',
}));

const Loading = styled("div")(({ theme }) => ({
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
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

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());

        setElRefs(refs);
    }, [places]);

    return (
        <Container>
            <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
            {isLoading ? (
                <Loading>
                    <CircularProgress size="5rem" />
                </Loading>
            ) : (
                <>
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
                                <PlaceDetails 
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]} />
                            </Grid>
                        ))}
                    </GridList>
                </>
            )}
        </Container>
    );
}

export default List;