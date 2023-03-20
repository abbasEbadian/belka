import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import MarketAppbar from '../../components/market/market-appbar';
import MarketPrices from '../../components/market/market-prices';
import BottomNav from '../../components/BottomNav';
import {useServiceStore} from '../../store/store'

export default function Market() {
  const serviceStore = useServiceStore()
  useEffect(() => {
    serviceStore.getServices()
  }, [])
  
  return (
    <Box>
        <MarketAppbar />
        <MarketPrices />

        <BottomNav />
    </Box>
  )
}
