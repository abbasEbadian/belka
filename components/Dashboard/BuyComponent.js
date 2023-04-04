import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useMemo, useState } from "react";
import Router from "next/router";
import axios from "axios";
import NightModeContext from "../Context";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { BASEURL } from "../settings";
import { Autocomplete, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useFetchCoins, useFetchWallet } from "../hooks";
import { Close } from "@mui/icons-material";

const TradeMain = styled(Card)`
    position: relative;
    
    height: 460px;
    width: 47%;
    @media (max-width: 699px) {
        margin-right: 0 !important  ;
        width: 100%;
    }
    
    .my-modal {
        position: fixed;
        width: 360px;
        padding: 16px 20px;
        border-radius: 16px;
        background-color: #293a44;
        color: #fff;
        top: 50%;
        right: 50%;
        z-index: 1;
        transform: translateX(50%) translateY(-50%);
    }
`;


const Inventory = styled('div')`
    border-bottom: 1px solid rgb(172, 172, 172);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    span {
        font-size: 14px !important;
    }
`;

const SelectCoin = styled('div')`
    width: 100% !important;
    h5 {
        font-size: 14px;
        font-weight: 400;
        margin-top: 10px;
        color: #323232;
    }
    img {
        width: 22px;
        margin-left: 5px;
    }
`;
const BuyComponent = () => {
    const [buyFixFee, setBuyFixFee] = useState({});
    const [shopActive, setShopActive] = useState("1");
    const [selectedCoin, setSelectedCoin] = useState();
    const [buyAmount, setBuyAmount] = useState();
    const [buyAmountWithOutFee, setBuyAmountWithOutFee] = useState();
    const [loading, setLoading] = useState(false);

    const [buyAm, setBuyM] = useState();
    const [buyMsg, setbuyMsg] = useState();
    const [buyActive, setBuyActive] = useState(true);
    const [buyShowModal, setBuyShowModal] = useState(false);
    const [buyError, setBuyError] = useState(false);

    const { data: coins } = useFetchCoins()
    const { data: wallet } = useFetchWallet()

    const [usdtState = {}, tomanState = {}] = useMemo(() => {
        return [
            wallet.find(c => c.service.small_name_slug === 'USDT'),
            wallet.find(c => c.service.small_name_slug === 'IRT'),
        ]
    }, [wallet])

    const closeBuyModal = () => {
        setBuyShowModal(false);
    }


    const handleChangeTwo = (e, selectedCoin) => {
        setSelectedCoin(selectedCoin);
    };

    const compute = () => {
        let data = new FormData();
        data.append(
            "destination",
            selectedCoin !== undefined ? selectedCoin?.id : ""
        );
        data.append(
            "source",
            usdtState !== undefined &&
                usdtState.service !== null &&
                usdtState.length !== 0
                ? shopActive == "1"
                    ? usdtState.service.id
                    : tomanState.service.id
                : ""
        );
        data.append("source-price", 0);
        data.append("destination-price", buyAmount);
        data.append("changed", "destination");


        axios.post(`${BASEURL}order/calculator/`, data)
            .then((response) => {

                setBuyAmountWithOutFee(response.data.amount_with_out_fee);
                setBuyM(response.data.source_price);
                setbuyMsg(response.data.message);
                if (response.data.error !== 0) {
                    setBuyError(true);
                }
                if (response.data.error == 0) {
                    setBuyError(false);
                }
                setBuyFixFee(response.data);
                if (shopActive == "1") {
                    if (response.data.source_price > usdtState.balance) {
                        setBuyActive(false);
                    } else {
                        setBuyActive(true);
                    }
                } else {
                    if (response.data.source_price > tomanState.balance) {
                        setBuyActive(false);
                    } else {
                        setBuyActive(true);
                    }
                }
            })
            .catch((error) => { });
    }
    useEffect(() => {
        if (Object.keys(tomanState).length === 0 || Object.keys(usdtState).length === 0) return
        compute()
    }, [
        selectedCoin,
        shopActive,
        buyAmount,
        usdtState,
        tomanState
    ]);

    const buyHandler = (e) => {
        setLoading(true);
        setBuyShowModal(false);
        let data = {
            changed: "destination",
            description: "",
            source_asset:
                usdtState.service !== undefined
                    ? shopActive == "1"
                        ? usdtState.service.id
                        : tomanState.service.id
                    : "",
            amount: parseInt(buyAmount),
            pmethod: "wallet",
            destination_asset: parseInt(
                selectedCoin !== undefined ? selectedCoin?.id : ""
            ),
            source_price: parseInt(
                buyAmountWithOutFee !== undefined ? buyAmountWithOutFee : ""
            ),
            type: "buy",
        };

        axios.post(`${BASEURL}order/create/`, data)
            .then((response) => {

                toast(response.data.message, { type: response.data.error === 1 ? "error" : 'success' });
            })
            .catch((error) => {
                toast.error("خطایی وجود دارد");
            })
            .finally(f => setLoading(false))
    };


    const buyAll = (e) => {
        let fee = 0
        if (shopActive == "1") {
            fee = (parseFloat(usdtState?.balance) * (parseFloat(usdtState.service.trade_fee))) / 100;
            var x = (parseFloat(usdtState?.balance) - (fee * 2)) / (parseFloat(selectedCoin?.buyPrice));

            setBuyAmount((x).toFixed(4));

        } else {
            fee = (parseFloat(tomanState?.balance) * (parseFloat(tomanState.service.trade_fee))) / 100;
            var x = (parseFloat(tomanState?.balance) - (fee * 2)) / (parseFloat(selectedCoin?.buyPrice) * parseFloat(usdtState.service.show_price_irt));
            setBuyAmount(x.toFixed(4));
        }
    };




    return (
        <TradeMain>
            <Stack height={"100%"}>
                <Typography variant="body1" >خرید ارز دیجیتال</Typography>
                <Inventory                    >
                    <Typography variant="caption2" color={"text.secondary"}>موجودی شما :</Typography>
                    <Typography variant="caption2" color={"text.secondary"}>
                        <span>
                            {shopActive == "1" ? (
                                usdtState !== undefined ? (
                                    <Typography color={"success.main"} component="span">

                                        {Intl.NumberFormat("en-US").format(usdtState.balance)}{" "}
                                    </Typography>
                                ) : (
                                    ""
                                )
                            ) : tomanState !== undefined ? (
                                <Typography color={"success.main"} component="span">
                                    {Intl.NumberFormat("en-US").format(tomanState.balance)}{" "}
                                </Typography>
                            ) : (
                                ""
                            )}
                        </span>
                        {shopActive == "1" && usdtState !== undefined ? (
                            usdtState.service !== undefined ? (
                                <span className="ms-2">
                                    {usdtState.service.name}
                                </span>
                            ) : (
                                ""
                            )
                        ) : tomanState !== undefined &&
                            tomanState.service !== undefined ? (
                            <span className="ms-2">
                                {tomanState.service.name}
                            </span>
                        ) : (
                            ""
                        )}
                    </Typography>
                </Inventory>

                <Stack direction={"row"} alignItems='center' mt={2}>
                    <Typography pr={1}>
                        بازار به:
                    </Typography>

                    <ToggleButtonGroup
                        value={shopActive}
                        exclusive
                        color='error'
                        size='small'
                        onChange={(e, value) => {
                            setShopActive(value);
                        }}
                    >

                        <ToggleButton
                            color='info'
                            value={"1"}
                            sx={{ px: 2 }}
                            size="small"
                        >
                            <Typography variant="subtitle2">  تتر </Typography>
                        </ToggleButton>
                        <ToggleButton
                            color='info'
                            value={"2"}
                            sx={{ px: 2 }}
                            size="small"
                        >
                            <Typography variant="subtitle2">  تومان </Typography>
                        </ToggleButton>


                    </ToggleButtonGroup>
                </Stack>

                <SelectCoin className=" mt-4">
                    <Typography color={"text.secondary"} variant='subtitle2' sx={{ mb: 1 }}>
                        انتخاب ارز
                    </Typography>

                    <Autocomplete
                        size="small"
                        options={coins.filter(x => ["USDT", "IRT"].indexOf(x.small_name_slug) === -1)}
                        autoHighlight
                        value={selectedCoin}
                        onChange={handleChangeTwo}

                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img src={option.image} alt="" width={32} />
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="انتخاب"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />

                </SelectCoin>
                <div >
                    <div className="position-relative mt-4">
                        <Typography color={"text.secondary"} variant='subtitle2' sx={{ mb: 1 }}>
                            مقدار
                        </Typography>


                        <TextField
                            placeholder={
                                selectedCoin !== undefined
                                    ? selectedCoin?.value
                                    : ""
                            }
                            name="price"
                            fullWidth
                            value={buyAmount}
                            size="small"
                            onChange={(e) => {
                                setBuyAmount(e.target.value);
                            }}
                            sx={{ "> *": { flexDirection: "row-reverse" } }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <Button onClick={buyAll} sx={{ fontSize: 12 }} color="info">
                                        کل موجودی
                                    </Button>
                                </InputAdornment>,
                            }}
                        />
                    </div>
                </div>
                {buyAm ? (
                    <Typography variant="subtitle2" color={"grey"} mt={1} display='flex'>
                        <span>  {`قیمت هر واحد ${selectedCoin?.name}`}</span>

                        <Typography color={"info.main"} mx={1}>{
                            (shopActive == 1) ? (
                                new Intl.NumberFormat().format((wallet.find((w) => w.service.id === selectedCoin?.id)?.service.buyPrice))

                            ) : (

                                new Intl.NumberFormat().format(wallet.filter((w) => w.service.id === selectedCoin?.id)?.service.show_price_irt)
                            )

                        } </Typography>

                        <span>{(shopActive == 1) ? (usdtState.service.name) : (tomanState.service.name)}
                        </span>


                    </Typography>
                ) : ("")}
                {!buyActive ? (
                    <Typography variant="caption" color='error' mt={1}>
                        اعتبار نا کافی !
                    </Typography>
                ) : (
                    ""
                )}
                <Typography variant='caption' color="error">
                    {buyMsg !== "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید." && buyMsg}
                </Typography>
                <Button
                    sx={{ mt: 'auto' }}
                    fullWidth
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => {
                        setBuyShowModal(true);
                    }}
                    disabled={!buyActive || buyError}
                >
                    خرید
                </Button>
            </Stack>
            <Dialog
                open={buyShowModal}
                onClose={closeBuyModal}
                fullWidth
                maxWidth='sm'

            >
                <DialogTitle display={"flex"} alignItems='center' justifyContent={"space-between"}>
                    {" خرید "} {selectedCoin?.name}
                    <Close onClick={closeBuyModal} />
                </DialogTitle>
                <DialogContent>
                    <div className="my-modal">

                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>شما خریدار هستید</Typography>
                            <span>
                                {buyAmount}{" "}
                                {selectedCoin !== undefined
                                    ? selectedCoin?.value
                                    : ""}
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>روش پرداخت</Typography>
                            <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>کارمزد ثابت</Typography>
                            <span>
                                {buyFixFee?.fix_fee !== undefined
                                    ? buyFixFee.fix_fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActive == "1" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>کارمزد تراکنش</Typography>
                            <span>
                                {buyFixFee?.fix_fee !== undefined
                                    ? buyFixFee.fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActive == "1" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>مجموع کارمزد</Typography>
                            <span>
                                {buyFixFee?.fix_fee !== undefined
                                    ? buyFixFee.total_fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActive == "1" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>مبلغ تراکنش</Typography>
                            <span>
                                {buyAm} {shopActive == "1" ? "تتر" : "تومان"}
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>
                                میزان دریافتی شما
                                <small>( حدودی )</small>
                            </Typography>
                            <span>
                                {buyAmount}{" "}
                                {selectedCoin !== undefined
                                    ? selectedCoin?.value
                                    : ""}
                            </span>
                        </div>
                        <Button
                            variant='contained'
                            size='small'
                            color='success'
                            fullWidth
                            onClick={buyHandler}
                            disabled={!buyActive || buyError}
                        >
                            خرید
                            {selectedCoin !== undefined
                                ? selectedCoin?.value
                                : ""}
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={closeSellModal}>Disagree</Button> */}
                </DialogActions>
            </Dialog>
        </TradeMain>
    );
};

export default BuyComponent;
