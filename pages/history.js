import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "@/c/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "@/c/Header";
import { useContext, useEffect, useState } from "react";
import { BASEURL, SETTINGS } from "@/c/settings";
import NightModeContext from "@/c/Context";
import { useFetchOrders } from "@/c/hooks";
import HistoryTableTrade from "@/c/History/HistoryTableTrade";
import HistoryTableHistory from "@/c/History/HistoryTableHistory";
import { Divider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { SidebarLinkCode } from "@/c/utils/types";

const Main = styled('div')`
    width: 100%;
    min-height: 100vh;
    .scrollable {
        max-height: 500px;
        overflow: auto;
    }
    .tabs {

        display: flex;
        align-items: center;
        border-radius: 10px;
        width: 200px;
        overflow: hidden;
        justify-content: space-between;
        .active-span {
            background-color: #eee;
        }
        span {
            font-size: 15px !important;
            cursor: pointer;
            :first-child {
            }
            padding: 10px 13px;
        }
    }
    .tabs-dark {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 10px;
        width: 200px;
        justify-content: space-between;
        overflow: hidden;
        .active-span {
            background-color: #ffffff28;
        }
        span {
            font-size: 15px !important;
            cursor: pointer;
            :first-child {
                padding-left: 16px;
                border-left: 1px solid #ccc;
            }
            padding: 10px 13px;
        }
    }
`;
const Content = styled('div')`
    overflow: hidden;
    transition: 0.1s all;
    .p-32 {
        padding: 32px;
        span {
            font-weight: 600;
            font-size: 18px;
            line-height: 26px;
            color: #323232;
        }
    }
`;
const HistoryTable = styled('table')`
    min-width: 600px;
    width: 100%;
    margin-top: 20px;
    min-width: 800px;
    overflow: auto;
    thead tr {
        width: 100%;
        border: none;
        border-radius: 8px;
        height: 80px;
        font-size: 15px;
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
        border-top: 1px solid #eee;
        :last-child {
            td {
                padding-bottom: 20px;
                padding-top: 20px;
                :first-child {
                    border-radius: 0 0 16px 0 !important;
                }
                :last-child {
                    border-radius: 0 0 0 16px !important;
                }
            }
        }
    }
    thead tr th,
    tbody tr th,
    tbody tr td {
        padding-right: 20px;
        border: none;
    }
    tbody {
        overflow: auto;

        border-top: none !important;
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
    @media (max-width: 992px) {
        .remove-mob {
            display: none !important;
        }
        .remove-mob-2 {
            width: 40px;
            display: none;
        }
        .d-none {
            display: block;
        }
    }
`;
History.title = `صرافی ${SETTINGS.WEBSITE_NAME} | تاریخچه معاملات`
export default function History() {
    const [showMenu, setShowMenu] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [tabActive, setTabActive] = useState("trade");
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };


    const { data: orders } = useFetchOrders()


    return (
        <Main
            className={"max-w-1992"}
        >
            <Sidebar show-menu={menuHandler} active={SidebarLinkCode.HISTORY} show={showMenu} />
            <Content className={showMenu ? "pr-176" : "pr-80"}>
                <Header show-menu={menuHandler} />
                <div className="p-32">
                    <ToggleButtonGroup
                        value={tabActive}
                        exclusive
                        color='error'
                        size='small'
                        onChange={(e, value) => {
                            setTabActive(value);
                        }}
                    >

                        <ToggleButton
                            color='info'
                            value={"trade"}
                            sx={{ px: 2 }}
                        >
                            <Typography variant="subtitle2">  معاملات </Typography>
                        </ToggleButton>
                        <ToggleButton
                            color='info'
                            value={"history"}
                            sx={{ px: 2 }}
                            size="small"
                        >
                            <Typography variant="subtitle2">  واریز و برداشت </Typography>
                        </ToggleButton>


                    </ToggleButtonGroup>
                    <Divider sx={{my: 2}} />
                    {tabActive == "trade" ? (
                        <HistoryTableTrade data={orders} />
                    ) : (
                        <HistoryTableHistory data={orders} />
                    )}
                </div>
            </Content>
        </Main>
    );
}
