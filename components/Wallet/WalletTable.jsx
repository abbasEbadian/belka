import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import GenerateWalletDialog from './GenerateWalletDialog';
// import CoinDeposit from './CoinDeposit';
import CoinDeposit from './CoinDeposit2';
import RialDeposit from './RialDeposit2';
import RialWithdraw2 from './RialWithdraw2';
import CoinWithdraw from './CoinWithdraw2';


function WalletTableC({ wallet = [], coins = [] }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'), { noSsr: true });

  // Coin deposit
  const [coinToDepositWallet, setCoinToDepositWallet] = useState({})
  const [showCoinDepositDialog, setShowCoinDepositDialog] = useState(false)

  // Rial deposit
  const [RialDepositWallet, setRialToDepositWallet] = useState({})
  const [showRialDepositDialog, setShowRialDepositDialog] = useState(false)

  // Rial Withdraw
  const [RialWithdrawWallet, setRialToWithdrawWallet] = useState({})
  const [showRialWithdrawDialog, setShowRialWithdrawDialog] = useState(false)

  // Coin Withdraw
  const [coinWithdrawWallet, setCoinToWithdrawWallet] = useState({})
  const [showCoinWithdrawDialog, setShowCoinWithdrawDialog] = useState(false)



  const [generateModalOpen, setGenerateModalOpen] = useState(false)
  const [selectedCoinForGenerate, setSelectedCoinForGenerate] = useState({})
  const [expanded, setExpanded] = useState(null)

  const changeExpanded = (item) => {
    if (!isMobile) return
    if (item === expanded) setExpanded(null)
    else setExpanded(item)
  }

  const openGenerateModal = (coin) => {
    setGenerateModalOpen(true)
    setSelectedCoinForGenerate(coin)
  }

  /**
   * Open deposit modal for rial or other coins
   * @param {object} wallet 
   * @param {object} wallet.service
   * @param {string} wallet.service.small_name_slug
   */
  const openDepositModal = (wallet) => {
    if (wallet.service.small_name_slug === "IRT") {
      setRialToDepositWallet(wallet)
      setShowRialDepositDialog(true)
    } else {
      setCoinToDepositWallet(wallet)
      setShowCoinDepositDialog(true)
    }
  }

  /**
   * Open deposit modal for rial or other coins
   * @param {object} wallet 
   * @param {object} wallet.service
   * @param {string} wallet.service.small_name_slug
   */
  const opeWithdrawModal = (wallet) => {
    if (wallet.service.small_name_slug === "IRT") {
      setRialToWithdrawWallet(wallet)
      setShowRialWithdrawDialog(true)
    } else {
      setCoinToWithdrawWallet(wallet)
      setShowCoinWithdrawDialog(true)
    }
  }

  return (
    <Box>
      {
        wallet.map((item, idx) => {
          return <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === item.service.id} onChange={() => changeExpanded(item.service.id)} key={item.service.id}>
            <AccordionSummary expandIcon={isMobile && <GridExpandMoreIcon />}
            >
              <Stack direction={'row'} sx={{ width: "100%" }}>
                <Typography sx={{ width: 32, flexShrink: 0 }}>
                  {idx + 1}
                </Typography>
                <Typography sx={{ width: "35%", flexShrink: 0 }} variant={isMobile ? "subtitle2" : "body1"}>
                  
                  <Stack direction={"row"} columnGap={1}>
                    <img src={item.service?.image} alt={item.service?.name} width={24} height={24} />
                    <Typography>
                    {item.service?.name}
                    </Typography>
                  </Stack>
                </Typography>
                <Typography sx={{ color: 'text.secondary', width: "40%", }}>
                  <Typography variant='caption'> {item.service.small_name_slug} </Typography>
                  {Number(item.balance).toLocaleString()}
                </Typography>
                {!isMobile && <Stack direction={"row"} spacing={2} >
                  <Button size="small" variant='outlined' color="success" onClick={() => openDepositModal(item)}> واریز </Button>
                  <Button size="small" variant='outlined' color="error" onClick={() => opeWithdrawModal(item)}>  برداشت</Button>
                  <Button size="small" variant='outlined' color="info">  معامله</Button>
                </Stack>}
              </Stack>
            </AccordionSummary>
            {isMobile && <AccordionDetails>
              <Stack direction={"row"} spacing={2} >
                <Button size="small" variant='outlined' color="success" onClick={() => openDepositModal(item)}> واریز </Button>
                <Button size="small" variant='outlined' color="error" onClick={() => opeWithdrawModal(item)}>  برداشت</Button>
                <Button sx={{ flexGrow: 1 }} size="small" variant='outlined' color="info">  معامله</Button>
              </Stack>
            </AccordionDetails>}
          </Accordion>
        })
      }
      {
        coins.map((item, idx) => {
          if (wallet.find(q => q.service.id === item.id)) return;

          return <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === item.id} onChange={() => changeExpanded(item.id)} key={item.id}>
            <AccordionSummary expandIcon={isMobile && <GridExpandMoreIcon />}
            >
              <Stack direction={'row'} sx={{ width: "100%" }}>
                <Typography sx={{ width: 32, flexShrink: 0 }} variant={isMobile ? "subtitle2" : "body1"}>
                  {wallet.length + idx}
                </Typography>
                <Typography sx={{ width: "35%", flexShrink: 0 }} variant={isMobile ? "subtitle2" : "body1"}>
                  <Stack direction={"row"} columnGap={1}>
                    <img src={item.image} alt={item.name} width={24} height={24} />
                    <Typography>
                        {item.name}
                    </Typography>
                  </Stack>

                </Typography>
                <Typography sx={{ color: 'text.secondary', width: "40%", }}>
                  <Typography variant='caption'> {item.small_name_slug} </Typography>
                  {0}
                </Typography>
                <Stack direction={"row"} spacing={2} display={{
                  xs: "none",
                  lg: "flex"
                }}>
                  <Button size="small" variant='outlined' color="success" onClick={() => openGenerateModal(item)}> واریز </Button>
                  <Button size="small" variant='outlined' color="error" onClick={() => openGenerateModal(item)}>  برداشت</Button>
                  <Button size="small" variant='outlined' color="info" onClick={() => openGenerateModal(item)}>  معامله</Button>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={"row"} spacing={2} display={{
                xs: "flex",
                lg: "none"
              }}>
                <Button sx={{ flexGrow: 1 }} size="small" variant='outlined' color="success" onClick={() => openGenerateModal(item)}> واریز </Button>
                <Button sx={{ flexGrow: 1 }} size="small" variant='outlined' color="error" onClick={() => openGenerateModal(item)}>  برداشت</Button>
                <Button sx={{ flexGrow: 1 }} size="small" variant='outlined' color="info" onClick={() => openGenerateModal(item)}>  معامله</Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        })
      }


      <GenerateWalletDialog
        open={generateModalOpen}
        setOpen={setGenerateModalOpen}
        selectedCoin={selectedCoinForGenerate}
      />

      {/* <CoinDeposit
          wallet={coinToDepositWallet}
          setShowCoinDeposit={setShowCoinDepositDialog}
      /> */}

      <CoinDeposit
        wallet={coinToDepositWallet}
        open={showCoinDepositDialog}
        setOpen={setShowCoinDepositDialog}
      />

      <RialDeposit
        wallet={RialDepositWallet}
        open={showRialDepositDialog}
        setOpen={setShowRialDepositDialog}
      />

      <RialWithdraw2
        wallet={RialWithdrawWallet}
        open={showRialWithdrawDialog}
        setOpen={setShowRialWithdrawDialog}
      />

      <CoinWithdraw
        wallet={coinWithdrawWallet}
        open={showCoinWithdrawDialog}
        setOpen={setShowCoinWithdrawDialog}
      />


    </Box>
  )
}

export default WalletTableC