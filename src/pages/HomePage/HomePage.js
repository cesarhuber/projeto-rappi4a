import React, { useContext, useEffect, useState } from "react"
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard"
import useProtectedPage from '../../hooks/useProtectedPage'
import { GlobalContext } from '../../contexts/GlobalStateContext'
import {getRestaurants} from '../../services/restaurants'
import {getActiveOrder} from '../../services/order'
import { Input, MainContainer, InputContainer, PageTittleContainer, TittleNavContainer } from "./styled"
import SearchIcon from "../../assets/search.svg"
import { useNavigate } from 'react-router-dom'
import { goToRestaurantPage } from "../../routes/coordinator"
import CategoriesCarrossel from "../../components/CategoriesCarrossel/CategoriesCarrossel"
import LoadingCard from "../../components/Loading/LoadingCard"
import ActiveOrderCard from "../../components/ActiveOrdrCard/ActiveOrderCard"


export default function HomePage() {

    useProtectedPage()
    const [searchFor, setSearchFor] = useState('')
    const [restaurants, setRestaurants] = useState([])
    const [categories, setCategories] = useState('')
    const [activeOrder, setActiveOrder] = useState({})
    const { states, setters } = useContext(GlobalContext)
    const history = useNavigate()
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ink5bDhrV25rUVdzNk1SWk5DbzZHIiwibmFtZSI6IkthcmVuIiwiZW1haWwiOiJrYUBsYWJlbnUuY29tIiwiY3BmIjoiMjI5LjIyOS4xMTEtMTEiLCJoYXNBZGRyZXNzIjp0cnVlLCJhZGRyZXNzIjoiUi4gQWZvbnNvIEJyYXosIDMyMCwgNzcgLSBWaWxhIE4uIENvbmNlacOnw6NvIiwiaWF0IjoxNjQyMTI1MTY0fQ.dNP0n_dhdva69harAH8iPiPHfd4Ji_CzwNTOJzXnjoY"
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZsSW5tZFBVVk5nRUdndWxkd3JZIiwibmFtZSI6IkthcmVuIiwiZW1haWwiOiJrYXJlbkBmdXR1cmU0LmNvbSIsImNwZiI6IjIyOS4xMTEuMTExLTExIiwiaGFzQWRkcmVzcyI6dHJ1ZSwiYWRkcmVzcyI6IlIuIEFmb25zbyBCcmF6LCAxNzcsIDcxIC0gVmlsYSBOLiBDb25jZWnDp8OjbyIsImlhdCI6MTY0MjEyNjA0OH0.p5IT0TmOH5M-HmcVrh-1Nzus402Yf7bOPCxpE7LxQcY"

    useEffect(() => {
        getRestaurants(token, setRestaurants)
        getActiveOrder(token, setActiveOrder)
    }, [])

    const onClickCard = (id) => {
        goToRestaurantPage(history, id)
    }

    const handleSearchBar = (event) => {
        setSearchFor(event.target.value)
    }

    const handleCategory = (value) => {
        setCategories(value)
    }

    const restaurantsList = restaurants && restaurants
        .filter((restaurant) => {
            return ((restaurant.name.toLowerCase().includes(searchFor) || restaurant.name.includes(searchFor)) && restaurant.category.includes(categories))
        })
        .map((restaurant) => {
            return <RestaurantCard
                key={restaurant.id}
                name={restaurant.name}
                shipping={restaurant.shipping}
                deliveryTime={restaurant.deliveryTime}
                logoUrl={restaurant.logoUrl}
                onClickCard={() => onClickCard(restaurant.id)} />
        })

    return (
        <MainContainer>
            <PageTittleContainer>
                <TittleNavContainer>
                    Rappi4
                </TittleNavContainer>
            </PageTittleContainer>
            < InputContainer>
                <img src={SearchIcon} />
                <Input
                    placeholder="Restaurante"
                    onChange={handleSearchBar}
                    value={searchFor}
                />
            </InputContainer>
            <CategoriesCarrossel
                handleCategory={handleCategory} 
            />
            {/* {restaurantsList.length === 0 ? <h4>Restaurante não encontrado</h4> : restaurantsList} */}
            {restaurantsList.length > 0 ? restaurantsList : <LoadingCard/>}
            {activeOrder && Object.keys(activeOrder).length > 0 && (
                <ActiveOrderCard order={activeOrder}/>
            )}
        </MainContainer >
    )
}