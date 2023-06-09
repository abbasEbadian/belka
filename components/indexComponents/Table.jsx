import React from 'react'
import TabsTable from '@/c/indexComponents/TabsTable'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Box, Container, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, Button, OutlinedInput, Input } from '@mui/material'
import { useState } from 'react'
import { useFetchCoins } from '../hooks'
import { Search, UnfoldMore } from '@mui/icons-material'
import { theme } from '../settings'
import { useReducer } from 'react'

const MainTable = styled(Box)`
    position: relative;
    z-index: 10;
    
    min-height: 200px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    span {
        margin-right: 8px;
    }
    .select-shop {
        height: 40px;
        width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            transition: all 0.3s;
            width: 100px;
            height: 100%;
            color: #fff;
            border-radius: 5px 0px 0 0;
            background-color: #feffc6;
            color: #000;

            :last-child {
                border-radius: 0px 5px 0 0;
                border-left: 1px solid #020202 !important;
            }
        }
        .active {
            background-color: #fd961a;
            color: #fff;
        }
    }
   
    .scrollable {
        max-height: 500px;
        overflow: auto;
        width: 100%;
    }
    table {
        width: 100%;
       
        thead,
        tbody {
            tr {
                th {
                    padding: 20px;
                    font-size: 14px;
                    font-weight: 400;
                }
                td {
                    padding: 10px 20px;
                    font-size: 14px;
                }
            }
        }
        thead {
            border-bottom: 1px solid #cccc;
        }
        tbody {
            tr {
                border-bottom: 1px solid #cccc;
            }
        }
    }

    @media (max-width: 1100px) {
        width: 100%;
        border-radius: 0;
        table {
            font-size: 13px;
            white-space: nowrap;
        }
    }
    @media (max-width: 768px) {
        .select-shop {
            width: calc(100% - 20px);
            left: 10px;
            button {
                transition: all 0.3s;
                width: 50%;
            }
        }
       
        table {
            font-size: 13px;
            white-space: nowrap;
            thead,
            tbody {
                tr {
                    th {
                        padding: 20px 10px;
                        font-size: 12px;
                    }
                    td {
                        padding: 10px 10px;
                        font-size: 12px;
                    }
                }
            }
        }
        button {
            font-size: 13px;
        }
    }
`;

