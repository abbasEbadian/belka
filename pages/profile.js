import Router from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { styled } from '@mui/material/styles';
import { BASEURL, SETTINGS } from "../components/settings";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import NightModeContext from "../components/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFetchUser } from "../components/hooks";
import { Button, Card, CircularProgress, FilledInput, Grid, Typography } from "@mui/material";
import { ChevronLeft, CreditCard, Edit, Shield } from "@mui/icons-material";
import Link from "next/link";
import { SidebarLinkCode } from "../components/utils/types";
const Content = styled('div')`
    overflow: hidden;
    transition: 0.1s all;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 70px;

    .loading {
        position: relative;
        img {
            position: absolute;
        }
    }
    .lds-ring {
        display: inline-block;
        position: absolute;
        width: 20px;
        height: 20px;
        left: 59% !important;
        top: -45px !important;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 24px;
        height: 24px;
        margin: 8px;
        margin-right: 30px;
        border: 3px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
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
        .lds-ring {
            left: 61% !important;
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
const ProfMain = styled('div')`
   
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 32px;
    overflow: hidden;
    @media (max-width: 1250px) {
        padding-top: 16px;
    }
    .bg-dark-2 label div {
        color: #fff !important;
    }
`;
const RightBox = styled(Card)`
    position: relative;
    width: 711px;
    height: 100%;
    
    border-radius: 16px 16px 0 0;
    display: flex;
    flex-direction: column;
    padding: 24px;
    .img-prof {
        position: relative;
        border-radius: 50%;
        cursor: pointer;
    }
    .edit-prof-svg {
        position: absolute;
        fill: #fff;
        right: 0;
    }
    svg {
        margin-left: 6px;
    }
    .slide-bck-center {
        animation: right-animate 1s ease infinite alternate;
    }
    @keyframes right-animate {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    }

    .auth-btn {
        margin-top: 24px;
        width: 130px;
        margin-right: auto;
        margin-left: auto;
        height: 40px;
        border-radius: 8px;
    }
    .edit-prof {
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        span {
            font-size: 16px;
            font-weight: 700;
        }
    }
    .setting {
        display: flex;
        align-items: center;
        padding-bottom: 13px;
        padding-top: 13px;
        border-bottom: 1px solid #eee;
        span {
            color: #777777;
        }
    }
    @media (max-width: 786px) {
        width: 328px !important;
        padding: 16px;
        .position-relative {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        label {
            width: 100%;
        }
        .edit-prof-svg {
            right: 100px;
            top: 0px;
        }
    }
`;
const LeftBox = styled(Card)`
    width: 711px;
    padding: 32px;
    padding-top: 50px;
    border-radius: 0 0 16px 16px;

    label {
        display: block;
        flex: 1 0 48%;
    }
    .d-flex{
        row-gap: 32px;
        column-gap: 16px;
    }
   
    @media (max-width: 1250px) {
        .edit-prof-svg {
            left: 52%;
        }
    }
    @media (max-width: 786px) {
        width: 328px !important;
        padding: 16px;
        label {
            width: 100%;
        }
        .edit-prof-svg {
            left: 56%;
        }
    }
`;
const Alert = styled('div')`
    width: 473px;
    background: #f6543e;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 14px 10px;
    font-size: 13px;
    color: #fff;
    svg {
        margin-left: 5px;
    }
    @media (max-width: 786px) {
        width: 298px !important;
        padding: 14px !important;
        margin-top: 40px;
    }
`;
const Success = styled('div')`
    width: 473px;
    height: 52px;
    background: #018f41;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 14px 10px;
    font-size: 13px;
    color: #fff;
    text-align: center;
    svg {
        margin-left: 5px;
    }
    @media (max-width: 786px) {
        width: 298px !important;
        padding: 14px;
        margin-top: 40px;
    }
`;




Profile.title = ` صرافی ${SETTINGS.WEBSITE_NAME} | پروفایل`
export default function Profile() {
    const [loading, setLoading] = useState(false);

    const [showMenu, setShowMenu] = useState(false);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    const { refetch: getUser, data: user = {} } = useFetchUser()

    const img = useMemo(() => {
        return user?.avatar
    }, [user])

    const profileChange = (e) => {
        let data = new FormData();
        data.append("file", e);
        setLoading(true);
        axios.post(`${BASEURL}account/avatar/`, data)
            .then((response) => {
                toast.success(response.data.message);
                // changed();
            })
            .catch((error) => {

                toast.error("خطایی وجود دارد");
                // changed();
            })
            .finally(d => setLoading(false))
    };


    return (
        <>
            <div className="max-w-1992">
                <Sidebar show-menu={menuHandler} active={SidebarLinkCode.PROFILE} show={showMenu} />

                <Content className={showMenu ? "pr-176 " : " pr-80"} >
                    <Header show-menu={menuHandler} />
                    <ProfMain>
                        <div className="b-shad">
                            <RightBox                            >
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <label htmlFor="file">
                                        {img !== null ? (
                                            <div className="position-relative">
                                                {!loading ? (
                                                    <img
                                                        className="img-prof"
                                                        src={img}
                                                        width={78}
                                                        height={78}
                                                    />
                                                ) : (
                                                    <div className="loading">
                                                        <img
                                                            className="img-prof"
                                                            src={img}
                                                            width={78}
                                                            height={78}
                                                            alt="profile"
                                                        />
                                                        <CircularProgress size="small" />
                                                    </div>
                                                )}

                                                <svg
                                                    className={" edit-prof-svg"}
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.05732 20.8253L20.8253 7.05733C21.3453 6.53733 22.1893 6.53733 22.7093 7.05733L24.944 9.29199C25.464 9.81199 25.464 10.656 24.944 11.176L11.1747 24.9427C10.9253 25.1933 10.5867 25.3333 10.2333 25.3333H6.66666V21.7667C6.66666 21.4133 6.80666 21.0747 7.05732 20.8253Z"
                                                        stroke="#323232"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M18.3333 9.54666L22.4533 13.6667"
                                                        stroke="#323232"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="position-relative">
                                                <img
                                                    className="img-prof"
                                                    src="/images/prof-img.png"
                                                    width={78}
                                                    height={78}
                                                    alt="profile"
                                                />
                                                <Edit className="edit-prof-svg" />
                                            </div>
                                        )}
                                    </label>

                                    <input
                                        type="file"
                                        className="d-none"
                                        id="file"
                                        onChange={(e) => {
                                            profileChange(e.target.files["0"]);
                                        }}
                                    />
                                    {(user.authentication_status != "accepted" && user.authentication_status || 1) ? (
                                        <Alert>
                                            <svg
                                                width="25"
                                                height="24"
                                                viewBox="0 0 25 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    transform="matrix(-1 0 0 1 24.5 0)"
                                                    fill="white"
                                                    fillOpacity="0.01"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M13.438 4.967C12.922 3.993 12.08 3.989 11.562 4.967L4.438 18.425C3.922 19.399 4.393 20.196 5.495 20.196H19.505C20.607 20.196 21.08 19.403 20.562 18.425L13.438 4.967ZM13.2071 14.7071C13.0196 14.8946 12.7652 15 12.5 15C12.2348 15 11.9804 14.8946 11.7929 14.7071C11.6054 14.5196 11.5 14.2652 11.5 14V9C11.5 8.73478 11.6054 8.48043 11.7929 8.29289C11.9804 8.10536 12.2348 8 12.5 8C12.7652 8 13.0196 8.10536 13.2071 8.29289C13.3946 8.48043 13.5 8.73478 13.5 9V14C13.5 14.2652 13.3946 14.5196 13.2071 14.7071ZM13.2071 17.7071C13.0196 17.8946 12.7652 18 12.5 18C12.2348 18 11.9804 17.8946 11.7929 17.7071C11.6054 17.5196 11.5 17.2652 11.5 17C11.5 16.7348 11.6054 16.4804 11.7929 16.2929C11.9804 16.1054 12.2348 16 12.5 16C12.7652 16 13.0196 16.1054 13.2071 16.2929C13.3946 16.4804 13.5 16.7348 13.5 17C13.5 17.2652 13.3946 17.5196 13.2071 17.7071Z"
                                                    fill="white"
                                                />
                                            </svg>
                                            جهت احراز هویت اطلاعات حساب کاربری
                                            خود را همراه با مدارک بارگذاری کنید.


                                            <div className="d-grid">
                                                <button
                                                    onClick={() => {
                                                        Router.push("/auth");
                                                    }}
                                                    className="auth-btn slide-bck-center btn-warning mx-auto"
                                                >
                                                    احراز هویت
                                                </button>
                                            </div>
                                        </Alert>

                                    ) : (
                                        <Success>
                                            اکانت شما تایید شده است .
                                        </Success>
                                    )}
                                </div>
                                <div className="edit-prof d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <Edit sx={{ mr: 2 }} />
                                        <span>ویرایش پروفایل</span>
                                    </div>
                                    <ChevronLeft />
                                </div>
                                <div
                                    className="setting c-p"
                                    onClick={() => {
                                        Router.push("/cards");
                                    }}
                                >
                                    <CreditCard sx={{ mr: 2 }} />

                                    <span>کارت های بانکی</span>
                                </div>
                                <div
                                    className="setting c-p"
                                    onClick={() => {
                                        Router.push("/change_password");
                                    }}
                                >
                                    <Shield sx={{ mr: 2 }} />

                                    <span>امنیت</span>
                                </div>
                                {user.rank == "unverified" ? (
                                    <button
                                        onClick={() => {
                                            Router.push("/auth");
                                        }}
                                        className="auth-btn slide-bck-center btn-warning"
                                    >
                                        احراز هویت
                                    </button>
                                ) : ("")}
                            </RightBox>
                            <LeftBox >
                                <div className="d-flex flex-wrap justify-content-center ">
                                    <Grid container rowSpacing={3} columnSpacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="caption" sx={{ mb: 0.6 }}> نام و نام خانوادگی </Typography>
                                            <FilledInput
                                                color="success"
                                                value={user?.first_name + " " + user?.last_name}
                                                // onChange={(e) => setFirstName(e.target.value)}
                                                direction="left"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="caption" sx={{ mb: 0.6 }}> نام پدر </Typography>
                                            <FilledInput
                                                color="success"
                                                value={user.father_name ?? ""}
                                                // onChange={(e) => setFirstName(e.target.value)}
                                                direction="left"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="caption" sx={{ mb: 0.6 }}> شماره همراه </Typography>
                                            <FilledInput
                                                color="success"
                                                value={user.mobile ?? ""}
                                                // onChange={(e) => setFirstName(e.target.value)}
                                                direction="left"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="caption" sx={{ mb: 0.6 }}> کد ملی </Typography>
                                            <FilledInput
                                                color="success"
                                                value={user?.personal_data?.birth_certificate_id ?? ""}
                                                // onChange={(e) => setFirstName(e.target.value)}
                                                direction="left"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="caption" sx={{ mb: 0.6 }}> شماره ثابت </Typography>
                                            <FilledInput
                                                color="success"
                                                value={user?.personal_data?.address?.phone ?? ""}
                                                // onChange={(e) => setFirstName(e.target.value)}
                                                direction="left"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="caption" sx={{ mb: 0.6 }}> کد پستی </Typography>
                                            <FilledInput
                                                color="success"
                                                value={user?.personal_data?.address?.post_code ?? ""}
                                                // onChange={(e) => setFirstName(e.target.value)}
                                                direction="left"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography variant="caption" sx={{ mb: 0.6 }}> آدرس </Typography>
                                            <FilledInput
                                                color="success"
                                                value={user?.address ?? ""}
                                                // onChange={(e) => setFirstName(e.target.value)}
                                                direction="left"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>







                                </div>

                                <Link href="/edit">
                                    <Button color='info' variant="contained" fullWidth sx={{mt: 5}}>
                                        اصلاح
                                    </Button>
                                </Link>
                            </LeftBox>
                        </div>
                    </ProfMain>
                </Content >
            </div >
        </>
    );
}
