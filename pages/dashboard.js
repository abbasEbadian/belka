import Head from "next/head";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.css";
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { BASEURL } from "../components/settings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NightModeContext from "../components/Context";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Marquee from "react-fast-marquee";
import BuyComponent from "../components/Dashboard/BuyComponent";
import SellComponent from "../components/Dashboard/SellComponent";
import Change from "../components/Dashboard/Change";
import { chartDatas } from "../components/Dashboard/ChartData";
import { chartDatas2 } from "../components/Dashboard/ChartData";
import { chartDatas3 } from "../components/Dashboard/ChartData";
import { chartDatas4 } from "../components/Dashboard/ChartData";

const Main = styled('div')`
    background-color: #e4e3ef;
    width: 100%;
    min-height: 100vh;
    .text-left {
        div {
            justify-content: flex-end;
        }
    }
`;
const Content = styled('div')``;
const MainCoin = styled('div')`
    h2 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
    }
    padding-top: 32px;
    padding-right: 16px;
    padding-left: 16px;
    .marquee-container {
        padding-bottom: 20px;
    }
    .wall-span {
        color: #0000009b;
        font-size: 8.5px;
        display: inline-block;

        :last-child {
            text-align: left;
        }
    }
    .am-order {
        font-size: 8px;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
`;

const Cards = styled('div')`
    display: flex;
    align-items: center;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: blue orange;
    padding-bottom: 20px;
    max-width: 2000px;
    margin-right: auto;
    margin-left: auto;
    direction: ltr;
    ::-webkit-scrollbar {
        width: 5px;
        height: 9px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #00293957;
        border-radius: 20px;
        width: 5px;
    }
`;

const Card = styled('div')`
    position: relative;
    min-width: 214px;
    max-width: 214px;
    height: 100%;
    background-color: #fff;
    box-shadow: 5px 7px 12px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 12px -5px #9f9fbb;
    border-radius: 10px;
    padding: 12px;
    margin-left: 16px;
    direction: rtl;
    cursor: pointer;
    h6 {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 0;
        margin-right: 8px;
    }
    span {
        font-weight: 400;
        font-size: 10px;
        display: block;
        margin-right: 8px;
    }
    .zero {
        direction: ltr;
        width: 64px;
        height: 22px;
        border-radius: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 17px;
        color: #000000;
        font-weight: 600;
    }
    .red {
        direction: ltr;
        width: 64px;
        height: 22px;
        border-radius: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 17px;
        color: #f6543e;
        font-weight: 600;
    }
    .green {
        direction: ltr;
        width: 64px;
        height: 22px;
        border-radius: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 17px;
        color: #30e0a1;
        font-weight: 600;
    }
    .price {
        color: #e8b210 !important;
        font-size: 12px;
        line-height: 17px;
    }
    .ch-img {
        position: absolute;
        top: 60px;
    }
`;

const FlexMain = styled('div')`
    display: flex;
    width: 100%;
    justify-content: center;
    @media (max-width: 1240px) {
        flex-direction: column;
        align-items: center;
        .d-flexx {
            order: -1;
        }
        .ddd {
            width: 100%;
          display:flex;
            justify-content: space-around;
            margin-top: 140px;
            grid-template-columns: auto auto;
        }
    }
    @media (max-width: 699px) {
        .d-flexx {
            align-items: center !important;
            justify-content: center !important;
            margin-bottom: 480px;
        }
        .ddd {

            flex-direction: column !important;
            align-items: center;
            margin-bottom: 30px;
        }
    }
    .d-flexx {
        display: flex;
        flex-wrap: wrap;
        max-height: 660px;
        justify-content: flex-start;
        width: 100%;
        max-width: 1000px;
    }
`;
const History = styled('div')`
    box-shadow: 5px 7px 12px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 12px -5px #9f9fbb;
    height: 380px;

    background-color: #fff;
    border-radius: 10px;
    @media (max-width: 1240px) { 
        width: 45%;
    }
    @media (max-width: 699px) { 
        width: 100%;
    }
    h3 {
        padding: 0.75rem 1.25rem;
        font-size: 16px;
        font-weight: 600;
    }
    font-size: 14px;
    .his-item {
        padding: 0.75rem 1.45rem !important;
        border-top: 1px solid #ddd;
        justify-content: space-between;
        img {
            margin-left: 20px !important;
            border-radius: 50%;
        }
    }
    button {
        padding: 8px 25px;
        border-radius: 8px;
        background-color: #08c18d;
        color: #fff;
        margin-top: 10px;
    }
`;

