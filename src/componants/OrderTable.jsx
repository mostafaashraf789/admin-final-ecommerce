import {
  Avatar,
    Box,
    IconButton,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
  } from "@mui/material";
  import  { useState } from "react";
  import Fade from "@mui/material/Fade";
  import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import Backdrop from "@mui/material/Backdrop";
  import CoPresentIcon from "@mui/icons-material/CoPresent";
  import { Delete } from "@mui/icons-material";
  import PersonIcon from "@mui/icons-material/Person";
  import DateRangeIcon from "@mui/icons-material/DateRange";
  import PlaceIcon from "@mui/icons-material/Place";
  import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import Spinner from "./spinner/Spinner";
import Modal from "@mui/material/Modal";  
import OrderDetails from "./OrderDetails";
  // const initialOrders = [
  //   {
  //     id: 1,
  //     client: "Sophie Moore",
  //     profilePicture:"image",
  //     email: "contact@sophiemoore.com",
  //     date: "Jan 27, 2024",
  //     status: "Canceled",
  //     country: "United Kingdom",
  //     total: 5870.32,
  //   },
  //   {
  //     id: 2,
  //     client: "Matt Cannon",
  //     profilePicture:"image",
  //     email: "info@mattcannon.com",
  //     date: "Jan 24, 2024",
  //     status: "Delivered",
  //     country: "Australia",
  //     total: 13899.48,
  //   },
  //   {
  //     id: 3,
  //     client: "Graham Hills",
  //     profilePicture:"image",
  //     email: "hi@grahamhills.com",
  //     date: "Jan 21, 2024",
  //     status: "Pending",
  //     country: "India",
  //     total: 1569.12,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },
  //   {
  //     id: 4,
  //     client: "Sandy Houston",
  //     profilePicture:"image",
  //     email: "contact@sandyhouston.com",
  //     date: "Jan 18, 2024",
  //     status: "Delivered",
  //     country: "Canada",
  //     total: 899.16,
  //   },

  // ];
  function OrderTable() {
    const theme = useTheme();
    const [orders, setOrders] = useState([]); // Replace with async fetch call
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6; // Number of rows per page
    const queryClient = useQueryClient();
    const [getOneOrder, setgetOneOrder] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 500, md: 800 },
  maxHeight: { xs: 800, md: 800 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

// get One order
const getOneOrderMutation = useMutation(
  async (id) => {
    return await axios.get(
      `http://localhost:3000/api/v1/orders/${id}`,

      { withCredentials: true }
    );
  },
  {
    onSuccess: (data) => {
      setgetOneOrder(data.data.data);
      handleOpen();
    },
    onError: (error) => {
      toast.error(` Failed to get order :${error.message}`);
    },
  }
);

console.log(getOneOrder);





    const getAllOrders = async () => {
  const {data} = await axios.get("http://localhost:3000/api/v1/orders",{withCredentials: true});
  return data;
}

const {isLoading} = useQuery(["getOrders"], getAllOrders,{
  onSuccess:(data) => {
    setOrders(data.data);






    
  
  },
  onError: (error) => {
    toast.error(error.message);
  },
  refetchOnWindowFocus: false,
  
});



const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}






    // Handle page change
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
  
    
   


    const updateOrderDelveredMutation = useMutation(async ( {id,isDelivered }) => {
        return await axios.put(`http://localhost:3000/api/v1/orders/${id}/deliver`,{isDelivered}, {withCredentials: true});
    },{
        onSuccess: (data) => {
            toast.success(data.message);
            // handleStatusChange(id, status);
            queryClient.invalidateQueries(["getOrders"])
          },
          onError: (error) => {
            toast.error(error.message);
          },
         
    }
  
  );

    const updateOrderCanceledMutation = useMutation(async ({ id, isCanceled } ) => {
        return await axios.put(`http://localhost:3000/api/v1/orders/${id}/cancel`,{isCanceled}, {withCredentials: true});
    },{
        onSuccess: (data) => {
            toast.success(data.message);
            // handleStatusChange(id, status);
            queryClient.invalidateQueries(["getOrders"])
          },
          onError: (error) => {
            toast.error(error.message);
          },
         
    }
  
  );


const handleStatusChange = (id, newStatus) => {
  // Check the new status and perform the corresponding mutation
  if (newStatus === "Delivered") {
    updateOrderDelveredMutation.mutate({id,isDelivered:true});
  } else if (newStatus === "Canceled") {
    updateOrderCanceledMutation.mutate({id,isCanceled:true});
  }

  // Update local state to reflect changes
  const updatedOrders = orders.map((order) =>
      order._id === id
          ? {
              ...order,
              isDelivered: newStatus === "Delivered",
              isCanceled: newStatus === "Canceled",
            }
          : order
  );

  setOrders(updatedOrders);
};


    // Handle delete order
    const handleDelete = (id) => {
      const filteredOrders = orders.filter((order) => order._id !== id);
      setOrders(filteredOrders);
    };
    if (isLoading) {
      return <Spinner/>
    }
    
    
    const currentRows = orders.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    return (
      <Box sx={{ p: 3, flexGrow: 1 }}>


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
          <OrderDetails order={getOneOrder} />
            </Box>
          </Fade>
        </Modal>
      </div>














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
              Order Status
            </Typography>
            <Typography sx={{ fontSize: 13 }}>
              <CoPresentIcon
                sx={{color:theme.palette.major.main, fontSize: "30px" }}
              />
            </Typography>
          </Box>
  
          <Box>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "600px", minHeight: "400px" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell sx={{ fontWeight: "bold" }}>Order </TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: "5px" }}
                      >
                        Client <PersonIcon />
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: "5px" }}
                      >
                        delivered
                        <DateRangeIcon />
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: "5px" }}
                      >
                        Status <CheckBoxIcon />
                      </Stack>
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: "bold" }}>
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: "5px" }}
                      >
                        country <PlaceIcon />
                      </Stack>
                    </TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length > 0 ? (
                    currentRows.map((order) => (
                      <TableRow key={order._id}>
                        {/* <TableCell>#{order.length}</TableCell> */}
                        <TableCell >
                          <Stack direction="row" alignItems="center" gap={2}>
                        <Avatar src={order.user.profilePicture} alt={order.user.name} />
                          <Stack>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {order.user.name}
                          </Typography>
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            {order.user.email}
                          </Typography>
                          </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <Select
                            value={!order.isCanceled && !order.isDelivered ? 'Pending' : order.isCanceled ? 'Canceled' :'Delivered' }
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }


                            sx={{
                              color:
                                order.isDelivered === true
                                  ? "green"
                                  : order.isCanceled === true
                                  ? "red"
                                  : "orange",
                              width: "100%",
                            }}
                          >
                            <MenuItem value="Delivered">Delivered</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Canceled">Canceled</MenuItem>
                          </Select>
                        </TableCell>
                        {/* <TableCell>{order.country}</TableCell> */}
                        <TableCell>${order.totalOrderPrice.toLocaleString()}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(order._id)}
                          >
                            <Delete />
                          </IconButton>
                          <IconButton
                          aria-label="Example"
                         onClick={()=>getOneOrderMutation.mutate(order._id)}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <p>No Orders</p>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
  
            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Pagination
                count={Math.ceil(orders.length / rowsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  button: { color:theme.palette.common.main },
                  "& .Mui-selected": { backgroundColor: theme.palette.bgBtn.main },
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
  
  export default OrderTable;
  