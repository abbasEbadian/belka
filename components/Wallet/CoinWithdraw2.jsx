import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { BASEURL } from '../settings';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
import { useFetchCards } from '../hooks';
import { useState } from 'react';

export default function CoinWithdraw({ wallet, open, setOpen }) {

  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [bank, setBank] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(true);
  const [network, setNetwork] = React.useState(0)

  const handleClose = () => {
    setOtpSent(false)
    setWithdrawAmount(0)
    setOpen(false);
  };




  const withdrawOtpHandler = (e) => {

    axios(`${BASEURL}wallet/withdrawal/otp/`)
      .then((response) => {
        setOtpSent(true);
        if (response.data.error > 0) {
          toast.error(response.data.message)
        } else {
          toast.success(response.data.message)
        }

      })
      .catch((error) => { });
  };


  const withdrawHandler = (e) => {
    let data = {
      amount: withdrawAmount,
      id: wallet.id,
      network,
      otp,
      wallet: withdrawAddress,
    };

    axios.post(`${BASEURL}wallet/withdrawal/`, data)
      .then((response) => {
        if (response.data.error > 0) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          handleClose()
        }
        // setAdress(response.data)
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
            <Typography variant='body1'>{" برداشت از کیف پول شما "}</Typography>
            <Close onClick={handleClose} role="button" />
          </Stack>
        </DialogTitle>
        <DialogContent>

          {  // IF No OTP yet
            !otpSent ? <>
              <Typography variant='body2' marginY={2}>
                در صورت تمایل به برداشت موجودی کیف پول های خود ، درخواست
                خود را اینجا ثبت نمایید.
              </Typography>

              <Divider transparent sx={{ mt: 2 }} />

              <Stack direction={"row"} justifyContent='space-between' alignItems={'center'}>
                <Typography variant='subtitle2'> کارمزد برداشت </Typography>
                <Typography variant='subtitle2' color="error">
                  {wallet?.service?.withdraw.fee}{" "}
                  {wallet?.service?.name}
                </Typography>
              </Stack>
              <Divider sx={{ mt: 2, border: 0 }} />

              <Typography variant='subtitle2'>میزان برداشت </Typography>

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

              <Typography variant='subtitle2'>آدرس کیف پول مقصد</Typography>
              <Divider sx={{ mt: 1, border: 0 }} />
              <TextField
                fullWidth
                value={withdrawAddress}
                onChange={(e) => {
                  setWithdrawAddress(e.target.value);
                }}
                type="text"
              />

              <Divider sx={{ mt: 2, border: 0 }} />

              <Typography variant='body2' marginY={2}>
                لطفا شبکه واریز را انتخاب کنید
              </Typography>
              <Select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                size="small"
                fullWidth
              >
                <MenuItem value={0}>
                  انتخاب کنید
                </MenuItem>
                {
                  wallet?.service?.network.map(n => {
                    return <MenuItem key={n.id} value={n.id} >
                      {n.name}
                    </MenuItem>
                  })
                }
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
        </DialogContent>
      </Dialog>
    </div>
  );
}