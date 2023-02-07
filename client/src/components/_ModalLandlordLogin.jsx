import React, { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LandlordSignup from './LandlordSignup';

export default function ModalLandlordLogin(props) {
    //import theme
    const theme = useTheme();

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: theme.palette.cardBg,
            },
            '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: theme.palette.subHeadline,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.cardBg,
            },
            },    
    })

    const CssLink = styled(Link)({
        textDecoration: "none"
    })

    //set modal open and close
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log("true")
       setOpen(true);
    };

    const handleCloseModal = () => {
        console.log("hello")
       setOpen(false);
    };

    //stop Tab key causing dialog to be closed
    const stopPropagationForTab = (event) => {
        if (event.key === "Tab") {
            event.stopPropagation();
        }
    };

    return (
        <>
            <CssLink component="button"  onClick={()=>{
                handleClickOpen();}}>
                sign into your account
            </CssLink>
            <Dialog open={open} onClose={handleCloseModal} onKeyDown={stopPropagationForTab} >
                <Box sx={{backgroundColor: "white"}}>
                    <Box sx={{textAlign: "right"}}>
                        <IconButton
                        color="inherit"
                        onClick={handleCloseModal}
                        aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogTitle sx={{textAlign: "center", paddingTop:"0px", paddingBottom:"0px"}}>Sign into your account</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{textAlign: "center", paddingBottom: "20px"}}>
                            Or, <CssLink component="button">create an account</CssLink>
                        </DialogContentText>
                        <Typography variant="p">
                            Email Address
                        </Typography>
                        <CssTextField
                            autoFocus
                            required
                            margin="dense"
                            id="email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            sx={{color: theme.palette.cardBg}}
                        />
                        <Typography variant="p">
                            Password
                        </Typography>
                        <CssTextField
                            autoFocus
                            required
                            margin="dense"
                            id="password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            sx={{color: theme.palette.cardBg}}
                        />
                        <DialogContentText sx={{textAlign:"right"}}>
                            <CssLink href='#'>Forgot your password?</CssLink>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{justifyContent: "center"}}>
                        <Button onClick={handleCloseModal} sx={{width: "95%", backgroundColor: theme.palette.cardBg, color: "white"}}>Sign In</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
  );
}