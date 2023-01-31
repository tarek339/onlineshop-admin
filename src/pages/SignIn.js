import React, { useState } from "react";
import { Alert, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { addAdminUser } from "../redux/adminUserSlice";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const handleClick = () => {
      setOpen(true);
    };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
  }
  setOpen(false)
  }
  
  return (
      <div>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
      }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert variant="filled" severity="error">{message}</Alert>
      </Snackbar>
      <div className="head">
      <Typography variant="h4" >
          Anmelden oder
        <button className="sign-button" onClick={() => navigate('/sign-up')} >regestrieren</button>
        </Typography>
      </div>
      <div className="form">
      <form onSubmit={(e) => {
          e.preventDefault()
          axios.post("/admin-user/sign-in", {email, password})
          .then((res) => {
              console.log(res.data)
              localStorage.setItem("token", res.data.token)
                dispatch(addAdminUser(res.data.adminUser))
          })
          .then(() => {
            navigate('/')
        })
          .catch((err) => {
              console.log(err.response.data.message)
              handleClick(
                  setMessage(err.response.data.message)
              )
              
          })
      }}>
          <TextField
          className="TextField-without-border-radius"
          margin="normal"
          size="small"
          color="warning"
          fullWidth
          label="* E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          />
          <TextField
          className="TextField-without-border-radius"
          margin="normal"
          size="small"
          color="warning"
          fullWidth
          label="* Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">Log in</button>
          <Typography style={{textAlign:"right"}}>* Pflichtfelder</Typography>
      </form>
      </div>
      </div>
  )
}