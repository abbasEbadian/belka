import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';



export default function HistoryTableHistory({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>  شماره تراکنش </TableCell>
                        <TableCell align="right"> تاریخ تراکنش </TableCell>
                        <TableCell align="right">   نوع تراکنش </TableCell>
                        <TableCell align="right">   ارز  </TableCell>
                        <TableCell align="right">  مقدار تراکنش </TableCell>
                        <TableCell align="right">  وضعیت تراکنش </TableCell>
                        <TableCell align="right"> کد رهگیری</TableCell>
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
                                {item.type ==
                                    "deposit" ? (
                                    <div className="text-success-2">
                                        واریز
                                    </div>
                                ) : (
                                    <div className="text-danger">
                                        برداشت
                                    </div>
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {item.service?.name}
                            </TableCell>
                            <TableCell align="right">{item.amount}</TableCell>
                            <TableCell align="right">{item.status ==
                                "accepted" ? (
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
                            <TableCell align="right">{item.status_details}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
