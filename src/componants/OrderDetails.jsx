import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Divider,
    Paper,
    Button,
    Box,
    useMediaQuery,
    useTheme
  } from '@mui/material';
  import { AccountCircle, Email, Phone, LocationOn, Payment, CheckCircle, Cancel, Pending } from '@mui/icons-material';
  
import Grid from '@mui/material/Grid2';

function OrderDetails({ order }) {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
const theme = useTheme();
  return (
//  

  

<Grid container spacing={4} padding={2}>
<Grid item xs={12}>
  <Typography variant="h4" align="center" sx={{ color :theme.palette.major.main }}>
    Order Details
  </Typography>
</Grid>

{/* User Information */}
<Grid item xs={12} md={6}>
  <Card>
    <CardContent>
      <Typography variant="h5">User Information</Typography>
      <Divider />
      <Box display="flex" alignItems="center" mt={1}>
        <AccountCircle fontSize="small" />
        <Typography variant="subtitle1" marginLeft={1}>
          Username: {order.user.username}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <Email fontSize="small" />
        <Typography variant="subtitle1" marginLeft={1}>
          Email: {order.user.email}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <Phone fontSize="small" />
        <Typography variant="subtitle1" marginLeft={1}>
          Phone: {order.shippingAddress.phone || "N/A"}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <LocationOn fontSize="small" />
        <Typography variant="subtitle1" marginLeft={1}>
          Address: {order.shippingAddress.details}, {order.shippingAddress.city} - {order.shippingAddress.postalCode}
        </Typography>
      </Box>
    </CardContent>
  </Card>
</Grid>

{/* Cart Items */}
<Grid item xs={12} md={6}>
  <Card>
    <CardContent>
      <Typography variant="h5">Cart Items</Typography>
      <Divider />
      {order.cartItems.map((item) => (
        <Paper key={item._id} elevation={2} style={{ padding: '16px', marginBottom: '10px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={isMobile ? 4 : 3}>
              <CardMedia
                component="img"
                image={item.product?.imageCover || "https://gebelesebeti.ge/front/asset/img/default-product.png"}
                alt={item.product?.title || "Product Image"}
                style={{ height: '100px', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={isMobile ? 8 : 9}>
              <Typography variant="h6">{item.product?.title}</Typography>
              <Typography variant="body1">Price: ${item.price}</Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </CardContent>
  </Card>
</Grid>

{/* Order Summary */}
<Grid item xs={12}>
  <Card>
    <CardContent>
      <Typography variant="h5">Order Summary</Typography>
      <Divider />
      <Box display="flex" alignItems="center" mt={1}>
        <Typography variant="subtitle1">Shipping Price: ${order.shippingPrice}</Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <Typography variant="subtitle1">Tax Price: ${order.taxPrice}</Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <Typography variant="subtitle1" fontWeight="bold">
          Total Price: ${order.totalOrderPrice}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <Payment fontSize="small" />
        <Typography variant="subtitle1" marginLeft={1}>
          Payment Method: {order.paymentMethodType}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        {order.isDelivered ? (
          <>
            <CheckCircle fontSize="small" color="success" />
            <Typography variant="subtitle1" marginLeft={1}>
              Status: Delivered
            </Typography>
          </>
        ) : order.isCanceled ? (
          <>
            <Cancel fontSize="small" color="error" />
            <Typography variant="subtitle1" marginLeft={1}>
              Status: Canceled
            </Typography>
          </>
        ) : (
          <>
            <Pending fontSize="small" color="warning" />
            <Typography variant="subtitle1" marginLeft={1}>
              Status: Pending
            </Typography>
          </>
        )}
      </Box>
    </CardContent>
  </Card>
</Grid>
</Grid>
  )
}

export default OrderDetails
