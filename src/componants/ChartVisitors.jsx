// import { Line   } from 'react-chartjs-2';
import { Bar   } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
 
    
  } from 'chart.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useState } from 'react';
import Spinner from './spinner/Spinner';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    
  );
function ChartVisitors() {
const [allUsers, setallUsers] = useState([]);

const getAllUsers = async () => {
  const {data} = await axios.get("http://localhost:3000/api/v1/users/",{withCredentials: true});
  return data;
};

const { isLoading} = useQuery(["allUsers"], getAllUsers, {
  retry: false, // Disable automatic retries
  refetchOnWindowFocus: false,
  // refetchOnReconnect: false,
  onSuccess: (data) => {
    setallUsers(data);
  },
  onError: (error) => {
    toast.error(error.message);
  },
 
});
if (isLoading) {
  return <Spinner/>;
}

const filterdUsers = allUsers.filter((user) => user.role === "user");

const filterdSellers = allUsers.filter((user) => user.role === "seller");

    const dataa = {
        labels: ['Sellers', 'Customers'],
        datasets: [
          {
            label: 'visitors',
            data: [filterdSellers.length, filterdUsers.length],
            backgroundColor: [
              'rgba(75, 0, 235, 0.2)',  // Color for Sellers
              'rgba(75, 192, 192, 0.2)',  // Color for Customers
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',    // Border color for Sellers
              'rgba(75, 192, 192, 1)',    // Border color for Customers
            ],
            borderWidth: 1.5,
            hoverBackgroundColor: [
              'rgba(54, 162, 235, 0.5)',  // Hover color for Sellers
              'rgba(75, 192, 192, 0.5)',  // Hover color for Customers
            ],
          },

        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          tooltip: {
           
          },
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',
              font: {
                size: 14,
              },
            },
          },
          title: {
            display: false,
            text: '',
          },
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutQuad',
        },
      };
    
      return     < Bar   data={dataa} options={options} />;
}

export default ChartVisitors
