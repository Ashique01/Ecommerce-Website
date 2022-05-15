import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import DefautLayout from '../Components/DeafaultLayout'
import Product from '../Components/Product';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import Search from 'antd/lib/transfer/search';


function AllProduct() {

    const [productsData, setproductsData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
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
    return (
        <DefautLayout>
            <section>
                <div className="row g-3 mt-2 mb-4 align-middle">
                    <div class="col-md-4">
                        <input type="text" className="form-control" placeholder="Search Product" onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-warning btn-block fw-bold">Search Results</button>
                    </div>
                </div>
            </section>
            <section>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {productsData.filter((product) => {
                        if (searchTerm == "") {
                            return product
                        }

                        else if (product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return product
                        }

                    }).map((product) => {
                        return <Col className="gutter-row" xs={24} lg={6} md={12} sm={24}>
                            <Product product={product} />
                        </Col>
                    })
                    }
                </Row>
            </section>
        </DefautLayout >
    )
}

export default AllProduct