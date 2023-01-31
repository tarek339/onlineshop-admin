import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Grid, Typography } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function ProductListing() {
  const [products, setProducts] = useState([])
  const [productsCopy, setProductsCopy] = useState([])
  const keys= ["name", "description"]
  const [loadItems, setLoadItems] = useState(8)

  const fetchData = async () => { await axios
    .get(`/products`)
    .then( res => {
        setProducts(res.data)
        setProductsCopy(res.data)
    })
    .catch((err) => {
        console.log("Err", err) 
    })
    }
    useEffect(() => {
    fetchData()
    }, [])

    const onSearch = (value) => {
      const newSearch = productsCopy.filter(
        (product) =>
          keys.some(
          (key) => product[key]
          .toLowerCase()
          .includes(value.toLowerCase())
          )
      );
      if(value.length > 2){
        setProducts(newSearch)
      }
      if(!value) {
          setProducts(productsCopy)
      }
    }

    function handleClick() {
      setLoadItems((more) => more + 8)
    }

  return (
    <div className='section-body'>
      <div className='head'>
        <Typography variant='h4'>Produkte</Typography>
      </div>
      <div className='search-bar'>
      <input
        type="search"
        placeholder="Produktsuche"
        onChange={e => onSearch(e.target.value)}
      />
      </div>
      {products.length === 0 ?
      <div className='not-found'>
      <Typography variant='h4'>Keine Produkte gefunden...</Typography>
      </div> 
       :
      <Grid container justifyContent="center">
        {products.slice(0,loadItems).map((value) => {
          return(
            <Grid item xs={12} sm={6} md={3} key={value._id}>
              <ProductCard
                id={value._id}
                image={value.image}
                name={value.name}
                description={value.description}
                quantity={value.quantity}
                price={value.price}
                taxes={value.taxes}
              />
            </Grid>
        )
        })}
        </Grid>}
        <div className='load-more-div'>
        <button 
          className='load-more-button' 
          onClick={handleClick}>
          <KeyboardDoubleArrowDownIcon fontSize='medium'/>
        </button>
      </div>
    </div>
  )
}