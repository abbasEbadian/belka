import Image from "next/image";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import "bootstrap/dist/css/bootstrap.css";
import Router from "next/router";
import ReactCodeInput from "react-code-input";
import axios from "axios";
import { BASEURL } from "../components/settings";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

const Main = styled('div')`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e4e3ef;
    padding: 24px;
`;

const Content = styled('div')`
    .w-50 {
    }
    max-width: 1280px;
    display: flex;
    justify-content: center;
    width: 100%;
    @media (max-width: 992px) {
        .w-50 {
            display: none !important;
        }
        justify-content: center;
    }
`;

const LeftContent = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    z-index: 1000;
`;

const Box = styled('div')`
    width: 400px;
    height: 402px;
    background: #ffffff;
    box-shadow: 5px 7px 26px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 26px -5px #9f9fbb;
    border-radius: 16px;
    margin-top: 32px;
    padding: 16px;
    h4 {
        font-weight: 600;
        font-size: 16px;
        margin-top: 20px;
        line-height: 20px;
        color: #323232;
    }
    label {
        display: flex;
        flex-direction: column;
        margin-top: 36px;
        margin-bottom: 8px;
        font-size: 16px;
        line-height: 23px;
    }
    input {
        margin-top: 8px;
        background-color: rgb(191 226 239);
        width: 100%;
        height: 44px;
        border: 1.5px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 10px;
    }
    .l-t-r {
        direction: ltr;
    }
    .resend {
        color: #2d3bfa;
    }
    @media (max-width: 992px) {
        width: 343px;
    }
`;

const Submit = styled('button')`
    width: 90%;
    height: 42px;
    border-radius: 8px;
    transition: 0.3s all;
    color: #fff;
    background-color: #5965f9;
    border-color: #5965f9;
    margin-top: 75px !important;
    :hover {
        opacity: 0.83;
    }
`;

export default function Register() {
    const [activeTab, setActiveTab] = useState("log");
    const [counter, setCounter] = useState(60);
    const [code, setCode] = useState("");
    const id =
        typeof window !== "undefined" ? localStorage.getItem("id") : null;
    const mobile =
        typeof window !== "undefined" ? localStorage.getItem("mobile") : null;
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    const subHandler = async (e) => {
        let data = {
            id: id,
            otp: code,
        };
        let config = {
            method: "POST",
            url: `${BASEURL}token/verify/`,
            data: data,
        };

        await axios(config)
            .then((response) => {
                if (response.status == 200) {
                    localStorage.setItem("token", response.data.access);
                    localStorage.setItem(
                        "refresh_token",
                        response.data.refresh
                    );
                    Router.push("/dashboard");
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(" کد وارد شده اشتباه است", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    const resend = async (e) => {
        let data = {
            mobile,
        };
        let config = {
            method: "POST",
            url: `${BASEURL}token/otp/resend/`,
            data: data,
        };
        await axios(config)
            .then((response) => {
                if (response.status == 200) {
                    setCounter(60);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {});
    };
    const handlePinChange = (pinCode) => {
        setCode(pinCode);
    };
    useEffect(() => {
        if (code.length > 5) {
            subHandler();
        }
    }, [code]);
    return (
        <Main>
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
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی متاورس | کد تایید</title>
            </Head>
            <Content>
                <LeftContent>
                    <Box>
                        <h4>ورود به حساب کاربری</h4>
                        <div className="d-flex justify-content-center text-center">
                            <label className="l-t-r">
                                کد تایید
                                <ReactCodeInput
                                    onChange={handlePinChange}
                                    type="number"
                                    fields={6}
                                    onKeyDown={(e) => {
                                        e.key === "Enter"
                                            ? handlePinChange
                                            : "";
                                    }}
                                />
                            </label>
                        </div>
                        {counter !== 0 ? (
                            <div className="text-center text-danger">
                                ارسال دوباره کد تا
                                <span className="mx-2">{counter}</span>
                                ثانیه دیگر
                            </div>
                        ) : (
                            <div
                                onClick={resend}
                                className="resend text-center c-p"
                            >
                                ارسال مجدد کد
                            </div>
                        )}
                        <div className="d-flex l-t-r justify-content-center mt-3">
                            <Submit onClick={subHandler}>تایید</Submit>
                        </div>
                    </Box>
                </LeftContent>
            </Content>
        </Main>
    );
}
