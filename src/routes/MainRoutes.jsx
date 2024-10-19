import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '../layout/RootLayout';
import MainPage from '../pages/mainPage';
import ManageUsers from './../pages/manageUSers/index';
import ManageCoupon from './../pages/manageCoupon/index';
import ManageRewiew from '../pages/manageReview';
import AddProducts from '../pages/addProducts';
import LogIn from '../pages/logIn';
import PrivateRoute from './../componants/PrivateRoute';
import ProfilePage from '../pages/profilePage';
import ProductsOverView from './../pages/productsOverView/index';
import AddCategory from './../pages/addCategory/index';
import NotFoundPAge from '../componants/NotFoundPAge';

 




function MainRoutes() {
  return <BrowserRouter>
   
      <Routes>
        <Route path='/LogIn' element={<LogIn />} />
     <Route element={<PrivateRoute />} >
       
        <Route path='/' element={<RootLayout />}>

        <Route path='/' element={<MainPage />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/coupons' element={<ManageCoupon />} />
        <Route path='/reviews' element={<ManageRewiew />} />
        <Route path='/Add-Product' element={<AddProducts />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/overview' element={<ProductsOverView />} />
        <Route path='/Resources' element={<AddCategory />} />
        
        </Route>
        <Route path='*' element={<NotFoundPAge/>} />


        </Route>
      </Routes>
    </BrowserRouter> 
  
}

export default MainRoutes
