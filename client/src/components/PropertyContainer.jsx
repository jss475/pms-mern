import React, { useState, useEffect, createRef, useContext } from 'react';
import { UnsplashContext } from '../context/UnsplashContext';
import PropertyModal from './PropertyModal';
import { useTheme } from '@mui/material/styles';
import PropertyCard from './PropertyCard';
import { properties } from './Test';
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import '../css/MapContainer.css'

function PropertyContainer(){

    const theme = useTheme();
    ////////////////////////////////////////// RETRIEVING PROPERTY DATA //////////////////////////////////////////
    //create state to hold all properties from the fetch data
    const [allProperties, setAllProperties] = useState([])

    //fetch properties from Real Estate API
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4ddd0be7d8msh949592b8a33ff6fp1e9b63jsnde4243fb7c94',
            'X-RapidAPI-Host': 'real-estate12.p.rapidapi.com'
        }
    };
    
    //Need to update fetch link at times, but let's go with Boston for now

    
    // useEffect(()=>{
    //     fetch('https://real-estate12.p.rapidapi.com/listings/rent?state=MA&city=Boston&page=1&sort=newest&beds=1&baths=1&price_h=20000', options)
    //         .then(response => response.json())
    //         .then(response => setAllProperties(response.properties))
    //         .catch(err => console.error(err));
    // },[])

    useEffect(() => {
        setAllProperties(properties.slice(0,30))
    },[])
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////  CREATING MAPS     /////////////////////////////////////////////////////////////
    //create state to take in the lat and long of the address
    const [latlong, setLatlong] = useState({lat: 42.3600825, lng: -71.0588801})

    //geocoder API call
    useEffect(() => {
        const data = async () => {
            // if(address){
            //     let added_plus = address.split(' ').join('+')
            //     let req = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${added_plus}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);

            //     if (req.ok){
            //         let res = await req.json()
            //         if(res){
            //             setLatlong(res.results[0].geometry.location)
            //         }
                    
            //     }
            // }
            let added_plus = 'Boston+MA'
            let req = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${added_plus}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_API_KEY}`);
            if (req.ok){
                let res = await req.json()
                if(res){
                    // console.log(res)
                    setLatlong(res.results[0].geometry.location)
                }
            }
        } 

       data()
    },[])
    ////////////////////////////////////////////////// RETRIEVING UNSPLASH PHOTOS //////////////////////////////////////////////////
    const allPhotos = useContext(UnsplashContext)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////// MARKER INFO WINDOWS //////////////////////////////////////////////////////////////////

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };

    
    //////////////////////////////////////////////////// SCROLL TO CORRECT PROPERTYCARD/////////////////////////////////////////////////


    const refArray =[...Array(30).keys()]
    
    const [clickedCardIds, setClickedCardIds] = useState(refArray)

    const refs = refArray.reduce((acc,value) => {
        acc[value] = createRef();
        return acc
    },[])

    const executeScroll = (index) => {
        setClickedCardIds(refArray.filter(id => id === index))
    }
   
    useEffect(() => {
        if(clickedCardIds.length > 0 && (clickedCardIds.length < refArray.length)){
            //scroll to highest unclickedCardId
            const highestId = clickedCardIds[0]
            refs[highestId].current.scrollIntoView({ 
            block: "center",
            inline: "start"})
        }
    },[executeScroll])
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    return (
        <Stack direction="column" sx={{maxHeight: '100%', backgroundColor: theme.palette.main}}>
            <Box>
                <h1>Filter</h1>
            </Box>
            <Stack direction='row'>
                <Box sx={{
                    width: '60%',
                    height: '100%'
                
                }}>
                    <GoogleMap zoom={12} center={{lat: latlong.lat, lng: latlong.lng}} mapContainerClassName="map-container">
                        {allProperties.map((property, index)=> {
                            return <MarkerF key={property.property_id} 
                                position={{lat: property.location.address.coordinate.lat, lng: property.location.address.coordinate.lon}} 
                                onClick={() => {handleActiveMarker(property.property_id); executeScroll(index)}} >
                                        {activeMarker === property.property_id ? (
                                            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                                <PropertyModal property={property} primaryPhoto={allPhotos[index]}/>
                                            </InfoWindowF>
                                        ) : null}
                                    </MarkerF>
                        })}
                    </GoogleMap>
                </Box>
                <Stack direction = "column" 
                    sx={{overflowY:'auto', overflowX:'hidden', width: "40%", 
                        height: "100%", maxHeight: "100vh", marginLeft: "1%", marginRight: "1%",}}>
                    {allProperties.map((property,index) => {
                            return <PropertyCard ref={refs[index]} key={property.property_id} property={property} primary_photo={allPhotos[index]}/>
                        }
                    )}
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PropertyContainer;

    //create unsplash link
    //  const unsplash = createApi({
    //     accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
    //  });

    // const [allPhotos, setAllPhotos] = useState([])

    // useEffect(()=> {
    //     unsplash.search.getPhotos({
    //         query: 'apartment interior',
    //         page: 2,
    //         perPage: 30,
    //         orientation: 'landscape',
    //     }).then(result => {
    //         if (result.errors) {
    //         // handle error here
    //         console.log('error occurred: ', result.errors[0]);
    //         } else {
    //             // handle success here
    //             let photosArr = []
    //             const fetchPhotos = result.response;
    //             fetchPhotos.results.forEach(photo => {
    //                 photosArr.push(photo.urls.raw)
    //             })
    //             setAllPhotos(photosArr)
    //         }
    //     })
    // },[])