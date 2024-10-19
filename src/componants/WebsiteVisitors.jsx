import { Box, Paper, Typography, useTheme } from "@mui/material";

import ChartVisitors from "./ChartVisitors";
import CoPresentIcon from '@mui/icons-material/CoPresent';
function WebsiteVisitors() {
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
            Website Visitors
          </Typography>
          <Typography sx={{ fontSize: 13 }}>
            <CoPresentIcon sx={{ color:theme.palette.major.main, fontSize: "30px" }}/>
          </Typography>

        </Box>
<Box>
<ChartVisitors/>
</Box>


      </Paper>
    </Box>
  );
}

export default WebsiteVisitors;
