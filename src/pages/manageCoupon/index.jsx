import { Box, Stack, Typography, useTheme } from '@mui/material'
import CouponTable from './../../componants/CouponTable';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
function ManageCoupon() {
    const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, marginTop: "30px"}}  >   
     <Stack direction="row" sx={{ gap: 2,alignItems: "center", color:theme.palette.major.main }}>

<Typography variant="h4">
Coupon Management
</Typography>
  <LoyaltyIcon sx={{  fontSize: "50px" }}/>
</Stack>
 <CouponTable/>
    </Box>
  )
}

export default ManageCoupon
