import { Alert, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios";
import { addProduct } from '../redux/productSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import withRestriction from '../hoc/withRestriction'

function AddProduct() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

        // Snackbar function
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
        // Snackbar function end

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

        <div className='head'>
            <Typography variant='h4'>Produkt hinzufügen</Typography>
        </div>
        <div className='form'>
        <form onSubmit={(e) => {
            e.preventDefault()
            axios.post("/products", {
                name,
                description,
                quantity : + quantity,
                image,
                price : +price
            })
            .then((res) => {
                console.log(res.data)
                dispatch(addProduct(res.data.product))
            })
            .then(
                () => {navigate("/")}
            )
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
            label="* Produktname"
            color="warning"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            />
        <TextField
            className="TextField-without-border-radius"
            margin="normal"
            size="small"
            label="* Beschreibung"
            color="warning"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
            className="TextField-without-border-radius"
            margin="normal"
            size="small"
            label="* Menge"
            color="warning"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
            className="TextField-without-border-radius"
            margin="normal"
            size="small"
            label="* Bild"
            color="warning"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
        />
        <TextField
            className="TextField-without-border-radius"
            margin="normal"
            size="small"
            label="* Preis"
            color="warning"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
        <button className='button' type="submit">Senden</button>
        </form>
        </div>
    </div>
  )
}

export default withRestriction(AddProduct)