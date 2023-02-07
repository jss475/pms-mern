import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../features/jwt_token/jwtTokenSlice";
import { openModal, URLModal } from "react-url-modal"
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import LandlordLogin from './LandlordLogin';
import LandlordSignup from './LandlordSignup';
import TenantLogin from './TenantLogin';
import TenantSignup from './TenantSignup';

function Navbar() {

    const location = useLocation();
    //handle tenant logout
    const jwtToken = useSelector(state => state.jwtToken.jwtToken);
    
    const dispatch = useDispatch();
    const handleTenantLogout = () => {
        const configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
        }
        if(jwtToken){
            fetch("/tenants/logout", configObj)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch(removeToken())
            });
        }
    }
    //tenant and landlord buttons setup
    const [openTenant, setOpenTenant] = useState(false);
    const [openLandlord, setOpenLandlord] = useState(false);
    const [openLandlordLogin, setOpenLandlordLogin] = useState(false);
    const [openLandlordSignUp, setOpenLandlordSignUp] = useState(false);
    const [openTenantLogin, setOpenTenantLogin] = useState(false);
    const [openTenantSignUp, setOpenTenantSignUp] = useState(false);
    const anchorRefTenant = useRef(null);
    const anchorRefLandlord = useRef(null);

    const handleToggleTenant = () => {
        setOpenTenant((prevOpen) => !prevOpen);
    };

    const handleToggleLandlord = () => {
        setOpenLandlord((prevOpen) => !prevOpen);
    };

    //modal for landlord login and signup
    const handleClickOpenLandlordLogin = () => {
        setOpenLandlordLogin(true)
    }
    const handleClickOpenLandlordSignUp = () => {
        setOpenLandlordSignUp(true)
    }
    const handleClickOpenTenantLogin = () => {
        setOpenTenantLogin(true)
    }
    const handleClickOpenTenantSignUp = () => {
        setOpenTenantSignUp(true)
    }
    
    //onclick event for the pop up on clicking tenant or landlord
    const handleCloseTenant = (event) => {
        if (anchorRefTenant.current && anchorRefTenant.current.contains(event.target)) {
            return;
        }
        setOpenTenant(false);
    };
    const handleCloseLandlord = (event) => {
        if (anchorRefLandlord.current && anchorRefLandlord.current.contains(event.target)) {
            return;
        }
        setOpenLandlord(false);
    }

    //allows you to click tab when filling out info
    function handleListKeyDownTenant(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpenTenant(false);
        } else if (event.key === 'Escape') {
          setOpenTenant(false);
        }
    }
    function handleListKeyDownLandlord(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpenLandlord(false);
        } else if (event.key === 'Escape') {
          setOpenLandlord(false);
        }
    }
    ////////

    //STYLES/////////////
    //tap into global theme written in index.js within root directory for client
    const theme = useTheme();

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));
    //STYLES END/////////////

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleTenantLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                <MailIcon />
                </Badge>
            </IconButton>
            <p>Messages</p>
            </MenuItem>
            <MenuItem>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
            >
                <Badge badgeContent={17} color="error">
                <NotificationsIcon />
                </Badge>
            </IconButton>
            <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    let testLogin = <TenantLogin openLogin={openTenantLogin} setOpenLogin={setOpenTenantLogin} openSignUp={openTenantSignUp} setOpenSignUp={setOpenTenantSignUp}/>;

    return (
        <>
            <CssBaseline />
            <AppBar elevation = {0} position="static"
                sx = {{
                    backgroundColor: theme.palette.cardBg
                }}>
                <Toolbar disableGutters>
                    <Grid container spacing={0} alignItems={'center'} justifyContent={"space-between"} flexWrap="nowrap" sx={{ paddingX: { xs: 2, md: 6 } }} >
                        <Grid item xs={1} sm={3} md={4} lg={3} sx={{ alignItems: 'inherit' }}>
                            <Box display='flex' alignItems={'inherit'} >
                                <Typography
                                    variant="h6"
                                    component="a"
                                    href="/"
                                    sx={{
                                        ml: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontWeight: 600,
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '1.8 rem'
                                    }}
                                >
                                    PMS
                                </Typography>
                            </Box>
                        </Grid>
             
                        {/* SEARCH COMPONENT */}
                        <Grid item xs={5} md sx={{ alignContent: 'center' }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    // sx={{ border: 1, textAlign: 'center', }}
                                />
                            </Search>
                        </Grid>
            
                    
                        {/* Holds the email, notification, and profile info */}
                        <Grid item xs={3} md={4} lg={3} sx={{maxWidth: "revert"}}>
                            <Stack direction="row" sx={{justifyContent: "flex-end"}}>
                            <Box sx={{ display: 'flex'}}>
                                {/* Holds owner login, owner signup, tenant login, tenant signup */}
                                <div>
                                    <Button
                                        ref={anchorRefTenant}
                                        id="composition-button"
                                        aria-controls={openTenant ? 'composition-menu' : undefined}
                                        aria-expanded={openTenant ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggleTenant}
                                        sx={{
                                            color: "white",
                                            fontSize: "18px",
                                            display: "block"
                                        }}
                                    >
                                        Tenants
                                    </Button>
                                    <Popper
                                        open={openTenant}
                                        anchorEl={anchorRefTenant.current}
                                        role={undefined}
                                        placement="bottom-start"
                                        transition
                                        disablePortal
                                        sx={{zIndex: 10}}
                                    >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseTenant}>
                                                <MenuList
                                                    autoFocusItem={openTenant}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDownTenant}
                                                    sx={{
                                                        backgroundColor: theme.palette.cardBg,
                                                        color: 'white'
                                                    }}
                                                >
                                                    <MenuItem to="/tenants/login" state={{ background: location }} onClick={handleClickOpenTenantLogin}>Login</MenuItem>
                                                    <URLModal
                                                        modals={{
                                                            test: testLogin
                                                        }}
                                                    />
                                                    <button onClick={()=> openModal({
                                                        name: 'test',
                                                    })}>
                                                        Open
                                                    </button>
                                                    
                                                    <MenuItem onClick={handleClickOpenTenantSignUp}>Sign Up</MenuItem>
                                                    <TenantSignup openSignUp={openTenantSignUp} setOpenSignUp={setOpenTenantSignUp} openLogin={openTenantLogin} setOpenLogin={setOpenTenantLogin}/>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                    </Popper>
                                </div>
                                <div>
                                    <Button
                                        ref={anchorRefLandlord}
                                        id="composition-button"
                                        aria-controls={openLandlord ? 'composition-menu' : undefined}
                                        aria-expanded={openLandlord ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggleLandlord}
                                        sx={{
                                            color: "white",
                                            fontSize: "18px",
                                            display: "block"
                                        }}
                                    >
                                        Landlords
                                    </Button>
                                    <Popper
                                        open={openLandlord}
                                        anchorEl={anchorRefLandlord.current}
                                        role={undefined}
                                        placement="bottom-start"
                                        transition
                                        disablePortal
                                        sx={{zIndex: 10}}
                                    >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseLandlord}>
                                                <MenuList
                                                    autoFocusItem={openLandlord}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDownLandlord}
                                                    sx={{
                                                        backgroundColor: theme.palette.cardBg,
                                                        color: 'white'
                                                    }}
                                                >
                                                    <MenuItem variant="outlined" onClick={handleClickOpenLandlordLogin}>
                                                        Login
                                                    </MenuItem>
                                                    <LandlordLogin openLogin={openLandlordLogin} setOpenLogin={setOpenLandlordLogin} openSignUp={openLandlordSignUp} setOpenSignUp={setOpenLandlordSignUp}/>
                                                    <MenuItem variant="outlined" onClick={handleClickOpenLandlordSignUp}>
                                                        Sign Up
                                                    </MenuItem>
                                                    <LandlordSignup openSignUp={openLandlordSignUp} setOpenSignUp={setOpenLandlordSignUp} openLogin={openLandlordLogin} setOpenLogin={setOpenLandlordLogin}/>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                    </Popper>
                                </div>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex'}}}>
                            <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={0} sx={{ display: 'flex', justifyContent: "flex-end" }}>

                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </>
    );
}

export default Navbar