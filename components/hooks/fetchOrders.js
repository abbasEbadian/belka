import axios from "axios"
import { useQuery } from "react-query"
import { BASEURL } from "../settings"

const _fetchOrders = () => {
    return axios.get(`${BASEURL}order/list/`)
}

export const useFetchOrders = () => {
    return useQuery("get-orders",
        _fetchOrders,
        {
            select: (data) => {
                if(typeof data.data === typeof [])
                    return data.data
                return []
                
            },
            initialData: () => { return [] },
        }
    )
}