import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DomainIcon from '@mui/icons-material/Domain';
import WeekendIcon from '@mui/icons-material/Weekend';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function TenantPage(){

    //use colors
    const theme = useTheme();

    const NestedText = styled(ListItemText)({
        '&:hover':{
            backgroundColor: "white"
        },
        paddingLeft: "20%"
    })


    //side drawer
    const drawerWidth = 240;
    const [open, setOpen] = useState({})
    function handleOpen(id) {
        setOpen(prevState => ({...prevState, [id]: !prevState[id]}))
    }

    //retriev tenant data or send to home page if not logged in 
    const jwtToken = useSelector(state => state.jwtToken.jwtToken);
    const [tenantData, setTenantData] = useState({})
    //create history to push
    const navigate = useNavigate();
    useEffect(() => {
        if(!jwtToken){
            navigate("/")
        }else{
            fetch('/tenants/me',{
                headers: { 'Authorization': 'Bearer ' + jwtToken}
            })
                .then(res => res.json())
                .then(data => {
                    if(data.message){
                        navigate("/")
                    }else{
                        setTenantData(data)
                    }
                })
        }
    },[jwtToken])
    console.log(tenantData)
    return (
        <Box sx={{ display: 'flex', minHeight: "82vh", position: "relative", }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                position: "relative",
              },
              backgroundColor: theme.palette.main
            }}
            variant="permanent"
            anchor="left"
          >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleOpen("Rental")}>
                        <ListItemIcon>
                            <DomainIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Find a Rental"} />
                        {open["Rental"] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open["Rental"]} timeout="auto" unmountOnExit>
                    <List key={"Rental"} disablePadding>
                        <NestedText primary={"Find a Rental"} />
                        <NestedText primary={"Applications"} />
                        <Divider />
                    </List>
                </Collapse>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleOpen("Home")}>
                        <ListItemIcon>
                            <WeekendIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Home"} />
                        {open["Home"] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open["Home"]} timeout="auto" unmountOnExit>
                    <List key={"Home"} disablePadding>
                        <NestedText primary={"Residences"} />
                        <NestedText primary={"Payments"} />
                        <Divider />
                    </List>
                </Collapse>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <EmailOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Inbox"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Account"} />
                    </ListItemButton>
                </ListItem>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Toolbar />
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
              enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
              imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
              Convallis convallis tellus id interdum velit laoreet id donec ultrices.
              Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
              adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
              nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
              feugiat vivamus at augue. At augue eget arcu dictum varius duis at
              consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
              sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
              tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
              sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
              tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
              et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
              tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
          </Box>
        </Box>
      );

}

export default TenantPage;