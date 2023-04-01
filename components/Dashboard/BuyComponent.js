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
import { Autocomplete, Box, Card, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useFetchCoins, useFetchWallet } from "../hooks";

const TradeMain = styled(Card)`
    position: relative;
    .poabs {
        position: absolute;
        width: 90% !important;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        :disabled {
            opacity: 0.7;
        }
    }
    :disabled {
        opacity: 0.6;
    }
    .buy-btn {
        width: 100%;
        height: 42px;
        background: #08c18d;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 16px;
        color: #fff;
    }
   
    height: 460px;
    width: 47%;
    @media (max-width: 699px) {
        margin-right: 0 !important  ;
        width: 100%;
    }
    .head {
        padding: 0.75rem 1.25rem;
        font-size: 15px;
        font-weight: 600;
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
`;
const TradeBox = styled('div')`
    .head {
        font-size: 15px;
        font-weight: 600;
    }
    .bazar-be {
        font-size: 14px;
    }
.select-all {
    width: 100px;
    font-size: 12px;
    height: 27px;
    background-color: #293a44;
    position: absolute;
    right: 7px;
    top: 13px;
}
    .box-head {
        width: 100%;
        height: 80px;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btnss {
        border-bottom: 1px solid #eee;
        padding: 16px 0;
    }
    @media (max-width: 992px) {
        .buy-head,
        .buy-head-active,
        .sell-head,
        .sell-head-active {
            width: 120px !important;
            height: 45px !important;
        }
    }
    .buy-head {
        cursor: pointer;
        margin: 0 16px;
        color: #00a04f;
        width: 150px;
        height: 50px;
        background: transparent;
        border: 1px solid #ccc;
        border-radius: 14px;
    }
    .buy-head-active {
        cursor: pointer;
        margin: 0 16px;
        color: #fff;
        width: 150px;
        height: 50px;
        border: none;
        border-radius: 14px;
        background-color: #08c18d;
        background: #08c18d !important;
    }
    .sell-head {
        cursor: pointer;
        margin: 0 16px;
        color: #e03131;
        background: transparent;
        width: 150px;
        height: 50px;
        border: 1px solid #ccc;
        border-radius: 14px;
    }

    .sell-head-active {
        cursor: pointer;
        margin: 0 16px;
        width: 150px;
        height: 50px;
        border: none;
        border-radius: 14px;
        background: linear-gradient(160deg, #dc143c, #dd3557);
        color: #fff;
    }

    .box-content {
        padding: 0 16px;
        .shop-select {
            margin-top: 0px;
            margin-right: 10px;
            margin-bottom: 10px;
            .btn-active {
                color: #08c18d;
            }
            button {
                width: 50px;
                height: 30px;
                font-size: 14px;
                background-color: transparent;
                border: 1px solid rgb(163, 163, 163) !important;
                border-radius: 0 !important;
                color: #777777;
                :first-child {
                    border-top-right-radius: 5px !important;
                    border-bottom-right-radius: 5px !important;
                }
                :last-child {
                    border-top-left-radius: 5px !important;
                    border-bottom-left-radius: 5px !important;
                }
            }
        }
    }
    .border-b {
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(173, 173, 173, 0.1);
    }
    
    .dir-left {
        direction: ltr;
        width: 100%;
        height: 38px;
        border-radius: 5px;
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
const BuyComponent = () => {
    const stts = useContext(NightModeContext);
    const [sellCustomPrice, setSellCustomPrice] = useState(false);
    const [buyCustomPrice, setBuyCustomPrice] = useState(false);
    const [shopActive, setShopActive] = useState("1");
    const [shopActiveTwo, setShopActiveTwo] = useState("1");
    const [fullscreen, setFullscreen] = useState(false);
    const [usdtState, setUsdtState] = useState("");
    const [tomanState, setTomanState] = useState("");
    const [selectedCoin, setSelectedCoin] = useState();
    const [selectedCoinTwo, setSelectedCoinTwo] = useState();
    const [buyAmount, setBuyAmount] = useState();
    const [sellAmount, setSellAmount] = useState();
    const [buyAmountWithOutFee, setBuyAmountWithOutFee] = useState();
    const [sellAmountWithOutFee, setSellAmountWithOutFee] = useState();
    const [loading, setLoading] = useState(false);

    //
    const [sellScheduleAmount, setSellScheduleAmount] = useState();
    const [sellSchedulePrice, setSellSchedulePrice] = useState();
    const [buyAm, setBuyM] = useState();
    const [sellAm, setSellAm] = useState();
    const [buyScheduleAmount, setBuyScheduleAmount] = useState();
    const [buySchedulePrice, setBuySchedulePrice] = useState();
    const [buyActive, setBuyActive] = useState(true);
    const [sellActive, setSellActive] = useState(false);
    const [sellShowModal, setSellShowModal] = useState(false);
    const [buyShowModal, setBuyShowModal] = useState(false);
    //

    const [sellMsg, setSellMsg] = useState("");
    const [buyMsg, setbuyMsg] = useState("");

    // fee
    const [sellFixFee, setSellFixFee] = useState([]);
    const [buyFixFee, setBuyFixFee] = useState([]);

    const [buyError, setBuyError] = useState(false);
    const [sellError, setSellError] = useState(false);

    const [activeTab, setActiveTab] = useState("buy");

    let token = "";
    setTimeout(() => {
        if (typeof window !== 'undefined') token = localStorage.getItem("token");
    }, 200);
    let toman = [];
    let usdt = [];
    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            Router.push("/login");
        }
    }, []);
    const [showMenu, setShowMenu] = useState(true);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    let refreshToken = "";
    setTimeout(() => {
        refreshToken = typeof window !== "undefined" && localStorage.getItem("refresh_token");
    }, 2000);

    setTimeout(() => {
        setInterval(() => {
            inter();
        }, 600000);
    }, 10000);
    const inter = () => {
        let data = {
            refresh: refreshToken,
        };
        let config = {
            method: "POST",
            url: `${BASEURL}token/refresh/`,
            data: data,
        };

        axios(config)
            .then((response) => {
                localStorage.setItem("token", response.data.access);
            })
            .catch((error) => { });
    };
    const fullscreenHandler = (e) => {
        setFullscreen(true);
    };
    const setBalanceHandler = (e) => {
        toman = e.find((i) => {
            return i.service.name == "تومان";
        });
        setTomanState(toman);
        usdt = e.find((i) => {
            return i.service.name == "تتر";
        });
        setUsdtState(usdt);
    };


    const { data: coins } = useFetchCoins()
    const { data: wallet } = useFetchWallet()

    const filterToman = useMemo(() => {
        setBalanceHandler(wallet);
        return wallet.filter((names) => names.service.name !== "تومان")
            .filter((names) => names.service.name !== "تتر");
    }, [wallet, shopActiveTwo])
    const filterTether = useMemo(() => {
        setBalanceHandler(wallet);
        return wallet.filter((names) => names.service.name !== "تتر");
        filter((names) => names.service.name !== "تومان")
    }, [wallet, shopActiveTwo])
    const handleChange = (selectedCoin) => {
        setSelectedCoin(selectedCoin);
        tradingViewHandler(selectedCoin);
    };
    const handleChangeTwo = (selectedCoinTwo) => {
        setSelectedCoinTwo(selectedCoinTwo);
        tradingViewHandler(selectedCoinTwo);
    };
    useEffect(() => {
        setTimeout(() => {
            let data = new FormData();
            data.append(
                "destination",
                selectedCoinTwo !== undefined ? selectedCoinTwo.id : ""
            );
            data.append(
                "source",
                usdtState !== undefined &&
                    usdtState.service !== null &&
                    usdtState.length !== 0
                    ? shopActiveTwo == "1"
                        ? usdtState.service.id
                        : tomanState.service.id
                    : ""
            );
            data.append("source-price", 0);
            data.append("destination-price", buyAmount);
            data.append("changed", "destination");

            let config = {
                headers: {
                    "Content-type": "application/json",

                },
                method: "POST",
                url: `${BASEURL}order/calculator/`,
                data: data,
            };
            axios(config)
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
                    if (shopActiveTwo == "1") {
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
        }, 300);
    }, [
        selectedCoinTwo,
        shopActiveTwo,
        buyAmount,
        buySchedulePrice,
        buyScheduleAmount,
    ]);
    useEffect(() => {
        setTimeout(() => {
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

            let config = {

                method: "POST",
                url: `${BASEURL}order/calculator/`,
                data: data,
            };
            axios(config)
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
        }, 300);
    }, [
        selectedCoin,
        shopActive,
        sellAmount,
        buySchedulePrice,
        buyScheduleAmount,
    ]);
    const buyHandler = (e) => {
        setLoading(true);
        setBuyShowModal(false);
        setTimeout(() => {
            let data = {
                changed: "destination",
                description: "",
                source_asset:
                    usdtState.service !== undefined
                        ? shopActiveTwo == "1"
                            ? usdtState.service.id
                            : tomanState.service.id
                        : "",
                amount: parseInt(buyAmount),
                pmethod: "wallet",
                destination_asset: parseInt(
                    selectedCoinTwo !== undefined ? selectedCoinTwo.id : ""
                ),
                source_price: parseInt(
                    buyAmountWithOutFee !== undefined ? buyAmountWithOutFee : ""
                ),
                type: "buy",
            };
            let config = {

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
    const scheduleBuyHandler = (e) => {
        setLoading(true);
        setBuyShowModal(false);
        setTimeout(() => {
            let data = {
                pair:
                    usdtState.service !== undefined
                        ? shopActiveTwo == "1"
                            ? usdtState.service.id
                            : tomanState.service.id
                        : "",
                amount: parseInt(buyScheduleAmount),
                asset: parseInt(
                    selectedCoinTwo !== undefined ? selectedCoinTwo.id : ""
                ),
                price: parseInt(
                    buySchedulePrice !== undefined ? buySchedulePrice : ""
                ),
                type: "buy",
            };
            let config = {

                method: "POST",
                url: `${BASEURL}schedule/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
                })
                .finally(f => setLoading(false))
        }, 330);
    };
    const scheduleSellHandler = (e) => {
        setLoading(true);
        setSellShowModal(false);

        setTimeout(() => {
            let data = {
                pair:
                    usdtState.service !== undefined
                        ? shopActiveTwo == "1"
                            ? usdtState.service.id
                            : tomanState.service.id
                        : "",
                amount: parseInt(sellScheduleAmount),
                asset: parseInt(
                    selectedCoin !== undefined ? selectedCoin.id : ""
                ),
                price: parseInt(
                    sellSchedulePrice !== undefined ? sellSchedulePrice : ""
                ),
                type: "sell",
            };
            let config = {
                headers: {
                    "Content-type": "application/json",

                },
                method: "POST",
                url: `${BASEURL}schedule/create/`,
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
    const buyAll = (e) => {
        let selectedCoinMain = selectedCoinTwo !== undefined
            ? wallet.find((i) => {
                return i?.service?.small_name_slug == selectedCoinTwo.value;
            })
            : "";
        let fee = 0
        if (shopActiveTwo == "1") {
            fee = (parseFloat(usdtState?.balance) * (parseFloat(usdtState.service.trade_fee))) / 100;
            var x = (parseFloat(usdtState?.balance) - (fee * 2)) / (parseFloat(selectedCoinMain.service.buyPrice));

            setBuyAmount((x).toFixed(4));

        } else {
            fee = (parseFloat(tomanState?.balance) * (parseFloat(tomanState.service.trade_fee))) / 100;
            var x = (parseFloat(tomanState?.balance) - (fee * 2)) / (parseFloat(selectedCoinMain.service.buyPrice) * parseFloat(usdtState.service.show_price_irt));
            setBuyAmount(x.toFixed(4));


        }
    };


    // tradingview
    const [tradingCoin, setTradingCoin] = useState("BTC");
    const tradingViewHandler = (e) => {
        setTradingCoin(e.value);
    };







    return (
        <TradeMain>
            {buyShowModal ? (
                <div className="my-modal">
                    <div onClick={() => {
                        setBuyShowModal(false);
                    }}
                        className="w-100 c-p d-flex"
                    >
                        X
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>شما خریدار هستید</span>
                        <span>
                            {buyAmount}{" "}
                            {selectedCoinTwo !== undefined
                                ? selectedCoinTwo.value
                                : ""}
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>روش پرداخت</span>
                        <span>{shopActiveTwo == "1" ? "تتر" : "تومان"}</span>
                    </div>

                    <div className="d-flex mb-3 justify-content-between">
                        <span>کارمزد ثابت</span>
                        <span>
                            {buyFixFee.fix_fee !== undefined
                                ? buyFixFee.fix_fee.toFixed(3)
                                : ""}{" "}
                            <span>
                                {shopActiveTwo == "1" ? "تتر" : "تومان"}
                            </span>
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>کارمزد تراکنش</span>
                        <span>
                            {buyFixFee.fix_fee !== undefined
                                ? buyFixFee.fee.toFixed(3)
                                : ""}{" "}
                            <span>
                                {shopActiveTwo == "1" ? "تتر" : "تومان"}
                            </span>
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>مجموع کارمزد</span>
                        <span>
                            {buyFixFee.fix_fee !== undefined
                                ? buyFixFee.total_fee.toFixed(3)
                                : ""}{" "}
                            <span>
                                {shopActiveTwo == "1" ? "تتر" : "تومان"}
                            </span>
                        </span>
                    </div>

                    <div className="d-flex mb-3 justify-content-between">
                        <span>مبلغ تراکنش</span>
                        <span>
                            {buyAm} {shopActiveTwo == "1" ? "تتر" : "تومان"}
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>
                            میزان دریافتی شما
                            <small>(این مقدار حدودی است)</small>
                        </span>
                        <span>
                            {buyAmount}{" "}
                            {selectedCoinTwo !== undefined
                                ? selectedCoinTwo.value
                                : ""}
                        </span>
                    </div>
                    {buyCustomPrice ? (
                        <button
                            onClick={scheduleBuyHandler}
                            className="buy-btn"
                            disabled={!buyActive || buyError}
                        >
                            خرید
                            {selectedCoinTwo !== undefined
                                ? selectedCoinTwo.value
                                : ""}
                        </button>
                    ) : (
                        <button
                            onClick={buyHandler}
                            className="buy-btn"
                            disabled={!buyActive || buyError}
                        >
                            خرید
                            {selectedCoinTwo !== undefined
                                ? selectedCoinTwo.value
                                : ""}
                        </button>
                    )}
                </div>
            ) : (
                ""
            )}
            <TradeBox>
                <Typography variant="body1" >خرید ارز دیجیتال</Typography>
                <Box>
                    <Inventory
                        className={stts.night == "true" ? "color-white-2" : ""}
                    >
                        <Typography variant="caption2" color={"text.secondary"}>موجودی شما :</Typography>
                        <Typography variant="caption2" color={"text.secondary"}>
                            <span>
                                {shopActiveTwo == "1" ? (
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
                            {shopActiveTwo == "1" && usdtState !== undefined ? (
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
                            value={shopActiveTwo}
                            exclusive
                            color='error'
                            size='small'
                            onChange={(e, value) => {
                                setShopActiveTwo(value);
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
                                options={wallet.filter(x => ["usdt", "irt"].indexOf(x.small_name_slug ) === -1)}
                                autoHighlight
                                value={selectedCoinTwo}
                                onChange={handleChangeTwo}

                                getOptionLabel={(option) => option.service.name}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img src={option.service.image} alt="" width={32} />
                                        {option.service.name} 
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
                    <div className=" mt-2 ">
                        {!buyCustomPrice ? (
                            <div className="position-relative mt-4">
                                <Typography color={"text.secondary"} variant='subtitle2' sx={{ mb: 1 }}>
                                    مقدار
                                </Typography>
                                {<button
                                    className="select-all"
                                    onClick={buyAll}
                                >
                                    کل موجودی
                                </button>}
                                <TextField
                                    size="small"
                                    fullWidth
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setBuyAmount(e.target.value);
                                    }}
                                    type="text"
                                    value={buyAmount}
                                    placeholder={
                                        selectedCoinTwo !== undefined
                                            ? selectedCoinTwo.value
                                            : ""
                                    }
                                    name="price"
                                />
                            </div>
                        ) : (
                            <div className="d-flex">
                                <div className="mt-3 ms-2 mb-3">
                                    <div>
                                        <span>مقدار</span>
                                        <TextField
                                            onChange={(e) => {
                                                setBuyScheduleAmount(
                                                    e.target.value
                                                );
                                            }}
                                            className="dir-left"
                                            type="text"
                                            value={new Intl.NumberFormat().format((buyAmount))}
                                            placeholder={
                                                selectedCoinTwo !== undefined
                                                    ? selectedCoinTwo.value
                                                    : ""
                                            }
                                            name="price"
                                        />
                                    </div>
                                </div>
                                <div className="mt-3 me-2 mb-3">
                                    <div>
                                        <span>در قیمت</span>
                                        <input
                                            onChange={(e) => {
                                                setBuySchedulePrice(
                                                    e.target.value
                                                );
                                            }}
                                            className="dir-left"
                                            type="text"
                                            name="price"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {buyAm ? (
                        <div className="liveorderinfo">
                            <span>قیمت هر واحد </span>
                            <span>{selectedCoinTwo.value}</span>

                            <span>{
                                (shopActiveTwo == 1) ? (
                                    new Intl.NumberFormat().format((wallet.filter((names) => names.service.id === selectedCoinTwo.id)[0].service.buyPrice))

                                ) : (

                                    new Intl.NumberFormat().format(wallet.filter((names) => names.service.id === selectedCoinTwo.id)[0].service.show_price_irt)
                                )

                            } </span>

                            <span>{(shopActiveTwo == 1) ? (usdtState.service.name) : (tomanState.service.name)}
                            </span>


                        </div>
                    ) : ("")}
                    {!buyActive ? (
                        <div className="text-danger mt-2 d-inline-block">
                            اعتبار نا کافی !
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="text-danger mt-2 d-inline-block">
                        {buyMsg !==
                            "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید."
                            ? buyMsg
                            : ""}
                    </div>
                    <button
                        className="buy-btn poabs"
                        onClick={() => {
                            setBuyShowModal(true);
                            setSellShowModal(false);
                        }}
                        disabled={!buyActive || buyError}
                    >
                        خرید
                    </button>
                </Box>
            </TradeBox>
        </TradeMain>
    );
};

export default BuyComponent;
