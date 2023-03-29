import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Autocomplete, Select, TextField } from '@mui/material';
import { useServiceStore } from '../../store/store';
import { Box } from '@mui/system';
import { COIN_TARGET } from '../../pages/market';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function CoinSelectDialog({ open = false, setOpen, selectedCoins, changeCoin }) {
    const { services } = useServiceStore()
  
    const handleClose = () => {
        if(selectedCoins.coinFrom.id === selectedCoins.coinTo.id) return
        setOpen(false);
    };

    
    
    return (
        <div>

            <BootstrapDialog
                onClose={handleClose}
                open={open}
                maxWidth="sm"
                fullWidth
            >
                <BootstrapDialogTitle onClose={handleClose}>
                    <Typography>انتخاب ارز</Typography>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Autocomplete
                        options={services.filter(i => i.name != "تومان")}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        noOptionsText="گزینه ای پیدا نشد"
                        value={selectedCoins.coinFrom}
                        onChange={(event, newValue) => {
                            changeCoin(newValue, COIN_TARGET.FROM);
                          }}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={option.image}
                                    alt=""
                                />
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="ارز مبدا"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                    <Autocomplete
                        sx={{ mt: 2}}
                        value={ selectedCoins.coinTo }
                        options={services.filter(i => i.id != selectedCoins?.coinFrom?.id)}
                        autoHighlight
                        noOptionsText="گزینه ای پیدا نشد"
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                            changeCoin(newValue, COIN_TARGET.TO);
                        }}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={option.image}
                                    alt=""
                                />
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="ارز مقصد"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                    
                    {
                        selectedCoins && selectedCoins.coinFrom && selectedCoins.coinFrom.id && 
                        selectedCoins && selectedCoins.coinTo && selectedCoins.coinTo.id && 
                        selectedCoins.coinFrom.id === selectedCoins.coinTo.id && 
                        <Typography color={'error'} variant="caption">
                            مبدا نمی تواند با مقصد یکسان باشد
                    </Typography>}

                </DialogContent>
              
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(CoinSelectDialog)