import styled from '@emotion/styled'
import React, { useState } from 'react'
import { AppBar, Button, Toolbar, IconButton, Typography, Stack } from '@mui/material'

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CandlestickChartOutlined from '@mui/icons-material/CandlestickChartOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ChevronLeft from '@mui/icons-material/ChevronLeft';


const MAppbar = styled(AppBar)(({ theme }) => ({
    ".MuiToolbar-root": {
        height: 32,
        minHeight: 32,
        paddingInline: 0
    },
    "button": {
        paddingBlock: 0,
        height: 32
    },

}))


function MarketAppbar({ currency= "بیتکوین/تتر" }) {
    const [activeTab, setActiveTab] = useState(MARKET_TABS.SPOT)
    return (
        <MAppbar elevation={0}>
            <Toolbar>
                <Button variant='text' size="small" color={activeTab === MARKET_TABS.SPOT? "simple": 'neutral'}>
                    اسپات
                </Button>

                <Button variant='text' size="small" color={activeTab === MARKET_TABS.MARGIN? "simple": 'neutral'}>
                    ایزوله شده
                </Button>

            </Toolbar>
            <Toolbar >
                <Stack direction={'row'} alignItems='center' sx={{width: "100%"}} spacing={1}>
                    <IconButton  sx={{borderRadius: 1}}>
                        <MenuOpenIcon color='simple' />
                    </IconButton>
                    <Typography color="white" variant='subtitle2' >
                        {currency}
                    </Typography>
                    <Typography color="error" variant='caption' dir='ltr'>
                        -4.10%
                    </Typography>

                    <Button color='success' variant='chip' size='small' sx={{marginLeft: 'auto !important'}}>
                         <Typography variant='caption'> 10X 
                         </Typography>
                         <ChevronLeft fontSize='14' sx={{m: 0}}></ChevronLeft>
                    </Button>

                    <IconButton sx={{borderRadius: 1}}>
                        <CandlestickChartOutlined color="neutral"/>
                    </IconButton>

                    <IconButton  sx={{borderRadius: 1}}>
                        <MoreHorizOutlinedIcon color="neutral"/>
                    </IconButton>
                </Stack>
            </Toolbar>
        </MAppbar>
    )
}

export default MarketAppbar


const MARKET_TABS = Object.freeze({
    SPOT: 'spot',
    MARGIN: 'margin'
})