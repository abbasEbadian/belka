import { Card, Typography, Stack, Button, Box, Divider } from '@mui/material';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react'

function DashboardWallet({ wallet }) {

    return (
        <Card>
            <Typography variant="body1">کیف پول</Typography>
            <Divider flexItem sx={{ width: "100%", my:1}} />
            {wallet.length !== 0 &&
                wallet.map((item, rowOfWall) => {
                    if (rowOfWall > 5) return;
                    return (
                        <>
                            <Stack direction={"row"} key={rowOfWall} justifyContent="space-between" alignItems={"center"} >
                                <Stack>
                                    <Typography color={"text.secondary"}>
                                        {item?.service?.name}
                                    </Typography>
                                    <Typography variant='caption' color={"text.secondary"}>
                                        { new Intl.NumberFormat().format(Math.trunc(item.balance)) }{" "}
                                        <Typography variant='caption'>
                                        { item?.service?.small_name}
                                        </Typography>
                                    </Typography>
                                </Stack>
                                
                                <Box sx={{ width: 32, height: 32 }} position="relative">
                                    <Image src={
                                        item?.service
                                            ?.image
                                    }  
                                    layout="fill"/>
                                </Box>
                            </Stack>
                            <Divider flexItem sx={{ width: "100%", my:1}} />
                        </>
                    );
                })}
            <Stack alignItems={"center"} justifyContent='center' width={'100%'}  marginTop={12}>
                <Button
                    color='success'
                    onClick={() =>
                        Router.push("/wallet")
                    }
                >
                    مشاهده همه
                </Button>
            </Stack>
        </Card>
    )
}

export default DashboardWallet