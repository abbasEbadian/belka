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

const Main = styled('div')`
    background-color: #e4e3ef;
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
        color: #000;
        line-height: 25.74px;
        font-size: 18px;
        font-weight: 600;
    }
`;

Auth.title = ` صرافی ${SETTINGS.WEBSITE_NAME} | احراز هویت`
export default function Auth() {
    const stts = useContext(NightModeContext);

    const [showMenu, setShowMenu] = useState(true);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

   
    const {data: profile} = useFetchUser()

    return (
        <Main className={ "max-w-1992" } >

            <Sidebar show-menu={menuHandler} active="5" show={showMenu} />
            <Content className={showMenu ? "pr-176" : "pr-80"}>
                <Header show-menu={menuHandler} />
                <AuthMain>
                    <h2 className="bg-d-w">احراز هویت</h2>
                    <Wizard  profile={profile} />
                </AuthMain>
            </Content>
        </Main>
    );
}
