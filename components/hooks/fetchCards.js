import axios from "axios"
import { useQuery } from "react-query"
import { BASEURL } from "../settings"

const _fetchCards = () => {
    return axios.get(`${BASEURL}bank/list/`)
}

export const useFetchCards = () => {
    return useQuery("get-cards",
        _fetchCards,
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