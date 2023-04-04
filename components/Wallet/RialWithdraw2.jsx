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

export default function RialWithdraw2({ wallet, open, setOpen }) {
  const [cardNumber, setCardNumber] = useState("")
  const [shaba, setShaba] = useState("");
  const [network, setNetwork] = useState(0)
  const [bank, setBank] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [cardId, setCardId] = useState(0);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState("");
  const [addressData, setAddressData] = useState({
    address: "",
    addressError: null
  })

  const { data: bankNames = [] } = useFetchBanks()
  const { data: cards = [], refetch } = useFetchCards()

  const  handleClose= () => {
    setOtpSent(false)
    setWithdrawAmount(0)
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

  const withdrawOtpHandler = (e) => {

    axios(`${BASEURL}wallet/withdrawal/otp/`)
      .then((response) => {
        setOtpSent(true);
        if(response.data.error > 0){
          toast.error(response.data.message)
        }else{
          toast.success(response.data.message)
        }
          
      })
      .catch((error) => { });
  };

  const withdrawHandler = (e) => {
    let data = {
      type: "2",
      amount: withdrawAmount,
      bank_id: bank,
      otp,
    };


    axios.post(`${BASEURL}wallet/manage/`, data)
      .then((response) => {
        if(response.data.error > 0){
          toast.error(response.data.message)
        }else{
          toast.success(response.data.message);
          handleClose()
        }
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
            <Typography variant='body1'>{"برداشت ریالی"}</Typography>
            <Close onClick={handleClose} role="button" />
          </Stack>
        </DialogTitle>
        <DialogContent>

          {  // IF No OTP yet
            !otpSent && cards.filter(a => a.status === 'confirmed').length > 0 ? <>
              <Typography variant='body2' marginY={2}>
                در صورت تمایل به برداشت موجودی کیف پول ریالی ،
                درخواست خود را اینجا ثبت نمایید.
              </Typography>
              <Divider transparent sx={{ mt: 2 }} />
              <Typography color={"error"} variant='subtitle2'>
                مبلغ به صورت پایا به شما انتقال داده می شود
              </Typography>
              <Divider transparent sx={{ mt: 2 }} />

              <Typography variant='subtitle2'>میزان برداشت </Typography>

              <Divider transparent sx={{ mt: 2 }} />

              <Stack direction={"row"} sx={{ border: "1px solid #555", borderRadius: "8px", "*": { fontSize: 12 }, py: 1 }}>
                <Box flexGrow={1} textAlign='center'>
                  حداقل مقدار برداشت :
                  <br />
                  {Number(wallet?.service?.withdraw?.min).toLocaleString()} ت
                </Box>
                <Box flexGrow={1} textAlign='center'>
                  حداکثر مقدار برداشت :
                  <br />
                  {Number(wallet?.service?.withdraw?.max).toLocaleString()} ت
                </Box>
              </Stack>

              <Divider sx={{ mt: 2, border: 0 }} />
              <Stack direction={"row"} justifyContent='space-between' alignItems={'center'}>
                <Typography variant='subtitle2'> کارمزد برداشت </Typography>
                <Typography variant='subtitle2' color="error">
                  {wallet !== undefined && wallet?.service?.withdraw.fee}{" "}
                  {wallet?.service?.name}
                </Typography>
              </Stack>
              <Divider sx={{ mt: 2, border: 0 }} />

              <TextField
                fullWidth
                value={withdrawAmount}
                size="small"
                onChange={(e) => {
                  setWithdrawAmount(e.target.value);
                }}
                sx={{ "> *": { flexDirection: "row-reverse" } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                    <Button onClick={() => setWithdrawAmount(wallet.balance)}>
                      کل موجودی
                    </Button>
                  </InputAdornment>,
                }}
              />
              {withdrawAmount > wallet.balance && (<>
                <Divider sx={{ mt: 1, border: 0 }} />
                <Typography color="error" variant='subtitle2'>
                  موجودی ناکافی !
                </Typography>
              </>
              )}

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

              <Button onClick={withdrawOtpHandler} color="success" variant='contained' fullWidth size='small'>
                درخواست برداشت
              </Button>
            </>

              :

              <>
                <Typography variant='body1'>لطفا کد تایید را وارد نمایید </Typography>
                <Divider transparent sx={{ mt: 2 }} />

                <TextField
                  fullWidth
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
                <Divider transparent sx={{ mt: 4 }} />

                <Button onClick={withdrawHandler} color="success" fullWidth size='small' variant='contained'>
                  ثبت درخواست برداشت
                </Button>
              </>
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