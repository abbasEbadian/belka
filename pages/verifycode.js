import { useEffect, useMemo, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import Router from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASEURL, SETTINGS } from "../components/settings";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Card, Typography, Stack, Container, Divider, FilledInput, Button } from "@mui/material";
import Link from "next/link"
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import ReactCodeInput from "react-code-input";
import { URLS, api } from "./api/api";

const FormContainer = styled('form')(({ theme }) => ({
    [`.react-code-input`]: {
        direction: "rtl",
        display: 'flex !important',
        ["input"]: {
            background: "#2c313c !important",
            border: 0,
            borderRadius: "4px 4px 0 0 !important",
            flex: "1 0 auto !important",
            height: "54px !important",
            textAlign: 'center',
            color: "white !important",
            transition: "0.2s",
            ["&:focus"]: {
                borderBottom: "1px solid green !important"
            }
        }
    }
}))


const VERIFY_URLS = {
    login: URLS.LoginVerify,
    forgetpassword: URLS.ForgetPasswordVerify,
}
const RESEND_URLS = {
    login: URLS.Login,
    forgetpassword:URLS.ForgetPassword,
}

Login.title = `صرافی ${SETTINGS.WEBSITE_NAME} | تایید کد`
export default function Login() {
    const [time, setTime] = useState(1)
    const [code, setCode] = useState("")
    const query = Router.query

    const [utm, id, mobile, loginPassword] = useMemo(() => {
        const _utm = query.utm
        const _id = query.id
        const _mobile = query.mobile
        const pass = localStorage.getItem('loginPassword')
        if (!_mobile || !_utm || !_id) Router.push("/login")

        return [_utm, _id, _mobile, pass]
    }, [query])



    const timer = useRef()
    useEffect(() => {
        if(timer.current) return
        timer.current = setInterval(() => {
            setTime(t => t-1)
            if(time === 0)
            clearInterval(timer.current)
        }, 1000)
    }, [])



    const { status, mutate: verify } = useMutation((e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = new FormData()
        data.set("mobile", mobile)
        data.set("code", code)
        const loginData = {
            id,
            otp:  code
        }
        let d = loginData
        if (utm === "forgetpassword") {
            api.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
            d = data
        }
        const url = VERIFY_URLS[utm]
        return api.post(url, d);
    }, {
        onSuccess: (response) => {
            toast(response.data.message, { type: response.data.error ? 'error' : 'success' })
            if (response.data.error === 1) return
            if(utm === 'login') {
                localStorage.setItem('token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
            }
            Router.push({
                pathname: utm === 'login'? '/dashboard':`/login`
            })
        },
        onError: (error) => {
            toast.error("خطا در برقراری ارتباط")
        }
    })

    const { status: resendingOTP, mutate: resendOTP } = useMutation(() => {
        const data = { mobile }
        const url = RESEND_URLS[utm]
        if (utm === 'login') {
            data["password"] = loginPassword
        }
        return api.post(url, data)
    }, {
        onSuccess: (response) => {
            toast(response.data.message, { type: response.data.error ? 'error' : 'success' })
            setTime(60)
            if (utm === 'login') {
                localStorage.setItem('loginPassword', loginPassword)
                Router.push({
                    pathname: `/verifycode`,
                    query: {
                        utm: "login",
                        id: response.data.id,
                        mobile
                    }
                })
            } else if (utm === 'forgetpassword') {
                Router.push({
                    pathname: '/verifycode',
                    query: {
                        utm: "forgetpassword",
                        mobile,
                        id: response.data.id
                    }
                })
            } 
        },
        onError: (error) => {
            console.log(error);
            toast.error('خطا در ارسال');
        }
    })

    return (
        <Container sx={{ py: 5, minHeight: "100vh" }} maxWidth="sm">
            <FormContainer onSubmit={verify} >
                <Card variant="outlined" sx={{ py: 3 }}>
                    <Stack >
                        <Stack direction="row" justifyContent={'space-between'} alignItems='flex-end'>
                            <Typography variant="h6"> کد فعالسازی </Typography>
                            <Link href="/register">
                                <Button color={"success"} sx={{ p: 0 }}>
                                    <Typography variant='subtitle2'> ثبت نام</Typography>
                                </Button>
                            </Link>
                        </Stack>
                        <Divider sx={{ mt: 1, mb: 5 }} />
                        <Typography variant='subtitle2' color="info.main" sx={{ mb: 3 }}>
                            {`لطفا کد ارسال شده به شماره `}
                            <Typography component={"u"}>
                                {mobile}
                            </Typography>
                            {` را وارد نمایید.`}

                        </Typography>
                        <ReactCodeInput
                            value={code}
                            onChange={e => setCode(e)}
                            type="number"
                            fields={6}
                            autoFocus
                        />
                        <Divider sx={{ my: 2 }} transparent />

                        <LoadingButton
                            onClick={resendOTP}
                            loading={resendingOTP === 'loading'}
                            color="info"
                            disabled={ time > 0 }
                        >
                            {
                                time > 0? 
                                <Typography>
                                    ارسال مجدد بعد از {" "} { time } { " ثانیه " }
                                </Typography>:
                                <Typography>
                                    ارسال مجدد کد
                                </Typography>
                            }
                        </LoadingButton>



                        <LoadingButton
                            type="submit"
                            color='success'
                            variant="contained"
                            sx={{ mt: 5 }}
                            loading={status === 'loading'}
                            disabled={code.length !== 6}>
                            بررسی
                        </LoadingButton>
                    </Stack>
                </Card>
            </FormContainer>
        </Container>
    );
}
