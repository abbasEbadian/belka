import styled from '@emotion/styled'
import { Add, Info, Remove, SyncAlt } from '@mui/icons-material'
import { Box, Button, MenuItem, Select, selectClasses, Stack, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useState } from 'react'

const StyledStack = styled(Stack)(({theme}) => ({
    ['button']: {
        flex: "1 0 auto",
        ["&:first-of-type"]: {
            clipPath:"polygon(0% 0, 100% 0%, 100% 100%, 10% 100%)"
        },
        ["&:last-of-type"]: {
            clipPath:"polygon(0% 0, 90% 0%, 100% 100%, 0% 100%)"
        },
    }
}))
const StyledBox = styled(Box)(({theme}) => ({
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
const StyledSelect = styled(Select)(({theme}) => ({
    marginTop: 16,
    textAlign: 'center',
    color: "white",
    ["."+selectClasses.select]: {
        paddingBlock: "4px 2px",
        fontSize: 13
    },
    ["."+selectClasses.nativeInput]: {
        textAlign: 'center',
        color: "white",
    },


}))

function MarketActions() {
    const [buyData, setBuyData] = useState({
        limit: 0,
        amount: 0,
        amount2: 0,
        fraction: 25,
        volume: 0,
    }) 
    const [currentAction, setCurrentAction] = useState(ACTION.BUY)
    const [limit, setLimit] = useState("Limit")
    return (
        <Box pr={1} sx={{maxWidth: 500}}>
            <Head>
                <title> بازار </title>
            </Head>
            <Stack>
                <StyledStack direction={"row"} spacing={0       } alignItems={"center"} justifyContent="stretch">
                    <Button variant='contained' onClick={() => setCurrentAction(ACTION.BUY) } size="small" 
                        color={currentAction === ACTION.BUY ? 'success': 'dark'}>
                        خرید
                    </Button>
                    <Button variant='contained' onClick={() => setCurrentAction(ACTION.SELL)} size="small"
                    color={currentAction === ACTION.SELL ? 'error': 'dark'}>
                        فروش
                    </Button>
                </StyledStack>

                <Box sx={{width: "100%", position: "relative"}}>
                    <Info fontSize="10px" sx={{ position: "absolute", top: 22, left: 6, color: "#888"}} />
                    <StyledSelect value={limit} fullWidth>  
                        <MenuItem value={'Limit'}>Limit</MenuItem>
                    </StyledSelect>
                </Box>
                <StyledBox mt={2}>
                    <Stack direction={'row'} justifyContent="space-between">
                        <Button variant='text' color='dark'> 
                            <Add />
                        </Button>

                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  size="small" />

                        <Button variant='text' color='dark'> 
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

                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', placeholder: "مقدار (btc)" }}  size="small" />

                        <Button variant='text' color='dark'> 
                            <Remove />
                        </Button>
                    </Stack>
                </StyledBox>
                <Stack direction={"row"} spacing={1} my={1}>
                    <Button variant='contained' color='dark' size='small' sx={{minWidth: 16, boxShadow: 'none', flexGrow: 1}} >  
                        <Typography variant='caption' color={"grey"}> 25% </Typography>
                    </Button>
                    <Button variant='contained' color='dark' size='small' sx={{minWidth: 16, boxShadow: 'none', flexGrow: 1}}> 
                        <Typography variant='caption'  color={"grey"}> 50% </Typography>
                    </Button>
                    <Button variant='contained' color='dark' size='small' sx={{minWidth: 16, boxShadow: 'none', flexGrow: 1}}> 
                        <Typography variant='caption'  color={"grey"}> 75% </Typography>
                    </Button>
                    <Button variant='contained' color='dark' size='small' sx={{minWidth: 16, boxShadow: 'none', flexGrow: 1}}> 
                        <Typography variant='caption'  color={"grey"}> 100% </Typography>
                    </Button>
                </Stack>
                <StyledBox mt={1}>
                     
                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', placeholder: "حجم (تتر)" }}  size="small" fullWidth/>

                </StyledBox>
                <Typography variant="caption" color={'grey'} textAlign="right" dir="ltr">
                    =0.00 دلار
                </Typography>
                <Stack direction={"row"} alignItems="center" mb={6}> 
                    <SyncAlt color='success' fontSize='12'/>
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