const WalletMain = styled('div')`
    box-shadow: 5px 7px 12px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 12px -5px #9f9fbb;
    height: 380px;
  
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    @media (max-width: 1240px) { 
        width: 45%;
    }
    @media (max-width: 699px) { 
        width: 100%;
    }
    .am-order {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    h3 {
        padding: 0.75rem 1.25rem;
        font-size: 16px;
        font-weight: 600;
    }
    font-size: 14px;
    .his-item {
        padding: 0.75rem 1.45rem !important;
        border-top: 1px solid #ddd;
        justify-content: space-between;

        img {
            margin-left: 20px !important;
            border-radius: 50%;
        }
    }
    button {
        padding: 8px 25px;
        border-radius: 8px;
        background-color: #08c18d;
        color: #fff;
        margin-top: 10px;
    }
`;

const ChartDiv = styled('div')`
    box-shadow: 5px 7px 12px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 12px -5px #9f9fbb;
    height: 100%;
    margin-top: 20px;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    .chart-div-head {
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .item {
        margin-left: 10px;
        display: block;
        padding: 8px 30px;
        margin: 2px;
        background-color: #efeff5;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        cursor: pointer;
    }
    .active {
        background-color: #5965f9;
        color: #fff;
    }
    @media (max-width: 699px) {
        .chart-div-head {
            padding: 13px 10px;
        }
        h5 {
            font-size: 13px;
            margin-top: 6px;
        }
        .item {
            padding: 3px 8px;
            font-size: 12px;
        }
    }
`;

