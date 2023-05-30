import { AxiosError } from "axios"

export interface Coin {
    id: number,
    name: string,
    image: string,
    small_name: string,
    small_name_slug: string,
    decimal: number,
    buyPrice: number,
    sellPrice: number,
    show_price_irt: number,
    fix_fee: number,
    trade_fee: number,
    min_buy_amount: number,
    min_sell_amount: number,
    quote_usd: {
        percent1h: number | null,
        percent24h: number | null,
        percent7d: number | null,
        percent30d: number | null
    },
    withdraw: {
        min: number,
        max: number,
        fee: number
    },
    deposit: {
        min: number,
        max: number,
        fee: number
    },
    is_name_tag: boolean,
    is_stablecoin: boolean,
    network: {
        id: number,
        name: string,
        realName: string,
        addressRegex: string,
        memoRegex: string,
        explore_url: string
    }[],
    is_active: boolean
}


export interface Wallet {
    id: string,
    balance: number,
    service: Coin,
    value: number,
    changed: number,
    published: string
}

export interface IAxiosError extends AxiosError {
    response: {
        data: {
            message?: string,
            error: number | string
        }
    }
}