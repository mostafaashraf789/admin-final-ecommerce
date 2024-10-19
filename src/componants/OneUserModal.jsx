import React from 'react'
import {  Container, Typography, Card, CardContent, Avatar, Chip, Box, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@emotion/react';
import StarIcon from '@mui/icons-material/Star';

function OneUserModal({ username, email, phone, profilePicture, addresses ,role,wishlist}) {


    const theme = useTheme();

    
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: theme.palette.major.main }}>
        {username || 'No name provided'}
      </Typography>

      <Card sx={{ maxWidth: 700, margin: '0 auto', mt: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt={username} src={profilePicture} sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid item xs>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center'  }}>
                  <BadgeIcon sx={{ mr: 1 }} />
                  {username || 'No name provided'}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <EmailIcon sx={{ mr: 1 }} />
                  {email || 'No email provided'}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <PhoneIcon sx={{ mr: 1 }} />
                  {phone || 'No phone number provided'}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <FavoriteIcon sx={{ mr: 1 }} />
                  Role: {role || 'No role provided'}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Address Details */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              Address
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ ml: 3 }}>
              {addresses && addresses[0]
                ? `${addresses[0].street}, ${addresses[0].city}, ${addresses[0].country}, ZIP: ${addresses[0].zipcode}`
                : 'No address provided'}
            </Typography>
          </Box>

          {/* Wishlist Section */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ mr: 1 }} />
              Wishlist
            </Typography>
            <Box sx={{ ml: 3, mt: 1 }}>
              {wishlist && wishlist.length > 0 ? (
                wishlist.map((item, index) => (
                  <Chip key={index} label={item.title} sx={{ mr: 1, mb: 1 , fontSize: 14,color: theme.palette.major.main }} />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No wishlist items
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default OneUserModal
