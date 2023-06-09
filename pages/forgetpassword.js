import Image from "next/image";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import "bootstrap/dist/css/bootstrap.css";
import Router from "next/router";
import axios from "axios";
import { BASEURL, SETTINGS } from "@/c/settings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import ReactCodeInput from "react-code-input";
import { Button, Card, Container, Divider, FilledInput, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";

const FormContainer = styled('form')(({ theme }) => ({
    [`fieldset`]: {
        borderRadius: "4px !important"
    }
}))
const TextFieldStyled = styled(FilledInput)(({ theme }) => ({
    ["&"]: {
        borderRadius: 4
    },
    [`input`]: {
        paddingBlock: 10,
        textAlign: "center"
    },
    ['svg']: {
        fill: theme.palette.text.secondary
    }
}))

ForgetPassword.title = `صرافی ${SETTINGS.WEBSITE_NAME} | بازیابی رمز عبور`
export default function ForgetPassword() {
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");

    const { status, mutate: sendCode } = useMutation((e) => {
        e.stopPropagation()
        e.preventDefault()

        const data = { mobile };
        return axios.post(`${BASEURL}token/password/`, data);
    }, {
        onSuccess: (response) => {
            toast(response.data.message, { type: response.data.error ? 'error' : 'success' })
            Router.push({
                pathname: '/verifycode',
                query: {
                    utm: "forgetpassword",
                    mobile,
                    id: response.data.id
                }
            })
        },
        onError: (error) => {
            toast.error("شماره موبایل یا کلمه عبور اشتباه است");
        }
    })

    const subHandlerTwo = (e) => {
        setLoading(true);
        let data = new FormData();
        data.append("mobile", mobile);
        data.append("code", code);
        let config = {
            method: "POST",
            url: `${BASEURL}token/password/verify/`,
            data: data,
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("mobile", mobile);
                    setActiveTab("2");
                    toast.success("گذر واژه جدید شما برایتان اس ام اس گردید");
                    setTimeout(() => {
                        Router.push("/login");
                    }, 3000);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("خطایی رخ داده است");
            });
    };
    return (
        <Container sx={{ py: 5, minHeight: "100vh" }} maxWidth="sm">
            <FormContainer onSubmit={sendCode} >
                <Card variant="outlined" sx={{ py: 3 }}>
                    <Stack >
                        <Stack direction="row" justifyContent={'space-between'} alignItems='flex-end'>
                            <Typography variant="h6"> بازیابی رمز عبور </Typography>
                            <Link href="/login">
                                <Button color={"success"} sx={{ p: 0 }}>
                                    <Typography variant='subtitle2'> ورود </Typography>
                                </Button>
                            </Link>
                        </Stack>
                        <Divider sx={{ mt: 1, mb: 5 }} />

                        <Typography variant="caption" sx={{ mb: 0.6 }}> شماره تلفن</Typography>
                        <TextFieldStyled
                            color="success"
                            placeholder="09xxxxxxxxx"
                            variant="filled"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />

                        <Divider sx={{ my: 2 }} transparent />


                        <LoadingButton
                            type="submit"
                            color='success'
                            variant="contained"
                            sx={{ mt: 5 }}
                            loading={status === 'loading'}
                            disabled={!mobile}>
                            ادامه
                        </LoadingButton>
                    </Stack>
                </Card>
            </FormContainer>
        </Container>
    );
}
