import ProductOverView from '../../componants/ProductOverView'
import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';

function ProductsOverView() {

    const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, marginTop: "30px"}}  >   
     <Stack direction="row" sx={{ gap: 2,alignItems: "center", color:theme.palette.major.main }}>

<Typography variant="h4">
Products Management
</Typography>

</Stack>

<ProductOverView/>    

    </Box>
  )
}

export default ProductsOverView
