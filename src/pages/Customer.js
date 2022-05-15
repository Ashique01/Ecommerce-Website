import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../Components/DeafaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import AdminLayout from "../Components/AdminLayout";
function Customers() {
    const componentRef = useRef();
    const [billsData, setBillsData] = useState([]);

    const dispatch = useDispatch();
    const getAllBills = () => {
        dispatch({ type: "showLoading" });
        axios
            .get("/api/bills/get-all-bills")
            .then((response) => {
                dispatch({ type: "hideLoading" });
                const data = response.data
                data.reverse()
                setBillsData(data);
            })
            .catch((error) => {
                dispatch({ type: "hideLoading" });
                console.log(error);
            });
    };

    const columns = [
        {
            title: "Customer",
            dataIndex: "customerName",
        },
        {
            title: "Phone Number",
            dataIndex: "customerPhoneNumber",
        },
        {
            title: "Created On",
            dataIndex: "createdAt",
            render: (value) => <span>{value.toString().substring(0, 10)}</span>
        },


    ];


    useEffect(() => {
        getAllBills();
    }, []);



    return (
        <AdminLayout>
            <div className="d-flex justify-content-between">
                <h3>Customers</h3>
            </div>
            <Table columns={columns} dataSource={billsData} bordered />


        </AdminLayout>
    );
}

export default Customers;