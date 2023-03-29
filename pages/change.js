import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { BASEURL } from "../components/settings";
import NightModeContext from "../components/Context";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Main = styled('div')`
    background-color: #e4e3ef;
    width: 100%;
    min-height: 100vh;
    .arrows {
        fill: #fff;
        margin-right: 5px;
        cursor: pointer;
    }
    @media (max-width: 992px) {
        .px-4 {
            padding-right: 0 !important;
            padding-left: 0 !important;
        }
    }
    button {
        :disabled {
            opacity: 0.5;
        }
    }
    .css-1okebmr-indicatorSeparator {
        color: rgba(255, 255, 255, 0.1) !important;
    }
    .select-all {
        width: 100px;
        font-size: 12px;
        height: 35px;
        background-color: #293a44;
        position: absolute;
        right: 10px;
        top: 16px;
    }
    .css-b62m3t-container {
        width: 100% !important;
    }
    .css-1s2u09g-control {
        width: 100% !important;
    }
    .toggle {
        cursor: pointer;
        display: block;
        margin-bottom: 20px !important;
        margin-top: 20px;
        pointer-events: none;
    }
    .toggle-checkbox {
        position: absolute;
        visibility: hidden;
    }
    .toggle-switch {
        margin-left: 10px;
        display: inline-block;
        background: #293a44;
        border-radius: 16px;
        width: 45px;
        height: 20px;
        position: relative;
        vertical-align: middle;
        transition: background 0.25s;
        pointer-events: all;
    }
    .toggle-switch:after,
    .toggle-switch:before {
        content: "";
    }
    .toggle-switch:before {
        display: block;
        background: linear-gradient(180deg, #fff 0, #eee);
        border-radius: 50%;
        width: 17px;
        height: 17px;
        position: absolute;
        top: 1px;
        left: 3px !important;
        transition: left 0.25s;
        transition: 0.5s;
    }
    .checked:before {
        right: 3px !important;
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
        z-index: 44441;
        transform: translateX(50%) translateY(-50%);
    }
    .sell-btn {
        background: #e03131 !important;
        margin-bottom: 20px;
        width: 100%;
        height: 42px;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 400;
        font-size: 16px;
        color: #fff;
    }
    .buy-btn {
        margin-bottom: 20px;
        width: 100%;
        height: 42px;
        background-color: #00a04f;
        border-color: #00a04f;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 400;
        font-size: 16px;
        color: #fff;
    }
`;
const Content = styled('div')`
    overflow: hidden;
    transition: 0.1s all;
    padding-bottom: 70px;
    @media (max-width: 1300px) {
        .mx-1200 {
            flex-wrap: wrap;
        }
        .y-inv {
            margin-right: 0;
        }
    }

    @media (max-width: 992px) {
        .mx-1200 {
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
        }
        .y-inv {
            margin-right: 0;
        }
    }
    @media (max-width: 786px) {
    }
`;
const TradeMain = styled('div')`
    padding: 16px 0 0 0;
    min-height: 400px;
    z-index: 99;
    width: calc(100vw - 100px);
    margin-right: auto;
    margin-left: auto;

    @media (max-width: 992px) {
        width: 90%;
        iframe {
            margin-right: 0 !important;
        }
    }
    .full-screen {
        background-color: #fff;
        width: 150px;
        height: 34px;
        border-radius: 10px;
        font-size: 15px;
    }
    .go-to-fullscreen {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 1;
        margin: 0 !important;
    }
    .exit-fullscreen {
        position: fixed;
        top: 4px;
        left: 5px;
        height: 30px;
        background-color: #ce2900;
        color: #fff;
        z-index: 1000;
        border-radius: 10px;
        padding: 0 10px;
        font-size: 12px;
    }
    border: none !important;
    iframe {
        width: 100%;
        min-height: 585px;
        z-index: 1;
        border: none !important;
        border-radius: 16px;
        margin: 0 10px;
    }
    @media (min-height: 700px) {
        iframe {
            height: 534px;
        }
    }
`;

