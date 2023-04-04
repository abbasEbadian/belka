import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { BASEURL } from '../settings';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import QRCode from 'react-qr-code';
import { Close } from '@mui/icons-material';

export default function CoinDeposit({ wallet, open, setOpen }) {
  const [network, setNetwork] = React.useState(0)
  const [txid, setTxid] = React.useState('')
  const [userDeposited, setUserDeposited] = React.useState(false)
  const [addressData, setAddressData] = React.useState({
    address: "",
    addressError: null
  })

  const handleClose = () => {
    setOpen(false);
  };

  const changeNetwork = (network) => {
    setAddressData(() => ({
      address: "",
      addressError: ""
    }))
    setNetwork(network)
  }


  const { isLoading: isLoadingAddress, data, refetch: fetchAddress } = useQuery(`get-address-${network}`, () => {
    return axios.post(`${BASEURL}wallet/deposit/address/`, {
      network,
      wallet: wallet.id,
    })
  }, {
    enabled: false,
    onSuccess: (response) => {
      if (response.data.error === 1) {
        setAddressData({
          address: "",
          addressError: response.data.message
        })
      } else {
        setAddressData({
          address: response.data.address,
          addressError: ""
        })
      }
    },
    onError: (error) => {
    }
  })

  const checkDeposit = () => {
    let data = {
      tx_id: txid,
      wallet: wallet.id
    }
    axios.post(`${BASEURL}wallet/deposit/`, data)
      .then((response) => {
        response.data.error != 0
          ? toast.error(response.data.message)
          : toast.success(response.data.message);
      })
      .catch((error) => { });
  }

  React.useEffect(() => {
    if (network === 0) return

    fetchAddress()
  }, [network])
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
            <Typography variant='body1'>{"واریز به کیف پول شما"}</Typography>
            <Close onClick={handleClose} role="button" />
          </Stack>
        </DialogTitle>
        <DialogContent>

          {  // first Step
            !network || !addressData.address ? <>
              <Typography variant='body2' marginY={2}>
                لطفا شبکه واریز را انتخاب کنید
              </Typography>
              <Select
                value={network}
                onChange={(e) => changeNetwork(e.target.value)}
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
              {
                isLoadingAddress &&
                <LoadingButton loading fullWidth>
                  در حال دریافت آدرس کیف پول
                </LoadingButton>
              }
              {
                addressData.addressError &&
                <>
                  <Divider sx={{ my: 1, background: "transparent", border: 0 }} />
                  <Typography variant='caption' color="error" paddingTop={2}>
                    {addressData.addressError}
                  </Typography>
                </>
              }
            </> : null
          }
          {  // second Step
            network && addressData.address && !userDeposited ? <>
              <Typography variant='body2' marginY={2}>
                آدرس کیف پول شما در کادر زیر قابل مشاهده
                است برای واریز کردن ارزهای دیجیتال به
                این کیف پول میتوانید از این آدرس استفاده
                کنید.
              </Typography>

              <Button endIcon={<ContentCopyIcon />} color="info" onClick={() => {
                navigator.clipboard.writeText(addressData.address);
                toast.success("کپی شد !")
              }}>
                <Typography fontSize={11} className='pre-wrap'>
                  {addressData.address}
                </Typography>
              </Button>
              <Box width={150} height={150} textAlign='center' mx={"auto"} my={4}>
                <QRCode size={150} value={addressData.address} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
              </Box>

              <Typography variant='caption' paddingBottom={1} display="block">
                لطفا بعد از واریز ، روی دکمه واریز کردم کلیک
                کنید .
              </Typography>
              <Divider />
              <Button onClick={() => setUserDeposited(true)} color="success" size="small" variant="contained" fullWidth> واریز کردم </Button>

            </> : null
          }
          {
            network && addressData.address && userDeposited ?
              <>
                <Typography variant='body2' mb={1}>  tx-id را وارد کنید </Typography>
                <TextField
                  fullWidth
                  size='small'
                  value={txid}
                  onChange={(e) => setTxid(e.target.value)}
                  sx={{ "input": { textAlign: "center", "&::placeholder": { fontSize: 12 } } }}
                  placeholder="شماره تراکنش"

                />
                <Typography variant='body2' my={1}> مقدار </Typography>
                <TextField
                  fullWidth
                  size='small'
                  placeholder=" مقدار"
                  sx={{ "input": { textAlign: "center", "&::placeholder": { fontSize: 12 } } }}

                />

                <Button onClick={checkDeposit} variant="contained" color="success" fullWidth sx={{ mt: 4 }}>
                  ثبت
                </Button>
              </>
              : null
          }

        </DialogContent>
        {/* <DialogActions>
            <Button onClick={handleClose} color="error" size="small">لغو</Button>
            <LoadingButton color="success" size="small" variant="contained" autoFocus onClick={generateWallet} loading={generateStatus === 'loading'} >
                ایجاد
            </LoadingButton>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}