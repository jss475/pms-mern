import React, { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useNavigate } from 'react-router-dom';
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


export default function TenantLogin(props) {

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
    const handleClickOpenSignUp = () => {
        props.setOpenLogin(false);
        props.setOpenSignUp(true);
    };

    const handleClose = () => {
        props.setOpenLogin(false);
    };

    //stop Tab key causing dialog to be closed
    const stopPropagationForTab = (event) => {
        if (event.key === "Tab") {
            event.stopPropagation();
        }
    };

    //handle form submit
    const dispatch = useDispatch();
    
    const handleLogin = (data) => {
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }
        fetch('/tenants/login', configObj)
            .then(res => res.json())
            .then(data => {
                if(data.token){
                    dispatch(setToken(data.token));
                    // navigate("/tenants/my-page");
                }
                
            })
    };

    return (
        <Dialog open={props.openLogin} onClose={handleClose} onKeyDown={stopPropagationForTab} >
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
                <DialogTitle sx={{textAlign: "center", paddingTop:"0px", paddingBottom:"0px"}}>Sign into your account</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{textAlign: "center", paddingBottom: "20px"}}>
                        Or, <CssLink component="button" onClick={()=>{handleClickOpenSignUp()}}>create an account</CssLink>
                    </DialogContentText>
                    <FormContainer
                        defaultValues={{}}
                        onSuccess={data => handleLogin(data)}
                    >
                        <Stack direction="column">
                            <CssTextField name={'email'} label={'Email'} required type={'email'}/>
                            <CssTextField name={'password'} label={'Password'} required type={'password'}/>
                            <DialogActions sx={{justifyContent: "center"}}>
                                <Button type={'submit'} onClick={handleClose} sx={{width: "95%", backgroundColor: theme.palette.cardBg, color: "white"}}>Sign In</Button>
                            </DialogActions>
                        </Stack>
                    </FormContainer>
                    <DialogContentText sx={{textAlign:"right"}}>
                        <CssLink href='#'>Forgot your password?</CssLink>
                    </DialogContentText>
                </DialogContent>
            </Box>
        </Dialog>
  );
}

{/* <Typography variant="p">
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
    {...register("email")}
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
    {...register("password")}
    sx={{color: theme.palette.cardBg}}
/> */}