import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react'
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import styled from '@emotion/styled';
import Router, { useRouter } from 'next/router';

const BotNav = styled(BottomNavigation)(({theme}) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBlock: 8
}))

const NO_BOTTOM_NAV_PATHS = [
    "login",
    "register",
    "forgetpassword",
    "verifycode"
]


function BottomNav() {
    const router = useRouter()
    
    if(NO_BOTTOM_NAV_PATHS.some(q => router.pathname.indexOf(q)> -1) ){
        return null;
    }

    return (
        <BotNav className='bottomnav' showLabels sx={{
            display: {
                md: "none"
            },
            zIndex: 999
        }}>
            <BottomNavigationAction label="خانه" icon={<OtherHousesIcon />} onClick={() => Router.push("/")}></BottomNavigationAction>
            <BottomNavigationAction label="بازار" icon={<CandlestickChartOutlinedIcon />} onClick={() => Router.push("/trade")} />
            <BottomNavigationAction label="تبدیل" icon={<CurrencyExchangeOutlinedIcon />} onClick={() => Router.push("/dashboard")} />
            <BottomNavigationAction label="خرید" icon={<MoneyOutlinedIcon />} onClick={() => Router.push("/change")} />
            <BottomNavigationAction label="کیف" icon={<AccountBalanceWalletOutlinedIcon />} onClick={() => Router.push("/wallet")}/>
        </BotNav>
    )
}

export default BottomNav