// import React, { useEffect, useRef, useState } from 'react'
// import { useCart, useDispatchCart } from './ContextReducer';

// export default function Card(props) {
//    const  option =props.foodDetails.options[0];
//   const priceoption = option ? Object.keys(option) : [];
//   const [qty ,setQty] =useState(1);
//   const [size, setSize]=useState(""); 
//   const dispatch =useDispatchCart();
//   const priceRef =useRef();
//   let data = useCart();



// const handleAddToCart =async ()=>{
//   let food = []
//   for (const item of data) {
//     if (item.id === props.foodDetails._id) {
//       food = item;

//       break;
//     }
//   }

//   if (food) {
//     if (food.size === size) {
//       await dispatch({ type: "UPDATE", id: props.foodDetails._id, price: finalPrice, qty: qty })
//       return
//     }
// else if(food.size !== size){
// await dispatch({type:"ADD" , id:props.foodDetails._id,name:props.foodDetails.name,img:props.foodDetails.img,price:finalPrice,qty:qty,size:size })
// return
// }
// return}
//     await dispatch({ type: "ADD", id: props.foodDetails._id, name: props.foodDetails.name, img: props.foodDetails.img, price: finalPrice, qty: qty, size: size })

//   }
// let finalPrice= qty * parseInt(option[size]);
// useEffect(()=>{ 
//   setSize(priceRef.current.value)
// },[])

//   // const priceoption= Object.keys(option);
//   return (
//     <div>
//       <div>
//         <div className="card m-2" style={{ width: "15.6rem", maxHeight: "380px" }}>
//           <div style={{ width: "100%", height: "165px" }} > 
//           <img src={props.foodDetails.img} className="card-img-top" alt="..." style={{ width: "100%", height: "100%" }} />
//           </div>
//           <div className="card-body">
//             <h5 className="card-title">{props.foodDetails.name}</h5>
//             {/* <p className="card-text " style={{ height: "100px" }} >{props.foodDetails.description}</p> */}
//             <div className='container w-100'>
//               <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
//                 {Array.from(Array(6), (e, i) => {
//                   return (
//                     <option key={i + 1} value={i + 1}>{i + 1}</option>
//                   )
//                 })}
//               </select>
//               <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
//                 {
//                   priceoption.map((data) =>{
//                     return <option key={data} value={data}>{data} </option>
//                   })
//                 }

//               </select>
//               <div>You have to pay RS.{finalPrice}/- </div>
//             </div>
//             <hr />
//             <button className='btn btn-success justify-center ms-2'  onClick={handleAddToCart}> add to cart</button>
//           </div>
//         </div>
//       </div>

//     </div>

//   )
//               }





import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  const option = props.foodDetails.options[0];
  const priceoption = option ? Object.keys(option) : [];
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const { cart, setCart } = useContext(CartContext);
  let navigate=useNavigate();




  const existingCartItem = cart.find(item => item.id === props.foodDetails._id && item.size === size);

  const handleAddToCart = async () => {

    if (!localStorage.getItem("token"))
     { navigate("/login")   
     return }
    const data = {
      id: props.foodDetails._id,
      name: props.foodDetails.name,
      img: props.foodDetails.img,
      price: finalPrice,
      qty: qty,
      size: size,
    }
    if (existingCartItem) {
      // If the item already exists in the cart, update its quantity
      // await dispatch({ type: "UPDATE", id: props.foodDetails._id, price: existingCartItem.price, qty: qty });
      let index = cart.findIndex(item => item.id === props.foodDetails._id && item.size === size);
      let myCart = [...cart];
      myCart[index] = { ...myCart[index], qty: parseInt(myCart[index].qty) + parseInt(qty), price: parseInt(myCart[index].price) + parseInt(finalPrice) }
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));


    } else {
      setCart([...cart, data]);
      // console.log(cart)
      localStorage.setItem("cart", JSON.stringify([...cart, data]));

      // If the item is not in the cart, add it as a new item
      // await dispatch({
      //   type: "ADD",
      // id: props.foodDetails._id,
      // name: props.foodDetails.name,
      // img: props.foodDetails.img,
      // price: finalPrice,
      // qty: qty,
      // size: size,
      // });
    }
  }

  var finalPrice = qty * parseInt(option[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);





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


  const details = `${props.foodDetails.description.substring(0, 83)}....`;
  const [readmore, setReadmore] = useState(false);
  function readmoreHandler() {
    setReadmore(!readmore);
  }
  return (
    <div>
      <div>
        <div className="card m-2" style={readmore ? { width: "15.6rem", maxHeight: "600px" } : { width: "15.6rem", height: "470px" }}>
          <div style={{ width: "100%", height: "165px" }}>
            <img src={props.foodDetails.img} className="card-img-top" alt="..." style={{ width: "100%", height: "165px" }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{props.foodDetails.name}</h5>

            <div >{readmore ? props.foodDetails.description : details}
              <span className='text-primary ' onClick={readmoreHandler}> {readmore ? "Show Less" : " Read More"}</span>
            </div>

            <div className='container w-100'>
              <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select>
              <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {
                  priceoption.map((data) => {
                    return <option key={data} value={data}>{data} </option>
                  })
                }

              </select>
              <div>You have to pay RS.{finalPrice}/-</div>

            </div>
            <hr />
            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
            {existingCartItem ?
              <button className='btn btn-warning justify-center ms-2' onClick={() => removeCartItem(existingCartItem.id)}>remove</button>

              :
              <button className='btn btn-warning justify-center ms-2'>remove</button>

            }
            {existingCartItem && (
              <div>Quantity in Cart: {existingCartItem.qty}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
