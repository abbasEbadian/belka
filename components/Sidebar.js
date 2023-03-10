import React, { useContext } from "react";
import { styled } from '@mui/material/styles';
import Image from "next/image";
import Router from "next/router";
import NightModeContext from "./Context";

import LogoImage from "../public/images/logo.png"

const SidebarMain = styled('div')`
    z-index: 100000;
    position: fixed;
    width: 240px;
    height: 100vh;
    background: linear-gradient(
        to bottom,
        var(--primary-bg-color) 0%,
        #764ba2 100%
    );
    transition: 0.1s all;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
    color: #fff;
    background: linear-gradient(to bottom,#555 0%,#f9fafb 100%);
    .fill-w {
        fill: #fff;
    }
`;
const SidebarHeader = styled('div')`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
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
const SidebarUl = styled.ul`
    list-style: none;
    margin-top: 44px;
    padding-left: 0 !important;
    white-space: nowrap;
    transition: 0.2s all;

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
        <SidebarMain
            className={
                props.show
                    ? stts.night == "true"
                        ? "bg-gray "
                        : ""
                    : stts.night == "true"
                    ? "w-0 bg-gray "
                    : "w-0"
            }
        >
            <div>
                <SidebarHeader
                    className={stts.night == "true" ? "bg-gray bor-l-b" : ""}
                >   
                {props["show"] && stts.night == "true" &&
                     <img
                        onClick={() => {
                            Router.push("/");
                        }}
                        className="c-p"
                        src="/images/logodark.png"
                        width={150}
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
                        width={32}
                        height={32}
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
                        <svg
                            id="menu-grid"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.573"
                            height="20.802"
                            viewBox="0 0 55.573 54.802"
                        >
                            <g
                                id="Group_64"
                                data-name="Group 64"
                                transform="translate(0 0)"
                            >
                                <path
                                    id="Path_119"
                                    data-name="Path 119"
                                    d="M23.156,5.149A2.322,2.322,0,0,0,20.84,2.833H2.316A2.322,2.322,0,0,0,0,5.149V23.673a2.322,2.322,0,0,0,2.316,2.316H20.84a2.322,2.322,0,0,0,2.316-2.316ZM4.631,7.464H18.524V21.357H4.631Z"
                                    transform="translate(0 -2.833)"
                                    fill="#fff"
                                />
                                <path
                                    id="Path_120"
                                    data-name="Path 120"
                                    d="M261.156,5.149a2.322,2.322,0,0,0-2.316-2.316H240.316A2.322,2.322,0,0,0,238,5.149V23.673a2.322,2.322,0,0,0,2.316,2.316H258.84a2.322,2.322,0,0,0,2.316-2.316ZM242.631,7.464h13.893V21.357H242.631Z"
                                    transform="translate(-205.582 -2.833)"
                                    fill="#fff"
                                />
                                <path
                                    id="Path_121"
                                    data-name="Path 121"
                                    d="M23.156,237.483a2.322,2.322,0,0,0-2.316-2.316H2.316A2.322,2.322,0,0,0,0,237.483v18.524a2.322,2.322,0,0,0,2.316,2.316H20.84a2.322,2.322,0,0,0,2.316-2.316ZM4.631,239.8H18.524v13.893H4.631Z"
                                    transform="translate(0 -203.521)"
                                    fill="#fff"
                                />
                                <path
                                    id="Path_122"
                                    data-name="Path 122"
                                    d="M261.156,237.483a2.322,2.322,0,0,0-2.316-2.316H240.316A2.322,2.322,0,0,0,238,237.483v18.524a2.322,2.322,0,0,0,2.316,2.316H258.84a2.322,2.322,0,0,0,2.316-2.316ZM242.631,239.8h13.893v13.893H242.631Z"
                                    transform="translate(-205.582 -203.521)"
                                    fill="#fff"
                                />
                            </g>
                        </svg>

                        <span>داشبورد</span>
                    </li>
                    <li
                        className={props.active === "2" ? "active" : ""}
                        onClick={() => {
                            Router.push("/trade");
                        }}
                    >
                        <svg
                            className="fill-w"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="17"
                            viewBox="0 0 18 14"
                        >
                            <path
                                id="ic_swap_horiz_24px"
                                d="M6.99,11,3,15l3.99,4V16H14V14H6.99ZM21,9,17.01,5V8H10v2h7.01v3Z"
                                transform="translate(-3 -5)"
                            />
                        </svg>

                        <span>خرید و فروش</span>
                    </li>
                    <li
                        className={props.active === "10" ? "active" : ""}
                        onClick={() => {
                            Router.push("/change");
                        }}
                    >
                        <svg
                            className="fill-w"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="18"
                            viewBox="0 0 14 18"
                        >
                            <path
                                id="ic_swap_vert_24px"
                                d="M16,17.01V10H14v7.01H11L15,21l4-3.99ZM9,3,5,6.99H8V14h2V6.99h3Z"
                                transform="translate(-5 -3)"
                            />
                        </svg>

                        <span>خرید و فروش تتر</span>
                    </li>
                    <li
                        className={props.active === "3" ? "active" : ""}
                        onClick={() => {
                            Router.push("/wallet");
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20 15.5H18C16.895 15.5 16 14.605 16 13.5V13.5C16 12.395 16.895 11.5 18 11.5H20C20.552 11.5 21 11.948 21 12.5V14.5C21 15.052 20.552 15.5 20 15.5Z"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 11.5V8.5C20 7.395 19.105 6.5 18 6.5H4.5C3.672 6.5 3 5.828 3 5V5C3 4.172 3.672 3.5 4.5 3.5H17"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 15.5V18.5C20 19.605 19.105 20.5 18 20.5H5C3.895 20.5 3 19.605 3 18.5V5"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>کیف پول</span>
                    </li>
                    <li
                        className={props.active === "4" ? "active" : ""}
                        onClick={() => {
                            Router.push("/history");
                        }}
                    >
                        <svg
                            className="fill-w"
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="19"
                            viewBox="0 0 21 18"
                        >
                            <path
                                id="ic_history_24px"
                                d="M13,3a9,9,0,0,0-9,9H1l3.89,3.89.07.14L9,12H6a7.034,7.034,0,1,1,2.06,4.94L6.64,18.36A9,9,0,1,0,13,3ZM12,8v5l4.28,2.54L17,14.33l-3.5-2.08V8Z"
                                transform="translate(-1 -3)"
                            />
                        </svg>

                        <span>تاریخچه</span>
                    </li>
                    <li
                        className={props.active === "5" ? "active" : ""}
                        onClick={() => {
                            Router.push("/profile");
                        }}
                    >
                        <svg
                            className="fill-w"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                        >
                            <path
                                id="ic_person_24px"
                                d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0,2c-2.67,0-8,1.34-8,4v2H20V18C20,15.34,14.67,14,12,14Z"
                                transform="translate(-4 -4)"
                            />
                        </svg>

                        <span>حساب کاربری</span>
                    </li>
                    <li
                        className={props.active === "7" ? "active" : ""}
                        onClick={() => {
                            Router.push("/security");
                        }}
                    >
                        <svg
                            className="fill-w"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="22"
                            viewBox="0 0 18 22"
                        >
                            <path
                                id="ic_security_24px"
                                d="M12,1,3,5v6c0,5.55,3.84,10.74,9,12,5.16-1.26,9-6.45,9-12V5Zm0,10.99h7c-.53,4.12-3.28,7.79-7,8.94V12H5V6.3l7-3.11v8.8Z"
                                transform="translate(-3 -1)"
                            />
                        </svg>

                        <span>امنیت</span>
                    </li>
                    <li
                        className={props.active === "6" ? "active" : ""}
                        onClick={() => {
                            Router.push("/invite");
                        }}
                    >
                        <svg
                            className="fill-w"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="16"
                            viewBox="0 0 22 16"
                        >
                            <path
                                id="ic_person_add_24px"
                                d="M15,12a4,4,0,1,0-4-4A4,4,0,0,0,15,12ZM6,10V7H4v3H1v2H4v3H6V12H9V10Zm9,4c-2.67,0-8,1.34-8,4v2H23V18C23,15.34,17.67,14,15,14Z"
                                transform="translate(-1 -4)"
                            />
                        </svg>

                        <span>دعوت از دوستان</span>
                    </li>
                </SidebarUl>
            </div>
        </SidebarMain>
    );
};

export default Sidebar;
