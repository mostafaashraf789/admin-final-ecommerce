import { Box, Stack, Typography, useTheme } from "@mui/material"
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReviewTable from "../../componants/ReviewTable";
function ManageRewiew() {
    const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, marginTop: "30px"}}  >   
     <Stack direction="row" sx={{ gap: 2,alignItems: "center", color:theme.palette.major.main }}>

<Typography variant="h4">
Reviews Management
</Typography>
  <RateReviewIcon sx={{  fontSize: "50px" }}/>
</Stack>

<ReviewTable/>    

    </Box>
  )
}

export default ManageRewiew
