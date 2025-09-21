import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';
import Rating from '@mui/material';
import { styled } from '@mui/styles';

const ChipStyled = styled(Chip)({
    margin: '5px 5px 5px 0',
});

const TypoSubtitle = styled(Typography)({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
});

const TypoSpacing = styled(Typography)({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
});

const PlaceDetails = ({ place }) => {
    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                    <ChipStyled key={name} size="small" label={name} />
                ))}
                {place?.address && (
                    <TypoSubtitle gutterBottom variant="subtitle2" color="textSecondary">
                        <LocationOn /> {place.address}
                    </TypoSubtitle>
                )}
                {place?.phone && (
                    <TypoSpacing gutterBottom variant="subtitle2" color="textSecondary">
                        <Phone /> {place.phone}
                    </TypoSpacing>
                )}
                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;