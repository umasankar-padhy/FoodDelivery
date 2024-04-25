
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import Home from './components/Home';

import Login from './components/Login';
import Register from './components/Register';
import MyOrder from './components/MyOrder';
import Cart from './components/Cart';
import CartContextProvider from './context/CartContext';

function App() {
  return (
    <div className="container-fluid">
      <CartContextProvider>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/myorder" element={<MyOrder />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            {/* <code> is an bootstrap element  */}
            <Route path="*" element={<main><code>not found  </code></main>}></Route>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>

    </div>
  );
}

export default App;
