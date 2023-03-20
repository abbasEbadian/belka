import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react'
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import styled from '@emotion/styled';

const BotNav = styled(BottomNavigation)(({theme}) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBlock: 8
}))

function BottomNav() {
    return (
        <BotNav  showLabels sx={{
            display: {
                md: "none"
            }
        }}>
            <BottomNavigationAction label="خانه" icon={<OtherHousesIcon />} />
            <BottomNavigationAction label="بازار" icon={<CandlestickChartOutlinedIcon />} />
            <BottomNavigationAction label="تبدیل" icon={<CurrencyExchangeOutlinedIcon />} />
            <BottomNavigationAction label="خرید" icon={<MoneyOutlinedIcon />} />
            <BottomNavigationAction label="کیف" icon={<AccountBalanceWalletOutlinedIcon />} />
        </BotNav>
    )
}

export default BottomNav