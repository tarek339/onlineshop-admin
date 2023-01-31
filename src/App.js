import { Grid, Typography } from '@mui/material';
import './App.css';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import {Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn';
import ProductListing from './pages/ProductListing';
import ProductProfile from './pages/ProductProfile';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import VerifyEmail from './pages/VerifyEmail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addAdminUser } from './redux/adminUserSlice';
import axios from 'axios';
import NavBar from './components/NavBar';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const emailVerified = useSelector((state) => state.adminUser.adminUser?.emailVerified)
  const adminUser = useSelector((state) => state.adminUser.adminUser)

  useEffect(() => {
    axios.get("/admin-user/admin-profile")
    .then((res) => {
      dispatch(addAdminUser(res.data))
      setLoading(false)
    })
    .catch((error) => {
      dispatch(addAdminUser(null))
      setLoading(false)
      console.log(error)
    })
}, [dispatch])   

if(loading) {
  return(
    <Typography>Laden...</Typography>
  )
}

  return (
    <div className="App">
      <header>
      <Grid container direction="row" justifyContent="space-between">
        <Grid>
          <Typography variant='h4'>Admin Webshop</Typography>
        </Grid>
        <Grid>
          <NavBar/>
        </Grid>
      </Grid>
      </header>
      {(adminUser && emailVerified) || !adminUser?
      <Routes>
        <Route exact path='/' element = {<ProductListing/>} />
        <Route exact path='/sign-in' element = {<SignIn/>} />
        <Route exact path='/sign-up' element = {<SignUp/>} />
        <Route exact path='/add-product' element = {<AddProduct/>} />
        <Route exact path='/product-profile/:id' element = {<ProductProfile/>} />
        <Route exact path='/edit-product' element = {<EditProduct/>} />
        <Route path='*' element = {<NotFound/>} />
      </Routes>:<Typography variant='h4'>Bitte E-Mail verifizieren</Typography>}
      <Routes>
      <Route exact path='/verify-email' element = {<VerifyEmail/>} />
      </Routes>
    </div>
  );
}
export default App;