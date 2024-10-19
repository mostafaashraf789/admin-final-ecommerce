
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import  { useState } from 'react'
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';

import animationData from './Animation - 1728324557232.json'
import Lottie from 'lottie-react';
import axios from 'axios';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import Spinner from './spinner/Spinner';
// const initialProducts  = [
//     {
//       id: 1,
//       name: 'iPhone 14 Pro Max',
//       stock: 524,
//       price: 1099,
//       image: 'https://via.placeholder.com/50x50.png?text=Phone',
//     },
//     {
//       id: 2,
//       name: 'Apple Watch S8',
//       stock: 320,
//       price: 799,
//       image: 'https://via.placeholder.com/50x50.png?text=Watch',
//     },
//     {
//       id: 2,
//       name: 'sumsung',
//       stock: 320,
//       price: 799,
//       image: 'https://via.placeholder.com/50x50.png?text=Watch', 
//     },
//     {
//       id: 2,
//       name: 'mi',
//       stock: 320,
//       price: 799,
//       image: 'https://via.placeholder.com/50x50.png?text=Watch', 
//     },
//     {
//       id: 2,
//       name: 'mi',
//       stock: 320,
//       price: 799,
//       image: 'https://via.placeholder.com/50x50.png?text=Watch', 
//     },
//     {
//       id: 2,
//       name: 'mi',
//       stock: 320,
//       price: 799,
//       image: 'https://via.placeholder.com/50x50.png?text=Watch', 
//     },
//   ];
  

function ProductTable() {
    
    // const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);


  const getAllProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/api/v1/products')
    return data
  }
const {isLoading} = useQuery(["allProducts"], getAllProducts, {
  onSuccess:(data) => {
    setFilteredProducts(data.data.documents)

  },
  onError: (error) => {
    toast.error(error.message)
  }
  
})
if (isLoading) {
  return <Spinner/>
}






    const handleSearchChange = (event) => {
      const value = event.target.value.toLowerCase();
    //   setSearchTerm(value);
  
      const filtered = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(value)
      );
      setFilteredProducts(filtered);
    };

  return (
   
   
    <Box sx={{ flexGrow: 1 }} >
  

   {/* Search Bar */}
   <TextField
      variant="outlined"
      placeholder="Search products..."
    sx={{ width: { xs: '170px', sm: '300px'}}}
      onChange={handleSearchChange}
      slotProps={{
        input: {
            startAdornment: (
            <InputAdornment position="start">
                    <SearchIcon/>
            </InputAdornment>
          ),
        },
      }}
    />

<Box sx={{maxHeight: '400px',minHeight: '400px', overflow: 'auto' }}>
{ filteredProducts.length >0 ?  filteredProducts.map((product) => (
      <Grid container key={product._id} sx={{ padding: '10px 0', borderBottom: '1px solid #333',display: 'flex', alignItems: 'center', justifyContent: 'space-between'     }}>
     
        <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={product.imageCover}
            alt={product.title}
            style={{ width: 50, height: 50, marginRight: 16, borderRadius: '8px', objectFit: 'cover' }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>
              {product.title}
            </Typography>
            <Typography variant="body2" >
              {product.stock} in stock
            </Typography>
          </Box>
        </Grid>

      
        <Grid item xs={4} style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold'}}>
            ${product.price.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    )) :   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
    <Lottie
      autoplay
      loop
      animationData={animationData}
      style={{ height: '270px',}}
     
    />
    <p>no product</p>
  </div>}
  
    </Box>
  </Box>
           
  )
}

export default ProductTable
