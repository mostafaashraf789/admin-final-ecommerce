import React from 'react'
import AddProduct from '../../componants/add-product/AddProduct'
import { Box } from '@mui/material'

function AddProducts() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: "30px"}}  >   

      <AddProduct />
      
      </Box>
  )
}

export default AddProducts
