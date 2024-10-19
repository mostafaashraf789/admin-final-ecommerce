import  { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { 
  Box, Typography, Button , TextField, Stack, 
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme
} from '@mui/material';
import { Category as CategoryIcon, Add as AddIcon, Store as StoreIcon } from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';
import Grid from  '@mui/material/Grid2'
import Spinner from './spinner/Spinner';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TurnedInIcon from '@mui/icons-material/TurnedIn';


function AddResources() {

const theme = useTheme();

const fetchCategories = async () => {
  const { data } = await axios.get('http://localhost:3000/api/v1/categories', {
    withCredentials: true,
  });
  return data.data.documents;
};

const fetchSubcategories = async () => {
  const { data } = await axios.get('http://localhost:3000/api/v1/subcategories', {
    withCredentials: true,
  });
  return data.data.documents;
};

const fetchBrands = async () => {
  const { data } = await axios.get('http://localhost:3000/api/v1/brands', {
    withCredentials: true,
  });
  return data.data.documents;
};



const addResource = async ({ type, name }) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/${type}`,
    { name },
    { withCredentials: true }
  );
  return response.data;
};

const addSubcategory = async ({ categoryId, name }) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/categories/${categoryId}/subcategories`,
    {  name },
    { withCredentials: true }
  );
  return response.data;
};
const { mutate: addSubcategoryMutation  } = useMutation(addSubcategory, {
  onSuccess: (data) => {
    queryClient.invalidateQueries(newResource.type);
    toast.success(`${newResource.type} added successfully!`);
    setNewResource({ type: '', name: '' });
  },
  onError: (error) => {
    toast.error('Resource already exists!');
  },
});



const queryClient = useQueryClient();
const [newResource, setNewResource] = useState({ type: '', name: '' });

const { data: categories, isLoading: loadingCategories } = useQuery(
  ['categories'],
  fetchCategories
);
const { data: subcategories, isLoading: loadingSubcategories } = useQuery(
  ['subcategories'],
  fetchSubcategories
);
const { data: brands, isLoading: loadingBrands } = useQuery(['brands'], fetchBrands);

const { mutate: addNewResource } = useMutation(addResource, {
  onSuccess: (data) => {
    queryClient.invalidateQueries(newResource.type);
    toast.success(`${newResource.type} added successfully!`);
    setNewResource({ type: '', name: '' });
  },
  onError: (error) => {
    toast.error('Resource already exists!');
  },
});


const deleteResource = async ({ type, id }) => {
  const response = await axios.delete(`http://localhost:3000/api/v1/${type}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
const { mutate: removeResource } = useMutation(deleteResource, {
  onSuccess: () => {
    queryClient.invalidateQueries(); // Refresh all queries after deletion
    toast.success('Resource deleted successfully!');
  },
  onError: (error) => {
    toast.error('Failed to delete resource');
  },
});


const handleAddResource = () => {
  if (newResource.name && newResource.type) {
    addNewResource(newResource);
  } else {
    toast.error('Please fill in all fields!');
  }
};

const handleDeleteResource = (type, id) => {
  removeResource({ type, id });
};

// Handle input change
const handleChange = (e) => {
  setNewResource((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

if (loadingCategories || loadingSubcategories || loadingBrands) {
  return <Spinner />;
}

return (
  <Box sx={{ p: 4 }}>
    {/* Form for adding new resource */}
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <TextField
        select
        label="Resource Type"
        name="type"
        value={newResource.type}
        onChange={handleChange}
        SelectProps={{ native: true }}
        sx={{ minWidth: 150 }}
      >
        <option value="">Select Type</option>
        <option value="categories">Category</option>
        <option value="subcategories">Subcategory</option>
        <option value="brands">Brand</option>
      </TextField>
      <TextField
        label="Resource Name"
        name="name"
        value={newResource.name}
        onChange={handleChange}
        sx={{ flex: 1 }}
      />
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddResource}>
        Add
      </Button>
    </Stack>

    {/* Categories Table */}
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{color :theme.palette.major.main}}>
        Categories <CategoryIcon/>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Category Name</TableCell> */}
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.length ? (
              categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell sx={{ fontWeight: 'bold',fontSize: '18px' }}>{category.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteResource('categories', category._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography>No categories available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    {/* Subcategories Table */}
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{color :theme.palette.major.main}}>
        Subcategories <TurnedInIcon/>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Subcategory Name</TableCell> */}
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {subcategories?.length ? (
              subcategories.map((subcategory) => (
                <TableRow key={subcategory._id}>
                  <TableCell sx={{ fontWeight: 'bold',fontSize: '18px' }}>{subcategory.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteResource('subcategories', subcategory._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography>No subcategories available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    {/* Brands Table */}
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{color : theme.palette.major.main}}>
        Brands <PinterestIcon/>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Brand Name</TableCell> */}
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {brands?.length ? (
              brands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell sx={{ fontWeight: 'bold',fontSize: '18px' }}>{brand.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteResource('brands', brand._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography>No brands available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>
  )
}

export default AddResources
