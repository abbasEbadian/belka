import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import NightModeContext from "../components/Context";
import { toast, ToastContainer } from "react-toastify";

const Main = styled.div`
    background-color: #e4e3ef;
    width: 100%;
    min-height: 100vh;
`;
const Content = styled.div`
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

const AuthMain = styled.div`
    margin-top: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    .box {
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
            width: 264px;
            height: 42px;
            background-color: transparent;
            border: 1px solid #dedede;
            border-radius: 4px;
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
const Submit = styled.button`
    width: 270px;
    height: 42px;
    border-radius: 8px;
    transition: 0.3s all;
    color: #fff;
    background-color: #5965f9;
    border-color: #5965f9;
    margin-top: 60px !important;
    :hover {
        opacity: 0.83;
    }
    @media (max-width: 550px) {
        height: 38px;
    }
`;
export default function Edit() {
    const stts = useContext(NightModeContext);
    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            Router.push("/login");
        }
    }, []);
    const [showMenu, setShowMenu] = useState(true);
    const [profile, setProfile] = useState([]);
    const [adress, setAdress] = useState();
    const [postCode, setPostCode] = useState();
    const [phone, setPhone] = useState();
    const menuHandler = () => {
        setShowMenu(!showMenu);
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
    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                url: `${baseUrl}account/details/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setProfile(res.data);
                    }
                })
                .catch((error) => {});
        }, 1200);
    }, []);
    const editHandler = (e) => {
        setTimeout((e) => {
            let data = new FormData();
            data.append("address", adress);
            data.append("post_code", postCode);
            data.append("phone", phone);
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${baseUrl}account/edit/`,
                data: data,
            };

            axios(config)
                .then((response) => {
                    response.data.error != 1
                        ? toast.success(response.data.message, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                          }) &&
                          setTimeout(() => {
                              Router.push("/profile");
                          }, 2000)
                        : toast.error(response.data.message, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                          });
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
                <title> صرافی متاورس | اصلاح اطلاعات</title>
            </Head>

            <Sidebar show-menu={menuHandler} active="5" show={showMenu} />
            <Content className={showMenu ? "pr-176" : ""}>
                <Header show-menu={menuHandler} />
                <AuthMain>
                    <div
                        className={
                            stts.night == "true" ? "bg-gray box" : " box"
                        }
                    >
                        <label>
                            آدرس
                            <input
                                type="text"
                                onChange={(e) => {
                                    setAdress(e.target.value);
                                }}
                            />
                        </label>

                        <label>
                            کد پستی
                            <input
                                type="text"
                                onChange={(e) => {
                                    setPostCode(e.target.value);
                                }}
                            />
                        </label>

                        <label>
                            شماره ثابت
                            <input
                                type="number"
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </label>

                        <Submit className="mt-3" onClick={editHandler}>
                            تایید و ادامه
                        </Submit>
                    </div>
                </AuthMain>
            </Content>
        </Main>
    );
}
