import { Box, Paper, Typography, useTheme } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChartRevenue from './ChartRevenue';
function RevenueSection() {
    const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, marginTop: "10px"}} >
    <Paper sx={{ display: "flex", flexDirection: "column" }}>

      <Box
        
        sx={{
            display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
      }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: 25 }}
          color={theme.palette.major.main}
          >
          Sales 
        </Typography>
        <Typography sx={{ fontSize: 13 }}>
          <AttachMoneyIcon sx={{ color:theme.palette.major.main, fontSize: "30px" }}/>
        </Typography>

      </Box>
<Box>
<ChartRevenue/>
</Box>


    </Paper>
  </Box>
  )
}

export default RevenueSection
