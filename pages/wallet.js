import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";
import { BASEURL, SETTINGS } from "../components/settings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoinDeposit from "../components/Wallet/CoinDeposit";
import CoinWithdraw from "../components/Wallet/CoinWithdraw";
import NightModeContext from "../components/Context";
import RialDeposit from "../components/Wallet/RialDeposit";
import RialWithdraw from "../components/Wallet/RialWithdraw";
import WalletTableC from "../components/Wallet/WalletTable";
import { useFetchCoins, useFetchWallet } from '../components/hooks'
import { Divider, Typography } from "@mui/material";


const Main = styled('div')`
   
    width: 100%;
    min-height: 100vh;
    position: relative;


    .dep-btn {
        color: #30e0a1 !important;
        border: 1px solid #30e0a1 !important;
        padding: 3px 16px;
        border-radius: 13px;
        transition: 0.3s all;
        :hover {
            background-color: #30e0a1;
            color: #fff !important;
        }
    }
    .with-btn {
        color: #f6543e !important;
        border: 1px solid #f6543e !important;
        padding: 3px 16px;
        border-radius: 13px;
        transition: 0.3s all;
        :hover {
            background-color: #f6543e;
            color: #fff !important;
        }
    }
    .trade-btn {
        color: #108abb;
        border: 1px solid #108abb !important;
        padding: 3px 16px;
        border-radius: 13px;
        transition: 0.3s all;
        :hover {
            background-color: #108abb;
            color: #fff !important;
        }
    }
    table > .scrollable > tbody > tr {
        width: 100%;
    }
    table > .scrollable > tbody > tr:nth-of-type(odd) > * {
        width: 100%;
        background-color: #f9f9f9;
    }
    .text-success {
        color: #30e0a1 !important;
    }

    @media (max-width: 992px) {
        .kAUJUI thead tr th,
        .kAUJUI tbody tr th,
        .kAUJUI tbody tr td {
            padding-right: 2px !important;
            padding-left: 10px !important;
            border: none;
        }
        .bhIPnB .text-field-1 {
            top: 24px;
            right: 32px;
            font-size: 14px;
        }
        .bhIPnB .text-field-2 span {
            font-weight: bold;
            font-size: 15px !important;
        }
    }
`;
const Content = styled('div')`
    overflow: hidden;
    transition: 0.1s all;
    padding-bottom: 70px;
    .scrollable {
        overflow: auto;
    }
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
    .scrollable {
        max-height: 450px !important;
        overflow-y: auto !important;
        tbody tr {
            width: 336px;
        }
        ::-webkit-scrollbar {
            width: 5px;
            height: 9px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #00293957;
            border-radius: 20px;
            width: 5px;
        }
    }
`;

const WalletMain = styled('div')`
    padding: 20px 32px;
    min-height: 100vh;
    h4 {
        font-weight: 600;
        font-size: 23px;

        color: #5c5c5c;
    }

    .balance-1 {
        background: url("/images/bg-balance.png");
        height: 125px;
    }
    .balance-2 {
        background: url("/images/bg-balance-2.png");
        height: 125px;
    }
    @media (max-width: 992px) {
        padding-inline: 16px;
        .balance-2 {
            margin-top: 10px;
        }
    }

    @media (max-width: 992px) {
        .balance-to-col {
            display: flex;
            align-items: center;
            flex-direction: column;
            .me-3 {
                margin-right: 0 !important;
            }
        }
    }
`;

const WalletTable = styled('table')`
    min-width: 600px;
    width: 100%;
    margin-top: 20px;
    .arrows {
        display: flex;
        flex-direction: column;
        margin-left: 3px;
        svg {
            margin-bottom: 3px;
        }
    }
    thead tr th {
        font-weight: 500;

        :first-child {
            border-radius: 0 16px 0 0 !important;
        }
        :last-child {
            border-radius: 16px 0 0 0 !important;
        }
    }
    tbody tr {
        :last-child {
            td {
                :first-child {
                    border-radius: 0 0 16px 0 !important;
                }
                :last-child {
                    border-radius: 0 0 0 16px !important;
                }
            }
        }
    }
    thead tr {
        width: 100%;
        border: none;
        background: #fff;
        border-radius: 8px;
        height: 80px;
        border-bottom: 1px solid #ccc;
    }
    thead tr th,
    tbody tr th,
    tbody tr td {
        padding-right: 20px;
        border: none;
    }
    tbody {
        border-top: none !important;
        background-color: #fff;
        width: 100%;
    }
    .change-num {
        width: 40px;
        height: 22px;
        left: 115px;
        top: 0px;
        background: rgba(246, 84, 62, 0.2);
        border-radius: 51px;
        color: #f6543e;
        text-align: center;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    tbody tr {
        border-bottom: 1px solid #e8e8e8;
    }
    @media (max-width: 992px) {
        .remove-mob {
            display: none !important;
        }
        thead tr th {
            font-weight: 500;

            :nth-child(2) {
                border-radius: 0 16px 0 0 !important;
            }
            :nth-child(5) {
                border-radius: 16px 0 0 0 !important;
            }
        }
        tbody tr {
            :last-child {
                td {
                    :nth-child(2) {
                        border-radius: 0 0 16px 0 !important;
                    }
                    :nth-child(5) {
                        border-radius: 0 0 0 16px !important;
                    }
                }
            }
        }
        .remove-mob-2 {
            width: 40px;
            display: none;
        }
        .d-none {
            display: block;
        }
        min-width: 220px;
        font-size: 10px;
        img {
            width: 16px;
            height: 16px;
        }
    }
`;

