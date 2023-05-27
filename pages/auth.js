import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Wizard from "../components/Auth/Wizard";
import axios from "axios";
import { BASEURL, SETTINGS } from "../components/settings";
import NightModeContext from "../components/Context";
import { useFetchUser } from "../components/hooks";
import { SidebarLinkCode } from "../components/utils/types";
import { Box, Card, Typography } from "@mui/material";

const Main = styled(Box)`
    width: 100%;
    min-height: 100vh;
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
    .scrollable {
        max-height: 450px !important;
        overflow-y: auto !important;
        overflow-x: hidden;
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

const AuthMain = styled('div')`
    padding: 32px;
    h2 {
        line-height: 25.74px;
        font-size: 18px;
        font-weight: 600;
    }
`;

Auth.title = ` صرافی ${SETTINGS.WEBSITE_NAME} | احراز هویت`
Auth.protected = true
export default function Auth() {

    const [showMenu, setShowMenu] = useState(false);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

   
    const {data: profile} = useFetchUser()

    return (
        <Main className={ "max-w-1992" } >

            <Sidebar show-menu={menuHandler} active={SidebarLinkCode.PROFILE} show={showMenu} />
            <Content className={showMenu ? "pr-176" : "pr-80"}>
                <Header show-menu={menuHandler} />
                <AuthMain>
                    <Typography variant="subtitle1" mb={2} >احراز هویت</Typography>
                    { profile &&  <Wizard  profile={profile} /> }
                </AuthMain>
            </Content>
        </Main>
    );
}
