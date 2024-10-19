import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, useTheme } from "@mui/material"
import { useState } from "react";
import  Grid  from '@mui/material/Grid2';
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from './spinner/Spinner';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lottie from 'lottie-react';
import animationData from './Animation - 1729108841489 (1).json'

function CouponTable() {

    const theme = useTheme();
    const [coupons, setCoupons] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState('name');
    const [newCoupon, setNewCoupon] = useState({ name: '', expire: '', discount: '' });
    const queryClient = useQueryClient();
 
const {isLoading} = useQuery(["allCoupons"], async() => {
const {data } =   await axios.get('http://localhost:3000/api/v1/coupons',{withCredentials: true})
return data
},
{
  onSuccess: (data) => {
    setCoupons(data.data);

    
  },
  onError: (error) => {
    toast.error(error.message);
  },
  refetchOnWindowFocus: false,

}

)


const handleAddOrEditCoupon = useMutation(
  async (coupon) => {
  if (coupon._id) {
      await axios.put(`http://localhost:3000/api/v1/coupons/${coupon._id}`,coupon,{withCredentials: true})
  }else{
    await axios.post(`http://localhost:3000/api/v1/coupons`,coupon,{withCredentials: true})
  }
},{
  onSuccess: () => {
    toast.success(newCoupon._id? "Coupon updated successfully":"Coupon added successfully");
    setNewCoupon({  name: '', expire: '', discount: '' });
    queryClient.invalidateQueries(["allCoupons"]);

  },onError: (error) => {
    toast.error( error.response?.data?.error?._message || error.message);
  }
}
)


const handleDeleteCoupon = useMutation(async({id}) => {
  await axios.delete(`http://localhost:3000/api/v1/coupons/${id}`,{withCredentials: true})
},{
  onSuccess: () => {
    toast.success("Coupon deleted successfully");
    queryClient.invalidateQueries(["allCoupons"]);
  },
  onError: (error) => {
    toast.error( error.response?.data?.error?._message || error.message);
  }
}
)




if (isLoading) {
  return <Spinner/>;
}



 // Handle edit button click
//  const handleEdit = (coupon) => {
//   setNewCoupon({...coupon});
  
// };

    // Handle adding or editing a coupon

 const handleSaveCoupon = () => {
    handleAddOrEditCoupon.mutate(newCoupon);
  };


const deleteCoupon = async (id) => {
  handleDeleteCoupon.mutate({id})
}



  // Handle sorting
  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  // Sort coupons based on selected column
  const sortedCoupons = [...coupons].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

 


  
   
  const formatDate = (date) => {
    const d = new Date(date);
  const formated = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

    const [month, day, year] = formated.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };




  return (
    <Box sx={{ padding: '20px',  borderRadius: '16px',  }}>
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
     

    <Box sx={{ padding: 2 }}>
     
      <TextField
        label="Filter Coupons"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ marginBottom: 2, width: '100%' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Coupon Name
                </TableSortLabel>
              </TableCell>
              <TableCell >
                <TableSortLabel
                  active={sortBy === 'expire'}
                  direction={sortBy === 'expire' ? sortDirection : 'asc'}
                  onClick={() => handleSort('expire')}
                >
                  Expiration Date
                </TableSortLabel>
              </TableCell >
              <TableCell >
                <TableSortLabel
                  active={sortBy === 'discount'}
                  direction={sortBy === 'discount' ? sortDirection : 'asc'}
                  onClick={() => handleSort('discount')}
                >
                  Discount (%)
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {sortedCoupons.filter((coupon) => coupon.name.toLowerCase().includes(filter.toLowerCase())).length > 0 ? (
    sortedCoupons
      .filter((coupon) => coupon.name.toLowerCase().includes(filter.toLowerCase()))
      .map((coupon) => (
        <TableRow key={coupon._id}>
          <TableCell>{coupon.name}</TableCell>
          <TableCell>{formatDate(coupon.expire)}</TableCell>
          <TableCell>{coupon.discount}</TableCell>
          <TableCell align="right">
            <Button
              variant="contained"
              sx={{ bgcolor: theme.palette.major.main, m: 1 }}
              onClick={() => setNewCoupon({ ...coupon, expire: formatDate(coupon.expire) })}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                deleteCoupon(coupon._id);
              }}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
    <Lottie
      autoplay
      loop
      animationData={animationData}
      style={{ height: '270px',}}
     
    />
 
  </div>
  )}
</TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 3 }}>
        {/* <Typography variant="h6" sx={{ marginBottom: 2, display: "flex" , alignItems:"center",gap:1}}>  Coupon  </Typography> */}
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Coupon Name"
              variant="outlined"
              value={newCoupon.name}
              onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Expiration Date"
              variant="outlined"
              type="date"
              value={newCoupon.expire}
              onChange={(e) => setNewCoupon({ ...newCoupon, expire: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Discount (%)"
              variant="outlined"
              type="number"
              value={newCoupon.discount}
              onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
              fullWidth
            />
          </Grid>
        </Grid>
        {/* <Button variant="contained" color="primary" onClick={handleSaveCoupon} sx={{bgcolor:theme.palette.major.main}}>
          {newCoupon._id ? 'Update Coupon' : (<CreateIcon />  )}
        </Button> */}
         { newCoupon._id ? <Button variant="contained" sx={{bgcolor:theme.palette.major.main}} onClick={handleSaveCoupon} startIcon={<CreateIcon  />}>
         Update Coupon
          </Button> :<Button variant="contained" sx={{bgcolor:theme.palette.major.main}} onClick={handleSaveCoupon} startIcon={<AddCircleOutlineIcon  />}>
           add Coupon
          </Button>}
      </Box>
    </Box>

   
   </Paper>
 </Box>
  )
}

export default CouponTable
