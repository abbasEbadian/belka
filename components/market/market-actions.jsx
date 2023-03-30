import styled from '@emotion/styled'
import { Add, ClearRounded, Info, Remove, SyncAlt } from '@mui/icons-material'
import { Box, Button, MenuItem, Select, selectClasses, Stack, TextField, ToggleButtonGroup, Typography, ToggleButton, textFieldClasses, TextFieldClasses } from '@mui/material'
import Head from 'next/head'
import React, { useRef, useState } from 'react'
import { useFetchCoins, useFetchOrders, useFetchWallet } from '../hooks'
import debounce, { is_float } from '../utils' 

const StyledStack = styled(Stack)(({ theme }) => ({
    ['button']: {
        flex: "1 0 auto",
        ["&:first-of-type"]: {
            clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 10% 100%)"
        },
        ["&:last-of-type"]: {
            clipPath: "polygon(0% 0, 90% 0%, 100% 100%, 0% 100%)"
        },
    }
}))
const StyledBox = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.dark.light}`,
    borderRadius: 6,
    'button': {
        padding: 0,
        width: 24,
        minWidth: 36,
        color: theme.palette.grey[400]
    },
    "input": {
        textAlign: "center",
        paddingBlock: 8,
        fontSize: 13
    },
    "fieldset": {
        border: "none"
    },
}))
const StyledSelect = styled(Select)(({ theme }) => ({
    marginTop: 16,
    textAlign: 'center',
    color: "white",
    ["." + selectClasses.select]: {
        paddingBlock: "4px 2px",
        fontSize: 13
    },
    ["." + selectClasses.nativeInput]: {
        textAlign: 'center',
        color: "white",
    },
}))

const TextFieldStyled = styled(TextField, )(({theme, error})=> ({
    [`input`]: {
        color: error? theme.palette.error.main: 'inherit'
    }
}))



function MarketActions({ selectedCoins }) {

    
    const { isLoading: isCoinLoading, data: coins=[]} = useFetchCoins()
    const { isLoading: isWalletLoading, data: wallet=[]} = useFetchWallet()
    const { isLoading: isOrderLoading, data: orderList=[]} = useFetchOrders()

    const [priceData, setPriceData] = useState({
        limit: 0,
        amount: 0,
        amount2: 0,
        fraction: 25,
        volume: 0,
        baseCoin: BASE_COINS['USDT'],
        amountTyping: false,
        amount2Typing: false
    })
    const changePriceData = ({field, value}) => {
        if(field === 'baseCoin' && !value) return
        setPriceData(d => ({
            ...d,
            [field]: value
        }))
    }

    const amountTimeout = useRef(null)
    const changePriceDataWithDebounce = ({field, value}) => {
        value = String(value).trim()
        if(!is_float(value)) return
        clearTimeout(amountTimeout.current)
        changePriceData({field: `${field}Typing`, value: true})
        changePriceData({ field, value })

        amountTimeout.current = setTimeout(() => {
            changePriceData({field: `${field}Typing`, value: false })
        }, 500)
    }
    const [currentAction, setCurrentAction] = useState(ACTION.BUY)
    const [limit, setLimit] = useState("Limit")
    const [leverage, setLeverage] = useState(LEVERAGES[0])



    return (
        <Box pr={1} sx={{ maxWidth: 500 }}>
            <Stack>
                <StyledStack direction={"row"} spacing={0} alignItems={"center"} justifyContent="stretch">
                    <Button variant='contained' onClick={() => setCurrentAction(ACTION.BUY)} size="small"
                        color={currentAction === ACTION.BUY ? 'success' : 'dark'}>
                        خرید
                    </Button>
                    <Button variant='contained' onClick={() => setCurrentAction(ACTION.SELL)} size="small"
                        color={currentAction === ACTION.SELL ? 'error' : 'dark'}>
                        فروش
                    </Button>
                </StyledStack>

                <Stack direction={"row"} alignItems='center' mt={2}>
                    <Typography pr={1}>
                        بازار به: 
                    </Typography>

                    <ToggleButtonGroup
                        value={priceData.baseCoin}
                        exclusive
                        color='error'
                        size='small'
                        onChange={(e, value) => changePriceData({field: 'baseCoin', value})}
                    >
                        {
                            Object.values(BASE_COINS).map(coin => {
                                return <ToggleButton 
                                    color='info'
                                    value={coin}  
                                    key={coin} 
                                    sx={{px: 2}}
                                    >
                                    { coin }
                              </ToggleButton>
                            })
                        }
                       
                    </ToggleButtonGroup>
                </Stack>

                <Box sx={{ width: "100%", position: "relative" }}>
                    <Info fontSize="10px" sx={{ position: "absolute", top: 22, left: 6, color: "#888" }} />
                    <StyledSelect value={limit} fullWidth>
                        <MenuItem value={'Limit'}>Limit</MenuItem>
                    </StyledSelect>
                </Box>
                <StyledBox mt={2}>
                    <Stack direction={'row'} justifyContent="space-between">
                        <Button variant='text' color='dark'
                            onClick={e => changePriceData({field: "amount", value: parseFloat(priceData.amount || 0) + 1})}
                        >
                            <Add />
                        </Button>

                        <TextFieldStyled
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', dir: "ltr"}}
                            size="small"
                            value={priceData.amount}
                            onChange={e => changePriceDataWithDebounce({field: "amount", value: e.target.value})}
                            onFocus={e => changePriceData({field: "amount", value: ""})}
                            error={!is_float(priceData.amount)}
                        />

                        
                        <Button variant='text' color='dark'
                            onClick={e => changePriceData({field: "amount", value: parseFloat(priceData.amount || 0) - 1})}
                        >
                            <Remove />
                        </Button>
                    </Stack>
                </StyledBox>
                <Typography variant="caption" color={'grey'} textAlign="right" dir="ltr">
                    =22,396.93 دلار
                </Typography>
                <StyledBox mt={1} >
                    <Stack direction={'row'} justifyContent="space-between">
                        <Button variant='text' color='dark'>
                            <Add />
                        </Button>

                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', placeholder: "مقدار (btc)", dir: "ltr" }}
                            size="small"
                            value={priceData.amount2}
                            onChange={e => setPriceData(s => ({
                                ...s,
                                amount2: e.target.value,
                            }))}
                            onFocus={e => setPriceData(s => ({
                                ...s,
                                amount2: "",
                            }))}
                        />

                        <Button variant='text' color='dark'>
                            <Remove />
                        </Button>
                    </Stack>
                </StyledBox>
                <Stack direction={"row"} spacing={1} my={1}>
                    {
                        LEVERAGES.map(item => {
                            return <Button
                                key={item}
                                variant={'contained'}
                                color={leverage === item ? 'success' : 'dark'}
                                size='small'
                                sx={{ minWidth: 16, boxShadow: 'none', flexGrow: 1 }}
                                onClick={_ => setLeverage(item)}
                            >
                                <Typography variant='caption' > {item}% </Typography>
                            </Button>
                        })
                    }


                </Stack>


                <Stack direction={"row"} alignItems="center" mb={6}>
                    <SyncAlt color='success' fontSize='12' />
                    <Typography variant='caption' color="grey" mr={"auto"}> موجودی </Typography>
                    <Typography variant='caption'> 0 تتر </Typography>

                </Stack>
                <Button color='success' variant="contained" mt={2}> خرید بیتکوین</Button>
            </Stack>
        </Box>
    )
}

export default MarketActions


const ACTION = Object.freeze({
    BUY: 'buy',
    SELL: 'sell'
})

const BASE_COINS = Object.freeze({
    USDT: 'تتر',
    IRT: 'تومان'
})
const LEVERAGES = [25, 50, 75, 100]