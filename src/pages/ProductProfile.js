import { 
  Grid,
  TextField, Typography
   } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addProduct } from '../redux/productSlice';
import withRestriction from '../hoc/withRestriction';

function ProductProfile() {
  const product = useSelector((state) => state.product.product)
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()

  const getSingleProduct = async () => { await axios
    .get(`/products/${id}`)
    .then( res => {
      dispatch(addProduct(res.data))
    })
  }
  useEffect(() => {
    getSingleProduct()
  })

  if(!product){
    return <p>Loading....</p>
  }
  return (
    <div>
    <div className='head'>
      <Typography variant='h4'>Produktdaten</Typography>
    </div>
    <div className='form'>
      <TextField
        disabled
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Name"
        value={product.name}
        />
      
        <TextField
        disabled
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Menge"
        value={product.quantity}
        />
  
        <TextField
        disabled
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Beschreibung"
        value={product.description}
        />
  
        <TextField
        disabled
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Bild"
        value={product.image}
        />
  
        <TextField
        disabled
        className="TextField-without-border-radius"
        margin="normal"
        size="small"
        color="warning"
        fullWidth
        label="Preis"
        value={product.price}
        />  
        <Grid container direction="row" justifyContent="space-between">
        <button className='button'
          onClick={() => {navigate("/edit-product")}}
        >bearbeiten
        </button>
        <button className='button'
          onClick={() => {
          axios.delete(`/products/${id}`)
          .then(navigate("/"))
        }}
        >Löschen
        </button>
        </Grid>
    </div>
    </div>
)
}
export default withRestriction(ProductProfile)