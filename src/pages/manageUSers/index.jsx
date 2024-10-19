import { Box, Stack, Typography, useTheme, } from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge';

import UsersTable from '../../componants/UsersTable';

function ManageUsers() {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, marginTop: "30px"}}  >  
    <Stack direction="row" sx={{ gap: 2,alignItems: "center",color:theme.palette.major.main  }}>

      <Typography variant="h4" >
        Manage Users
      </Typography>
        <BadgeIcon sx={{  fontSize: "50px" }}/>
    </Stack>
 
    <UsersTable/>
    </Box>
  
  )
}

export default ManageUsers
