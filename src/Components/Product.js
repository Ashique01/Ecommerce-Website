import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import '../resources/products.css'
function Product({ product }) {
    const dispatch = useDispatch();
    function addToCart() {
        dispatch({ type: 'addToCart', payload: { ...product, quantity: 1 } })

    }

    return (
        <div className='product mt-3'>
            <h4 className='text-center fw-bolder'>{product.title}</h4>
            <img className='rounded mx-auto d-block' src={product.image} alt="" height='140px' width='140px' />
            <h5 className='price'>Price: {product.price}</h5>
            <div className="d-flex justify-content-center">
                <Button onClick={() => addToCart()} className='button-style'>Add to cart</Button>
            </div>
        </div>
    )
}

export default Product