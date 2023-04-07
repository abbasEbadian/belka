import {  useState } from "react";
import { styled } from '@mui/material/styles';
import Router from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASEURL, SETTINGS } from "../components/settings";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {  IconButton, InputAdornment, Card, Typography,  Stack, Container,  Divider, FilledInput, Button } from "@mui/material";
import Link from "next/link"
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";

const FormContainer = styled('form')(({ theme }) => ({
    [`fieldset`]: {
        borderRadius: "4px !important"
    }
}))
const TextFieldStyled = styled(FilledInput)(({ theme }) => ({
    ["&"]:{
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


Login.title = `صرافی ${SETTINGS.WEBSITE_NAME} | ورود`
export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(s => !s)
    }

    const {status, mutate: doLogin} = useMutation((e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = {
            mobile: mobile,
            password: password,
            remember: "on",
        }

        return  axios.post(`${BASEURL}token/otp/`, data);
    }, {
        onSuccess: (response) => {
            localStorage.setItem('loginPassword', password)
            Router.push({
                pathname: `/verifycode`,
                query: {
                    utm: "login", 
                    id: response.data.id, 
                    mobile
                }})

        }, 
        onError: (error) => {
            if (error.response?.data?.message?.length) {
                toast.error(error.response?.data?.message[0])
            } else {
                toast.error("شماره موبایل یا کلمه عبور اشتباه است");
            }
        }
    })


    return (
        <Container sx={{ py: 5 }} maxWidth="sm">
            <FormContainer onSubmit={doLogin} >
            <Card variant="outlined" sx={{ py: 3}}>
                <Stack >
                    <Stack direction="row" justifyContent={'space-between'} alignItems='flex-end'>
                        <Typography variant="h6"> ورود</Typography>
                        <Link href="/register">
                            <Button color={"success"} sx={{p: 0}}>
                                <Typography  variant='subtitle2'> ثبت نام</Typography>
                            </Button>
                        </Link>
                    </Stack>
                    <Divider sx={{ mt: 1, mb: 5 }} />

                    <Typography variant="caption" sx={{ mb: 0.6 }}> شماره تماس</Typography>
                    <TextFieldStyled
                        color="success"
                        placeholder="شماره تماس"
                        variant="filled"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />

                    <Divider sx={{ my: 2 }} transparent />

                    <Typography variant="caption" sx={{ mb: 0.6 }}> رمز عبور </Typography>
                    <TextFieldStyled
                        color="success"
                        placeholder="رمز عبور"
                        value={password}
                        variant="filled"
                        onChange={(e) => setPassword(e.target.value)}
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
                    <Link href="/forgetpassword">
                        <Typography sx={{ mt: 1 }} color="success.main" variant="subtitle2" role="button">
                            فراموشی رمز عبور
                        </Typography>
                    </Link>
                    
                    <LoadingButton 
                        type="submit"
                        color='success' 
                        variant="contained"  
                        sx={{mt:5}} 
                        loading={status === 'loading'} 
                        disabled={!mobile || !password}>
                        ورود به حساب کاربری
                    </LoadingButton>
                </Stack>
                </Card>
            </FormContainer>
        </Container>
    );
}