export const Chartsss = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
export const Chartsss2 = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
export const Chartsss3 = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
export const Chartsss4 = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
export default function Dashboard() {
    console.log(typeof Chartsss);
    const [sourcePrice, setSourcePrice] = useState();
    const [orderList, setOrderList] = useState([]);
    const [coins, setCoins] = useState([]);
    const [showMenu, setShowMenu] = useState(true);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedOptionTwo, setSelectedOptionTwo] = useState();
    const [calcRespons, setCalcRespons] = useState();
    const [loading, setLoading] = useState(false);
    const stts = useContext(NightModeContext);
    const [wallet, setWallet] = useState([]);
    const [destinationPrice, setDestinationPrice] = useState("");
    const [chartActive, setChartActive] = useState(1);
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    const handleChangeTwo = (selectedOptionTwo) => {
        setSelectedOptionTwo(selectedOptionTwo);
    };
    let token = "";
    setTimeout(() => {
        if( typeof window !=='undefined' )token = localStorage.getItem("token");
    }, 2000);
    let refreshToken = "";
    setTimeout(() => {
        refreshToken = localStorage && localStorage.getItem("refresh_token");
    }, 10000);

    setTimeout(() => {
        setInterval(() => {
            inter();
        }, 600000);
    }, 70000);
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

    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            Router.push("/login");
        }
    }, []);
    let config = {
        url: `${BASEURL}service/list/`,
        method: "GET",
    };
    useEffect(() => {

        axios(config)
            .then((res) => {
                setCoins(res.data);
        
            })
            .catch((error) => {});

    }, []);
    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
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
        }, 3200);
    }, []);
    let order_config = {};
    setTimeout(() => {
        order_config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            url: `${BASEURL}order/list/`,
            method: "GET",
        };
    }, 3000);
    useEffect(() => {
        setTimeout(() => {
            axios(order_config)
                .then((res) => {
                    if (res.status == "200") {
                        setOrderList(res.data);
                    }
                })
                .catch((error) => {});
        }, 4000);
    }, []);

    // Fee
    let selectItem = [];
    let selectTwoItem = [];

    selectItem = coins.find((i) => {
        return selectedOption !== undefined ? i.id == selectedOption.value : "";
    });
    let selectItemWallet = wallet.find((i) => {
        return selectedOptionTwo !== undefined
            ? i.service.id == selectedOptionTwo.value
            : "";
    });
    selectTwoItem = coins.find((i) => {
        return selectedOptionTwo !== undefined
            ? i.id == selectedOptionTwo.value
            : "";
    });
    //
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    const changeHandler = (e) => {
        let data = {
            changed: "destination",
            description: "",
            destination_asset:
                selectedOption !== undefined && selectedOption.value,
            destination_price: destinationPrice,
            pmethod: "wallet",
            source_asset: selectedOptionTwo.value,
            source_price: sourcePrice,
            type: "swap",
        };

        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
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
                });
        }, 2600);
    };
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let data = new FormData();
            data.append(
                "destination",
                selectedOption !== undefined ? selectedOption.value : ""
            );
            data.append(
                "source",
                selectedOptionTwo !== undefined ? selectedOptionTwo.value : ""
            );
            data.append(
                "source-price",
                parseInt(selectTwoItem !== undefined ? sourcePrice : "")
            );
            data.append("destination-price", 0);
            data.append("changed", "source");

            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${BASEURL}order/calculator/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    setLoading(false);
                    setCalcRespons(response.data);
                    setDestinationPrice(response.data.destination_price);
                })
                .catch((error) => {});
        }, 2300);
    }, [sourcePrice, selectedOption, selectedOptionTwo]);
    let newCoins = coins.filter(
        (names) =>
            selectTwoItem !== undefined && names.name !== selectTwoItem.name
    );
    let newCoinsTwo = coins.filter(
        (names) => selectItem !== undefined && names.name !== selectItem.name
    );

    let rowOfHistory = 0;
    let rowOfWall = 0;

    wallet.sort((a, b) => Number(b.balance) - Number(a.balance));

    return (
        <>
            <Main
                className={
                    stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
                }
            >
                <Head>
                    <link rel="shortcut icon" href="/images/fav.png" />
                    <title>صرافی متاورس | داشبورد</title>
                </Head>
                <Sidebar show-menu={menuHandler} active="1" show={showMenu} />
                <Content className={showMenu ? "pr-176" : "pr-80"}>
                    <Header
                        show-menu={menuHandler}
                        show-menu-state={showMenu}
                    />
                    <MainCoin>
                        <h2
                            className={
                                stts.night == "true" ? "color-white-2 " : ""
                            }
                        >
                            ارز های اصلی
                        </h2>
                        <Cards>
                            <Marquee loop={0}>
                                {coins.map((item) => {
                                    return (
                                        <Card
                                            className={
                                                stts.night == "true"
                                                    ? "bg-gray no-shadow bor-no-shad "
                                                    : ""
                                            }
                                            key={item.id}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <div className="name">
                                                    <div className="d-flex">
                                                        <h6>
                                                            {
                                                                item.small_name_slug
                                                            }
                                                        </h6>
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-90">
                                                        <div
                                                            className={
                                                                item.quote_usd !==
                                                                    undefined &&
                                                                item.quote_usd
                                                                    .percent24h ==
                                                                    0
                                                                    ? "zero"
                                                                    : item.quote_usd !==
                                                                          undefined &&
                                                                      item
                                                                          .quote_usd
                                                                          .percent24h >
                                                                          0
                                                                    ? "green"
                                                                    : "red"
                                                            }
                                                        >
                                                            {item.quote_usd !==
                                                                undefined &&
                                                                item.quote_usd
                                                                    .percent24h}{" "}
                                                            %
                                                        </div>
                                                        <div
                                                            className={
                                                                stts.night ==
                                                                "true"
                                                                    ? "color-white-2 price me-2 "
                                                                    : " price me-2"
                                                            }
                                                        >
                                                            {item.sellPrice} $
                                                        </div>
                                                    </div>
                                                </div>
                                                <img
                                                    src={item.image}
                                                    alt="coin"
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                        </Card>
                                    );
                                })}
                            </Marquee>
                        </Cards>
                        <FlexMain>
                            <div className="ddd">
                                <WalletMain
                                    className={
                                        stts.night == "true"
                                            ? "bg-gray no-shadow"
                                            : ""
                                    }
                                >
                                    <h3>کیف پول</h3>
                                    {wallet.length !== 0 &&
                                        wallet.map((item) => {
                                            {
                                                rowOfWall++;
                                            }
                                            if (rowOfWall < 5) {
                                                return (
                                                    <>
                                                        <div
                                                            key={item.id}
                                                            className="d-flex his-item align-items-center p-2 px-3 mt-0"
                                                        >
                                                            <img
                                                                width={40}
                                                                className="ms-2"
                                                                src={
                                                                    item?.service
                                                                        ?.image
                                                                }
                                                            />
                                                            <div className="text-left">
                                                                <div className="d-flex">
                                                                    {
                                                                        item
                                                                            ?.service
                                                                            ?.name
                                                                    }
                                                                </div>
                                                                <div className="d-flex  align-items-center">
                                                                    <div className="am-order">
                                                                        {
                                                                           new Intl.NumberFormat().format(Math.trunc( item.balance))
                                                                        }{" "}
                                                                        {
                                                                            item
                                                                                ?.service
                                                                                ?.small_name
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            }
                                        })}
                                    <div className="w-100 d-flex align-items-center justify-content-center">
                                        <button
                                            onClick={() =>
                                                Router.push("/wallet")
                                            }
                                        >
                                            مشاهده همه
                                        </button>
                                    </div>
                                </WalletMain>
                                <History
                                    className={
                                        stts.night == "true"
                                            ? "bg-gray no-shadow"
                                            : ""
                                    }
                                >
                                    <h3>تاریخچه تراکنش ها</h3>
                                    {orderList.length !== 0 &&
                                        orderList.map((item) => {
                                            {
                                                rowOfHistory++;
                                            }
                                            if (rowOfHistory < 5) {
                                                return (
                                                    <>
                                                        <div
                                                            key={item.id}
                                                            className="d-flex his-item align-items-center p-2 px-3 mt-0"
                                                        >
                                                            {coins.map((e) => {
                                                                if (
                                                                    e.small_name_slug ==
                                                                    item.destination_asset
                                                                ) {
                                                                    return (
                                                                        <img
                                                                            width={
                                                                                40
                                                                            }
                                                                            className="ms-2"
                                                                            src={
                                                                                e.image
                                                                            }
                                                                        />
                                                                    );
                                                                }
                                                            })}

                                                            <div>
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="d-flex w-100">
                                                                        {item.destination_asset ==
                                                                            "USDT" ||
                                                                        item.destination_asset ==
                                                                            "IRT" ? (
                                                                            <div className="text-danger d-flex  justify-content-between w-100">
                                                                                <span>
                                                                                    فروش
                                                                                </span>{" "}
                                                                                <div className="d-flex">
                                                                                    {Number(
                                                                                        item.destination_amount
                                                                                    ).toFixed(
                                                                                        7
                                                                                    ).toLocaleString()}{" "}
                                                                                 {coins.map(
                                                                                        (
                                                                                            e
                                                                                        ) => {
                                                                                            if (
                                                                                                e.small_name_slug ==
                                                                                                item.destination_asset
                                                                                            ) {
                                                                                                return (
                                                                                                    <span className="me-1">
                                                                                                        {
                                                                                                            e.small_name_slug
                                                                                                        }
                                                                                                    </span>
                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    )}
                                                                    
                                                                        
                                                                                        


                                                                                </div>
                                                                            </div>
                                                                        ) : item.source_asset ==
                                                                              "USDT" ||
                                                                          item.source_asset ==
                                                                              "IRT" ? (
                                                                            <div className="text-success-2 d-flex  justify-content-between w-100">
                                                                                <span>
                                                                                    خرید
                                                                                </span>{" "}
                                                                                <div className="d-flex">
                                                                                    {Number(
                                                                                        item.destination_amount
                                                                                    ).toFixed(
                                                                                        7
                                                                                    )}{" "}
                                                                                    {coins.map(
                                                                                        (
                                                                                            e
                                                                                        ) => {
                                                                                            if (
                                                                                                e.small_name_slug ==
                                                                                                item.destination_asset
                                                                                            ) {
                                                                                                return (
                                                                                                    <span className="me-1">
                                                                                                        {
                                                                                                            e.small_name_slug
                                                                                                        }
                                                                                                    </span>
                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="text-warning d-flex  justify-content-between w-100">
                                                                                <span>
                                                                                   
                                                                                </span>{" "}
                                                                                <div className="d-flex">
                                                                                    {Number(
                                                                                        item.destination_amount
                                                                                    ).toFixed(
                                                                                        7
                                                                                    )}{" "}
                                                                                    {coins.map(
                                                                                        (
                                                                                            e
                                                                                        ) => {
                                                                                            if (
                                                                                                e.id ==
                                                                                                item.destination_asset
                                                                                            ) {
                                                                                                return (
                                                                                                    <span className="me-1">
                                                                                                        {
                                                                                                            e.small_name_slug
                                                                                                        }
                                                                                                    </span>
                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div className="am-order">
                                                                    
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            }
                                        })}
                                    <div className="w-100 d-flex align-items-center justify-content-center">
                                        <button
                                            onClick={() =>
                                                Router.push("/history")
                                            }
                                        >
                                            مشاهده همه
                                        </button>
                                    </div>
                                </History>
                            </div>
                            <div className="d-flexx">
                                <BuyComponent
                                    night={stts.night}
                                    token={token}
                                    coins={coins}
                                />
                                <SellComponent
                                    night={stts.night}
                                    token={token}
                                    coins={coins}
                                />
                                <Change />
                            </div>
                        </FlexMain>
                      
                    </MainCoin>
                </Content>
            </Main>
        </>
    );
}
