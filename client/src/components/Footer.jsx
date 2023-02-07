import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme, styled } from '@mui/material/styles';


function Footer(){

    const theme = useTheme();

    const StyledFooterContainer = styled(Grid)({
        display: "flex",
        justifyContent: "space-around",
        alignItems: "space-around",
        justifyItems: "space-around",
        color: "white",
        padding: 3,
        minWidth: '100%',
        backgroundColor: theme.palette.background,
        overflow: "hidden",
    })

    const FooterButton = styled(Button)({
        fontSize: '12px',
        padding: '0px',
    })

    return (
        <StyledFooterContainer container>
            {/* social links */}
            <Grid item xs={12} md={4} mt={5} sx={{backgroundColor: theme.palette.background, marginTop: "0px"}}>
                <Box sx={{ display: "block", alignContent: "center"}}>
                    <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Grid item >
                            <IconButton aria-label='facebook' >
                                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                    <FacebookIcon sx={{ color: "white" }} fontSize='large' />
                                </a>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label='instagram' >
                                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                                    <InstagramIcon sx={{ color: "white" }} fontSize='large' />
                                </a>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label='twitter'>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                    <TwitterIcon sx={{ color: "white" }} fontSize='large' />
                                </a>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label='github' >
                                <a href="https://github.com" target="_blank" rel="noreferrer">
                                    <GitHubIcon sx={{ color: "white" }} fontSize='large' />
                                </a>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label='linked-in'>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                                    <LinkedInIcon sx={{ color: "white" }} fontSize='large' />
                                </a>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>

            {/* Link Tree */}
            <Grid item xs={12} md={3} mb={2}>
                <Box sx={{ display: "block", alignContent: "center", mt: 2 }}>
                    <Stack >
                        <FooterButton
                            component={Link}
                            to='/'
                            sx={{ color: "white" }}
                        >
                            Home
                        </FooterButton>
                        <FooterButton
                            component={Link}
                            to='/about'
                            sx={{ color: "white" }}
                        >
                            About
                        </FooterButton>
                        <FooterButton
                            component={Link}
                            to='/directory'
                            sx={{ color: "white" }}
                        >
                            Manage Rentals
                        </FooterButton>
                        <FooterButton
                            component={Link}
                            href='/contact-us'
                            sx={{ color: "white" }}
                        >
                            Contact Us
                        </FooterButton>
                    </Stack>
                </Box>
            </Grid>
        </StyledFooterContainer>
    )

}

export default Footer;