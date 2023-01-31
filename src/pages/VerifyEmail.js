import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addAdminUser } from '../redux/adminUserSlice'

export default function VerifyEmail() {
const [search] = useSearchParams()
console.log(search.get("token"))
const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(() => {

    axios.post("/admin-user/verify-admin-email", {token: search.get("token")})
    .then((res) => {
        console.log(res.data)
        dispatch(addAdminUser(res.data))
        navigate("/")
    })
    .catch((err) => {
        console.log(err)
    })
}, [search, dispatch, navigate])
  return (
    <div>
        <Typography variant='h4'>Verifiziere deine E-Mail</Typography>
    </div>
  )
}