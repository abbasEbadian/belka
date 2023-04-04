import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASEURL } from '../settings';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
import { useFetchBanks, useFetchCards } from '../hooks';
import { useState } from 'react';

export default function CoinDeposit({ wallet, open, setOpen }) {
  const [cardNumber, setCardNumber] = useState("")
  const [shaba, setShaba] = useState("");
  const [bank, setBank] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0)
  const [cardId, setCardId] = useState(0);

  const { data: bankNames = [] } = useFetchBanks()
  const { data: cards = [], refetch } = useFetchCards()

  const handleClose = () => {
    setOpen(false);
  };



  

  const addCardHandler = (e) => {
    let data = {
      card: cardNumber,
      shaba: "IR" + shaba,
      bank,
    };

    axios.post(`${BASEURL}bank/add/`, data)
      .then((response) => {
        toast.error(response.data.message);
        refetch()
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const bankHandler = (e) => {
    let data = new FormData();
    data.append("type", "1");
    data.append("amount", depositAmount);
    data.append("bank_id", cardId);

    axios.post(`${BASEURL}wallet/manage/`, data)
      .then((response) => {
        response.data.error != 0
          ? toast.error(response.data.message)
          : window.open(response.data.link);
      })
      .catch((error) => { });
  };
  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle>
          <Stack direction={"row"} justifyContent='space-between'>
            <Typography variant='body1'>{"واریز به کیف پول ریالی"}</Typography>
            <Close onClick={handleClose} role="button" />
          </Stack>
        </DialogTitle>
        <DialogContent>

          {  // IF HAS CARDS
            cards.length > 0 ? <>
              <Typography variant='body2' marginY={2}>
                کیف پول خود را با مبلغ دلخواه شارژ و سپس برای معامله
                های خود استفاده کنید. اعداد به تومان می باشد.
              </Typography>
              <Stack direction={"row"} sx={{ border: "1px solid #555", borderRadius: "8px", "*": { fontSize: 12 }, py: 1 }}>
                <Box flexGrow={1} textAlign='center'>
                  حداقل مقدار واریز :
                  <br />
                  {Number(wallet?.service?.deposit?.min).toLocaleString()} ت
                </Box>
                <Box flexGrow={1} textAlign='center'>
                  حداکثر مقدار واریز :
                  <br />
                  {Number(wallet?.service?.deposit?.max).toLocaleString()} ت
                </Box>

              </Stack>

              <Divider sx={{ mt: 2, border: 0 }} />

              <TextField
                fullWidth
                value={depositAmount}
                size="small"
                onChange={(e) => {
                  setDepositAmount(e.target.value);
                }}
                sx={{ "> *": { flexDirection: "row-reverse" } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">تومان</InputAdornment>,
                }}
              />

              <Divider sx={{ mt: 1, border: 0 }} />
              <Box textAlign={"center"}> یا </Box>
              <Divider sx={{ mt: 1, border: 0 }} />

              <Select
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                size="small"
                fullWidth
              >
                <MenuItem value={0}>
                  انتخاب کنید
                </MenuItem>
                {
                  [5000000, 10000000, 15000000, 20000000, 50000000].map(n => {
                    return <MenuItem key={n} value={n} >
                      {n.toLocaleString()}
                    </MenuItem>
                  })
                }
              </Select>
              <Divider sx={{ mt: 2, border: 0 }} />
              <Typography color={"info"} variant='caption'>
                حتما از شماره کارت وارد شده در حساب خود واریز کنید .
              </Typography>

              <Divider sx={{ mt: 2, border: 0 }} />

              <Select
                value={cardId}
                fullWidth
                size="small"
                onChange={(e) => {
                  setCardId(e.target.value);
                }}
              >
                <MenuItem value={0}>انتخاب کارت</MenuItem>
                {cards.map((i) => {
                  if (i.status == "confirmed") {
                    return (
                      <MenuItem key={i.card} value={i.id}>
                        {i.card}
                      </MenuItem>
                    );
                  }
                })}
              </Select>

              <Divider sx={{ mt: 4, border: 0 }} />

              <Button  onClick={bankHandler} color="success" variant='contained' fullWidth size='small'>
                واریز
              </Button>
            </> : null
          }
          {  // IF HAS NO CARDS
            cards.filter(a => a.status === 'confirmed').length === 0 ? <>
              <Typography variant='body2' marginY={2}>
                شما کارت تایید شده ای ندارید
              </Typography>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                افزودن کارت
              </Typography>
              <Divider sx={{ mt: 2 }} />
              <TextField
                onChange={(e) => {
                  setCardNumber(e.target.value);
                }}
                type="text"
                placeholder="شماره کارت"
                size="small"
                fullWidth
                sx={{ "input": { textAlign: "center", "&::placeholder": { fontSize: 12 } } }}

              />

              <Divider sx={{ mt: 2 }} />
              <TextField
                onChange={(e) => {
                  setShaba(e.target.value);
                }}
                type="text"
                placeholder=" IR شماره شبا بدون "
                size="small"
                fullWidth
                sx={{ "input": { textAlign: "center", "&::placeholder": { fontSize: 12 } } }}

              />

              <Divider sx={{ mt: 2 }} />
              <Select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                size="small"
                fullWidth
                sx={{ fontSize: 14 }}
              >
                <MenuItem value={0}>
                  انتخاب کنید
                </MenuItem>
                {
                  bankNames?.map(n => {
                    return <MenuItem key={n.name} value={n.name} >
                      {n.name}
                    </MenuItem>
                  })
                }
              </Select>

              <Divider sx={{ mt: 4 }} />
              <Button onClick={addCardHandler} color="success" size="small" variant="contained" fullWidth> درخواست ایجاد  </Button>

            </> : null
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}