const TradeBox = styled('div')`
    width: calc(100vw);
    margin-right: auto;
    margin-left: auto;
    margin: 0 10px;
    background-color: transparent;
    margin-top: 50px;
    height: 100%;
    justify-content: space-between;
    display: flex;  
    border-radius: 16px;
    flex-wrap: wrap;
    .sell-head,
    .buy-head {
        height: 40px;
        font-weight: 600;
    }
    .box-content {
        min-width: 320px;
        padding: 16px;
        width: 48%;
        border-radius: 10px;
        background-color: #DCDCDC;
        box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
        box-shadow: 0 0 10px rgba(28, 39, 60, 0.1);
        .bazar-be {
        }
        .shop-select {
            margin-top: 0px;
            margin-right: 10px;
            margin-bottom: 10px;
            .btn-active {
                color: #2bf824;
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
    @media (max-width: 768px) {
        .box-content {
            min-width: 320px;
            width: 100%;
            margin-bottom: 20px;
        }
    }

    .border-b {
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(173, 173, 173, 0.1);
    }
    input {
        width: 151px;
        height: 38px;
        background: #e4e3ef;
        border: 1px solid rgb(153, 153, 153);
        box-sizing: border-box;
        border-radius: 8px;
        padding: 8px;
    }
    .dir-left {
        direction: ltr;
        width: 100%;
        height: 52px;
    }
    span {
        color: #323232;
        font-weight: normal;
        margin-top: 0px;
        font-size: 16px;
        line-height: 16px;
    }
    button {
        width: 100%;
        height: 42px;
        background: #00a04f;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 16px;
        color: #fff;
    }
`;

const Inventory = styled('div')`
    border-bottom: 1px solid rgb(172, 172, 172);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
`;

const SelectCoin = styled('div')`
    width: 100% !important;
    h5 {
        font-size: 16px;
        font-weight: 400;
        margin-top: 10px;
        color: #323232;
    }
    img {
        width: 22px;
        margin-left: 5px;
    }
`;
const MainTable = styled('div')`
    position: relative;
    margin-top: 100px;
    z-index: 10;
    width: calc(100vw - 100px);
    background-color: rgb(29, 29, 29);
    min-height: 200px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 16px;
    span {
        margin-right: 8px;
    }
    .select-shop {
        position: absolute;
        top: -42px;
        height: 40px;
        width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            transition: all 0.3s;
            width: 100px;
            height: 100%;
            color: #fff;
            border-radius: 5px 0px 0 0;
            background-color: #feffc6;
            color: #000;

            :first-child {
                border-radius: 0px 5px 0 0;
                border-left: 1px solid #020202 !important;
            }
        }
        .active {
            background-color: #fd961a;
            color: #fff;
        }
    }
    .scrollable {
        max-height: 500px;
        overflow: auto;
        width: 100%;
        border-radius: 16px;
    }
    table {
        width: 100%;
        color: #fff;
        .btn-yellow {
            background-color: #fd961a;
            color: #fff;
            padding: 3px 16px;
        }
        thead,
        tbody {
            tr {
                th {
                    padding: 20px;
                }
                td {
                    padding: 10px 20px;
                }
            }
        }
        thead {
            border-bottom: 1px solid #cccc;
        }
        tbody {
            tr {
                border-bottom: 1px solid #cccc;
            }
        }
    }

    @media (max-width: 1100px) {
        width: 100%;
        border-radius: 0;
        .scrollable {
            border-radius: 0;
        }
        table {
            font-size: 13px;
            white-space: nowrap;
        }
    }
    @media (max-width: 768px) {
        table {
            font-size: 13px;
            white-space: nowrap;
            thead,
            tbody {
                tr {
                    th {
                        padding: 20px 10px;
                    }
                    td {
                        padding: 10px 10px;
                    }
                }
            }
        }
        button {
            font-size: 13px;
        }
    }
`;

