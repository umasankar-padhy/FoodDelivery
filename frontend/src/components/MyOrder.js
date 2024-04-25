
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Navbarrr from './Navbar';
import Footer from './Footer';
import { CartContext } from '../context/CartContext';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';



export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const { loading, setLoading } = useContext(CartContext)
    async function fetchOrderData() {
        try {
            setLoading(true)
            const userEmail = localStorage.getItem('userEmail');
            const response = await axios.post("http://localhost:4000/api/v1/myOrderData", { email: userEmail });

            if (response && response.data) {
                setOrderData(response.data);
            } else {
                console.error('Failed to fetch order data');
            }
            setLoading(false)
        } catch (error) {
            console.error('Error:', error);
        }
    }


    useEffect(() => {
        fetchOrderData();
    }, []); // Empty dependency array to ensure useEffect runs only once

    if (!orderData.length) {
        return (
            <div>
                <div><Navbarrr /></div>
                <div className='m-5 w-100 text-center fs-3' style={{ minHeight: "100vh" }}>
                    The Order History is Empty!

                    <div>
                        <Link to="/home">Click to order your favourite food items</Link>
                    </div>
                </div>
                <div><Footer /></div>
            </div>
        );
    }


    return (
        <div>
            <div>
                <Navbarrr />
            </div>
            <div style={{ minHeight: "100vh" }}>
                {loading ? <Spinner /> : <ul>
                    {orderData.map(order => (
                        <li key={order._id}>
                            {/* <h2>Order ID: {order._id}</h2>
                        <p>Email: {order.email}</p> */}
                            <h4>Order Date: {order.order_date} </h4>
                            <ul>
                                <div className='container-fluid d-flex flex-wrap ' >
                                    {order.order_data.map(item => (
                                        // <li key={item.id}>
                                        //     <img src={item.img} alt={item.name} />
                                        //     <p>Name: {item.name}</p>
                                        //     <p>Price: {item.price}</p>
                                        //     <p>Quantity: {item.qty}</p>
                                        //     <p>Size: {item.size}</p>
                                        // </li>

                                        <div className="card m-2" style={{ width: "13rem", maxHeight: "360px" }}>
                                            <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    {/* <span className='m-1'>{data}</span> */}
                                                    <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </ul>
                        </li>
                    ))}
                </ul>}
            </div>
            <div><Footer /></div>
        </div>
    );
}
