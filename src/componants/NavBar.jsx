import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import  WbSunnyOutlinedIcon  from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import  Cookies  from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function NavBar({setMode,handleDrawerToggle}) {

const [adminImg, setadminImg] = useState(); 

const navigate = useNavigate();
 useQuery(['adminImg'],
  async () => {
    return await axios.get('http://localhost:3000/api/v1/users/getMe' , {withCredentials: true,})
},
{

 refetchInterval: 5000,

  onError: (error) => {
    toast.error(error.message)
  },


  onSuccess: (data) => {
    setadminImg(data.data.data.profilePicture)

  },

 
}

)

// handle sign out

  const handleSignOut = useMutation(async () => {
   return await  axios.get('http://localhost:3000/api/v1/auth/sign-out', {withCredentials: true,})
  },{
    
    refetchOnWindowFocus: false,
  
    onSuccess: () => {
      toast.success('Sign out successfully')
      Cookies.remove('adminId')
      Cookies.remove('role')
      navigate("/LogIn")
    },
  })





    const theme = useTheme();
    const drawerWidth = 250;
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      
      const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }));

    
  return (
    <>
        <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: theme.palette.major.main,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' },
           
          }}
          >
            <MenuIcon />
          </IconButton>
          <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    // backgroundColor: '#f0f4f8'
  }}
>
  <Typography 
    variant="h4" 
    component="div" 
    sx={{ 
      fontWeight: 'bold', 
      letterSpacing: 2, 
      color: '#0077b6', 
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'uppercase',
      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)' // Added text shadow
    }}
  >
    Pacific 
  </Typography>
</Box>
          <Stack ml="auto" mr="10px" direction="row" spacing={0.5} >
          <IconButton
            color="inherit"
            onClick={() => {
              setMode(theme.palette.mode === "dark" ? "light" : "dark");

              localStorage.setItem(
                "currentMode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <WbSunnyOutlinedIcon />
            )}
          </IconButton>

     {/* avatar */}
     <Box sx={{ flexGrow: 0,  }}>
            <Tooltip title="Open settings" >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="admin" src={adminImg} />
      </StyledBadge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
          
                <MenuItem  
                  onClick={() => {navigate('/profile') }}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    
               Profile
                    
                    </Typography>
                </MenuItem>
                <MenuItem
                 onClick={() => {navigate('/') }}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    
               Dashboard
                    
                    </Typography>
                </MenuItem>
                <MenuItem 
                  onClick={() => {handleSignOut.mutate() }}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    
               Log out
                    
                    </Typography>
                </MenuItem>
             
            </Menu>
          </Box>

         
    
        </Stack>
        </Toolbar>
      </AppBar>


    </>
  )
}

export default NavBar