const ShowGenModal = styled('div')`
    width: 260px;
    height: 200px;
    border-radius: 20px;
    background-color: #818181;
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    padding: 20px;
    color: #fff;
    p {
        margin-top: 10px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        font-family: IRANSansX, sans-serif;
    }
    button {
        width: 100px;
        font-size: 12px;
        margin-top: 14px;
    }
    .btn-danger {
        background-color: #ff6060;
        :hover {
            background-color: #ff606099;
        }
    }
    .btn-success {
        background-color: #0da827;
        :hover {
            background-color: #0da82799;
        }
    }

`;


Wallet.protected = true
Wallet.title = `صرافی ${SETTINGS.WEBSITE_NAME} | کیف پول`

export default function Wallet() {
    const [id, setId] = useState(null);
    const [showMenu, setShowMenu] = useState(true);
    const [showCoinDeposit, setShowCoinDeposit] = useState(false);
    const [showCoinWithDrow, setShowCoinWithDrow] = useState(false);
    const [showRialDeposit, setShowRialDeposit] = useState(false);
    const [showRialWithDrow, setShowRialWithDrow] = useState(false);
    const [blur, setBlur] = useState(false);
    const [itemTo, setItemTo] = useState([]);
    const [allT, setAllT] = useState(0);
    const [allToman, setAllToman] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [showGenModal, setShowGenModal] = useState(false);
    const [itemToGen, setItemToGen] = useState();
    const [actives, setActives] = useState(true);
    const stts = useContext(NightModeContext);


    const { isLoading: isWalletLoading, data: wallet } = useFetchWallet()
    const { isLoading: isCoinsLoading, data: coins } = useFetchCoins()



    // 138198.4164
    let row = 0;
    let token = "";
    let allTether = 0;
    const ShowGenModalHandler = (item) => {
        setShowGenModal(true);
    };
    const genratee = (item) => {
        generateHandler(item.id);
    };
    const allCalc = (res) => {
        for (let i = 0; i < res.length; i++) {
            if (res[i].service.small_name_slug !== "IRT") {
                allTether += res[i].balance * res[i].service.buyPrice;
                setAllT(allTether);
            } else {
                allTether += res[i].balance / res[i].service.buyPrice;
                setAllT(allTether);
            }
        }
    };

    setTimeout(() => {
        if (typeof window !== 'undefined') token = localStorage.getItem("token");
    }, 2000);



    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    // generate

    const generateHandler = (e) => {
        let data = {
            service: e,
        };
        setTimeout(() => {
            let config_3 = {
                headers: {
                    "Content-type": "application/json",

                },
                method: "POST",
                url: `${BASEURL}wallet/generate/`,
                data: data,
            };
            axios(config_3)
                .then((response) => {
                    response.data.error != 1
                        ? toast.success("کیف پول شما با موفقیت ساخته شد") &&
                        setTimeout(() => {
                            location.reload();
                        }, 2000)
                        : toast.error(response.data.message);
                    if (
                        response.data.message ==
                        "شما کیف پول شما از قبل ساخته شده است."
                    ) {
                        setShowCoinDeposit();
                    }
                })
                .catch((error) => {
                    toast.error(response.data.message);
                });
        }, 2000);
    };


    let ids = [];
    return (
        <>
            
            <Main >
                <Sidebar show-menu={menuHandler} active="3" show={showMenu} />
                <Content className={showMenu ? "pr-176" : "pr-80"}>
                    <Header show-menu={menuHandler} />
                    <WalletMain className={blur ? " bg-blur" : ""}>
                        <Typography variant="h6" >کیف پول شما</Typography >
                        <Divider transparent sx={{mt: 2}} />
                        <WalletTableC wallet={wallet} coins={coins} />
                    </WalletMain>
                </Content>
                
                {showCoinWithDrow ? (
                    <CoinWithdraw
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowCoinWithDrow={setShowCoinWithDrow}
                        token={token}
                    />
                ) : (
                    ""
                )}
                {showRialWithDrow ? (
                    <RialWithdraw
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowRialWithDrow={setShowRialWithDrow}
                        token={token}
                    />
                ) : (
                    ""
                )}
            </Main>
        </>
    );
}
