import {  Line   } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
 
    
  } from 'chart.js';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Spinner from './spinner/Spinner';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  );

function ChartRevenue() {


const [allProducts, setallProducts] = useState([])


const getAllProducts = async () => {
    const {data} = await axios.get("http://localhost:3000/api/v1/products");
    return data;
}

const { isLoading} = useQuery(["all-Products"], getAllProducts, {
    onSuccess: (data) => {  
        setallProducts(data.data.documents);
    },  
    onError: (error) => {
        toast.error(error.message);
    },
   
})  
if (isLoading) {
    return <Spinner/>;
  
}

let getTitlesAndCountsSold = allProducts.reduce((acc, product) => {
  acc[product.title]= product.sold ;
  return acc;
}, {});

let labels = Object.keys(getTitlesAndCountsSold);
let data = Object.values(getTitlesAndCountsSold);



    const dataa = {
        labels: labels,
        datasets: [
          {
            label: 'sold',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)',
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
    
      return     < Line   data={dataa} options={options} />;
}

export default ChartRevenue
