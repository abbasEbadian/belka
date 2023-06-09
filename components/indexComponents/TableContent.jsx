import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import pic from '@/p/index_images/BTC.png';
import styled from '@emotion/styled';
const TableContentBody = styled.div `
    .MuiTableCell-root{
        text-align: right;
    }
    .coin-name-box{
        .name{
            color: var(--blue900);
            font-size: 16px;
            margin-inline: 5px;
        }
        .name2{
            color: var(--white400);
            font-size: 14px;
            margin-inline: 10px;
        }
    }
    .trade-box{
        .link-trade{
            border: 1px solid var(--green);
            color: var(--green);
            font-size: 14px;
            margin-inline: 10px;
            padding: 5px 14px;
            border-radius: 4px;
            cursor: pointer;
            min-width: 70px;
            text-align: center;
            &:hover{
                background-color: var(--green);
                color: var(--white);
                opacity: 1;
            }
        }
    }
`

function createData(name, LastPrice, Change, Markets ,trade ) {
  return { name, LastPrice, Change, Markets ,trade  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
];

export default function BasicTable() {
  return (
    <>
    <TableContentBody>

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>سکه</TableCell>
                <TableCell align="right">آخرین قیمت</TableCell>
                <TableCell align="right">24 ساعت تغییر</TableCell>
                <TableCell align="right">بازارها</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                   <div className="coin-name-box d-flex align-items-center">
                        <img src={pic} alt="" width={24} />
                       
                        <span className="name">BTC</span>
                        <span className="name2">Bitcoin</span>

                   </div>
                </TableCell>
                <TableCell align="right">{row.LastPrice}</TableCell>
                <TableCell align="right">{row.Change}</TableCell>
                <TableCell align="right">{row.Markets}</TableCell>
                <TableCell align="right">
                    <div className="trade-box d-flex align-items-center">
                        <a href="" className="link-trade">ترید</a>
                        <a href="" className="link-trade">جزییات</a>
                    </div>   
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

    </TableContentBody>
    </>

  );
}
