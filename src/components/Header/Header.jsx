import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { alpha, AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from "@mui/material/styles";

const ToolbarStyled = styled(Toolbar)({
    display: 'flex', justifyContent: 'space-between',
});

const Title = styled(Typography)(({ theme }) => ({
    display: 'none', 
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
}));

const SearchDiv = styled("div")(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const SearchIconDiv = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1), 
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        margin: theme.spacing(0, 0, 0, 4),
        transition: theme.transitions.create('width'), 
        width: '100%', 
        [theme.breakpoints.up('md')]: { width: '20ch' },
    },
}));

const Header = ({ onPlaceChanged, onLoad }) => {
    return (
        <AppBar position="static">
            <ToolbarStyled>
                <Title variant="h5">
                    Travel Advisor
                </Title>
                <Box display="flex">
                    <Title variant="h6">
                        Explore new places
                    </Title>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <SearchDiv>
                            <SearchIconDiv>
                                <SearchIcon />
                            </SearchIconDiv>
                            <StyledInputBase placeholder="Search ... " />
                        </SearchDiv>
                    </Autocomplete>
                </Box>
            </ToolbarStyled>
        </AppBar>
    );
}

export default Header;