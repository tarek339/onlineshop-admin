import React, { useState } from "react";
import { TextField, 
         Typography, 
         Alert, 
         Snackbar
        } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addAdminUser } from "../redux/adminUserSlice"

export default function SignUp() {
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

    return(
        <div className="sign-body">
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
        <Typography variant="h4" >Regestrieren</Typography>
        </div>
        <div className="form">
        <form onSubmit={(e) => {
            e.preventDefault()
            axios.post("/admin-user/sign-up", {
                email,
                password
            })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                dispatch(addAdminUser(res.data.adminUser))
            })
            .then(() => {
              navigate('/')
          })
            .catch((error) => {
                console.log(error.response.data.message)
                handleClick(
                    setMessage(error.response.data.message)
                )
            })
        }}>
            <TextField
            className="TextField-without-border-radius"
            margin="normal"
            fullWidth
            size="small"
            color="warning"
            label="* E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
            className="TextField-without-border-radius"
            margin="normal"
            fullWidth
            size="small"
            color="warning"
            label="* Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">Regestrieren</button>
            <Typography style={{textAlign:"right"}}>* Pflichtfelder</Typography>
        </form>
        </div>
        </div>
    )
}