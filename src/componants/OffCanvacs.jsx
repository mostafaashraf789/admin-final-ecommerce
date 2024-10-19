import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Collapse from '@mui/material/Collapse';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';import HomeIcon from '@mui/icons-material/Home';
import Toolbar from "@mui/material/Toolbar";
import DiscountIcon from '@mui/icons-material/Discount';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useState } from "react";

function OffCanvacs(

  {handleDrawerClose,
  handleDrawerTransitionEnd,
  mobileOpen,}
) {
  const drawerWidth = 250;
const navigate = useNavigate();
const location = useLocation();
const theme = useTheme();
  const mainList = [
    { title: "Dashboard", icon: <HomeIcon/>, path: "/" },
    { title: "Users", icon: <ManageAccountsIcon/>, path: "/users" },
   
    { title: "Coupons", icon: <DiscountIcon/>, path: "/Coupons" },
    { title: "Reviews ", icon: <ReviewsOutlinedIcon/>, path: "/reviews" },
  ];
  const productsList = [
    { title: "Products Overview", icon:<CategoryIcon/> , path: "/overview" },
    { title: "New Resources", icon: <ProductionQuantityLimitsIcon/>, path: "/Resources" },
    { title: "Add Product", icon: <ExtensionIcon/>, path: "/Add-Product" },
  
  ];



  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
     
        <Drawer
        
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <div>
      <Toolbar />
      <Divider />
      <List>
        {mainList.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                bgcolor:location.pathname === text.path ? theme.palette.bgBtn.main : null,
              }}
              onClick={() => navigate(text.path)}
              >
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
            <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <RemoveRedEyeIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
         {productsList.map((item, index) => (
            <ListItemButton key={index} sx={{ pl: 4,bgcolor:location.pathname === item.path?theme.palette.bgBtn.main:null }}
              onClick={() => {navigate(item.path)}}
            >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
         )
         )}
        </List>
      </Collapse>
      </List>
      <Divider />
      
    </div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
            <div>
      <Toolbar />
      <Divider />
      <List>
        {mainList.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                bgcolor:location.pathname === text.path ? theme.palette.bgBtn.main : null,
              }}
              onClick={() => navigate(text.path)}
              >
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
              <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <RemoveRedEyeIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
         {productsList.map((item, index) => (
            <ListItemButton key={index} sx={{ pl: 4,bgcolor:location.pathname === item.path?theme.palette.bgBtn.main:null }}
              onClick={() => {navigate(item.path)}}
            >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
         )
         )}
        </List>
      </Collapse>
    </List>
   

   

      <Divider />
    
  
    </div>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default OffCanvacs;
