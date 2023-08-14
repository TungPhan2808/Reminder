/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { http } from '../utils/http'

export const useFetch = (path, config = {}) => {
   const [data, setData] = useState(undefined)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(undefined)

   const fetchData = async () => {
      setLoading(true)
      try {
         const response = await http(path, 'GET', config)
         setData(response.data)
         setLoading(false)
      } catch (error) {
         setError(error)
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchData()
   }, [path])

   const refreshData = () => {
      fetchData()
   }

   return { data, loading, error, refreshData }
}
