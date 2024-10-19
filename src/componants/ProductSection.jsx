import { useTheme } from "@emotion/react";
import { Box, Paper, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";


import ProductTable from "./ProductTable";

function ProductSection() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, marginTop: "10px" }} >
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
            Products
          </Typography>
          <Typography sx={{ fontSize: 13 }}>
            <CategoryIcon
              sx={{ color:theme.palette.major.main, fontSize: "30px" }}
            />
          </Typography>
        </Box>

        <ProductTable />
      </Paper>
    </Box>
  );
}

export default ProductSection;
