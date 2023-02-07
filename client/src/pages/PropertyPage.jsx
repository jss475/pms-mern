import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { properties } from '../components/Test';
import { UnsplashContext } from '../context/UnsplashContext';
import { createApi } from 'unsplash-js';
import { styled } from '@mui/system';
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import ContactProperty from '../components/ContactProperty';
import Carousel from 'react-material-ui-carousel'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import '../css/MapContainer.css'


function PropertyPage(){

    //styling
    const RightBorderCell = styled(TableCell)({
        borderRight: "1px solid",
        textAlign: "center",
        borderColor: "lightgrey"
    })

    const CellTitle = styled(Typography)({
        fontSize: "15px",
    })

    const CellBody = styled(Typography)({
        fontSize: "17px",
        fontWeight: "bold"
    })

    const DetailsTitle = styled(Typography)({
        fontSize: "30px",
        fontWeight: "normal",
        marginTop: "35px", marginBottom: "25px"
    })


    const allPhotos = useContext(UnsplashContext)

    //get the property id from the pathname
    const {pathname} = useLocation();
    let property_id
    if(pathname){
        const splitName = pathname.split('/')
        property_id = splitName[2].split('-')[0]
    }

    //get the property info from the test "database"
    const [propertyInfo, setPropertyInfo] = useState({})
    const [pagePhotos, setPagePhotos] = useState([])

    const unsplash = createApi({
        accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
    });

    useEffect(()=> {
        properties.forEach((property, index) => {
            if(property.property_id === property_id){      
                setPropertyInfo(property)

                //get 5 photos from unsplash to fill in the blanks
                unsplash.search.getPhotos({
                    query: 'apartment interior',
                    page: index,
                    perPage: 14,
                    orientation: 'landscape',
                }).then(result => {
                    if (result.errors) {
                    // handle error here
                    console.log('error occurred: ', result.errors[0]);
                    } else {
                        // handle success here
                        let photosArr = []
                        const fetchPhotos = result.response;
                        photosArr.push(allPhotos[index])
                        fetchPhotos.results.forEach(photo => {
                            photosArr.push(photo.urls.raw)
                        })
                        setPagePhotos(photosArr)
                    }
                })
            }
        })
    },[])

    //carousel but with 5 items per slide
    let items = []
    if(pagePhotos){
        let start = 0
        let end = 5
        for(let i = 0; i < Math.ceil(pagePhotos.length/5); i++){
            let quiltPhotos = [...pagePhotos].slice(start,end)
            items.push(
                <ImageList
                    sx={{ width: "auto", height: 450, overflow: "auto" }}
                    variant="quilted"
                    cols={4}
                    rows={2}
                    rowHeight={225}
                    key={uuidv4()}
                    >
                    {quiltPhotos.map((item,index) => {    
                        let cols, rows            
                        if(index === 0){
                            cols = 2; rows = 2;
                        };
                        return <ImageListItem key={uuidv4()} cols={cols || 1} rows={rows || 1}>
                            <img
                                src={item}
                                alt= "property"
                                loading="lazy"
                            />
                        </ImageListItem>
                    })}
                </ImageList>
            )
            start+=5
            end += 5
        }
    }

    //initialize all the properties of property
    let list_price, location, description, advertisers, line, city, coordinate, country, state_code, postal_code, beds,
    baths, baths_full, sqft, type, office, phones, phoneNumber, propertyDetails;
    //wait for propertyInfo to be updated to initialize values for all the properties
    const [coord, setCoord] = useState({lat: 0, lon: 0})

    if(Object.keys(propertyInfo).length > 0){
        ({list_price, location, description, advertisers} = propertyInfo)
        if(location){ ({ line, city, coordinate, country, state_code, postal_code } = location.address) }
        
        if(description){ ({ beds, baths, baths_full, sqft, type} = description) }
        if(advertisers){ ({office, phones} = advertisers[0]) }
       
        //if phones does not exist check the office
        if(!phones && office){
            phoneNumber = office.phones[0].number
        }else{
            phoneNumber = phones[0].number
        }
        //refactor phonenumber to have (123) 123 - 123 format
        if(phoneNumber.length === 10){
            phoneNumber = "(" + phoneNumber.substring(0,3) + ") " + phoneNumber.substring(3,6) +"-" + phoneNumber.substring(6,11)
        }
        propertyDetails = {
            name: line,
            streetAddress: line,
            aptNumber: "",
            city: city,
            state: state_code,
            zipCode: postal_code,
            bedroomCount: beds,
            bathroomCount: baths,
            rentalAmount: list_price,
            propertySize: sqft,
        }
    }

    useEffect(()=>{
        if(coordinate){
            setCoord(coordinate)
        }
    },[propertyInfo])
    
    return (
        <Stack direction="column" sx={{display:"flex"}}>
            <Carousel 
                autoPlay={false}
                navButtonsAlwaysVisible={true}
            >
                {items}
            </Carousel>
            <Stack direction="row" sx={{marginLeft: "5%", marginRight: "calc(5% - 25px)", marginTop: "20px"}}>
                <Stack direction="column" sx={{width: "70%"}}>
                    <Typography variant="h3">
                        {line}
                    </Typography>
                    <Typography variant="h6">
                        {line}, {city}, {state_code} {postal_code}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 550, border: 1, marginTop: "20px", borderColor: "lightgrey" }} >
                            <TableBody>
                                <TableRow>
                                    <RightBorderCell>
                                        <CellTitle>Monthly Rent</CellTitle><CellBody>${list_price}</CellBody>
                                    </RightBorderCell>
                                    <RightBorderCell>
                                        <CellTitle>Bedrooms</CellTitle><CellBody>{beds} bd</CellBody>
                                    </RightBorderCell>
                                    <RightBorderCell>
                                        <CellTitle>Bathrooms</CellTitle><CellBody>{baths} ba</CellBody>
                                    </RightBorderCell>
                                    <TableCell align="center">
                                        <CellTitle>Square Feet</CellTitle><CellBody>{sqft} sq ft</CellBody>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <DetailsTitle>About This Property</DetailsTitle>
                    <Typography variant="p">
                        Located in the Clam Point neighborhood. This large 2 bedroom/2 full bath unit offers many high-end luxury finishes throughout; recessed LED lighting, white oak flooring, walk-through closet in master, Nest thermostat, radiant heat in master bath, 4-zone built-in Russound Bluetooth speakers throughout. Open concept kitchen/living/dining features 14-foot ceilings, European frameless cabinets, Bosch stainless appliances, quartz countertops, tile backsplash, and expansive walnut counter-top. Other features are; a gas fireplace, building security/fire suppression systems, a private balcony, a tankless Navien water heater, highly energy-efficient Hunter Douglas Duette HoneyComb motorized shades, and a bonus room. The building features a fenced yard, in-ground irrigation, a generous storage area, heated garage parking available for an additional $200/month, a gym, and handicap accessibility. Available now for 12+ month lease.
                    </Typography>
                    <DetailsTitle>Location</DetailsTitle>
                    <Box sx={{height: "450px", marginBottom: "25px"}}>
                        <GoogleMap zoom={16} center={{lat: coord.lat, lng: coord.lon}} mapContainerClassName="map-container" id="map-prop-page">
                                <MarkerF position={{lat: coord.lat, lng: coord.lon}}>
                                </MarkerF>
                        </GoogleMap>
                    </Box>
                </Stack>
                <Stack direction="column" sx={{width: "30%", marginLeft: "25px", marginRight:"25px", minHeight: '200px',}}>
                    <ContactProperty phoneNumber={phoneNumber} office={office} propertyDetails={propertyDetails} />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PropertyPage;

//////////////////////////////// IF API EVER WORKS //////////////////////////////////
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '4ddd0be7d8msh949592b8a33ff6fp1e9b63jsnde4243fb7c94',
//         'X-RapidAPI-Host': 'real-estate12.p.rapidapi.com'
//     }
// };

// useEffect(()=> {

//     console.log(`https://real-estate12.p.rapidapi.com/listings-details?property_id=${property_id}`)
//     fetch(`https://real-estate12.p.rapidapi.com/listings-details?property_id=${property_id}`, options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
// },[])
