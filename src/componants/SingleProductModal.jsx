import {
    Box,
  Typography,
  IconButton,
  Button,
  Rating,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
  CardMedia,
  ButtonGroup,
  ImageList,
  ImageListItem,
//   Chip,
  Stack,
  } from "@mui/material";
  import  Grid from "@mui/material/Grid2";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  import StorefrontIcon from "@mui/icons-material/Storefront";
  import CategoryIcon from "@mui/icons-material/Category";
  import Inventory2Icon from "@mui/icons-material/Inventory2";
  import DescriptionIcon from "@mui/icons-material/Description";
  import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
  import { useTheme } from "@mui/material/styles";
function SingleProductModal({singleProduct}) {
  const theme = useTheme();

 



  return (
//     <Box
//     sx={{
//       display: "flex",
//       flexDirection: "row",
//       gap: 4,
//       p: 2,
//       bgcolor: theme.palette.background.default,
//       color: theme.palette.text.primary,
//     //   maxWidth: 1000,
//     //   maxHeight: 600,
//       overflow: "hidden",
//     }}
//   >
//     {/* Left section for Images */}
//     <Grid container spacing={2} sx={{ flexDirection: "row" }}>
//       <Grid item xs={12} md={6}>
//         {/* Product Cover Image */}
//         <CardMedia
//           component="img"
//           height="300"
//           image={singleProduct.imageCover || "default_image_path"}
//           alt={singleProduct.title}
//           sx={{
//             borderRadius: "12px",
//             objectFit: "cover",
//             width: "100%",
//           }}
//         />
//         {/* Product Image Gallery */}
//         <ImageList
//           sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}
//           cols={4}
//           rowHeight={80}
//         >
//           {singleProduct.images.map((img, index) => (
//             <ImageListItem key={index}>
//               <img
//                 src={img || "default_image_path"}
//                 alt={`product image ${index}`}
//                 loading="lazy"
//                 style={{
//                   borderRadius: "8px",
//                   objectFit: "cover",
//                   cursor: "pointer",
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             </ImageListItem>
//           ))}
//         </ImageList>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         {/* Product Information */}
//         <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
//           {singleProduct.category.name} / {singleProduct.subcategories?.name || ""}
//         </Typography>

//         <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
//           {singleProduct.title}
//         </Typography>

//         <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.success.main }}>
//           ${singleProduct.price}
//         </Typography>

//         <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
//           <Rating value={singleProduct.ratingQuantity} readOnly precision={0.5} />
//           <Typography variant="body2" sx={{ ml: 1, color: theme.palette.text.secondary }}>
//             {singleProduct.reviews.lenght} reviews
//           </Typography>
//         </Box>

//         {/* Product Description */}
//         <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
//           {singleProduct.description}
//         </Typography>

//         {/* Bag Color Options */}
//         <Typography variant="subtitle1" sx={{ mb: 1 }}>
//           Bag Color
//         </Typography>
//         <RadioGroup row defaultValue="green" name="color-options">
//           {singleProduct.colors.map((color) => (
//             <FormControlLabel
//               key={color}
//               value={color}
//               control={
//                 <Radio
//                   sx={{
//                     color: color,
//                     "&.Mui-checked": {
//                       color: color,
//                     },
//                   }}
//                 />
//               }
//               label=""
//             />
//           ))}
//         </RadioGroup>

//         {/* Bag Size Options */}
//         <Typography variant="subtitle1" sx={{ mt: 2 }}>
//           Bag Size
//         </Typography>
//         <ButtonGroup variant="outlined">
//           {singleProduct.size.map((size) => (
//             <Button key={size}>{size}</Button>
//           ))}
//         </ButtonGroup>

//         <Box display="flex" alignItems="center" sx={{ mt: 3 }}>
//           <ButtonGroup variant="contained">
//             <Button>{singleProduct.stock}</Button>
//           </ButtonGroup>

         
//         </Box>

      
//       </Grid>
//     </Grid>
//   </Box>
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, // Stacks on small screens, side by side on larger screens
    gap: 4,
    py: 2,
    px: 2,
    bgcolor: theme.palette.background.default,
    color: theme.palette.text.primary,
    overflow: "hidden",
  }}
