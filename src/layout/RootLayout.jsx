import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, deepOrange, grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../componants/NavBar";
import OffCanvacs from '../componants/OffCanvacs';
import { Typography } from "@mui/material";



function RootLayout() {
 
 // handle dark mode
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            admin: {
              main: blue[900],
            },
            bgBtn: {
              main: grey[300],
            },
            major :{
              main: '#ED7A56',
            }
          }
        : {
            // palette values for dark mode
            admin: {
              main: blue[900],
            },
            bgBtn: {
              main: grey[700],
            },
            major :{
              main: '#ED7A56',
            }
          }),
    },
  });


  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const drawerWidth = 250;

  // handle drawer
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };






  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <NavBar handleDrawerToggle={handleDrawerToggle} setMode={setMode}/>
      <OffCanvacs  mode={mode}
          setMode={setMode} 
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          mobileOpen={mobileOpen}
          
          />

      <Box
        component="main"
        sx={{
        flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
         "& .MuiBox-root": {
           px:1 ,
           py:2,
            margin:0
         }

        }}
      >
        <Outlet />
        <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#inherit', 
        padding: '20px', 
        textAlign: 'center', 
        
        borderTop: '1px solid #e0e0e0' 
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }} color={theme.palette.major.main}>
        All rights reserved to our Team
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold" }} color={theme.palette.major.main}>
        Developed by Mostafa Ashraf, Ahmed Hamdy, Tasniem Seiam, Wessam Ahmed, Rawan Hesham
      </Typography>
    </Box>

      </Box>
      </ThemeProvider>
  );
}

export default RootLayout;
