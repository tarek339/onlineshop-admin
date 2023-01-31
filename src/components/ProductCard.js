import { Card, 
    CardActions, 
    CardContent, 
    CardMedia,
    Typography
   } from '@mui/material';
  import React from 'react'
  import { useNavigate } from 'react-router-dom';
  
  export default function ProductCard({ id, name, description, image, quantity, price }) {
    const navigate = useNavigate()

    return (
      <div>
        <Card className='card' style={{marginBottom:"2em"}}>
          <CardMedia
            component="img"
            image={image}
            height="150px"
            alt="product image"
          />
          <CardContent>
            <Typography 
              variant="h5" 
              component="div"
              gutterBottom 
              >
              {name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              height="50px"
              >
              {description}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              >
              {quantity} pcs.
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              >
              {price.toFixed(2)} EUR
            </Typography>
          </CardContent>
          <CardActions>
              <button className='button'
              onClick={() => {navigate(`/product-profile/${id}`)}}
              >Profil
              </button>
            </CardActions>
        </Card>
      </div>
    )
  }