>
  {/* Left section for Images */}
  <Grid container spacing={2} sx={{ flexDirection: "row" }}>
    <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
      {/* Product Cover Image */}
      <CardMedia
        component="img"
        height="300"
        image={singleProduct.imageCover || "default_image_path"}
        alt={singleProduct.title}
        sx={{
          borderRadius: "12px",
          objectFit: "cover",
          width: "100%",
        }}
      />
      {/* Product Image Gallery */}
      <ImageList
        sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}
        cols={4}
        rowHeight={80}
      >
        {singleProduct.images.map((img, index) => (
          <ImageListItem key={index}>
            <img
              src={img || "default_image_path"}
              alt={`product image ${index}`}
              loading="lazy"
              style={{
                borderRadius: "8px",
                objectFit: "cover",
                cursor: "pointer",
                width: "100%",
                height: "100%",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>

    {/* Right section: Product Details */}
    <Grid item xs={12} md={6} sx={{ position: { md: "sticky" }, top: { md: "20px" } }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <CategoryIcon color="primary" />
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {singleProduct.category.name} / {singleProduct.subcategories?.name || ""}
        </Typography>
      </Stack>

      {/* Product Title with Tooltip */}
      <Tooltip title={singleProduct.title} placement="top">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mt: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {singleProduct.title}
        </Typography>
      </Tooltip>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.success.main }}>
          ${singleProduct.price}
        </Typography>
    
      </Stack>

      <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
        <Rating value={singleProduct.ratingQuantity} readOnly precision={0.5} />
        <Typography variant="body2" sx={{ ml: 1, color: theme.palette.text.secondary }}>
          {singleProduct.reviews.length} reviews
        </Typography>
      </Box>

      {/* Product Description with Tooltip */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
        <DescriptionIcon color="action" />
        <Tooltip title={singleProduct.description} placement="top">
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {singleProduct.description}
          </Typography>
        </Tooltip>
      </Stack>

      {/* Bag Color Options */}
      <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
         Color
      </Typography>
      <RadioGroup row defaultValue="green" name="color-options">
        {singleProduct.colors.map((color) => (
        //   <FormControlLabel
        //   checked
        //     key={color}
        //     value={color}
        //     control={
        //       <Radio
        //         sx={{
        //           color: color,
        //           "&.Mui-checked": {
        //             color: color,
        //           },
        //         }}
        //       />
        //     }
        //     label=""
        //   />
        <Button variant="contained" key={color} sx={{ backgroundColor: color ,mx:1,p:1 }}>
      </Button>
        ))}
      </RadioGroup>

      {/* Bag Size Options */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
         Size
      </Typography>
      <ButtonGroup variant="outlined">
        {singleProduct.size.map((size) => (
          <Button key={size}>{size}</Button>
        ))}
      </ButtonGroup>

      {/* Quantity Selector */}
      <Box
  display="flex"
  alignItems="center"
  justifyContent="flex-start" // Aligns the content to the start
  sx={{
    mt: 3,
    gap: 2, // Adds space between the icon and text
    p: 1.5,
    borderRadius: 2,
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300]}`, // Adjusts the border color for dark/light mode
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[800]  
      : theme.palette.background.paper,  
    color: theme.palette.text.primary,  
  }}
>
  <StorefrontIcon 
    // color={theme.palette.major.main} 
    sx={{ fontSize: 24 , color: theme.palette.major.main }} 
  />

  <Typography 
    variant="h6" 
    sx={{ fontWeight: "bold", color: theme.palette.text.primary }} 
  >
    In Stock: {singleProduct.stock}
  </Typography>
</Box>

      {/* Seller Info */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3 }}>
        <MilitaryTechIcon color="primary" />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Sold by: {singleProduct.sellerId?.name || "Admin"}
        </Typography>
      </Stack>

   
    </Grid>
  </Grid>
</Box>
  )
}

export default SingleProductModal
