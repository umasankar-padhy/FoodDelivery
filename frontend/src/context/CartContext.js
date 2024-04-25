import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
   const [loading, setLoading] = useState(false);
   const [cart, setCart] = useState([]);

   useEffect(() => {
      let existingCartItem = localStorage.getItem("cart");
      if (existingCartItem) setCart(JSON.parse(existingCartItem));
   }, []);

   const value = {
      loading, setLoading, cart, setCart
   };
   return <CartContext.Provider value={value}>
      {children}
   </CartContext.Provider>
}