import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useMutation, useQueryClient} from 'react-query';
import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASEURL } from '../settings';
import { LoadingButton } from '@mui/lab';
import { Coin, IAxiosError } from '../Types';

type GenerateWalletDialogType = {
    open: boolean,
    setOpen: (arg0: boolean) => void,
    selectedCoin: undefined |  Coin
}
export default function GenerateWalletDialog({ open, setOpen, selectedCoin }: GenerateWalletDialogType) {
    const client = useQueryClient()

    const handleClose = () => {
        if(generateStatus === 'loading') return
        setOpen(false);
    };

    const { mutate: generateWallet, status: generateStatus } = useMutation( () => {
        return axios.post(`${BASEURL}wallet/generate/`,  {service: selectedCoin?.id} )
    }, {
        onSuccess: ( response  ) => {
            if(response.data.error === 1)
                toast.warning(response.data.message)
            else 
                toast.success("کیف پول شما با موفقیت ساخته شد")
            client.invalidateQueries('get-wallet')
            handleClose()
        },
        onError: ( error: IAxiosError ) => {
            toast.error(error.response.data.message)
        },
        
    })

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle >
                    <Typography variant='body1'>{"ساخت کیف پول"}</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant='body2' marginY={2}>
                            {/* شما کیف پول این ارز را ندارید. */}
                            <br />
                            آیا می‌خواهید کیف پول این ارز برای شما ایجاد شود؟
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" size="small">لغو</Button>
                    <LoadingButton 
                        color="success" 
                        size="small" 
                        variant="contained" 
                        autoFocus 
                        onClick={() => generateWallet()} 
                        loading={generateStatus === 'loading'} >
                        ایجاد
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}