import { Box, Stack, Typography, useTheme } from '@mui/material'

import AddResources from '../../componants/AddResources'

function AddCategory() {
    const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, marginTop: "30px"}}  >   
    <Stack direction="row" sx={{ gap: 2,alignItems: "center", color:theme.palette.major.main }}>

<Typography variant="h4">
Resources management
</Typography>
 {/* <LoyaltyIcon sx={{  fontSize: "50px" }}/> */}
</Stack>
<AddResources/>
   </Box>
  )
}

export default AddCategory
