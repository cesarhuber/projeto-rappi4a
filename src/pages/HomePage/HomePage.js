import React, { useEffect, useState } from "react";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
// import { GlobalContext } from '../../contexts/GlobalStateContext'
// import useRequestData from '../../hooks/useRequestData'
import { BASE_URL } from '../../constants/url'
import { MainContainer } from "./styled";
import axios from "axios";

export default function HomePage() {

    const [searchFor, setSearchFor] = useState('')
    const [restaurants, setRestaurants] = useState([])
    

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkEwMDVtSEJmeVNrdDdPTjBITGFwIiwibmFtZSI6IkFzdHJvZGV2IiwiZW1haWwiOiJhc3Ryb2RldkBmdXR1cmU0LmNvbSIsImNwZiI6IjMzMy44ODguNjY2LTQ0IiwiaGFzQWRkcmVzcyI6dHJ1ZSwiYWRkcmVzcyI6IlJ1YSBQcmF0ZXMsIDYxMyAtIEJvbSBSZXRpcm8iLCJpYXQiOjE2NDE4NTg2NjR9.h2sLzEO7-RUZNiVvQ0KKVbVszyoAVkif0-wONTehV94"

    const getRestaurants = () => {
        axios.get(`${BASE_URL}restaurants`, {
            headers: {
                auth: token
            }
        })
            .then((response) => {
                console.log(response.data.restaurants)
                setRestaurants(response.data.restaurants)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getRestaurants()
    }, [])

    const handleSearchBar = (event) => {
        setSearchFor(event.target.value)
    }

    const restaurantsList = restaurants && restaurants.map((restaurant)=>{
        return <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
        
    })
    return (
        <MainContainer>
            <p>Rappi4</p>
            <div>
                <input
                    placeholder="Pesquisar"
                    onChange={handleSearchBar}
                    valeu={searchFor}
                />
            </div>
            {restaurantsList}
        </MainContainer>
    )
}