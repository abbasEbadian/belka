import Head from "next/head";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.css";
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useMemo, useState } from "react";
import Router from "next/router";
import { BASEURL, SETTINGS } from "@/c/settings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NightModeContext from "@/c/Context";
import axios from "axios";
import Header from "@/c/Header";
import Sidebar from "@/c/Sidebar";
import Marquee from "react-fast-marquee";
import BuyComponent from "@/c/Dashboard/BuyComponent";
import SellComponent from "@/c/Dashboard/SellComponent";
import Change from "@/c/Dashboard/Change";
import { useFetchCoins } from "@/c/hooks/fetchCoins";
import { useFetchWallet } from "@/c/hooks/fetchWallet";
import { useFetchOrders } from "@/c/hooks/fetchOrders";
import { Grid, Stack, Box, Card as MCard , Paper} from "@mui/material";
import DashboardWallet from "@/c/Dashboard/DashboardWallet";
import DashboardHistory from "@/c/Dashboard/DashboardHistory";
import { SidebarLinkCode } from "@/c/utils/types";

const Main = styled(Box)`
   
    min-height: 100vh;
    .text-left {
        div {
            justify-content: flex-end;
        }
    }
    .extend-children > *{ 
        flex-grow: 1;
        width: 100%;
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

const WalletMain = styled(MCard)`
  
    .am-order {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    h3 {
        padding-bottom: 0.75rem;
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


Dashboard.title = `صرافی ${SETTINGS.WEBSITE_NAME} | داشبورد`
export default function Dashboard() {
    console.log(typeof Chartsss);
    const [sourcePrice, setSourcePrice] = useState();
    const [showMenu, setShowMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedOptionTwo, setSelectedOptionTwo] = useState();
    const [calcRespons, setCalcRespons] = useState();
    const [loading, setLoading] = useState(false);
    const stts = useContext(NightModeContext);
    const [destinationPrice, setDestinationPrice] = useState("");
    const [chartActive, setChartActive] = useState(1);
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    const handleChangeTwo = (selectedOptionTwo) => {
        setSelectedOptionTwo(selectedOptionTwo);
    };

    const { isLoading: isCoinLoading, data: coins = [] } = useFetchCoins()
    const { isLoading: isWalletLoading, data: wallet = [] } = useFetchWallet()
    const { isLoading: isOrderLoading, data: orderList = [] } = useFetchOrders()

    let refreshToken = "";
    setTimeout(() => {
        refreshToken = typeof window !== "undefined" && localStorage.getItem("refresh_token");
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
            .catch((error) => { });
    };







    // Fee


    const selectItem = useMemo(() => {
        return coins?.find((i) => {
            return selectedOption !== undefined ? i.id == selectedOption.value : "";
        })
    }, [coins, selectedOption])

    const selectTwoItem = useMemo(() => {
        return coins?.find((i) =>
            selectedOptionTwo !== undefined ? i.id == selectedOptionTwo.value : ""
        )
    }, [coins, selectedOptionTwo])
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

                },
                method: "POST",
                url: `${BASEURL}order/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
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
                .catch((error) => { });
        }, 2300);
    }, [sourcePrice, selectedOption, selectedOptionTwo]);


    let rowOfHistory = 0;
    let rowOfWall = 0;



    return (
        <>
            <Main>
                <Sidebar show-menu={menuHandler} active={SidebarLinkCode.DASHBOARD} show={showMenu} />
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
                            <Marquee loop={1}>
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} xl={2}>
                                <Stack spacing={2}>
                                    <DashboardWallet wallet={wallet}/>
                                    <DashboardHistory orderList={orderList} coins={coins}/>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={9} xl={10}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={6} className={"extend-children"}>
                                        
                                            <BuyComponent />
                                    </Grid>
                                    <Grid item xs={12} lg={6} className={"extend-children"}>
                                    
                                            <SellComponent />
                                    </Grid>
                                    <Grid item xs={12} className={"extend-children"}>
                                        <Change />
                                    </Grid>
                                </Grid>
                            </Grid>



                        </Grid>

                    </MainCoin>
                </Content>
            </Main>
        </>
    );
}
