import React from 'react';

import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Image from 'mui-image';
import AptInterior from '../assets/apartment-interior.jpg'
import ComputerType from '../assets/computer-type.jpg'
import Kitchen from '../assets/people-in-kitchen.jpg'
import Phone from '../assets/phone.jpg'
import AptBuilding from '../assets/apartment-building.jpg'
import Keys from '../assets/keys.jpg'
import Typing from '../assets/typing.jpg'

function Home(){

    const theme = useTheme();

    const homeStyle = {
        backgroundImage: `url(${AptInterior}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
        backgroundPosition: "50% 65%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        height: "20.125rem",
        backgroundBlendMode: "overlay",
    }

    const homeWrapper = {
        paddingBottom: "0",
        overflowX: "hidden",
        backgroundColor: theme.palette.background
    }

    const HomeContainer = styled(Box)({
        width: "90%",
        margin: "auto",
        display: "block",
        boxSizing: "inherit",
        textAlign: "center",
        marginTop: "1.75rem",
    })

    const HomeWidget = styled(Stack)({
        position: "relative",
        display: "flex",
        boxSizing: "inherit",
        flexDirection: "row",
    })

    const HomeWidgetImg= styled(Box)({
        paddingTop: "22.893915757%",
        width: "50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center"
    })

    const HomeWidgetBody = styled(Box)({
        position: "relative",
        // paddingTop: "22.893915757%",
        width: "50%",
        backgroundColor: theme.palette.cardBg,
        color: "white"
    })

    const HomeWidgetContent = styled(Box)({
        // position: "absolute",
        // left: "12.5%",
        // right: "12.5%",
        // top: "50%",
        // transform: "translateY(-50%)"
        position: "relative",
        // height: "100%",
        // width: "90%",
        marginLeft: "12.5%",
        marginRight: "12.5%",
        textAlign: "center",
        transform: "translateY(-50%)",
        top: "50%"
    })

    return (
        <div style={homeWrapper}>
            <Box style={homeStyle} >
                <Stack direction="column" 
                    sx={{
                        zIndex: "15",
                        top: "50%",
                        position: "relative",
                        textAlign: "center",
                        transform: "translateY(-50%)",
                        maxWidth: "1920px",
                        margin: "auto",
                        display: "block",
                        color: "white",
                    }}
                >
                    <Typography variant="h2"
                    >
                        Discover your New Home
                    </Typography>
                    <Typography variant="p">
                        Helping tenants and landlords alike find their perfect fit.
                    </Typography>
                </Stack>
            </Box>
            <HomeContainer>
                <Typography variant="h3">
                    The Most Rental Listings
                </Typography>
                <Typography variant="p">
                    Choose from over 1 million apartments, houses, condos, and townhomes for rent.
                </Typography>
                <HomeWidget sx={{marginTop: "1.75rem"}}>
                    <HomeWidgetBody>
                        <HomeWidgetContent>
                            <Typography variant="h3">
                                Renting Made Simple
                            </Typography>
                            <Typography variant="p" sx={{textAlign: "left"}}>
                                Come browse the highest quality listings, apply online, sign your lease, and pay your rent from any device.
                            </Typography>
                        </HomeWidgetContent>
                    </HomeWidgetBody>
                    <HomeWidgetImg  sx={{backgroundImage: `url(${ComputerType})`}} />
                </HomeWidget>
                <HomeWidget>
                    <HomeWidgetImg sx={{backgroundImage: `url(${Kitchen})`}} />
                    <HomeWidgetBody>
                        <HomeWidgetContent>
                            <Typography variant="h3">
                                Tips for Renters
                            </Typography>
                            <Typography variant="p" sx={{textAlign: "right"}}>
                                Find the answer to all your renting questions with the best property management system.
                            </Typography>
                        </HomeWidgetContent>
                    </HomeWidgetBody>
                </HomeWidget>
                <HomeWidget>
                    <HomeWidgetBody>
                        <HomeWidgetContent>
                            <Typography variant="h3">
                                Take Us With You
                            </Typography>
                            <Typography variant="p" sx={{textAlign: "left"}}>
                                Coming Soon: Keep Keystone Management in the palm of you hand.
                            </Typography>
                        </HomeWidgetContent>
                    </HomeWidgetBody>
                    <HomeWidgetImg sx={{backgroundImage: `url(${Phone})`}} />
                </HomeWidget>
            </HomeContainer>

            <HomeContainer>
                <Typography variant="h3">
                    The Perfect Place to Manage Your Property
                </Typography>
                <Typography variant="p">
                    Work with the best poroperty management tool on the market.
                </Typography>
                <HomeWidget  sx={{marginTop: "1.75rem"}}>
                    <HomeWidgetBody>
                        <HomeWidgetContent>
                            <Typography variant="h3">
                                Control Your Rental
                            </Typography>
                            <Typography variant="p" sx={{textAlign: "left"}}>
                                Keep up to date on what is happening with your rentals at any time.
                            </Typography>
                        </HomeWidgetContent>
                    </HomeWidgetBody>
                    <HomeWidgetImg sx={{backgroundImage: `url(${AptBuilding})`}} />
                </HomeWidget>
                <HomeWidget>
                    <HomeWidgetImg sx={{backgroundImage: `url(${Keys})`}} />
                    <HomeWidgetBody>
                        <HomeWidgetContent>
                            <Typography variant="h3">
                                Lease 100% Online
                            </Typography>
                            <Typography variant="p" sx={{textAlign: "right"}}>
                                You can process rent payments, communicate, and more on a single platform.
                            </Typography>
                        </HomeWidgetContent>
                    </HomeWidgetBody>
                </HomeWidget>
                <HomeWidget>
                    <HomeWidgetBody>
                        <HomeWidgetContent>
                            <Typography variant="h3">
                                Property Manager Resources
                            </Typography>
                            <Typography variant="p" sx={{textAlign: "left"}}>
                                Coming Soon: Stay up-to-date using our tips and guides on rent payments, leasing, management solutions, and more.
                            </Typography>
                        </HomeWidgetContent>
                    </HomeWidgetBody>
                    <HomeWidgetImg sx={{backgroundImage: `url(${Typing})`}} />
                </HomeWidget>
            </HomeContainer>

            <Box sx={{padding: "2.375rem 0", textAlign: "center"}}>
                <Typography variant="p">
                    Search over 1 million listings including apartments, houses, condos, and townhomes available for rent. You'll find your next home!
                </Typography>
            </Box>
        </div>
    )
}

export default Home;