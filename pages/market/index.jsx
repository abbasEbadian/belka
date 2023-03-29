import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import MarketAppbar from '../../components/market/market-appbar';
import MarketPrices from '../../components/market/market-prices';
import BottomNav from '../../components/BottomNav';
import { useServiceStore } from '../../store/store'
import CoinSelectDialog from '../../components/market/market-coin-selector';
import { BASEURL } from '../../components/settings';
import MarketOrders from '../../components/market/market-orders';

export default function Market( { services }) {
  const { setServices } = useServiceStore()
  const [coinSelectDialogOpen, setCoinSelectDialogOpen] = useState(false)

  const [selectedCoins, setSelectedCoins] = React.useState({
    coinFrom: null,
    coinTo: null
  })


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

      <CoinSelectDialog
        open={coinSelectDialogOpen}
        setOpen={setCoinSelectDialogOpen}
        selectedCoins={selectedCoins}
        changeCoin={changeCoin}
      />
      <MarketOrders />
      <BottomNav />
    </Box>
  )
}

// Market.protected = true


export const COIN_TARGET = Object.freeze({
  FROM: 'coinFrom',
  TO: 'coinTo'
})

export async function getServerSideProps(context) {
  
  let services = []
  try {
      const r = await fetch(`${BASEURL}service/list/`)
      services = await  r.json()
      
  } catch (error) {
       console.log(error)
  }
  
  return {
    props: {
      services
    }, // will be passed to the page component as props
  }
}
