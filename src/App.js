import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import { getPlacesData, /* getWeatherData */ } from './api'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  //const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  
  const [autocomplete, setAutoComplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) => {
        setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
      if(bounds.sw && bounds.ne) {
        setIsLoading(true);

        // getWeatherData(coordinates.lat, coordinates.lng)
        //   .then((data) => setWeatherData(data));

        getPlacesData(type, bounds.sw, bounds.ne)
          .then((data) => {
            console.log(data);
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
          });
      }
  }, [type, bounds]);

  const onLoad = (autoC) => setAutoComplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <List 
              isLoading={isLoading}
              places={filteredPlaces.length ? filteredPlaces : places} 
              childClicked={childClicked}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Map
              setChildClicked={setChildClicked}
              setBounds={setBounds}
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places} 
              // weatherData={weatherData}
            />
          </Grid>
      </Grid>
    </>
  )
}

export default App;