import axios from "axios"
import { useQuery } from "react-query"
import { BASEURL } from "../settings"

const _fetchUser = () => {
    return axios.get(`${BASEURL}account/details/`)
}

export const useFetchUser = () => {
    return useQuery("get-user",
        _fetchUser,
        {
            select: (data) => {
                if(typeof data.data === typeof {})
                    return data.data;
                return {}
            },
            initialData: () =>  {} ,
            placeholderData: () => {},
            initialStale: () => {}
        }
    )
}