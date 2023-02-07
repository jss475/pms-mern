import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import RequestLeaseModal from './RequestLeaseModal';

function ContactProperty({phoneNumber, office, propertyDetails}){

    let officeName
    if(office){
        officeName = office.name
    }
   
    return (
        <Box sx={{ border: 1, borderColor: "lightgrey", minHeight: "150px", position: "sticky", top: "20px"}}>
            <Stack direction="column" sx={{height: "100%", justifyContent: "center"}}>
                <Typography  sx={{textAlign: "center", fontSize: "24px", marginBottom: "10px"}}>Contact This Property</Typography>
                <Stack direction="row" sx={{justifyContent: "center", marginBottom: "10px"}}>
                    <PhoneIphoneIcon/>
                    <Typography sx={{color: "blue"}}>{phoneNumber}</Typography>
                </Stack>
                <RequestLeaseModal propertyDetails={propertyDetails}/>
            </Stack>
        </Box>
    )
}

export default ContactProperty;