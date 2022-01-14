import { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalStateContext'
import axios from 'axios'
import { token } from '../constants/tempTokenCesar'

const useRequestData = (initialData, url) => {

  const { states, setters } = useContext(GlobalContext)
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setters.setIsLoading(true)
    axios.get(url, {
      headers:
      {
        auth: token
      }
    })
      .then((response) => {
        console.log(response.data)
        setData(response.data)
        setters.setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        alert('Ocorreu um erro, tente novamente')
        setters.setIsLoading(false)
      })
  }, [url])


  return (data)
}

export default useRequestData