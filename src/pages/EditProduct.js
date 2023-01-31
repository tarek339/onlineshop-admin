import { Alert, TextField, Typography, Snackbar } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../redux/productSlice'
import { useNavigate } from 'react-router'
import withRestriction from '../hoc/withRestriction'

function EditProduct() {
  const product = useSelector((state) => state.product.product)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [quantity, setQuantity] = useState(product.quantity)
  const [image, setImage] = useState(product.image)
  const [price, setPrice] = useState(product.price)

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
  
        <div className='head'>
          <Typography variant='h4'>Produkt bearbeiten</Typography>
        </div>
      <div className="form">
        <form onSubmit={(e) => {
          e.preventDefault()
            axios.put(`/products/${product._id}`, {
              name,
              description,
              quantity : +quantity,
              image,
              price : +price
            },)
  
        .then((res) => {
          console.log(product)
          dispatch(addProduct(res.data))
          navigate("/")
        })
        .catch((err) => {
          console.log(err)
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
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      
        <TextField
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Menge"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        />
  
        <TextField
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Beschreibung"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
  
        <TextField
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Bild"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        />
  
        <TextField
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Preis"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />  
        <button className="button">speichern</button>
        </form>
      </div>
    </div>
    )
  }  
  export default withRestriction(EditProduct)