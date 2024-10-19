import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Chip,
  Tooltip,
  TextField,
  useTheme,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Lottie from "lottie-react";
import animationData from "./Animation - 1729108841489 (1).json";

import { Delete, Block } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import toast from "react-hot-toast";
import Spinner from "./spinner/Spinner";

import Modal from "@mui/material/Modal";
import OneUserModal from "./OneUserModal";

function UsersTable() {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [getOneUser, setgetOneUser] = useState({});
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 500, md: 900 },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getAllUSers = async () => {
    const { data } = await axios.get("http://localhost:3000/api/v1/users", {
      withCredentials: true,
    });
    return data;
  };

  const { isLoading } = useQuery(["allUsers"], getAllUSers, {
    onSuccess: (data) => {
      setUsers(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getOneUserMutation = useMutation(
    async (id) => {
      return await axios.get(
        `http://localhost:3000/api/v1/users/${id}`,

        { withCredentials: true }
      );
    },
    {
      onSuccess: (data) => {
        setgetOneUser(data.data.data);
      },
      onError: (error) => {
        toast.error(` Failed to get user :${error.message}`);
      },
    }
  );

  const handleActiveMutation = useMutation(
    async ({ id, active }) => {
      return await axios.put(
        `http://localhost:3000/api/v1/users/active/${id}`,
        { active },
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        toast.success("User status updated successfully");
        queryClient.invalidateQueries(["allUsers"]);
      },
      onError: (error) => {
        toast.error(` Failed to update user :${error.message}`);
      },
    }
  );

  // Handle active status change
  const handleActiveChange = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    handleActiveMutation.mutate({ id, active: newStatus });
  };

  const handleBlockMutation = useMutation(
    async ({ id, isBlocked }) => {
      await axios.put(
        `http://localhost:3000/api/v1/users/block/${id}`,
        { blocked: isBlocked },
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        toast.success("User status updated successfully");
        queryClient.invalidateQueries(["allUsers"]);
      },
      onError: (error) => {
        toast.error(` Failed to block user :${error.message}`);
      },
    }
  );

  const handleBlockUser = (id, isBlocked) => {
    const newStatus = !isBlocked;

    handleBlockMutation.mutate({ id, isBlocked: newStatus });
  };

  const handleDeleteMutation = useMutation(
    async ({ id }) => {
      return await axios.delete(
        `http://localhost:3000/api/v1/users/delete-user/${id}`,
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        toast.success("User deleted successfully");
        queryClient.invalidateQueries(["allUsers"]);
      },
      onError: (error) => {
        toast.error(` Failed to delete user :${error.message}`);
      },
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  // Handle blocking/unblocking users

  // Handle delete user
  const handleDeleteUser = (id) => {
    handleDeleteMutation.mutate({ id });
  };

  // Search Bar
  const handleSearchChange = (e) => {
    setSearchData(e.target.value.toLowerCase().trim());
  };

  // handle Search

  // handleSearch()
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase() || "").includes(searchData) ||
      (user.email?.toLowerCase() || "").includes(searchData) ||
      (user.role?.toLowerCase() || "").includes(searchData)
  );

  return (
    <Box sx={{ padding: "20px", borderRadius: "16px" }}>
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
              <OneUserModal
                username={getOneUser?.name || getOneUser?.username}
                email={getOneUser?.email}
                phone={getOneUser?.phone}
                profilePicture={getOneUser?.profilePicture}
                addresses={getOneUser?.addresses}
                role={getOneUser?.role}
                wishlist={getOneUser?.wishlist}
              />
            </Box>
          </Fade>
        </Modal>
      </div>
      <Paper sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          {/* Search Bar */}
          <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            onChange={handleSearchChange}
          />
        </Box>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    Name
                  </TableCell>

                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Active
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Blocked
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Role
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: theme.palette.bgBtn.main,
                        },
                      }}
                    >
                      <TableCell sx={{ textAlign: "center" }}>
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Avatar alt={user.name} src={user.profilePicture} />
                          <Stack direction="column" alignItems="flex-start">
                            <Typography sx={{ fontWeight: "bold" }}>
                              {user.name || user.username}
                            </Typography>
                            <Typography>{user.email}</Typography>
                          </Stack>
                        </Stack>
                      </TableCell>

                      {/* Active Status */}
                      <TableCell sx={{ textAlign: "center" }}>
                        <Switch
                          checked={user.active}
                          onChange={() =>
                            handleActiveChange(user._id, user.active)
                          }
                          sx={{
                            "& .MuiSwitch-track": {
                              backgroundColor: user.active ? "green" : "red",
                            },
                          }}
                        />
                      </TableCell>

                      {/* Blocked Status */}
                      <TableCell sx={{ textAlign: "center", width: "200px" }}>
                        <Tooltip
                          title={user.blocked ? "Unblock User" : "Block User"}
                        >
                          <IconButton
                            color={user.blocked ? "error" : "default"}
                            onClick={() =>
                              handleBlockUser(user._id, user.blocked)
                            }
                            sx={{ color: user.blocked ? "error" : "#B0BEC5" }}
                          >
                            <Block />
                          </IconButton>
                        </Tooltip>
                        {user.blocked ? (
                          <Chip label="Blocked" color="error" sx={{ ml: 1 }} />
                        ) : (
                          <Chip label="Active" color="success" sx={{ ml: 1 }} />
                        )}
                      </TableCell>

                      {/* Role Management */}
                      <TableCell sx={{ textAlign: "center" }}>
                        {user.role === "admin" ? (
                          <Stack
                            sx={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              p: 0.5,
                              gap: 0.5,
                              borderRadius: 2,
                              textAlign: "center",
                              bgcolor: theme.palette.primary.dark,
                            }}
                          >
                            admin
                            <AdminPanelSettingsOutlinedIcon
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          </Stack>
                        ) : user.role === "user" ? (
                          <Stack
                            sx={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              p: 0.5,
                              gap: 0.5,
                              borderRadius: 2,
                              textAlign: "center",
                              bgcolor: theme.palette.secondary.dark,
                            }}
                          >
                            User
                            <AccessibilityNewIcon
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          </Stack>
                        ) : (
                          <Stack
                            sx={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              p: 0.5,
                              gap: 0.5,
                              borderRadius: 2,
                              textAlign: "center",
                              bgcolor: theme.palette.error.light,
                            }}
                          >
                            Seller
                            <AdminPanelSettingsOutlinedIcon
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          </Stack>
                        )}
                      </TableCell>

                      {/* Actions: Edit, Delete */}
                      <TableCell sx={{ textAlign: "center" }}>
                        <Tooltip title="Delete User">
                          <IconButton
                            aria-label="delete"
                            sx={{ color: "#B0BEC5" }}
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          aria-label="Example"
                          onClick={() => {
                            handleOpen();
                            getOneUserMutation.mutate(user._id);
                          }}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <Lottie
                      autoplay
                      loop
                      animationData={animationData}
                      style={{ height: "270px" }}
                    />
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
}

export default UsersTable;
