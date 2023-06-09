import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "@/c/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "@/c/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL, SETTINGS } from "@/c/settings";
import NightModeContext from "@/c/Context";
import "react-toastify/dist/ReactToastify.css";
import { toast} from "react-toastify";

import QRCode from "react-qr-code";
import { useFetchUser } from "@/c/hooks";
import { Button, Card, Divider, FilledInput, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/system";
import { SidebarLinkCode } from "@/c/utils/types";


const Main = styled('div')`
    width: 100%;
    min-height: 100vh;
    .css-b62m3t-container {
        width: 100%;
    }
    .Toastify__toast-container {
        z-index: 999999;
    }
    .change_password__ChangeHead-sc-1edztku-3,
    .change_password__ChangeContent-sc-1edztku-4 {
    }
    #tsparticles {
        position: absolute;
        height: 100%;
    }
    #tsparticles canvas {
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
const Flex = styled('div')``;
const ChangeMain = styled(Card)`
    position: relative;
    z-index: 9999 !important;
    border-radius: 10px;
    width: 33%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 30px;
    height: 100%;
    padding-bottom: 30px;
    .optactive {
        background: green;
        color: white;
        width: 80%;
        margin: auto;
        display: block;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 15px;
        margin-top: 15px;
    }
    .optdeactive {
        background: red;
        color: white;
        width: 80%;
        margin: auto;
        display: block;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 15px;
        margin-top: 15px;
    }
    .qrcode {
      
        margin: auto;
        display: block;
    
        border-radius: 5px;
        margin-bottom: 15px;
        margin-top: 15px;

    }
    .googlecode{
        width: 80%;
        margin: auto;
        display: block;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 15px;
        margin-top: 15px;
        text-align:center;
        border:solid 3px black;
    }
    .optcheck {
        background: green;
        color: white;
        width: 80%;
        margin: auto;
        display: block;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 15px;
        margin-top: 15px;
    }
    @media (max-width: 786px) {
        width: 90%;
    }
`;

const ChangeHead = styled('div')`
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

const ChangeContent = styled('div')`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        line-height: 0;
    }
    label {
        margin-top: 20px;
        margin-bottom: 0;
        width: 80%;
        position: relative;
    }
    
    
`;

ChangePass.title = `صرافی ${SETTINGS.WEBSITE_NAME} | تعییر رمز`
export default function ChangePass() {
    const stts = useContext(NightModeContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);
    const [showPasswordThree, setShowPasswordThree] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [qrCodeValue, setQrCodeValue] = useState("");


    const [showMenu, setShowMenu] = useState(false);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    const handleClickShowPassword = () => {
        setShowPassword(q => !q)
    }
    const { data: user } = useFetchUser()


    const showqr = function (e) {



        if (e) {
            setQrCodeValue(e);
        }


    }


    const twostepvalidator = function () {
        var els = document.getElementsByClassName("googlecode")[0];
        let data = new FormData();
        data.append("auth_type", 'google');
        data.append("auth_opt", els.value);

        let config = {
            headers: {
                "Content-type": "application/json",

            },
            method: "POST",
            url: `${BASEURL}account/edit/`,
            data: data,
        };

        axios(config)
            .then((response) => {
                response.data.error != 1
                    ? toast.success(response.data.message,) && setTimeout(() => {
                        location.reload();
                    }, 1000)

                    : toast.error(response.data.message);
            })
            .catch((error) => {
                toast.error("خطایی وجود دارد");
            });

    }


    const twostepdeactivator = function () {

        var els = document.getElementsByClassName("googlecode")[0];
        let data = new FormData();
        data.append("auth_type", 'phone');
        data.append("auth_opt", els.value);

        let config = {
            headers: {
                "Content-type": "application/json",

            },
            method: "POST",
            url: `${BASEURL}account/edit/`,
            data: data,
        };

        axios(config)
            .then((response) => {
                response.data.error != 1
                    ? toast.success(response.data.message) && setTimeout(() => {
                        location.reload();
                    }, 1000)

                    : toast.error(response.data.message);
            })
            .catch((error) => {
                toast.error("خطایی وجود دارد");
            });


    }

    const twostepactivator = function () {

        let data = new FormData();
        data.append("auth_type", "google");

        let config = {
            headers: {
                "Content-type": "application/json",

            },
            method: "POST",
            url: `${BASEURL}account/edit/`,
            data: data,
        };

        axios(config)
            .then((response) => {
                response.data.error != 1
                    ? toast.success(response.data.message) && showqr(response.data.path)

                    : toast.error(response.data.message);
            })
            .catch((error) => {
                toast.error("خطایی وجود دارد");
            });

    }

    const changePassHandler = (e) => {
        let data = new FormData();
        data.append("action", "password");
        data.append("old_password", oldPassword);
        data.append("new_password1", newPassword);
        data.append("new_password2", confirmPassword);
        let config = {
            headers: {
                "Content-type": "application/json",

            },
            method: "POST",
            url: `${BASEURL}account/manage/`,
            data: data,
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    toast.info(response.data.message);
                }
            })
            .catch((error) => { });
    };

    return (
        <Main className={"max-w-1992"}
        >
            <Sidebar show-menu={menuHandler} active={SidebarLinkCode.SECURITY} show={showMenu} />
            <Content className={showMenu ? "pr-176" : ""}>
                <Header show-menu={menuHandler} />
                <ChangeMain variant="outlined">

                    <ChangeHead>
                        <Typography>
                            فعال سازی رمز عبور دو مرحله ای
                        </Typography>
                    </ChangeHead>


                    <Typography p={2}> اعتبار سنجی فعال :  {user?.choices_2fa != "google" ? "تلفن همراه" : "کد دو مرحله ای گوگل"}</Typography>


                    {user?.choices_2fa === "phone" && (
                        <>
                            <button className="optactive" onClick={twostepactivator}>
                                فعال سازی گوگل
                            </button>
                        </>
                    )}


                    {user?.choices_2fa === "google" && (
                        <>
                            <input placeholder="کد را وارد نمایید" className="googlecode" />
                            <button className="optdeactive" onClick={twostepdeactivator}>
                                غیر فعال سازی
                            </button>


                        </>
                    )}


                    {qrCodeValue != "" && (
                        <><QRCode className="qrcode" value={qrCodeValue} />
                            <input className="googlecode" />
                            <button className="optcheck" onClick={twostepvalidator} >ثبت کد</button>
                        </>
                    )}






                    <ChangeHead>
                        <Typography>تغییر رمز عبور</Typography>
                    </ChangeHead>
                    <Box pt={2}>
                        <Stack px={3}>

                            <Typography variant="caption" sx={{ mb: 0.6 }}> رمز عبور </Typography>
                            <FilledInput
                                color="info"
                                placeholder="رمز عبور"
                                value={oldPassword}
                                variant="filled"
                                onChange={(e) => setOldPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            color="text.secondary"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <Typography color="error.dark" fontSize={11} mt={1}>
                                شامل حروف بزرگ، کوچک ، اعداد و کاراکترهای خاص
                                مثل: $
                            </Typography>
                            <Divider transparent sx={{ mt: 3 }} />
                            <Typography variant="caption" sx={{ mb: 0.6 }}> گذر واژه جدید </Typography>
                            <FilledInput
                                color="info"
                                placeholder="رمز عبور جدید"
                                value={newPassword}
                                variant="filled"
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={showPasswordTwo ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                setShowPasswordTwo(!showPasswordTwo);
                                            }}
                                            edge="end"
                                            color="text.secondary"
                                        >
                                            {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <Divider transparent sx={{ mt: 3 }} />

                            <Typography variant="caption" sx={{ mb: 0.6 }}> تکرار گذر واژه </Typography>
                            <FilledInput
                                color="info"
                                placeholder=" تکرار رمز عبور جدید" 
                                value={newPassword}
                                variant="filled"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showPasswordThree ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                setShowPasswordThree(!showPasswordThree);
                                            }}
                                            edge="end"
                                            color="text.secondary"
                                        >
                                            {showPasswordThree ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                           
                            <Button
                                onClick={changePassHandler}
                                variant="contained"
                                color="success"
                                sx={{mt: 4}}
                            >
                                تغییر رمز
                            </Button>
                        </Stack>

                    </Box>

                </ChangeMain>

            </Content>
        </Main>
    );
}
