import React, { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {FormContainer, TextFieldElement } from 'react-hook-form-mui'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import { useDispatch } from "react-redux";
import { setToken } from "../features/jwt_token/jwtTokenSlice";

export default function TenantSignup(props) {

    //import theme
    const theme = useTheme();

    const CssTextField = styled(TextFieldElement)({
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
        marginBottom: "10px"    
    })

    const CssLink = styled(Link)({
        textDecoration: "none"
    })

    //set modal open and close
    const handleClickOpenLogin = () => {
        props.setOpenSignUp(false);
        props.setOpenLogin(true);
    };

    const handleClose = () => {
        props.setOpenSignUp(false);
    };

    //stop Tab key causing dialog to be closed
    const stopPropagationForTab = (event) => {
        if (event.key === "Tab") {
          event.stopPropagation();
        }
    };

    //handle form submit
    const dispatch = useDispatch();
    const handleSignUp = (data) => {
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName
            })
        }
        fetch('/tenants/signup', configObj)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch(setToken(data.token))
            }
        )
    };

    return (
        <Dialog open={props.openSignUp} onKeyDown={stopPropagationForTab} onClose={handleClose} >
            <Box sx={{backgroundColor: "white"}}>
                <Box sx={{textAlign: "right"}}>
                    <IconButton
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogTitle sx={{textAlign: "center", paddingTop:"0px", paddingBottom:"0px"}}>Create an account</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{textAlign: "center", paddingBottom:"20px"}}>
                        Or, <CssLink component="button" onClick={()=>{handleClickOpenLogin()}}>sign into your account</CssLink>
                    </DialogContentText>
                    <FormContainer
                        defaultValues={{}}
                        onSuccess={data => handleSignUp(data)}
                    >
                        <Stack direction="column">
                            <CssTextField name={'firstName'} label={'First Name'} required type={'text'}/>
                            <CssTextField name={'lastName'} label={'Last Name'} required type={'text'}/>
                            <CssTextField name={'email'} label={'Email'} required type={'email'}/>
                            <CssTextField name={'password'} label={'Password'} required type={'password'}/>
                            <DialogActions sx={{justifyContent: "center"}}>
                                <Button type={'submit'} onClick={handleClose} sx={{width: "95%", backgroundColor: theme.palette.cardBg, color: "white"}}>Sign Up</Button>
                            </DialogActions>
                        </Stack>
                    </FormContainer>
                </DialogContent>
            </Box>
        </Dialog>
  );
}

{/* <Stack direction="row" sx={{gap: "10px"}}>
    <Stack direction="column" sx={{width:"50%"}}>
        <Typography variant="p">
            First Name
        </Typography>
        <CssTextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            type="text"
            fullWidth
            variant="outlined"
            sx={{color: theme.palette.cardBg}}
        />
    </Stack>
    <Stack direction="column" sx={{ width:"50%"}}>
        <Typography variant="p">
            Last Name
        </Typography>
        <CssTextField
            autoFocus
            required
            margin="dense"
            id="lastName"
            type="text"
            fullWidth
            variant="outlined"
            sx={{color: theme.palette.cardBg}}
        />
    </Stack>
</Stack> */}
{/* 
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
/> */}
{/* <DialogActions sx={{justifyContent: "center"}}>
    <Button onClick={handleClose} sx={{width: "95%", backgroundColor: theme.palette.cardBg, color: "white"}}>Sign Up</Button>
</DialogActions> */}