export default function Change() {
    const stts = useContext(NightModeContext);
    const [coins, setCoins] = useState([]);
    const [wallet, setWallet] = useState([]);
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
    const [activeBtn, setActiveBtn] = useState(1);
    let token = "";
    setTimeout(() => {
        if( typeof window !=='undefined' )token = localStorage.getItem("token");
    }, 200);
    let toman = [];
    let usdt = [];
    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            // Router.push("/login");
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
            .catch((error) => {});
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

    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    
                },
                url: `${BASEURL}wallet/list/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setWallet(res.data);
                        setBalanceHandler(res.data);
                    }
                })
                .catch((error) => {});
        }, 300);
    }, []);

    let config = {
        url: `${BASEURL}service/list/`,
        method: "GET",
    };
    useEffect(() => {
        setInterval(() => {
        axios(config)
            .then((res) => {
                if (res.status == "200") {
                    setCoins(typeof res.data === typeof []? res.data: []);
                }
            })
            .catch((error) => {});
        } ,3000);
    }, []);
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
                usdtState?.service?.id
            );
            data.append(
                "source",
                tomanState?.service?.id
            );
            data.append("destination-price", 0);
            data.append("source-price", buyAmount);
            data.append("changed", "source");

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
                    if (response.data.source_price > tomanState.balance) {
                        setBuyActive(false);
                    } else {
                        setBuyActive(true);
                    }
                })
                .catch((error) => {});
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
                usdtState?.service?.id
            );
            data.append(
                "destination",
                tomanState?.service?.id
            );
            data.append("source-price", sellAmount);
            data.append("destination-price", 0);
            data.append("changed", "source");

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
                   
                    setSellAmountWithOutFee(response.data.destination_price);
                    setSellAm(response.data.destination_price);
                    setSellMsg(response.data.message);
                    if (response.data.error !== 0) {
                        setSellError(true);
                    }
                    if (response.data.error == 0) {
                        setSellError(false);
                    }
                    setSellFixFee(response.data);

                    if (sellAmount > sellBalance.balance) {
                        setSellActive(false);
                    } else {
                        setSellActive(true);
                    }
                })
                .catch((error) => {});
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
                changed: "source",
                description: "",
                source_asset:tomanState.service.id,
                destination_asset: usdtState.service.id,
                amount: parseInt(buyAmount),
                pmethod: "wallet",
                source_price: parseInt(
                    buyAmountWithOutFee !== undefined ? buyAmountWithOutFee : ""
                ),
                type: "buy",
            };
            console.log(data);
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
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
                destination_asset: tomanState.service.id,
                source_asset: usdtState.service.id,
                amount: parseInt(sellAmount),
                pmethod: "wallet",
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
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
    const IRTAll = (e) => {
        let fee = 0
        fee = (parseFloat(tomanState?.balance) * (parseFloat(tomanState.service.trade_fee))) / 100;
        setBuyAmount(((parseFloat(tomanState?.balance) - fee)));
    };
    
    const USDTAll = (e) => {
        let fee = 0
        fee = (parseFloat(usdtState?.balance) * (parseFloat(usdtState.service.trade_fee))) / 100;
        setSellAmount(((parseFloat(usdtState?.balance) - fee)));
    };

    // tradingview
    const [tradingCoin, setTradingCoin] = useState("BTC");
    const tradingViewHandler = (e) => {
        setTradingCoin(e.value);
    };

    // Filter coin
    let filterToman = coins.filter((names) => names.name !== "تومان");
    let filterTether = coins.filter((names) => names.name !== "تتر");
    const filterHandler = (e) => {
        filterToman = coins.filter((names) => names.name !== "تومان");
        filterTether = coins.filter((names) => names.name !== "تتر");
    };
    let row = -1;
 


    const [sortMethod, setSortMethod] = useState(false);
    const sortHandler = (e) => {
        setSortMethod(!sortMethod);
        sortMethod
            ? coins.sort(
                  (a, b) => a.quote_usd.percent24h - b.quote_usd.percent24h
              )
            : coins.sort(
                  (a, b) => b.quote_usd.percent24h - a.quote_usd.percent24h
              );
    };
    return (
        <Main
            className={
                stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی متاورس | خرید و فروش</title>
            </Head>
            <Sidebar show-menu={menuHandler} active="10" show={showMenu} />
            <Content className={showMenu ? "pr-176" : "pr-80"}>
                {sellShowModal ? (
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
                            <span>شما فروشنده هستید</span>
                            <span>
                                {sellAmount}{" "}
                                تتر
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>واحد دریافتی </span>
                            <span>تومان</span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>کارمزد ثابت</span>
                            <span>
                                {sellFixFee !== undefined &&
                                sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.fix_fee.toLocaleString()
                                    : ""}{" "}
                                <span>
                                تتر
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>کارمزد تراکنش</span>
                            <span>
                                {sellFixFee !== undefined &&
                                sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.fee.toLocaleString()
                                    : ""}{" "}
                                <span>
                                تتر
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>مجموع کارمزد</span>
                            <span>
                                {sellFixFee !== undefined &&
                                sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.total_fee.toLocaleString()
                                    : ""}{" "}
                                <span>
                                    تتر
                                </span>
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>مبلغ تراکنش</span>
                            <span>
                                {sellAmount}{" "}
                                تتر
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>
                                میزان دریافتی شما
                            </span>
                            <span>
                                {Intl.NumberFormat("en-US").format(sellFixFee.destination_price)}{" "}
                             تومان  
                            </span>
                        </div>
                        {sellCustomPrice ? (
                            <button
                                onClick={scheduleSellHandler}
                                className="sell-btn"
                                disabled={!sellActive || sellError}
                            >
                                فروش
                                {selectedCoin !== undefined
                                    ? selectedCoin.value
                                    : ""}
                            </button>
                        ) : (
                            <button
                                onClick={sellHandler}
                                className="sell-btn"
                                disabled={!sellActive || sellError}
                            >
                                فروش
                                {selectedCoin !== undefined
                                    ? selectedCoin.value
                                    : ""}
                            </button>
                        )}
                    </div>
                ) : (
                    ""
                )}
                {buyShowModal ? (
                    <div className="my-modal">
                        <div
                            onClick={() => {
                                setBuyShowModal(false);
                            }}
                            className="w-100 c-p d-flex"
                        >
                            X
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>شما فروشنده هستید</span>
                            <span>
                                {Intl.NumberFormat("en-US").format(buyAmount)}{" "}
                                تومان
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>روش پرداخت</span>
                            <span>
                                تومان
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>کارمزد ثابت</span>
                            <span>
                                {buyFixFee.fix_fee !== undefined
                                    ? buyFixFee.fix_fee.toLocaleString()
                                    : ""}{" "}
                                <span>
                                    تومان
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>کارمزد تراکنش</span>
                            <span>
                                {buyFixFee.fix_fee !== undefined
                                    ? buyFixFee.fee.toLocaleString()
                                    : ""}{" "}
                                <span>
                                    تومان
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>مجموع کارمزد</span>
                            <span>
                                {buyFixFee.fix_fee !== undefined
                                    ? buyFixFee.total_fee.toLocaleString()
                                    : ""}{" "}
                                <span>
                                    تومان
                                </span>
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>مبلغ تراکنش</span>
                            <span>
                            {Intl.NumberFormat("en-US").format(buyAm)}
                            {" "} تومان
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>
                                میزان دریافتی شما
                                <small>(این مقدار حدودی است)</small>
                            </span>
                            <span>
                            {Intl.NumberFormat("en-US").format(buyFixFee.destination_price)}
                                {" "}
                                تتر
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
                <Header show-menu={menuHandler} />

                <div className="d-flex flex-wrap w-100 px-4   ">
                    {/* Buy */}
                    <TradeBox>
                        <div
                            className={
                                stts.night == "true"
                                    ? "bg-gray box-content"
                                    : " box-content "
                            }
                        >
                            <div className="buy-head">خرید تتر</div>
                            <Inventory
                                className={
                                    stts.night == "true" ? "color-white-2" : ""
                                }
                            >
                                <span>موجودی شما :</span>
                                <span>
                                    <span>
                                        <span className="ms-2">
                                            {Intl.NumberFormat("en-US").format(tomanState?.balance)}
                                        </span>
                                    </span>
                                    <span className="ms-2">
                                            {tomanState?.service?.name}
                                    </span>
                                </span>
                            </Inventory>
                        
                            <div className=" mt-3">
                            <div className="position-relative">
                                        <span>مقدار</span>
                                        <button
                                            className="select-all"
                                            onClick={IRTAll}
                                        >
                                            کل موجودی
                                        </button>
                                        <input
                                            className="dir-left"
                                            onChange={(e) => {
                                                setBuyAmount(e.target.value);
                                            }}
                                            value={ (buyAmount) ? buyAmount :("")}
                                            type="text"
                                            placeholder="IRT"
                                            name="price"
                                        />
                                    </div>
                            </div>
                     
  <span>  قیمت واحد  : 
                         {  usdtState && usdtState.service.show_price_irt > 0 ? (

usdtState.service.show_price_irt.toLocaleString()

                         ):("")  } تومان

</span>
                            {!buyActive ? (
                                <div className="text-danger mt-3 d-inline-block">
                                    اعتبار نا کافی !
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="text-danger mt-3 d-inline-block">
                                {buyMsg !==
                                "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید."
                                    ? buyMsg
                                    : ""}
                            </div>
                           
                            <button
                                className="buy-btn"
                                onClick={() => {
                                    setBuyShowModal(true);
                                    setSellShowModal(false);
                                }}
                                disabled={!buyActive || buyError}
                            >
                                خرید
                            </button>
                        </div>
                        <div
                            className={
                                stts.night == "true"
                                    ? "bg-gray box-content"
                                    : " box-content "
                            }
                        >
                            <div className="sell-head">فروش تتر</div>

                            <Inventory
                                className={
                                    stts.night == "true" ? "color-white-2" : ""
                                }
                            >
                                <span>موجودی شما :</span>
                                <span>
                                    <span>
                                        <span className="ms-2">
                                            {Intl.NumberFormat("en-US").format(usdtState?.balance)}
                                        </span>
                                        <span className="ms-2">
                                            {usdtState?.service?.name}
                                    </span>
                                    </span>
                                </span>
                            </Inventory>
                            
                            <div className=" mt-3">
                                {!sellCustomPrice ? (
                                    <div className="position-relative">
                                        <span>مقدار</span>
                                        <button
                                            className="select-all"
                                            onClick={USDTAll}
                                        >
                                            کل موجودی
                                        </button>
                                        <input
                                            className="dir-left"
                                            onChange={(e) => {
                                                setSellAmount(e.target.value);
                                            }}
                                            value={(sellAmount) ? sellAmount :("")}
                                            type="text"
                                            placeholder={"USDT"}
                                            name="price"
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <span>  قیمت واحد  : 
                         {  usdtState && usdtState.service.show_price_irt > 0 ? (

usdtState.service.show_price_irt.toLocaleString()
 
                         ):("")  } تومان

</span>
                            {!sellActive ? (
                                <div className="text-danger mt-3 d-inline-block">
                                    اعتبار نا کافی !
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="text-danger mt-3 d-inline-block">
                                {sellMsg !==
                                "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید."
                                    ? sellMsg
                                    : ""}
                            </div>
                            

                            <button
                                className="sell-btn"
                                onClick={() => {
                                    setBuyShowModal(false);
                                    setSellShowModal(true);
                                }}
                                disabled={!sellActive || sellError}
                            >
                                فروش
                            </button>
                        </div>
                    </TradeBox>
                    <MainTable>
                        <div className="select-shop">
                            <button
                                onClick={() => {
                                    setActiveBtn(1);
                                }}
                                className={activeBtn == 1 && "active"}
                            >
                                تومان
                            </button>
                            <button
                                onClick={() => {
                                    setActiveBtn(2);
                                }}
                                className={activeBtn == 2 && "active"}
                            >
                                تتر
                            </button>
                        </div>
                        <div className="scrollable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>نام ارز</th>
                                        <th>قیمت خرید</th>
                                        <th>قیمت فروش</th>
                                        <th onClick={sortHandler}>
                                            تغییرات 24 ساعت
                                            <svg
                                                className="arrows"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="9.18"
                                                height="18"
                                                viewBox="0 0 9.18 18"
                                            >
                                                <path
                                                    id="ic_unfold_more_24px"
                                                    d="M12,5.83,15.17,9l1.41-1.41L12,3,7.41,7.59,8.83,9Zm0,12.34L8.83,15,7.42,16.41,12,21l4.59-4.59L15.17,15Z"
                                                    transform="translate(-7.41 -3)"
                                                />
                                            </svg>
                                        </th>
                                        <th className="align-middle res-d-none">
                                            نمودار هفتگی
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coins.map((item) => {
                                        row++;
                                        if (item.name !== "تومان") {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{row}</td>
                                                    <td>
                                                        <img
                                                            src={item.image}
                                                            width={25}
                                                            alt=""
                                                        />
                                                        <span>
                                                            {
                                                                item.small_name_slug
                                                            }
                                                        </span>
                                                        <span>{item.name}</span>
                                                    </td>
                                                    {activeBtn == 1 ? (
                                                        <>
                                                            <td>
                                                                {(
                                                                    (item.buyPrice *
                                                                        (item.trade_fee /
                                                                            100) +
                                                                        item.buyPrice) *
                                                                    coins[0]
                                                                        .buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                            <td>
                                                                {(
                                                                    item.buyPrice *
                                                                        coins[0]
                                                                            .buyPrice -
                                                                    item.buyPrice *
                                                                        (item.trade_fee /
                                                                            100) *
                                                                        coins[0]
                                                                            .buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td>
                                                                {(
                                                                    item.buyPrice *
                                                                        (item.trade_fee /
                                                                            100) +
                                                                    item.buyPrice
                                                                ).toLocaleString()}
                                                            </td>
                                                            <td>
                                                                {(
                                                                    item.buyPrice -
                                                                    item.buyPrice *
                                                                        (item.trade_fee /
                                                                            100)
                                                                ).toLocaleString()}
                                                            </td>
                                                        </>
                                                    )}
                                                    <td>
                                                        <div
                                                            className={
                                                                item.quote_usd !==
                                                                    undefined &&
                                                                item.quote_usd
                                                                    .percent24h >
                                                                    0
                                                                    ? "plus changes"
                                                                    : item.quote_usd !==
                                                                          undefined &&
                                                                      item
                                                                          .quote_usd
                                                                          .percent24h <
                                                                          0
                                                                    ? "nega changes"
                                                                    : "zero changes"
                                                            }
                                                        >
                                                            {item.quote_usd !==
                                                                undefined &&
                                                            item.quote_usd
                                                                .percent24h > 0
                                                                ? "+ " +
                                                                  item.quote_usd
                                                                      .percent24h
                                                                : item.quote_usd
                                                                      .percent24h}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {item.quote_usd !==
                                                            undefined &&
                                                        item.quote_usd
                                                            .percent24h > 0 ? (
                                                            <img
                                                                className="ch-img"
                                                                src={
                                                                    "/images/green-chart" +
                                                                    (Math.floor(
                                                                        Math.random() *
                                                                            6
                                                                    ) +
                                                                        1) +
                                                                    ".svg"
                                                                }
                                                                alt=""
                                                                width={160}
                                                                height={60}
                                                            />
                                                        ) : (
                                                            <img
                                                                className="ch-img"
                                                                src={
                                                                    "/images/red-chart" +
                                                                    (Math.floor(
                                                                        Math.random() *
                                                                            6
                                                                    ) +
                                                                        1) +
                                                                    ".svg"
                                                                }
                                                                alt=""
                                                                width={160}
                                                                height={60}
                                                            />
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </MainTable>
                </div>
            </Content>
        </Main>
    );
}
