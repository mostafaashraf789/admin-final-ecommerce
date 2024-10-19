import  { useState, useMemo } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,

    Box,
    Tooltip
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import LabelIcon from "@mui/icons-material/Label";
import Lottie from 'lottie-react';
import animationData from './Animation - 1729108841489 (1).json'
import SearchIcon from "@mui/icons-material/Search";
import  Grid from "@mui/material/Grid2";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from '@mui/material/styles'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InfoIcon from '@mui/icons-material/Info';
import SingleProductModal from "./SingleProductModal";
import Spinner from './spinner/Spinner';
function ProductOverView() {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [searchTerm, setSearchTerm] = useState("");
    const [categorySearch, setCategorySearch] = useState("");
    const [subcategorySearch, setSubcategorySearch] = useState("");
   const [allCategories, setAllCategories] = useState([]);
   const [allSubCategories, setSubAllCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
 
   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 400, md: 800 },
    maxHeight: { xs: 900, md: 1000 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
  };


const singleProductMutation = useMutation(async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/v1/products/${id}`, {
    withCredentials: true,
  });
  return data;
},{
  onSuccess: (data) => {
    setSingleProduct(data.data);
    handleOpen();
  },
  onError: (error) => {
    toast.error(error.response?.data?.message || error.message);
  }
});





 


    const fetchProducts = async () => {
        const { data } = await axios.get("http://localhost:3000/api/v1/products",{
          withCredentials: true,}); 
        return data.data.documents;
      };
      
      

      const { data: products, isLoading, error } = useQuery(["products"], fetchProducts,{
        
        onError: (error) => {
          toast.error(error.message," OPS SOMETHING WENT WRONG!");
        },
      });
      
      
 useQuery(["allCategories"], async () => {
  const { data } = await axios.get("http://localhost:3000/api/v1/categories",{
    withCredentials: true,});
  return data
}, {
  onSuccess: (data) => {
    setAllCategories(data.data.documents);
  },
  onError: (error) => {
    toast.error(error.message," OPS SOMETHING WENT WRONG for Categories!");
  },
});
    
 useQuery(["allSubCategories"], async () => {
  const { data } = await axios.get("http://localhost:3000/api/v1/subcategories",{
    withCredentials: true,});
  return data
}, {
  onSuccess: (data) => {
    setSubAllCategories(data.data.documents);
  },
  onError: (error) => {
    toast.error(error.message," OPS SOMETHING WENT WRONG for Sub Categories!");
  },
});
    
      

    const filteredProducts = useMemo(() => {
        return products
          ?.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((product) =>
            categorySearch ? product.category?.name === categorySearch : true
          )
          .filter((product) =>
            subcategorySearch ? product.subcategories?.name === subcategorySearch : true
          );
      }, [products, searchTerm, categorySearch, subcategorySearch]);
    
      if (isLoading) return <Spinner/>;
      if (error) return toast.error("Error fetching products");





  return (
    <Box sx={{ padding: "1rem 0" }}>

<div>

<Modal
  aria-labelledby="transition-modal-title"
  aria-describedby="transition-modal-description"
  open={open}
  onClose={handleClose}
  closeAfterTransition
  slots={{ backdrop: Backdrop }}
  slotProps={{
    backdrop: {
      timeout: 500,
    },
  }}
>
  <Fade in={open}>
    <Box sx={style}>
    <SingleProductModal singleProduct={singleProduct}/>
    </Box>
  </Fade>
</Modal>
</div>


  {/* Search Bar */}
  <Box sx={{ mb: 4 }}>
    <TextField
      label="Search Products"
      variant="outlined"
      fullWidth
      margin="normal"
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        mb: 4,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        boxShadow: theme.shadows[2],
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: theme.shadows[4],
          },
          "&.Mui-focused": {
            boxShadow: theme.shadows[4],
          },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: theme.palette.text.secondary }} />
            </InputAdornment>
          ),
        }
        
      }}
    />

    {/* Category Filter */}
    <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
      <InputLabel>
        <CategoryIcon sx={{ mr: 1 }} /> Category
      </InputLabel>
      <Select
        value={categorySearch}
        onChange={(e) => setCategorySearch(e.target.value)}
        label="Category"
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "8px",
          boxShadow: theme.shadows[2],
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: theme.shadows[4],
            },
            "&.Mui-focused": {
              boxShadow: theme.shadows[4],
            },
          },
        }}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {allCategories.map((category) => (
          <MenuItem key={category._id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Subcategory Filter */}
    <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
      <InputLabel>
        <LabelIcon sx={{ mr: 1 }} /> Subcategory
      </InputLabel>
      <Select
        value={subcategorySearch}
        onChange={(e) => setSubcategorySearch(e.target.value)}
        label="Subcategory"
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "8px",
          boxShadow: theme.shadows[2],
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: theme.shadows[4],
            },
            "&.Mui-focused": {
              boxShadow: theme.shadows[4],
            },
          },
        }}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {allSubCategories.map((subcategory) => (
          <MenuItem key={subcategory._id} value={subcategory.name}>
            {subcategory.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>

  {/* Products Grid */}
  <Grid container spacing={3} sx={{ justifyContent: "center" }}>
  {filteredProducts.length > 0 ?  filteredProducts.map((product) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={product._id}
      sx={{
        maxWidth: "300px",
        minWidth: "300px",
      }}
    >
      <Card
        sx={{
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: theme.shadows[6],
          },
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={product.imageCover || "default_image_path"}
          alt={product.title}
          sx={{
            objectFit: "cover",
            borderRadius: "12px 12px 0 0",
          }}
        />
        <CardContent sx={{ padding: "16px" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            {product.title}
          </Typography>

          {/* Category and Subcategory with Icons */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CategoryIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "medium" }}
            >
              {product.category.name}
            </Typography>
          </Box>

          {product.subcategories?.name && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LabelIcon sx={{ mr: 1, color: theme.palette.primary.light }} />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: "medium" }}
              >
                {product.subcategories?.name}
              </Typography>
            </Box>
          )}

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            ${product.price}
          </Typography>

          <Rating
            value={product.ratingQuantity}
            readOnly
            precision={0.5}
            size="small"
          />

          {/* Timestamp - When the product was added */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              mt: 1,
              fontSize: "0.85rem",
              color: theme.palette.text.secondary,
            }}
          >
            Added on: {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "Un Known"}
          </Typography>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box>
            <Tooltip title="Share Product" placement="top">
              <IconButton onClick={()=>{singleProductMutation.mutate(product._id)}} aria-label="share">
                <InfoIcon sx={{ color: theme.palette.info.main }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </Grid>
  )):
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
    <Lottie
      autoplay
      loop
      animationData={animationData}
      style={{ height: '270px',}}
     
    />
   
  </div>


}
</Grid>
</Box>
  )
}

export default ProductOverView
