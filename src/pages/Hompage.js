import React, { useEffect, useState } from 'react'
import DefautLayout from '../Components/DeafaultLayout'
import axios from 'axios'
import { Row, Col } from 'antd';
import Product from '../Components/Product'
import { useDispatch } from 'react-redux';
import { Carousel } from 'antd';
import banner1 from '../resources/Banner/1.jpg'
import banner2 from '../resources/Banner/2.jpg'
import banner3 from '../resources/Banner/3.jpg'
import '../resources/products.css'



function Hompage() {

    const [productsData, setproductsData] = useState([])
    const [selectCategory, setSelectCategory] = useState("men's clothing")
    const categories = [
        {
            name: "men's clothing",
            imgUrl: "https://cdn.luxe.digital/media/2019/12/16162209/best-men-online-shopping-jcrew-luxe-digital.jpg"
        },
        {
            name: "women's clothing",
            imgUrl: "https://media.istockphoto.com/photos/polka-dot-summer-brown-dress-suede-wedge-sandals-eco-straw-tote-bag-picture-id1208148708?k=20&m=1208148708&s=612x612&w=0&h=rjZiAPCOpwREiTET21lTP3wM30BUqAG9PjocC-euJ98="
        },
        {
            name: "electronics",
            imgUrl: "https://www.pcr-online.biz/wp-content/uploads/electronic-gadgets.jpeg"
        },
        {
            name: "jewelery",
            imgUrl: "https://www.antiquejewellerycompany.com/wp-content/themes/ajc-2021/assets/images/front-page/highlights/latest-finds.jpg"
        }
    ]



    const dispatch = useDispatch();

    const getAllItem = () => {
        dispatch({ type: 'showLoading' })
        axios.get('api/items/get-all-items').then((response) => {
            dispatch({ type: 'hideLoading' })
            setproductsData(response.data)

        }).catch((error) => {
            dispatch({ type: 'hideLoading' })
            console.log(error)
        })
    }
    useEffect(() => {
        getAllItem();
    }, [])
    const contentStyle = {
        height: '500px',
        width: '100%',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };


    return (
        <DefautLayout>

            <Carousel autoplay>
                <div>
                    <img src={banner1} alt="" srcSet="" style={contentStyle} />
                </div>
                <div>
                    <img src={banner2} alt="" srcSet="" style={contentStyle} />
                </div>
                <div>
                    <img src={banner3} alt="" srcSet="" style={contentStyle} />
                </div>

            </Carousel>
            <div className='container-fluid mt-4'>
                <h5 className='text-center fw-bolder text-primary'>Search product by category</h5>
                <div className='d-flex mt-5 mb-5 categories'>
                    {categories.map((category) => {
                        return <div
                            onClick={() => setSelectCategory(category.name)}
                            className={`d-flex category ${selectCategory === category.name && 'selected-category'}`}>
                            <p className='h3'>{category.name}</p>
                            <img src={category.imgUrl} height='75' width='80' />
                        </div>
                    })}
                </div>
            </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {productsData.filter((i) => i.category === selectCategory).map((product) => {
                    return <Col className="gutter-row" xs={24} lg={6} md={12} sm={24}>
                        <Product product={product} />
                    </Col>
                })}

            </Row>
        </DefautLayout>
    )
}

export default Hompage