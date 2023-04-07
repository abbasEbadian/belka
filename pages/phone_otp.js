import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { BASEURL, SETTINGS } from "../components/settings";
import NightModeContext from "../components/Context";
import { toast, ToastContainer } from "react-toastify";
import ReactCodeInput from "react-code-input";

const Main = styled('div')`
    background-color: #e4e3ef;
    width: 100%;
    min-height: 100vh;
    .homePhone {
        margin-top: 40px;
        border: 1px solid #afafaf;
        height: 40px;
        width: 340px;
        border-radius: 10px;
        padding: 16px;
        direction: ltr;
        ::placeholder {
            text-align: right;
        }
    }
    .l-t-r {
        font-size: 11px;
        direction: ltr !important;
        input {
            padding: 0 !important;
            padding-left: 8px !important;
        }
    }
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
    margin-top: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    .box {
        box-shadow: 5px 7px 26px -5px #9f9fbb;
        -webkit-box-shadow: 5px 7px 26px -5px #9f9fbb;

        width: 625px;
        height: 100%;
        background: #ffffff;
        border-radius: 16px;
        padding-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 50px;
        p {
            font-weight: 600;
            font-size: 18px;
            line-height: 26px;
        }
        span {
            font-size: 14px;
            color: #777777;
        }
        input {
            width: 244px;
            height: 40px;
            background-color: #e4e3ef;
            border: 1px solid #dedede;
            border-radius: 8px;
            margin-top: 4px;
            padding: 16px;
        }
        label {
            display: flex;
            flex-direction: column;
            margin-top: 16px;
        }
    }
`;
const Submit = styled('button')`
    width: 260px;
    height: 42px;
    border-radius: 8px;
    transition: 0.3s all;
    color: #fff;
    background-color: #5965f9;
    border-color: #5965f9;
    margin-top: 50px !important;
    :hover {
        opacity: 0.83;
    }
    @media (max-width: 550px) {
        height: 38px;
    }
`;


Edit.title = `صرافی ${SETTINGS.WEBSITE_NAME} | تایید شماره ثابت`
export default function Edit() {
    const stts = useContext(NightModeContext);
    const [homeCode, setHomeCode] = useState();

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
    const handlePinChange = (pinCode) => {
        setHomeCode(pinCode);
    };
    let token = "";
    setTimeout(() => {
        if( typeof window !=='undefined' )token = localStorage.getItem("token");
    }, 1000);
    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            Router.push("/login");
        }
    }, []);
    const otpHandler = (e) => {
        setTimeout((e) => {
            let data = {
                otp: homeCode,
            };
            let config = {
                headers: {
                    "Content-type": "application/json",
                    
                },
                method: "POST",
                url: `${BASEURL}account/verify/phone/complete/`,
                data: data,
            };

            axios(config)
                .then((response) => {
                    response.data.error != 1
                        ? toast.success(response.data.message) && Router.push("/profile")
                        : toast.error(response.data.message);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
                });
        }, 2001);
    };

    return (
        <Main
            className={
                stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title></title>
            </Head>

            <Sidebar show-menu={menuHandler} active="5" show={showMenu} />
            <Content className={showMenu ? "pr-176" : ""}>
                <Header show-menu={menuHandler} />
                <AuthMain>
                    <div className="box">
                        <p className="text-center">
                            شماره خوانده شده در تماس را وارد نمایید
                        </p>
                        <div className="right mt-4">کد تایید</div>
                        <div className="l-t-r">
                            <ReactCodeInput
                                onChange={handlePinChange}
                                type="number"
                                fields={5}
                            />
                        </div>
                        <Submit onClick={otpHandler} className="mt-5">
                            تایید
                        </Submit>
                    </div>
                </AuthMain>
            </Content>
        </Main>
    );
}
