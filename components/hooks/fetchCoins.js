import axios from "axios"
import { useQuery } from "react-query"
import { BASEURL } from "../settings"

const _fetchCoins = () => {
    return axios.get(`${BASEURL}service/list/`)
}

export const useFetchCoins = () => {
    return useQuery("get-coins",
        _fetchCoins,
        {
            select: (data) => {
                if(typeof data.data === typeof [])
                    return data.data
                return []
                
            },
            initialData: () =>  [] ,
            placeholderData:  [],
            initialStale: () => [],
            onError: () => {

            }
        }
    )
}