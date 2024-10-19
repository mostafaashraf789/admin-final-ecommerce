import {
  Avatar,
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Spinner from "./spinner/Spinner";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ReviewTable() {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  const theme = useTheme();
  const [reviews, setReviews] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("rating");
  const queryClient = useQueryClient();

  const { isLoading } = useQuery(
    ["allReviews"],
    async () => {
      return await axios.get("http://localhost:3000/api/v1/reviews", {
        withCredentials: true,
      });
    },
    {
      onSuccess: (data) => {
        setReviews(data.data);
   
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const handleDeleteMutation = useMutation(
    async ({ id }) => {
      await axios.delete(`http://localhost:3000/api/v1/reviews/${id}`, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        toast.success("Review deleted successfully");
        queryClient.invalidateQueries(["allReviews"]);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || error.message);
      },
    }
  );
  const handleDelete = (id) => {
    handleDeleteMutation.mutate({ id });
  };

  if (isLoading) {
    return <Spinner />;
  }

  // Handle sorting
  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  // Handle delete review

  // Sort reviews based on selected column
  const sortedReviews = [...reviews].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ padding: "20px", borderRadius: "16px" }}>
      <Paper sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ padding: 2 }}>
          {/* <Typography variant="h4" gutterBottom>
            Reviews Management
          </Typography> */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "user_id"}
                      direction={sortBy === "user_id" ? sortDirection : "asc"}
                      onClick={() => handleSort("user_id")}
                    >
                      Reviewer
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "product_id"}
                      direction={
                        sortBy === "product_id" ? sortDirection : "asc"
                      }
                      onClick={() => handleSort("product_id")}
                    >
                      Product
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "rating"}
                      direction={sortBy === "rating" ? sortDirection : "asc"}
                      onClick={() => handleSort("rating")}
                    >
                      Rating
                    </TableSortLabel>
                  </TableCell>
                  <TableCell> Review</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedReviews.map((review) => (
                  <TableRow key={review._id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Avatar
                          alt={review.user_id.username}
                          src={review.user_id.profilePicture}
                        />
                        {review.user_id.username}
                      </Stack>
                    </TableCell>
                    <TableCell>{review.product_id?.title || "-"}</TableCell>
                    <TableCell>
                      {" "}
                      <StyledRating
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        name="customized-color"
                        defaultValue={review.rating}
                        precision={review.rating}
                        readOnly
                       
                      />
                    </TableCell>
                    <TableCell>{review.comment}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(review._id)}
                        sx={{ bgcolor: theme.palette.major.main }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
}

export default ReviewTable;
