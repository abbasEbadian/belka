import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import MarketAppbar from '../@/c/market/market-appbar';
import MarketPrices from '../@/c/market/market-prices';
import BottomNav from '../@/c/BottomNav';
import { useServiceStore } from '../../store/store'
import CoinSelectDialog from '../@/c/market/market-coin-selector';
import { BASEURL } from '../@/c/settings';
import MarketOrders from '../@/c/market/market-orders';
import { useFetchCoins } from '../@/c/hooks';

export default function Market( {  }) {
  const { setServices } = useServiceStore()
  const [coinSelectDialogOpen, setCoinSelectDialogOpen] = useState(false)

  const [selectedCoins, setSelectedCoins] = React.useState({
    coinFrom: null,
    coinTo: null
  })

  const {data: services} = useFetchCoins()
  React.useEffect(() => {
    setServices(services)
    if (services.length > 0 && !selectedCoins.coinFrom) {
      changeCoin(services.find(s => s.small_name_slug === "BTC"), 'coinFrom')
      changeCoin(services.find(s => s.small_name_slug === "USDT"), 'coinTo')
    }
  }, [services])

  const changeCoin = (value, selected) => {
    setSelectedCoins(state => ({
      ...state,
      [selected]: value
    }))
  }

  const openDialog = () => {
    setCoinSelectDialogOpen(true)
  }

  return (
    <Box>
      <MarketAppbar 
        openDialog={openDialog} 
        selectedCoins={selectedCoins}
      />

      <MarketPrices selectedCoins={selectedCoins}/>

      Coin
      <CoinSelectDialog
        open={coinSelectDialogOpen}
        setOpen={setCoinSelectDialogOpen}
        selectedCoins={selectedCoins}
        changeCoin={changeCoin}
      />
      {/* <MarketOrders /> */}
      <BottomNav />
    </Box>
  )
}

// Market.protected = true


export const COIN_TARGET = Object.freeze({
  FROM: 'coinFrom',
  TO: 'coinTo'
})
