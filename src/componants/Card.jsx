
import Paper from "@mui/material/Paper";
import { Stack, Typography } from "@mui/material";
function Card( {icon, title, percent} ) {


  return (
    <Paper
      sx={{
        // minWidth: "333px",
        minWidth: "333px",
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        flexGrow: 1,
        gap: 2,
        flexDirection: "column",
        
      }}
    >
      <Stack direction="row" sx={{ gap: 1 }}>
        {icon}

        <Typography variant="">{title}</Typography>
      </Stack>

      <Stack direction="row" sx={{ textAlign: "center", gap: 1 }}>
        <Typography variant="" sx={{fontSize: "25px", fontWeight: "bold"}}>{percent}</Typography>
      </Stack>
    </Paper>
  );
}

export default Card;
