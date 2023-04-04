import axios from "axios"
import { useQuery } from "react-query"
import { BASEURL } from "../settings"

const _fetchBanks = () => {
    return axios.get(`${BASEURL}bank/name/list/`)
}

export const useFetchBanks = () => {
    return useQuery("get-banks",
        _fetchBanks,
        {
            select: (data) => {
                if(typeof data.data === typeof [])
                    return data.data ?? []
            },
            initialData: () =>  [] ,
            placeholderData: () => [],
            initialStale: () => []
        }
    )
}