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
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Main = styled('div')`
    background-color: #e4e3ef;
    width: 100%;
    min-height: 100vh;
    .round {
        border-radius: 16px !important;
        background-color: #6e6d6d53;
    }
    .css-b62m3t-container {
        width: 100%;
    }
    .text-right {
        text-align: right;
    }
`;
const Content = styled('div')`
    overflow: hidden;
    transition: 0.1s all;
    padding-bottom: 70px;

    @media (max-width: 786px) {
        h6 {
            font-size: 13px !important;
        }
    }
`;

const InviteMain = styled('div')`
    border-radius: 10px;
    width: 93%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 30px;
    height: 100%;
    background-color: #fff;
    box-shadow: 5px 7px 26px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 26px -5px #9f9fbb;
`;

const InviteHead = styled('div')`
    height: 60px;
    width: 100%;
    padding: 16px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid #333;
    h6 {
        font-size: 20px;
    }
    @media (max-width: 786px) {
        h6 {
            font-size: 16px !important;
        }
    }
`;

const InviteContent = styled('div')`
    padding: 16px;
`;
const Title = styled('div')`
    width: 100%;
    padding-right: 16px;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    div {
        margin-top: 15px;
        width: 100%;
    }
`;

const InviteLink = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CodeBox = styled('div')`
    border: 1px solid #333;
    border-radius: 10px;
    height: 44px;
    direction: ltr;
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-left: 16px;
    margin-right: 20px;

    align-items: center;

    svg {
        margin-right: 5px;
    }
    @media (max-width: 786px) {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        p {
            margin-bottom: 13px !important;
            font-size: 12px;
        }
        font-size: 12px;
    }
`;

export default function Invite() {
    const [refral, setRefral] = useState([]);
    const stts = useContext(NightModeContext);
    let token = "";
    setTimeout(() => {
        if( typeof window !=='undefined' )token = localStorage.getItem("token");
    }, 2000);
    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            Router.push("/login");
        }
    }, []);
    const [showMenu, setShowMenu] = useState(true);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    let refreshToken = "";
    setTimeout(() => {
        refreshToken = localStorage && localStorage.getItem("refresh_token");
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
    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                url: `${BASEURL}account/referral/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setRefral(res.data);
                    }
                })
                .catch((error) => {});
        }, 2200);
    }, []);

    return (
        <Main
            className={
                stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
        
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <title>صرافی متاورس | دعوت از دوستان</title>
            </Head>
            <Sidebar show-menu={menuHandler} active="6" show={showMenu} />
            <Content className={showMenu ? "pr-176" : "pr-80"}>
                <ToastContainer
                    rtl={true}
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                />
                <Header show-menu={menuHandler} />
                <InviteMain
                    className={stts.night == "true" ? "bg-gray no-shadow" : ""}
                >
                    <InviteHead>
                        <h6>دعوت از دوستان</h6>
                    </InviteHead>
                    <InviteContent>
                        <InviteLink>
                            <h6 className="">لینک دعوت شما:</h6>
                            <CodeBox className="d-flex justify-content-between px-2">
                                <p className="adress-box">
                                    <svg
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                ` https://www.metavers-ex.com/register?referral=${refral.referral_code}`
                                            );
                                            toast.success("آدرس کپی شد", {
                                                position: "top-center",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                        }}
                                        className="c-p"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x="6.99792"
                                            y="6.99792"
                                            width="14.0058"
                                            height="14.0058"
                                            rx="2"
                                            stroke="#727272"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6.99792 17.0021H4.99709C3.89206 17.0021 2.99625 16.1063 2.99625 15.0013V4.99709C2.99625 3.89206 3.89206 2.99625 4.99709 2.99625H15.0013C16.1063 2.99625 17.0021 3.89206 17.0021 4.99709V6.99792"
                                            stroke="#727272"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </p>
                                <p>
                                    https://www.metavers-ex.com/register?referral=
                                    {refral.referral_code}
                                </p>
                            </CodeBox>
                        </InviteLink>
                        <div className="d-flex round align-items-center justify-content-center mt-4">
                            <Title className="text-right">
                                <div>
                                    <h6>تعداد افراد دعوت شده توسط شما</h6>
                                </div>
                                <div>
                                    <h6>میزان درآمد شما</h6>
                                </div>
                            </Title>
                            <Title>
                                <div>
                                    <h6 className="me-3">
                                        {refral.user_count}
                                    </h6>
                                </div>
                                <div>
                                    <h6 className="me-3">{refral.total_get}</h6>
                                </div>
                            </Title>
                        </div>
                    </InviteContent>
                </InviteMain>
            </Content>
        </Main>
    );
}
