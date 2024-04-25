
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react"; // No need to import useEffect

// export default function Login() {
//     let navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     function handleInputChange(e) {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };


//     async function handleSubmit(e) {
//         e.preventDefault(); // Prevent the default form submission behavior

//         try {
//             const res = await axios.post("http://localhost:5000/api/v1/login", formData);

//             if (res.data.success) {
//                 // Redirect to the dashboard page
//                 alert(res.data.message);
//                 navigate("/dashboard");
//             } else {
//                 alert(res.data.message);
//             }
//         } catch (err) {
//             console.error('Error:', err);
//         }
//     }



//     return (
//         <div className="d-flex align-item-center justify-content-center">
//             <form className="col-4" onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="email">Enter user id:</label>
//                     <input type="text" className="form-control" id="email" name="email"
//                         value={formData.email} onChange={handleInputChange}
//                         autoFocus required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">enter password:</label>
//                     <input type="password" className="form-control" id="password" name="password"
//                         value={formData.password} onChange={handleInputChange}
//                        required
//                     />
//                 </div>
//                 <div>
//                     <button className="btn btn-primary w-50"

//                     >submit</button>
//                 </div>
//                 <div>
//                     <Link to="/register">Don't have an account?</Link>
//                 </div>
//             </form>
//         </div>
//     );
// }




import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import Navbarrr from "./Navbar";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/v1/login", formData);

            if (res.data.success) {
                alert(res.data.message);
                // Cookies.set
                // Cookies.set("token", res.data.token, { expires: 2 / 24 }); // Set the token as a cookie
                // setIsAuthenticated(true); // Set authentication status
                // navigate("/dashboard");
                // setIsAuthenticated(true); // Set authentication status to true
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userEmail", res.data.email);
                // console.log(localStorage.getItem("token"));
                navigate("/home");
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }

    return (
        <div>
            <div><Navbarrr /></div>
            <div className="d-flex align-item-center justify-content-center" style={{ minHeight: "100vh" }}>
                <form className="col-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Enter email:</label>
                        <input
                            type="text" className="form-control" id="email" name="email"
                            value={formData.email} onChange={handleInputChange}
                            autoFocus required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Enter password:</label>
                        <input
                            type="password" className="form-control" id="password" name="password"
                            value={formData.password} onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary w-50" type="submit"> Submit</button>
                    </div>
                    <div>
                        <Link to="/register">Don't have an account?</Link>
                    </div>
                </form>
            </div>
            <div><Footer /></div>
        </div>
    );
}
