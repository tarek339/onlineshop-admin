import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeAdminUser } from '../redux/adminUserSlice';
import { useDispatch } from "react-redux";

function NavBar() {
    const navigate = useNavigate()
    const adminUser = useSelector((state) => state.adminUser.adminUser)
    const dispatch = useDispatch()
  return (
    <div className='navbar'>
    {adminUser && <button className="nav-button" onClick={()=>{navigate("/")}}>Produkte</button>}
    {adminUser && <button className="nav-button" onClick={()=>{navigate("/add-product")}}>Hinzufügen</button>}
    {adminUser && <button className='nav-button' fontSize="medium" onClick={() => {
      localStorage.removeItem("token")
      dispatch(removeAdminUser())
      navigate('/sign-in')
    }}>Ausloggen</button>}
    {!adminUser && <button className="nav-button" onClick={()=>{navigate("/sign-in")}}>Einloggen</button>}
    </div>
  )
}

export default NavBar