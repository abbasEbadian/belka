import { Button, Card, Stack, Typography } from '@mui/material';
import { Router } from 'next/router';
import React from 'react'

export default function DashboardHistory( { coins, orderList}) {
    return (
        <Card>
            <Typography variant='body1'>تاریخچه تراکنش ها</Typography>
            {orderList.length !== 0 &&
                orderList.map((item) => {
                    {
                        rowOfHistory++;
                    }
                    if (rowOfHistory < 5) {
                        return (
                            <>
                                <div
                                    key={item.id}
                                    className="d-flex his-item align-items-center p-2 px-3 mt-0"
                                >
                                    {coins.map((e) => {
                                        if (
                                            e.small_name_slug ==
                                            item.destination_asset
                                        ) {
                                            return (
                                                <img
                                                    width={
                                                        40
                                                    }
                                                    className="ms-2"
                                                    src={
                                                        e.image
                                                    }
                                                />
                                            );
                                        }
                                    })}

                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex w-100">
                                                {item.destination_asset ==
                                                    "USDT" ||
                                                    item.destination_asset ==
                                                    "IRT" ? (
                                                    <div className="text-danger d-flex  justify-content-between w-100">
                                                        <span>
                                                            فروش
                                                        </span>{" "}
                                                        <div className="d-flex">
                                                            {Number(
                                                                item.destination_amount
                                                            ).toFixed(
                                                                7
                                                            ).toLocaleString()}{" "}
                                                            {coins.map(
                                                                (
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.small_name_slug ==
                                                                        item.destination_asset
                                                                    ) {
                                                                        return (
                                                                            <span className="me-1">
                                                                                {
                                                                                    e.small_name_slug
                                                                                }
                                                                            </span>
                                                                        );
                                                                    }
                                                                }
                                                            )}





                                                        </div>
                                                    </div>
                                                ) : item.source_asset ==
                                                    "USDT" ||
                                                    item.source_asset ==
                                                    "IRT" ? (
                                                    <div className="text-success-2 d-flex  justify-content-between w-100">
                                                        <span>
                                                            خرید
                                                        </span>{" "}
                                                        <div className="d-flex">
                                                            {Number(
                                                                item.destination_amount
                                                            ).toFixed(
                                                                7
                                                            )}{" "}
                                                            {coins.map(
                                                                (
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.small_name_slug ==
                                                                        item.destination_asset
                                                                    ) {
                                                                        return (
                                                                            <span className="me-1">
                                                                                {
                                                                                    e.small_name_slug
                                                                                }
                                                                            </span>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-warning d-flex  justify-content-between w-100">
                                                        <span>

                                                        </span>{" "}
                                                        <div className="d-flex">
                                                            {Number(
                                                                item.destination_amount
                                                            ).toFixed(
                                                                7
                                                            )}{" "}
                                                            {coins.map(
                                                                (
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.id ==
                                                                        item.destination_asset
                                                                    ) {
                                                                        return (
                                                                            <span className="me-1">
                                                                                {
                                                                                    e.small_name_slug
                                                                                }
                                                                            </span>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="am-order">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    }
                })}
            <Stack alignItems={'center'} justifyContent='center' width={"100%"} marginTop={12}>
                <Button 
                    color='success'
                    onClick={() =>
                        Router.push("/history")
                    }
                >
                    مشاهده همه
                </Button>
            </Stack>
        </Card>
    )
}
