import { Accordion, AccordionSummary, Box, Button, Divider, InputAdornment, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Search } from '@mui/icons-material';
import { Coin } from '../Types';
import GenerateWalletDialog from './GenerateWalletDialog';

function CoinTable({ wallet = [], coins = [] }: {wallet:any[], coins: Coin[]}) {
  const theme = useTheme<Theme>()
  const isMobile = useMediaQuery<boolean>(theme.breakpoints.down('lg'), { noSsr: true });


  const [searchQuery, setSearchQuery] = useState<string>('')
  const [generateModalOpen, setGenerateModalOpen] = useState<boolean>(false)
  const [selectedCoinForGenerate, setSelectedCoinForGenerate] = useState<undefined |  Coin>(undefined)


  const openGenerateModal = useCallback((coin: Coin) => {
    return (coin:Coin) => {
      setGenerateModalOpen(true)
      setSelectedCoinForGenerate(coin)
    }
  }, [])


  const filteredCoins = useMemo<Coin[]>(() => {
    const newx = coins?.filter(c => !wallet?.find(w => w.service.id === c.id));
    if (!searchQuery)return newx;
    return newx.filter(q => q.name.indexOf(searchQuery) !== -1 || q.small_name_slug.toLowerCase().indexOf(searchQuery) !== -1) 
  }, [coins, wallet, searchQuery])


  return (
    <Box>
      <Typography variant="h6" mb={2} > سایر ارزها</Typography >
      <TextField
        sx={{mb: 2, px: 0, [".MuiInputBase-root"]: {p: 0}}}
        size="small"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="start">
              <Search />
          </InputAdornment>,
      }}
      />
      {
        filteredCoins.map((item: Coin, idx: number) => {
          return <Accordion TransitionProps={{ unmountOnExit: true }} expanded={false} onChange={() => { }} key={item.id}>
            <AccordionSummary>
              <Stack direction={'row'} sx={{ width: "100%" }}>
                <Typography sx={{ width: 32, flexShrink: 0 }} variant={isMobile ? "subtitle2" : "body1"}>
                  {idx + 1}
                </Typography>
                <Typography sx={{ width: "35%", flexShrink: 0 }} variant={isMobile ? "subtitle2" : "body1"}>
                  <Stack direction={"row"} columnGap={1} alignItems={'center'}>
                    <Image src={item.image} alt={item.name} width={24} height={24} />
                    <Typography>
                      {item.name}
                    </Typography>
                    <Typography variant='overline' color={"gray"}> ({item.small_name_slug})</Typography>
                  </Stack>

                </Typography>
                <Stack direction={"row"} spacing={2} flexGrow={1} justifyContent={"flex-end"}>
                  <Button size="small" variant='outlined' color="success" onClick={() => openGenerateModal(item)}> ساخت کیف پول </Button>
                </Stack>
              </Stack>
            </AccordionSummary>
          </Accordion>
        })
      }


      <GenerateWalletDialog
        open={generateModalOpen}
        setOpen={setGenerateModalOpen}
        selectedCoin={selectedCoinForGenerate}
      />




    </Box>
  )
}

export default CoinTable