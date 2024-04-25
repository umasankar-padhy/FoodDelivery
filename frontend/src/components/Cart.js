// import React from 'react'

// import { useCart, useDispatchCart } from '../components/ContextReducer';
// export default function Cart() {
//     let data = useCart();
//     let dispatch = useDispatchCart();
//     if (data.length === 0) {
//         return (
//             <div>
//                 <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
//             </div>
//         )
//     }
//     // const handleRemove = (index)=>{
//     //   console.log(index)
//     //   dispatch({type:"REMOVE",index:index})
//     // }

//     const handleCheckOut = async () => {
//         let userEmail = localStorage.getItem("userEmail");
//         // console.log(data,localStorage.getItem("userEmail"),new Date())
//         let response = await fetch("http://localhost:4000/api/v1/orderData", {
//             // credentials: 'include',
//             // Origin:"http://localhost:3000/login",
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 order_data: data,
//                 email: userEmail,
//                 order_date: new Date().toDateString()
//             })
//         });
//         console.log("JSON RESPONSE:::::", response.status)
//         if (response.status === 200) {
//             dispatch({ type: "DROP" })
//         }
//     }

//     let totalPrice = data.reduce((total, food) => total + food.price, 0)
//     return (
//         <div>

//             {console.log(data)}
//             <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
//                 <table className='table table-hover '>
//                     <thead className=' text-success fs-4'>
//                         <tr>
//                             <th scope='col' >#</th>
//                             <th scope='col' >Name</th>
//                             <th scope='col' >Quantity</th>
//                             <th scope='col' >Option</th>
//                             <th scope='col' >Amount</th>
//                             <th scope='col' ></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((food, index) => (
//                             <tr>
//                                 <th scope='row' >{index + 1}</th>
//                                 <td >{food.name}</td>
//                                 <td>{food.qty}</td>
//                                 <td>{food.size}</td>
//                                 <td>{food.price}</td>
//                                 <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
//                                     <span className="bi bi-trash"></span>
//                                 </button>
//                                 </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
//                 <div>
//                     <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
//                 </div>
//             </div>



//         </div>
//     )
// }



import React, { useContext } from 'react';
import axios from 'axios';
import Navbarrr from './Navbar';
import Footer from './Footer';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, setCart } = useContext(CartContext);

    let data = cart;

    if (!data.length) {
        return (
            <div>
                <div><Navbarrr /></div>
                <div className='m-5 w-100 text-center fs-3' style={{ minHeight: "100vh" }}>The Cart is Empty!<div>
                    <Link to="/home">Click to order your favourite food items</Link>
                </div>
                </div>
                <div><Footer /></div>
            </div>
        );
    }






    async function handleCheckOut(e) {
        const requestData = {
            order_data: data,
            email: localStorage.getItem("userEmail"), // Assuming user email is stored in localStorage
            order_date: new Date(),
        };
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const res = await axios.post("http://localhost:4000/api/v1/orderData", requestData);

            // console.log("JSON RESPONSE:::::", response.status)
            if (res.status === 200) {
                setCart([]);
                localStorage.removeItem("cart");
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item.id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };



    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div><Navbarrr /></div>
            <div style={{ minHeight: "100vh" }}>

                <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                    <table className='table table-hover '>
                        <thead className=' text-success fs-4'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Option</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'><button type="button" className="btn btn-danger p-1" onClick={() => { setCart([]); localStorage.removeItem("cart"); }}>
                                    <span className="bi bi-trash "></span>
                                </button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((food, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button type="button" className="btn p-0" onClick={() => removeCartItem(food.id)}>
                                            <span className="bi bi-trash"></span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                    <div>
                        <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </div>
    );
}
