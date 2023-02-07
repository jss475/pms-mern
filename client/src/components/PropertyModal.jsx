import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';

function PropertyModal({property,primaryPhoto}){
    
    const theme = useTheme();

    //destructure the property object
    const {list_price, location, description, advertisers} = property
    const { line, city, state_code, postal_code } = location.address
    const { beds, baths,} = description
    const {phones} = advertisers[0]
    let phoneNumber
    if(phones){
        phoneNumber = phones[0].number
        if(phoneNumber.length === 10){
            phoneNumber = "(" + phoneNumber.substring(0,3) + ") " + phoneNumber.substring(3,6) +"-" + phoneNumber.substring(6,11)
        }
    }

    return (
        <Card sx={{width: '100%', display: 'flex', 
             backgroundColor: theme.palette.cardBg, color: "white", }}>
            <Stack direction="column" sx={{width: "100%", minHeight: "100%", display: "flex", }}>
                <Box sx={{width: "100%", borderBottom: 2}}>
                    <Box component="h2" fontWeight="800" sx={{marginBottom:"0px", marginTop:"2.5%", marginLeft: "5%"}}>
                        {line}
                    </Box>
                    <Box component="h4" sx={{marginTop: "0px", marginBottom:"0px", width: "99%", marginLeft: "5%"}}>
                        {line} {city}, {state_code} {postal_code}
                    </Box>
                </Box>
            
                <Stack direction="row" sx={{width: "100%", height: "100%"}}>
                    <CardMedia
                        component="img"
                        alt="property photo"
                        image={primaryPhoto}
                        sx={{
                            height:"70%", maxHeight: "180px", marginLeft: "5%", marginRight: "5%", marginTop: "auto",
                            marginBottom: "auto", width: "50%"
                        }}
                    />
                    <Stack direction = "column" sx={{width: "50%"}}>
                        {/* <Typography variant="h5" sx={{marginTop: "5%"}}>
                            {line}
                        </Typography> */}
                        <Typography variant="h5" sx={{marginTop: "5%"}}>
                            ${list_price}
                        </Typography>
                        <Stack direction = "row">
                            <Typography variant="h6">
                                {beds} {beds > 1 ? "Beds" : "Bed"}
                            </Typography>
                            <Typography variant="h6" sx={{marginLeft: "5%"}}>
                                {baths} {baths > 1 ? "Baths" : "Bath"}
                            </Typography>
                        </Stack>
                        <Box sx={{flexGrow: 1}}/>
                        <Typography variant="h5" sx={{marginBottom: "5%"}}>
                            {phoneNumber}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}

export default PropertyModal;