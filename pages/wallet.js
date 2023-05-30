import Sidebar from "../components/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";

import { BASEURL, SETTINGS } from "../components/settings";
import "react-toastify/dist/ReactToastify.css";
import CoinDeposit from "../components/Wallet/CoinDeposit";
import CoinWithdraw from "../components/Wallet/CoinWithdraw";
import NightModeContext from "../components/Context";
import RialDeposit from "../components/Wallet/RialDeposit";
import RialWithdraw from "../components/Wallet/RialWithdraw";
import WalletTableC from "../components/Wallet/WalletTable";
import { useFetchCoins, useFetchWallet } from '../components/hooks'
import { Container, Divider, Typography } from "@mui/material";
import { SidebarLinkCode } from "../components/utils/types";
import CoinTable from "../components/Wallet/CoinTable";


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

const WalletMain = styled(Container)`
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



Wallet.protected = true
Wallet.title = `صرافی ${SETTINGS.WEBSITE_NAME} | کیف پول`

export default function Wallet() {
    const [showRialWithDrow, setShowRialWithDrow] = useState(false);
    const [showCoinWithDrow, setShowCoinWithDrow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [blur, setBlur] = useState(false);
    const [itemTo, setItemTo] = useState([]);
    const stts = useContext(NightModeContext);


    const { isLoading: isWalletLoading, data: wallet } = useFetchWallet()
    const { isLoading: isCoinsLoading, data: coins } = useFetchCoins()



    // 138198.4164
    let token = "";


    const menuHandler = () => {
        setShowMenu(!showMenu);
    };


    return (
        <>
            <Main >
                <Sidebar show-menu={menuHandler} active={SidebarLinkCode.WALLET} show={showMenu} />
                <Content className={showMenu ? "pr-176" : "pr-80"}>
                    <Header show-menu={menuHandler} />
                    <WalletMain className={blur ? " bg-blur" : ""} maxWidth="lg">
                        <WalletTableC wallet={wallet} coins={coins} />
                        <Divider transparent sx={{ mt: 8 }} />
                        <CoinTable wallet={wallet} coins={coins } />
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
