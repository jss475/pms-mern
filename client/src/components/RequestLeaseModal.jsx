import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


function RequestLeaseModal({propertyDetails}){
    
    const theme = useTheme();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #000',
        backgroundColor: "white",
        p: 4,
        textAlign: 'center',
    };

    const [dateRequested, setDateRequested] = useState(new Date());
    const currentDate = new Date();
    const currentDateString = currentDate.getUTCFullYear() +"/"+ (currentDate.getUTCMonth()+1) + "/" + (currentDate.getUTCDate()+7);

    const handleChange = (newValue) => {
        setDateRequested(newValue);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const jwtToken = useSelector(state => state.jwtToken.jwtToken);
    const [errorMsg, setErrorMsg] = useState("")
    function requestLeaseOnClick(){
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify({
                propertyDetails: propertyDetails,
                leaseStartDate: dateRequested
            })
        }
        fetch('/lease/send-app', configObj)
        .then(res => res.json())
        .then(data => {
            if(data.message){
                setErrorMsg("Please log in first!")
            }else{
                console.log(data)
            }
        })

    }

    return (
        <> 
            <Card sx={{width: '40%', display: 'flex', marginLeft: "auto", marginRight: "auto",
                marginBottom: "15px", backgroundColor: theme.palette.background, justifyContent: "center" }}>
                <Button onClick={handleOpen} sx={{color: "white"}}>Request Lease</Button>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{color: "red"}}>{errorMsg}</Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Request a Lease
                    </Typography>
                    <Typography variant="p" sx={{height: "100%", width: "100%", marginBottom: "15px"}}>
                        Desired Start Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{backgroundColor: "white"}}>
                        <DesktopDatePicker
                            label="Choose a lease start date"
                            inputFormat="MM/DD/YYYY"
                            value={dateRequested}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} sx={{marginTop: "15px"}}/>}
                            disablePast = {true}
                            maxDate = {currentDateString}
                            
                            
                        />
                    </LocalizationProvider>
                    <Button onClick={requestLeaseOnClick} sx={{marginTop: "10px", backgroundColor: theme.palette.background, color: "white", ':hover': {backgroundColor: theme.palette.background}}}>Submit Request</Button>
                </Box>
            </Modal>
        </>
    )
}

export default RequestLeaseModal;