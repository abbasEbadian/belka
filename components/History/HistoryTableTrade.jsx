import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';


export default function HistoryTableTrade({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>  شماره تراکنش </TableCell>
                        <TableCell align="right"> تاریخ معامله </TableCell>
                        <TableCell align="right">  نوع معامله </TableCell>
                        <TableCell align="right">  پرداخت </TableCell>
                        <TableCell align="right">  دریافت </TableCell>
                        <TableCell align="right">  وضعیت </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.id}
                            </TableCell>
                            <TableCell align="right">{item.published}</TableCell>
                            <TableCell align="right">
                                {["USDT", "IRT"].indexOf(item.destination_asset) > -1 ? (
                                    <Typography variant='subtitle2' color="error"> فروش </Typography>
                                ) : ["USDT", "IRT"].indexOf(item.source_asset) > -1 ? (
                                    <Typography variant='subtitle2' color="success"> خرید </Typography>
                                ) : (
                                    <Typography variant='subtitle2' color="warning"> تبدیل </Typography>
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat().format((item.source_amount))}{" "}
                                {item.source_asset}
                            </TableCell>
                            <TableCell align="right">{
                                new Intl.NumberFormat().format((item.destination_amount))
                            }{" "}
                                {item.destination_asset}</TableCell>
                            <TableCell align="right">{item.status ==
                                "accepted" ||
                                item.status ==
                                "delivered" ? (
                                <div className="text-success-2">
                                    انجام شده
                                </div>
                            ) : item.status ==
                                "pending" ? (
                                <span>
                                    در انتظار
                                </span>
                            ) : (
                                <div className="text-danger">
                                    رد شده
                                </div>
                            )}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
