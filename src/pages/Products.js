import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import AdminLayout from '../Components/AdminLayout';

function Products() {
    const [productsData, setproductsData] = useState([])
    const [addEditModalVisbility, setAddEditModalVisbility] = useState(false)
    const [editItem, setEditItem] = useState(null)
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

    const deleteItem = (record) => {
        dispatch({ type: 'showLoading' })
        axios.post('api/items/delete-item', { itemId: record._id }).then((response) => {
            dispatch({ type: 'hideLoading' })
            message.success('Item deleted successfully')
            getAllItem()

        }).catch((error) => {
            dispatch({ type: 'hideLoading' })
            message.error('Something went wrong')
            console.log(error)
        })
    }
    useEffect(() => {
        getAllItem();
    }, [])
    const onFinish = (values) => {
        dispatch({ type: 'showLoading' })
        if (editItem === null) {
            axios.post('api/items/add-item', values).then((response) => {
                dispatch({ type: 'hideLoading' })
                message.success('Product added successfully')
                setAddEditModalVisbility(false)
                getAllItem()

            }).catch((error) => {
                dispatch({ type: 'hideLoading' })
                message.error('Something went wrong')
                console.log(error)
            })
        }
        else {
            axios.post('api/items/edit-item', { ...values, itemId: editItem._id }).then((response) => {
                dispatch({ type: 'hideLoading' })
                message.success('Product edited successfully')
                setAddEditModalVisbility(false)
                getAllItem()

            }).catch((error) => {
                dispatch({ type: 'hideLoading' })
                message.error('Something went wrong')
                console.log(error)
            })
        }


    }
    const colums = [

        {
            title: 'NAME',
            dataIndex: 'title'
        },
        {
            title: 'PRICE',
            dataIndex: 'price',
            render: function (data, type, row) {
                return parseFloat(data) + ' ' + '$';
            }
        },
        {
            title: 'CATEGORY',
            dataIndex: 'category'

        },
        {
            title: 'IMAGE',
            dataIndex: 'image',
            render: (image, record) => <img src={image} alt="" srcSet="" height='60' width='60' />
        },

        {
            title: 'ACTION',
            dataIndex: '_id',
            render: (id, record) => <div className='d-flex'>
                <EditOutlined className='mx-2' onClick={() => {
                    setEditItem(record)
                    setAddEditModalVisbility(true)
                }} />
                <DeleteOutlined className='mx-2' onClick={() => deleteItem(record)} />


            </div>

        }

    ]
    return (
        <AdminLayout>
            <div className='d-flex justify-content-between'>
                <h3>Products</h3>
                <Button type='primary' onClick={() => setAddEditModalVisbility(true)}>Add New Product</Button>

            </div>
            <Table columns={colums} dataSource={productsData} bordered />
            {addEditModalVisbility && (
                <Modal visible={addEditModalVisbility} footer={false} title={`${editItem !== null ? 'Edit Item' : 'Add New Product'}`} onCancel={() => setAddEditModalVisbility(false)}>
                    <Form
                        initialValues={editItem}
                        layout='vertical' onFinish={onFinish}>

                        <Form.Item
                            label="Name"
                            name="title"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Image URL"
                            name="image"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category"
                        >
                            <Select >
                                <Select.Option value="women's clothing"></Select.Option>
                                <Select.Option value="men's clothing"></Select.Option>
                                <Select.Option value="jewelery"></Select.Option>
                                <Select.Option value="electronics"></Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="d-flex justify-content-end">
                            <Button htmlType='submit' type='danger'>Save</Button>
                        </div>

                    </Form>
                </Modal>
            )}

        </AdminLayout>
    )
}

export default Products