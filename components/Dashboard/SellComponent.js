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
import { Autocomplete, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useFetchCoins, useFetchWallet } from "../hooks";

const TradeMain = styled(Card)`
    position: relative;
    .select-all {
        width: 100px;
        font-size: 12px;
        height: 27px;
        background-color: #293a44;
        position: absolute;
        right: 7px;
        top: 13px;
    }
    .poabs {
        :disabled {
            opacity: 0.7;
        }
        position: absolute;
        width: 90% !important;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(160deg, #dc143c, #dd3557);
    }
    :disabled {
        opacity: 0.6;
    }
    height: 460px;
    width: 47%;
    @media (max-width: 699px) {
        width: 100%;
        margin-right: 0 !important  ;

    }
    .fos-13 {
        font-size: 14px;
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
    .css-6j8wv5-Input {
        height: 30px;
    }
    .text-danger {
        font-size: 12px !important;
    }
    .sell-btn {
        width: 100%;
        height: 42px;
        background: linear-gradient(160deg, #dc143c, #dd3557);
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 16px;
        color: #fff;
    }
    .liveorderinfo{
        display:flex;
        grid-gap:10px;
        margin-top : 10px;
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
const SellComponent = () => {
    const [shopActive, setShopActive] = useState("1");

    const [selectedCoin, setSelectedCoin] = useState();
    const [sellAmount, setSellAmount] = useState();
    const [sellAmountWithOutFee, setSellAmountWithOutFee] = useState();
    const [loading, setLoading] = useState(false);

    const [sellAm, setSellAm] = useState();
    const [sellActive, setSellActive] = useState(false);
    const [sellShowModal, setSellShowModal] = useState(false);


    const [sellMsg, setSellMsg] = useState("");

    // fee
    const [sellFixFee, setSellFixFee] = useState([]);

    const [sellError, setSellError] = useState(false);



    const { data: wallet } = useFetchWallet()




    const [usdtState = {}, tomanState = {}] = useMemo(() => {
        return [
            wallet.find(c => c.service.small_name_slug === 'USDT'),
            wallet.find(c => c.service.small_name_slug === 'IRT'),
        ]
    }, [wallet])


    const handleChange = (event, selectedCoin) => {
        setSelectedCoin(selectedCoin);
    };

    const openSellModal = () => { setSellShowModal(true) }
    const closeSellModal = () => { setSellShowModal(true) }

    const compute = () => {
        let data = new FormData();
        data.append(
            "source",
            selectedCoin !== undefined ? selectedCoin.id : ""
        );
        data.append(
            "destination",
            usdtState !== undefined &&
                usdtState.service !== null &&
                usdtState.length !== 0
                ? shopActive == "1"
                    ? usdtState.service.id
                    : tomanState.service.id
                : ""
        );
        data.append("source-price", sellAmount);
        data.append("destination-price", 0);
        data.append("changed", "source");

        axios.post(`${BASEURL}order/calculator/`, data)
            .then((response) => {
                setSellAmountWithOutFee(response.data.amount_with_out_fee);
                setSellAm(response.data.destination_price);
                setSellMsg(response.data.message);
                if (response.data.error !== 0) {
                    setSellError(true);
                }
                if (response.data.error == 0) {
                    setSellError(false);
                }
                setSellFixFee(response.data);

                if (shopActive == "2") {
                    if (sellAmount > sellBalance.balance) {
                        setSellActive(false);
                    } else {
                        setSellActive(true);
                    }
                } else {
                    if (sellAmount > sellBalance.balance) {
                        setSellActive(false);
                    } else {
                        setSellActive(true);
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
        sellAmount,
        usdtState,
        tomanState
    ]);

    const sellHandler = (e) => {
        setLoading(true);
        setSellShowModal(false);
        setTimeout(() => {
            let data = {
                changed: "source",
                description: "",
                destination_asset:
                    usdtState.service !== undefined
                        ? shopActive == "1"
                            ? usdtState.service.id
                            : tomanState.service.id
                        : "",
                amount: parseInt(sellAmount),
                pmethod: "wallet",
                source_asset: parseInt(
                    selectedCoin !== undefined ? selectedCoin.id : ""
                ),
                destination_price: parseInt(
                    sellAmountWithOutFee !== undefined
                        ? sellAmountWithOutFee
                        : ""
                ),
                type: "sell",
            };
            let config = {
                headers: {
                    "Content-type": "application/json",

                },
                method: "POST",
                url: `${BASEURL}order/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
                    setLoading(false);
                });
        }, 330);
    };

    let sellBalance =
        selectedCoin !== undefined
            ? wallet.find((i) => {
                return i.service.small_name_slug == selectedCoin.value;
            })
            : "";

    const sellAll = (e) => {
        setSellAmount(sellBalance !== undefined ? sellBalance.balance : "");
    };



    return (
        <TradeMain >
            <Stack height={"100%"}>
                <Typography variant="body1">فروش ارز دیجیتال</Typography>
                <div>
                    <Inventory>
                        <Typography variant="caption2" color={"text.secondary"}>موجودی شما :</Typography>
                        <Typography variant="caption2" color={"text.secondary"}>
                            <Typography variant="caption2" color="error" component={'span'}> {selectedCoin?.balance}  </Typography>
                            {" "} {selectedCoin?.service?.name}
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
                            options={wallet.filter(x => ["USDT", "IRT"].indexOf(x.service.small_name_slug) === -1)}
                            value={selectedCoin}
                            onChange={handleChange}

                            getOptionLabel={(option) => option.service.name}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} display="flex" alignItems={'center'}>
                                    <img src={option.service.image} alt="" width={32} />
                                    {option.service.name}

                                    <Typography variant="caption" color={"success"} sx={{ ml: "auto" }}>
                                        {option.balance} {" "} {option.service.name}
                                    </Typography>
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
                    <div className=" mt-2">

                        <div className="position-relative mt-4">
                            <Typography color={"text.secondary"} variant='subtitle2' sx={{ mb: 1 }}>
                                مقدار
                            </Typography>
                            <TextField
                                placeholder={
                                    selectedCoin !== undefined
                                        ? selectedCoin.value
                                        : ""
                                }
                                name="price"
                                type="text"
                                fullWidth
                                value={sellAmount}
                                size="small"
                                onChange={(e) => {
                                    setSellAmount(e.target.value);
                                }}
                                sx={{ "> *": { flexDirection: "row-reverse" } }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                        <Button onClick={sellAll} sx={{ fontSize: 12 }} color="info">
                                            کل موجودی
                                        </Button>
                                    </InputAdornment>,
                                }}
                            />

                        </div>

                    </div>
                    {sellAm ? (
                        <div className="liveorderinfo">
                            <span>قیمت هر واحد </span>
                            <span>{selectedCoin.value}</span>

                            <span>{
                                (shopActive == 1) ? (
                                    new Intl.NumberFormat().format(selectedCoin?.service.sellPrice)

                                ) : (

                                    new Intl.NumberFormat().format(selectedCoin?.service.show_price_irt)
                                )

                            } </span>

                            <span>{(shopActive == 1) ? (usdtState.service.name) : (tomanState.service.name)}
                            </span>


                        </div>
                    ) : ("")}
                    {!sellActive ? (
                        <Typography variant="caption" color='error' mt={1}>
                            اعتبار نا کافی !
                        </Typography>
                    ) : (
                        ""
                    )}
                    <Typography variant="caption" color='error' mt={1}>
                        {sellMsg !==
                            "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید."
                            ? sellMsg
                            : ""}
                    </Typography>
                </div>
                <Button
                    sx={{ mt: 'auto' }}
                    fullWidth
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={openSellModal}
                    disabled={!sellActive || sellError}
                >
                    فروش
                </Button>
            </Stack>
            <Dialog
                open={sellShowModal}
                onClose={openSellModal}

            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <div className="my-modal">
                        <div
                            onClick={() => {
                                setSellShowModal(false);
                            }}
                            className="w-100 c-p d-flex"
                        >
                            X
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>شما فروشنده هستید</Typography>
                            <span>
                                {sellAmount}{" "}
                                {selectedCoin !== undefined
                                    ? selectedCoin.value
                                    : ""}
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>واحد دریافتی </Typography>
                            <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>کارمزد ثابت</Typography>
                            <span>
                                {sellFixFee !== undefined &&
                                    sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.fix_fee.toFixed(3)
                                    : ""}{" "}
                                <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>کارمزد تراکنش</Typography>
                            <span>
                                {sellFixFee !== undefined &&
                                    sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.fee.toFixed(3)
                                    : ""}{" "}
                                <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>مجموع کارمزد</Typography>
                            <span>
                                {sellFixFee !== undefined &&
                                    sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.total_fee.toFixed(3)
                                    : ""}{" "}
                                <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>مبلغ تراکنش</Typography>
                            <span>
                                {sellAmount}{" "}
                                {selectedCoin !== undefined
                                    ? selectedCoin.value
                                    : ""}
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <Typography variant='caption'>
                                میزان دریافتی شما
                                <small>( حدودی )</small>
                            </Typography>
                            <span>
                                {sellAm} {shopActive == "1" ? "تتر" : "تومان"}
                            </span>
                        </div>
                        <Button
                            variant='contained'
                            size='small'
                            color='error'
                            fullWidth
                            onClick={sellHandler}
                            disabled={!sellActive || sellError}
                        >
                            فروش
                            {selectedCoin !== undefined
                                ? selectedCoin?.value
                                : ""}
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeSellModal}>Disagree</Button>
                </DialogActions>
            </Dialog>
        </TradeMain>
    );
};

export default SellComponent;
