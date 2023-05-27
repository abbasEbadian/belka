import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Router from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL, SETTINGS } from "../components/settings";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Box, Typography, gridClasses, Stack, Container, TextField, Divider, FilledInput, Button, Card, Grid } from "@mui/material";
import Link from "next/link"
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";

const inputProps = {
    autoComplete: "new-password",
    autocomplete: 'new-password',
    variant: "filled",
    form: {
        autocomplete: 'off',
    },
}
export const Asterick = styled('span')`
    color: red;
    content: "*";
`
const FormContainer = styled('form')(({ theme }) => ({
    [`.${gridClasses.item}`]: {
        display: 'flex',
        flexDirection: "column"
    }
}))
const TextFieldStyled = styled(FilledInput)(({ theme, direction }) => ({
    ["&"]: {
        borderRadius: 4
    },
    [`input`]: {
        paddingBlock: 10,
        textAlign: direction ?? "center"
    },
    ['svg']: {
        fill: theme.palette.text.secondary
    }
}))

Register.title = `صرافی ${SETTINGS.WEBSITE_NAME} | ثبت نام  `
export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState();

    useEffect(() => {
        setCode(
            window.location.href.substring(
                window.location.href.indexOf("=") + 1
            )
        );
    }, []);

    const { status, mutate: register } = useMutation((e) => {
        e.stopPropagation()
        e.preventDefault()

        const data = {
            first_name: firstName,
            last_name: lastName,
            mobile: mobile,
            password: password,
            ref_code: code
        };
        return axios.post(`${BASEURL}token/register/`, data)
    }, {
        onSuccess: (response) => {
            toast(response.data.message, { type: response.data.error ? 'error' : 'success' })
            if (response.data.error === 1) return;
            toast.success('حساب شما با موفقیت ایجاد شد.')
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            Router.push({ pathname: '/dashboard' })
        },
        onError: (error) => {
            toast.error(error);
        }
    })
    const handleClickShowPassword = () => {
        setShowPassword(s => !s)
    }
    return (
        <Container sx={{ py: 5, minHeight: "100vh" }} maxWidth="sm">
            <FormContainer onSubmit={register} noValidate>
                <Card variant="outlined" sx={{ py: 3 }}>
                    <Stack >
                        <Stack direction="row" justifyContent={'space-between'} alignItems='flex-end'>
                            <Typography variant="h6"> ثبت نام </Typography>
                            <Link href="/login">
                                <Button color={"success"} sx={{ p: 0 }}>
                                    <Typography variant='subtitle2'> ورود </Typography>
                                </Button>
                            </Link>
                        </Stack>
                        <Divider sx={{ mt: 1, mb: 5 }} />
                        <Grid container rowSpacing={3} columnSpacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="caption" sx={{ mb: 0.6 }}> نام <Asterick>*</Asterick></Typography>
                                <TextFieldStyled
                                    color="success"
                                    inputProps={inputProps}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    direction="left"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="caption" sx={{ mb: 0.6 }}> نام خانوادگی <Asterick>*</Asterick></Typography>
                                <TextFieldStyled
                                    color="success"
                                    inputProps={inputProps}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    direction="left"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="caption" sx={{ mb: 0.6 }}> شماره تلفن <Asterick>*</Asterick></Typography>
                                <TextFieldStyled
                                    color="success"
                                    inputProps={inputProps}
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="caption" sx={{ mb: 0.6 }}> کد دعوت (اختیاری)</Typography>
                                <TextFieldStyled
                                    color="success"
                                    inputProps={inputProps}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    direction="right"
                                    name="referral"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="caption" sx={{ mb: 0.6 }}> رمز عبور <Asterick>*</Asterick></Typography>
                                <TextFieldStyled
                                    color="success"
                                    inputProps={inputProps}
                                    placeholder="رمز عبور"
                                    value={password}
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
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} transparent />


                        <LoadingButton
                            type="submit"
                            color='success'
                            variant="contained"
                            sx={{ mt: 5 }}
                            loading={status === 'loading'}
                            disabled={!mobile}>
                            ثبت نام
                        </LoadingButton>
                    </Stack>
                </Card>
            </FormContainer>
        </Container>
    );
}
