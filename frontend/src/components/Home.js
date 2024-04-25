
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Navbarrr from './Navbar';
import Footer from './Footer';
import Card from './Card';
import Carouse from './Carousel';
import { CartContext } from '../context/CartContext';
import Spinner from './Spinner';

export default function Home() {
    const [foodItems, setFoodItems] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [search, setSearch] = useState("");
    const { loading, setLoading } = useContext(CartContext)


    useEffect(() => {
        onload();
    }, [foodItems]);

    function onload() {
        setLoading(true)
        axios.get("http://localhost:4000/api/v1/getFoodItems")
            .then(function (response) {
                setFoodItems(response.data);
            }).catch(function (ex) {
                console.log(ex);
            });

        axios.get("http://localhost:4000/api/v1/getFoodCategory")
            .then(function (response) {
                setFoodCategory(response.data);
            }).catch(function (ex) {
                console.log(ex);
            });
        setLoading(false)

    }

    // Filter food items based on the search input
    const filteredFoodItems = foodItems.filter(item =>
    (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.CategoryName.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            <div><Navbarrr active={true} search={search} setSearch={setSearch} /></div>
            <div style={{ minHeight: "100vh" }}>
                <div >
                    <Carouse />
                </div>

                {loading ? <Spinner /> : <div>
                    {search ?

                        <div className='container-fluid d-flex flex-wrap flex-col'>
                            {filteredFoodItems.map(item => {
                                {
                                    return (
                                        <div key={item._id}>
                                            <Card foodDetails={item} />
                                        </div>
                                    );
                                }
                                return null; // Return null for items that don't match the condition
                            })}
                        </div>
                        :

                        foodCategory.map(opt => (
                            <div key={opt.CategoryName}>
                                <h2>{opt.CategoryName}</h2>
                                <hr />
                                <div className='container-fluid d-flex flex-wrap'>
                                    {filteredFoodItems.map(item => {
                                        if (opt.CategoryName === item.CategoryName) {
                                            return (
                                                <div key={item._id}>
                                                    <Card foodDetails={item} />
                                                </div>
                                            );
                                        }
                                        return null; // Return null for items that don't match the condition
                                    })}
                                </div>
                            </div>
                        ))
                    }
                </div>}

            </div>
            <div><Footer /></div>
        </div>
    );
}





