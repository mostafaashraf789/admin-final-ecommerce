
import Grid from '@mui/material/Grid2';
import { Box,  Typography, useTheme } from '@mui/material';
import Card from './Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DiscountIcon from '@mui/icons-material/Discount';
import {  useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import Spinner from './spinner/Spinner';

function AnalyticsSection() {

    const theme = useTheme();

const [allProducts, setallProducts] = useState([])

const getAllProducts = async () => {
  const {data} = await axios.get("http://localhost:3000/api/v1/products/");
  return data;
}

const {isLoading} = useQuery(["allProducts"],getAllProducts,{
  onSuccess: (data) => {
    setallProducts(data.data.documents);
    
  },
  onError: (error) => {
    toast.error(error.message);
  },

})

if (isLoading) {
  return <Spinner/>;
}

const formattedProducts = new Intl.NumberFormat('en-US').format(allProducts.length);




// get total stocks of all products
const totalStocks = allProducts.reduce((total, product) => {
  return total + product.stock;
}, 0);
// get total sales of all products
const totalSales= allProducts.reduce((total, product) => {
  return total + product.sold;
}, 0);
const formattedsales = new Intl.NumberFormat().format(totalSales)

const formattedStocks = new Intl.NumberFormat().format(totalStocks)


// get total revenue of all products
const totalRevenue = allProducts.reduce((total, product) => {
  return total + product.price * product.sold
},0)
const formattedRevenue = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(
  totalRevenue,
)

  return (

    <Box sx={{ flexGrow: 1, marginTop: "20px", p: "20px" }} >
      <Typography variant="h5"
        sx={{ color:theme.palette.major.main, fontWeight: "bold" , mb: "20px"}}> Analytics</Typography>

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{xs: 12,md: 6}}>
          <Card 
          icon={<FavoriteIcon
            sx={{ color:theme.palette.major.main, fontSize: "30px" }}
          />}
           title="Save porducts"
            percent={formattedProducts} />
        </Grid>

        <Grid size={{xs: 12,md: 6}}>
          <Card
            icon={<AddBusinessIcon
                sx={{ color:theme.palette.major.main, fontSize: "30px" }}
                />}
            title="Stock porducts"
            percent={formattedStocks}
          />
        </Grid>

        <Grid size={{xs: 12,md: 6}}>
          <Card 
          
            icon={<DiscountIcon
                sx={{ color:theme.palette.major.main, fontSize: "30px" }} />} 
          title="Sale Products"
           percent={formattedsales} />
        </Grid>
        <Grid size={{xs: 12,md: 6}}>
          <Card
            icon={<AttachMoneyIcon
                sx={{ color:theme.palette.major.main, fontSize: "30px" }} />}
            title="Revenue"
            percent={formattedRevenue}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnalyticsSection
