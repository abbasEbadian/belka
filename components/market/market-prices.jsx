import React, { useState } from 'react'
import { alpha, Box, Grid, MenuItem, Select, Stack, Typography, selectClasses } from '@mui/material'
import styled from '@emotion/styled'
import MarketActions from './market-actions'

const prices = [
    {
        id: 1,
        price1: 1.66387483,
        price2: 22399.3,
        fill: 100,
        color: 'error'
    },
    {
        id: 2,
        price1: 1.66387483,
        price2: 22389.3,
        fill: 80,
        color: 'error'
    },
    {
        id: 3,
        price1: 1.66387483,
        price2: 22379.3,
        fill: 50,
        color: 'error'
    },
    {
        id: 4,
        price1: 1.66387483,
        price2: 22369.3,
        fill: 90,
        color: 'error'
    },
    {
        id: 4,
        price1: 1.66387483,
        price2: 22369.3,
        fill: 75,
        color: 'error'
    },
    {
        id: 5,
        price1: 0.85245452,
        price2: 22359.3,
        fill: 50,
        color: 'error'
    },
]
const PriceBox = styled(Box)(({ variant, theme, fill }) => ({
    
    "&": { position: "relative" },
    "&:after": {
        position: 'absolute',
        content: "' '",
        top: 0,
        bottom: 0,
        right: 0,
        left: `${100 - fill}%`,
        background: `${alpha(theme.palette[variant].main, 0.1)}`
    }
}))

const StyledSelect = styled(Select)(({theme}) => ({
    marginTop: 16,
    color: theme.palette.neutral.dark,
    ["."+selectClasses.select]: {
        paddingBlock: 2
    }
}))


function MarketPrices( {selectedCoins} ) {
    const [fraction, setFraction] = useState("0.1")
    const changeFraction = (event) => {
        setFraction(event.target.value)
    }
    return (
        <Box px={2} py={5} sx={{width: "100%"}}>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <MarketActions selectedCoins={selectedCoins}/>
                </Grid>
                <Grid item xs={5}>
                    <Stack>
                        <Stack direction="row" justifyContent={"space-between"} mb={1}>
                            <Typography color={"neutral.dark"} variant='caption' textAlign={"left"} lineHeight={1}>
                                مجموع <br />(بیتکوین)
                            </Typography>
                            <Typography color={"neutral.dark"} variant='caption' textAlign={"right"} lineHeight={1}>
                                قیمت <br />
                                (تتر)
                            </Typography>


                        </Stack>
                        {
                            prices.map((priceRow, idx) => {
                                const color = 'error' ?? `${priceRow.color}.main`
                                return <PriceBox key={idx} py={0.2} variant={color} fill={priceRow.fill}>
                                    <Stack direction={"row"} justifyContent="space-between">
                                        <Typography color={"neutral.main"} variant="caption">
                                            {priceRow.price1}
                                        </Typography>
                                        <Typography color={color} variant="caption">
                                            {priceRow.price2}
                                        </Typography>
                                    </Stack>
                                </PriceBox>
                            })
                        }
                        <Typography color={'error'} textAlign='end' mt={1}>
                            22396.1
                        </Typography>
                        <Typography color={'neutral.dark'} variant={'caption'} textAlign='end' mb={1}>
                            = 22,398.33 دلار
                        </Typography>

                        {
                            prices.map((priceRow, idx) => {
                                const color = 'success' ?? `${priceRow.color}.main`
                                return <PriceBox key={idx} py={0.2} variant={color} fill={priceRow.fill}>
                                    <Stack direction={"row"} justifyContent="space-between">
                                        <Typography color={"neutral.main"} variant="caption">
                                            {priceRow.price1}
                                        </Typography>
                                        <Typography color={color + ".main"} variant="caption">
                                            {priceRow.price2}
                                        </Typography>
                                    </Stack>
                                </PriceBox>
                            })
                        }
                        <StyledSelect value={fraction} size="small" onChange={changeFraction} >   
                            <MenuItem value={0.1} selected>0.1</MenuItem>
                            <MenuItem value={0.2}>0.2</MenuItem>
                            <MenuItem value={0.3}>0.3</MenuItem>
                        </StyledSelect>
                    </Stack>
                </Grid>

            </Grid>
        </Box>
    )
}

export default MarketPrices