function Table() {
    const changeActive = (state, payload) => {
        if(!payload  || state === payload) return state
        return payload
    }

    const { isLoading: isCoinLoading, data: coins = [] } = useFetchCoins()
    const [activeBtn, dispatcher] = useReducer(changeActive, 1)
    const [searchWord, setSearchWord] = useState('')
    const [searchActive, setSearchActive] = useState(false)

    const [sortMethod, setSortMethod] = useState(false);
    const [ress, setRess] = useState([]);

    const sortHandler = (e) => {
        setSortMethod(!sortMethod);
        sortMethod
            ? coins?.sort(
                (a, b) => a.quote_usd.percent24h - b.quote_usd.percent24h
            )
            : coins?.sort(
                (a, b) => b.quote_usd.percent24h - a.quote_usd.percent24h
            );
        ress.length !== 0 && sortMethod
            ? ress.sort(
                (a, b) => a.quote_usd.percent24h - b.quote_usd.percent24h
            )
            : ress.sort(
                (a, b) => b.quote_usd.percent24h - a.quote_usd.percent24h
            );
    };
    const searchHandler = (e) => {
        setSearchWord(e.target.value);
        setSearchActive(true);
        setRess(
            coins?.filter(
                (item) =>
                    item.name.includes(e.target.value) ||
                    item.small_name.includes(e.target.value) ||
                    item.small_name_slug.includes(e.target.value.toUpperCase())
            )
        );
    };
    var row = 0
    return (
        <>
            <Box className='container'>
                <MainTable>
                    <Stack direction={"row-reverse"} sx={{ width: "100%", mt: 4, mb: 2 }} justifyContent={'space-between'} alignItems={"center"} gap={2}>
                        <ToggleButtonGroup
                            value={activeBtn}
                            exclusive
                            size='small'

                            onChange={(e, value) => {
                                dispatcher( value);
                            }}
                            sx={{ border: `1px solid ${theme.palette.primary.light}` }}
                        >

                            <ToggleButton
                                color='success'
                                value={1}
                                sx={{ px: 2 }}
                                size="small"
                            >
                                <Typography variant="subtitle2" color={"primary.main"}>  تتر </Typography>
                            </ToggleButton>
                            <ToggleButton
                                color='success'
                                value={2}
                                sx={{ px: 2 }}
                                size="small"
                            >
                                <Typography variant="subtitle2" color={"primary.main"} >  تومان </Typography>
                            </ToggleButton>


                        </ToggleButtonGroup>

                        <TextField
                            size='small'
                            onChange={searchHandler}
                            variant='outlined'
                            color='primary'
                            sx={{
                                ["fieldset, &:hover fieldset"]: {
                                    border: `1px solid #aaa`
                                },
                                ["legend"]: {
                                    "display": "none"
                                },

                                ["input::placeholder"]: {
                                    color: "#aaa"
                                },
                                ["input"]: {
                                    color: "gray",
                                },

                            }}
                            placeholder="نام ارز ..."
                            InputProps={{
                                endAdornment: <Search color='grey' sx={{ fill: "#aaa" }} />
                            }}
                        />
                    </Stack>
                    <div className="scrollable">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>نام ارز</th>
                                    <th>قیمت خرید</th>
                                    <th>قیمت فروش</th>
                                    <th onClick={sortHandler}>
                                        تغییرات 24 ساعت
                                        {/* <UnfoldMore /> */}
                                    </th>
                                    <th className="align-middle res-d-none">
                                        نمودار هفتگی
                                    </th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!searchActive ?
                                    coins?.map((item) => {
                                        row++;
                                        if (item.name !== "تومان") {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{row}</td>
                                                    <td>
                                                        <Stack direction={'row'} gap={0.5} alignItems={"center"}>
                                                            <Image
                                                                src={item.image}
                                                                width={25}
                                                                height={25}
                                                                alt=""
                                                            />
                                                            <span>
                                                                {item.small_name_slug}
                                                            </span>
                                                            <span>{item.name}</span>
                                                        </Stack>
                                                    </td>
                                                    {activeBtn == 1 ? (
                                                        <>
                                                            <td>
                                                                {Math.trunc(
                                                                    (item.buyPrice *
                                                                        (item.trade_fee /
                                                                            100) +
                                                                        item.buyPrice) *
                                                                    coins[0]
                                                                        .buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                            <td>
                                                                {Math.trunc(
                                                                    item.buyPrice *
                                                                    coins[0]
                                                                        .buyPrice -
                                                                    item.buyPrice *
                                                                    (item.trade_fee /
                                                                        100) *
                                                                    coins[0]
                                                                        .buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td>
                                                                {(
                                                                    item.buyPrice *
                                                                    (item.trade_fee /
                                                                        100) +
                                                                    item.buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                            <td>
                                                                {(
                                                                    item.buyPrice -
                                                                    item.buyPrice *
                                                                    (item.trade_fee /
                                                                        100)
                                                                ).toLocaleString()}
                                                            </td>
                                                        </>
                                                    )}
                                                    <td>
                                                        <div
                                                            className={
                                                                item.quote_usd !==
                                                                    undefined &&
                                                                    item.quote_usd
                                                                        .percent24h >
                                                                    0
                                                                    ? "plus changes"
                                                                    : item.quote_usd !==
                                                                        undefined &&
                                                                        item
                                                                            .quote_usd
                                                                            .percent24h <
                                                                        0
                                                                        ? "nega changes"
                                                                        : "zero changes"
                                                            }
                                                        >
                                                            {item.quote_usd !==
                                                                undefined &&
                                                                item.quote_usd
                                                                    .percent24h > 0
                                                                ? "+ " +
                                                                item.quote_usd
                                                                    .percent24h
                                                                : item.quote_usd
                                                                    .percent24h}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {item.quote_usd !==
                                                            undefined &&
                                                            item.quote_usd
                                                                .percent24h > 0 ? (
                                                            <img
                                                                className="ch-img"
                                                                src={
                                                                    "/images/green-chart" +
                                                                    (Math.floor(
                                                                        Math.random() *
                                                                        6
                                                                    ) +
                                                                        1) +
                                                                    ".svg"
                                                                }
                                                                alt=""
                                                                width={160}
                                                                height={60}
                                                            />
                                                        ) : (
                                                            <img
                                                                className="ch-img"
                                                                src={
                                                                    "/images/red-chart" +
                                                                    (Math.floor(
                                                                        Math.random() *
                                                                        6
                                                                    ) +
                                                                        1) +
                                                                    ".svg"
                                                                }
                                                                alt=""
                                                                width={160}
                                                                height={60}
                                                            />
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant='contained'
                                                            color='primary'
                                                            size="small"
                                                            onClick={() => {
                                                                Router.push(
                                                                    "/trade"
                                                                );
                                                            }}
                                                        >
                                                            معامله
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })
                                    : ress.map((item) => {
                                        row++;
                                        if (item.name !== "تومان") {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{row}</td>
                                                    <td>
                                                        <img
                                                            src={item.image}
                                                            width={25}
                                                            alt=""
                                                        />
                                                        <span>
                                                            {item.small_name_slug}
                                                        </span>
                                                        <span>{item.name}</span>
                                                    </td>
                                                    {activeBtn == 1 ? (
                                                        <>
                                                            <td>
                                                                {(
                                                                    (item.buyPrice *
                                                                        (item.trade_fee /
                                                                            100) +
                                                                        item.buyPrice) *
                                                                    coins[0]
                                                                        .buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                            <td>
                                                                {(
                                                                    item.buyPrice *
                                                                    coins[0]
                                                                        .buyPrice -
                                                                    item.buyPrice *
                                                                    (item.trade_fee /
                                                                        100) *
                                                                    coins[0]
                                                                        .buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td>
                                                                {(
                                                                    item.buyPrice *
                                                                    (item.trade_fee /
                                                                        100) +
                                                                    item.buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                            <td>
                                                                {(
                                                                    item.buyPrice -
                                                                    item.buyPrice *
                                                                    (item.trade_fee /
                                                                        100)
                                                                ).toLocaleString()}
                                                            </td>
                                                        </>
                                                    )}
                                                    <td>
                                                        <div
                                                            className={
                                                                item.quote_usd !==
                                                                    undefined &&
                                                                    item.quote_usd
                                                                        .percent24h >
                                                                    0
                                                                    ? "plus changes"
                                                                    : item.quote_usd !==
                                                                        undefined &&
                                                                        item
                                                                            .quote_usd
                                                                            .percent24h <
                                                                        0
                                                                        ? "nega changes"
                                                                        : "zero changes"
                                                            }
                                                        >
                                                            {item.quote_usd !==
                                                                undefined &&
                                                                item.quote_usd
                                                                    .percent24h > 0
                                                                ? "+ " +
                                                                item.quote_usd
                                                                    .percent24h
                                                                : item.quote_usd
                                                                    .percent24h}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {item.quote_usd !==
                                                            undefined &&
                                                            item.quote_usd
                                                                .percent24h > 0 ? (
                                                            <img
                                                                className="ch-img"
                                                                src={
                                                                    "/images/green-chart" +
                                                                    (Math.floor(
                                                                        Math.random() *
                                                                        6
                                                                    ) +
                                                                        1) +
                                                                    ".svg"
                                                                }
                                                                alt=""
                                                                width={160}
                                                                height={60}
                                                            />
                                                        ) : (
                                                            <img
                                                                className="ch-img"
                                                                src={
                                                                    "/images/red-chart" +
                                                                    (Math.floor(
                                                                        Math.random() *
                                                                        6
                                                                    ) +
                                                                        1) +
                                                                    ".svg"
                                                                }
                                                                alt=""
                                                                width={160}
                                                                height={60}
                                                            />
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant='contained'
                                                            size="small"
                                                            color='primary'
                                                            onClick={() => {
                                                                Router.push(
                                                                    "/trade"
                                                                );
                                                            }}
                                                        >
                                                            معامله
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                            </tbody>
                        </table>
                    </div>
                </MainTable>

            </Box>
        </>
    )
}

export default Table