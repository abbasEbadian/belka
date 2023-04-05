import React, { useContext } from "react";
import { styled } from '@mui/material/styles';
import Image from "next/image";
import Router from "next/router";
import NightModeContext from "./Context";
import { Dashboard, History, Person, PersonAdd, Shield, SwapHoriz, SwapVert, Wallet } from "@mui/icons-material";
import { Box, Paper } from "@mui/material";

const SidebarMain = styled(Paper)`
    z-index: 100000;
    position: fixed;
    width: 240px;
    height: 100vh;
    
    transition: 0.1s all;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
    .fill-w {
        fill: #fff;
    }
`;
const SidebarHeader = styled('div')`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 32px;
    .svg-white {
        fill: #fff;
    }
    .close {
        display: none;
    }
    @media (max-width: 992px) {
        img {
            padding-left: 20px !important;
        }
        .close {
            display: block;
        }
        justify-content: flex-end;
        padding-left: 20px;
    }
`;
const SidebarUl = styled('ul')`
    list-style: none;
    margin-top: 44px;
    padding-left: 0 !important;
    white-space: nowrap;
    transition: 0.2s all;
    
    padding-inline: 0 !important;
    .active {
        background: #737dffc5;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        svg path {
            stroke: #fff;
        }
    }
    li {
        cursor: pointer;
        font-weight: 400;
        padding: 12px 0;
        padding-right: 5px;
        width: 87%;
        margin-right: auto;
        margin-left: auto !important;
        font-size: 16px;
        line-height: 28px;
        position: relative;
        svg {
            margin-left: 8px;
        }
        .arrow {
            position: absolute;
            left: 0;
            top: 20px;
        }
    }
`;

const Sidebar = (props) => {
    const stts = useContext(NightModeContext);

    return (
        <SidebarMain  className={
            props.show
                ? ""
                : "w-0"
        }>
            <div>
                <SidebarHeader
                    className={stts.night == "true" ? "bor-l-b" : ""}
                >   
                {props["show"] && stts.night == "true" &&
                     <img
                        onClick={() => {
                            Router.push("/");
                        }}
                        className="c-p"
                        src="/images/logodark.png"
                        width={75}
                        alt="logo"
                    />
                    }
                    {props["show"] && stts.night != "true" &&
                     <img
                        onClick={() => {
                            Router.push("/");
                        }}
                        className="c-p"
                        src="/images/logo2.png"
                
                        alt="logo"
                    />
                    }
                    {!props["show"] &&
                     <img
                        onClick={() => {
                            Router.push("/");
                        }}
                        className="c-p"
                        src="/images/logo-close.png"
                        width={48}
                        height={48}
                        alt="logo"
                    />
                    }
                    <svg
                        onClick={props["show-menu"]}
                        className={
                            stts.night == "true" ? "close svg-white" : "close"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 14 14"
                    >
                        <path
                            id="ic_close_24px"
                            d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
                            transform="translate(-5 -5)"
                        />
                    </svg>
                </SidebarHeader>
                <SidebarUl className={props.show ? "" : "op-0"}>
                    <li
                        className={props.active === "1" ? "active" : ""}
                        onClick={() => {
                            Router.push("/dashboard");
                        }}
                    >
                        <Dashboard sx={{mr: 1}} />
                        <span>داشبورد</span>
                    </li>
                    <li
                        className={props.active === "2" ? "active" : ""}
                        onClick={() => {
                            Router.push("/trade");
                        }}
                    >
                        <SwapHoriz sx={{mr: 1}}/>

                        <span>خرید و فروش</span>
                    </li>
                    <li
                        className={props.active === "10" ? "active" : ""}
                        onClick={() => {
                            Router.push("/change");
                        }}
                    >
                        <SwapVert sx={{mr: 1}}/>

                        <span>خرید و فروش تتر</span>
                    </li>
                    <li
                        className={props.active === "3" ? "active" : ""}
                        onClick={() => {
                            Router.push("/wallet");
                        }}
                    >
                        <Wallet sx={{mr: 1}}/>
                        <span>کیف پول</span>
                    </li>
                    <li
                        className={props.active === "4" ? "active" : ""}
                        onClick={() => {
                            Router.push("/history");
                        }}
                    >
                        <History sx={{mr: 1}}/>

                        <span>تاریخچه</span>
                    </li>
                    <li
                        className={props.active === "5" ? "active" : ""}
                        onClick={() => {
                            Router.push("/profile");
                        }}
                    >
                        <Person sx={{mr: 1}}/>

                        <span>حساب کاربری</span>
                    </li>
                    <li
                        className={props.active === "7" ? "active" : ""}
                        onClick={() => {
                            Router.push("/security");
                        }}
                    >
                       <Shield sx={{mr: 1}}/>

                        <span>امنیت</span>
                    </li>
                    <li
                        className={props.active === "6" ? "active" : ""}
                        onClick={() => {
                            Router.push("/invite");
                        }}
                    >
                       <PersonAdd sx={{mr: 1}}/>

                        <span>دعوت از دوستان</span>
                    </li>
                </SidebarUl>
            </div>
        </SidebarMain>
    );
};

export default Sidebar;
