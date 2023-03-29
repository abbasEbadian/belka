import axios from "axios"
import { useQuery } from "react-query"
import { BASEURL } from "../settings"

const _fetchWallet = () => {
    return axios.get(`${BASEURL}wallet/list/`)
}

export const useFetchWallet = () => {
    return useQuery("get-wallet",
        _fetchWallet,
        {
            select: (data) => {
                if(typeof data.data === typeof [])
                    return data.data.sort((a, b) => Number(b.balance) - Number(a.balance));
                
                    return []
            },
            initialData: () =>  [] ,
            placeholderData: () => [],
            initialStale: () => []
        }
    )
}