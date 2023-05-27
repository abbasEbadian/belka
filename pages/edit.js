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
import { Box, Card, Divider, FilledInput, Stack, TextField, Typography } from "@mui/material";
import { useFetchUser } from "../components/hooks";
import { LoadingButton } from "@mui/lab";
import { SidebarLinkCode } from "../components/utils/types";




Edit.title = `صرافی ${SETTINGS.WEBSITE_NAME} | اصلاح اطلاعات`
export default function Edit() {
    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            Router.push("/login");
        }
    }, []);
    const [showMenu, setShowMenu] = useState(false);
    const [adress, setAdress] = useState();
    const [postCode, setPostCode] = useState();
    const [phone, setPhone] = useState();
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    const { data: profile={} } = useFetchUser();

    useEffect(() => {
        setAdress( profile?.address )
        setPostCode( profile?.address?.personal_date?.address?.post_code )
        setPhone( profile?.address?.personal_date?.address?.phone )

    }, [profile])

    const editHandler = (e) => {
        setTimeout((e) => {
            let data = new FormData();
            data.append("address", adress);
            data.append("post_code", postCode);
            data.append("phone", phone);
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
                        ? toast.success(response.data.message) &&
                        setTimeout(() => {
                            Router.push("/profile");
                        }, 2000)
                        : toast.error(response.data.message);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
                });
        }, 2001);
    };

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Sidebar show-menu={menuHandler} active={SidebarLinkCode.PROFILE} show={showMenu} />
            <Box  paddingLeft={{ lg: "240px" }}>
                <Header show-menu={menuHandler} />
                <Stack justifyContent={"center"} alignItems="center"  paddingTop={6}>
                    <Card variant="outlined" sx={{maxWidth: 400}}>
                        <Stack >
                            <Typography variant="caption" sx={{ mb: 0.6 }}> آدرس </Typography>
                            <FilledInput
                                color="success"
                                value={adress}
                                onChange={(e) => setAdress(e.target.value)}
                            />
                            <Divider transparent sx={{ my: 1.5 }} />
                            <Typography variant="caption" sx={{ mb: 0.6 }}> کد پستی </Typography>
                            <FilledInput
                                color="success"
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                            />

                            <Divider transparent sx={{ my: 1.5 }} />
                            <Typography variant="caption" sx={{ mb: 0.6 }}> شماره ثابت </Typography>
                            <FilledInput
                                color="success"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Stack>



                        <LoadingButton 
                            sx={{ mt: 4 }} 
                            onClick={editHandler} 
                            fullWidth 
                            color='info'
                            variant="contained">
                                تایید و ادامه
                        </LoadingButton>
                    </Card>
                </Stack>
            </Box>
        </Box>
    );
}
