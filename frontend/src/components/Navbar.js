// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function Navbar() {
//   return (
//     <div>
//           <nav className="navbar navbar-expand-lg navbar-dark bg-success">
//               <div className="container-fluid">
//                   <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
//                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                       <span className="navbar-toggler-icon"></span>
//                   </button>
//                   <div className="collapse navbar-collapse  navbar-dark bg-success" id="navbarNav">
//                       <ul className="navbar-nav ">
//                           <li className="nav-item">
//                               <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                           </li>
//                           <li className="nav-item">
//                               <Link className="nav-link" to="/login">Login</Link>
//                           </li>
//                           <li className="nav-item">
//                               <Link className="nav-link" to="/register">Register</Link>
//                           </li>

//                       </ul>
//                   </div>
//               </div>
//           </nav>
//     </div>
//   )
// }



import { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartContext } from '../context/CartContext';


export default function Navbarrr(props) {
    const { cart } = useContext(CartContext);
    const data = cart;
    const handleLogout = () => {
        localStorage.removeItem("token");
    }


    return (
        <Navbar expand="lg" className="bg-success   navbar-dark">
            <Container>
                <Navbar.Brand href="/home" className='fs-1 fst-italic'>EpicBites</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {
                            (localStorage.getItem("token")) ? <Nav.Link href="/myorder">My order</Nav.Link> : ""
                        }
                    </Nav>
                    {props.active ? <Nav className="me-2 w-50">
                        <input className="form-control " type="search" placeholder="Search" aria-label="Search"
                            value={props.search} onChange={(e) => { props.setSearch(e.target.value) }}
                        />
                    </Nav> : ''}
                    <Nav className="ms-auto">
                        {
                            (localStorage.getItem("token")) ?
                                <>

                                    <Nav.Link href="/cart" >My cart{" "}<Badge pill bg="info" >
                                        {data.length ? data.length : ""}
                                    </Badge></Nav.Link>

                                    <Nav.Link href="/" onClick={handleLogout}>log-Out</Nav.Link>
                                </> :
                                < >
                                    <Nav.Link href="/register">Sign-up</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
