import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Router from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { BASEURL, SETTINGS } from "../components/settings";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Box, Typography, inputLabelClasses, formControlClasses } from "@mui/material";
import Link from "next/link";
import wretch from "wretch"

const Main = styled(Box)`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e4e3ef;
    padding: 24px;
`;

const Content = styled('div')`

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
`;

const Box2 = styled('form')`
    display: flex;
    width: 750px;
    z-index: 1;
    background: #ffffff;
    box-shadow: 5px 7px 26px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 26px -5px #9f9fbb;
    border-radius: 16px;
    .left {
        width: 53%;
        padding: 10px 23px;
    }

    .right {
        width: 47%;
        background: linear-gradient(
            135deg,
            rgba(67, 95, 224, 0.9) 0%,
            rgba(128, 57, 202, 0.9) 100%
        );
        border-radius: 0 16px 16px 0;
        padding: 30px;

        h5 {
            margin-bottom: 1.5rem !important;
            color: rgb(255, 255, 255);
            font-size: 17px;
        }
        p {
            font-family: IRANSansX, sans-serif;
            color: rgb(255, 255, 255);
            font-size: 14px;
            margin-top: 46px;
            line-height: 25px;
            font-weight: 400;
        }
    }
    @media (max-width: 992px) {
        .right {
            display: none;
        }
        .left {
            width: 100%;
        }
    }

    h4 {
        margin-right: 20px;
        font-weight: 600;
        font-size: 16px;
        margin-top: 30px;
        line-height: 20px;
        color: #323232;
    }
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
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

    @media (max-width: 992px) {
        width: 343px;
    }
`;

const Submit = styled('button')`
    width: 90%;
    height: 42px;
    margin-left: 14px;
    border-radius: 8px;
    transition: 0.3s all;
    color: #fff;
    background-color: #5965f9;
    border-color: #5965f9;
    margin-top: 40px;
    :hover {
        opacity: 0.83;
    }
`;
const FormControlStyled = styled(FormControl)(({theme}) => ({
    ["input"]: {
        color: theme.palette.grey[100],
        ["&::placeholder"]:{
            fontSize: 12
        }
    },
    [`.${inputLabelClasses.root}`]: {
        fontSize: 13,
        backgroundColor: "white",
        display: 'block',
        [`&.${inputLabelClasses.root}:not(.${inputLabelClasses.focused})`]: {
            transform: 'translate(7px, 12px) scale(1)'
        }
    },
    [`&.${formControlClasses.root}`]: {
        border: "1px solid #ddd"
    },
    ['legend']: {
        display: 'none'
    },
    ['fieldset']: {
        border: 0
    },
    ["svg"]: {
        fill: "#aaa"
    }

}))
export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(s => !s)
    }

    const doLogin =  (e) => {
        e.preventDefault()
        e.stopPropagation()
        setLoading(true);

        
        let data = {
            mobile: mobile,
            password: password,
            remember: "on",
        };
        let config = {
            method: "POST",
            url: `${BASEURL}token/otp/`,
            data: data,
        };

         axios(config)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("id", response.data.id);
                    localStorage.setItem("mobile", mobile);
                    Router.push("/verifycode");
                }
            })
            .catch((error) => {
                if(error.response?.data?.message?.length){
                    toast.error(error.response?.data?.message[0])
                }else{
                    toast.error("شماره موبایل یا کلمه عبور اشتباه است");
                }
            })
            .finally(f => setLoading(false))
    };

    return (
        <Main>
            <Head>
                {" "}
                
                <title>صرافی {SETTINGS.WEBSITE_NAME} | ورود</title>
            </Head>
            <Content>
                <LeftContent>
                    <Box2 onSubmit={doLogin}>
                        <div className="right">
                            <div className="loggo"></div>
                            <h5>برای شروع یک سرمایه گذاری موفق... </h5>
                            <p>
                                در دنیای {SETTINGS.WEBSITE_NAME} زندگی کنید و با لذت خرید و فروش
                                به آن عشق بورزید ، داشتن سال ها تجربه و تیمی
                                متخصص افتخار ماست ، سعی کرده ایم برای پاسخ دهی
                                به اعتماد و اطمینان مشتریان خود با خدمات کار آمد
                                و امن همیشه در کنار مشتریان بمانیم و برای جذب
                                اعتماد بیشتر، تلاش و خدمات خود را مطابق با
                                استانداردهای بین المللی به روز خواهیم کرد .
                            </p>
                        </div>{" "}
                        <div className="left">
                            <h4>ورود به حساب کاربری</h4>
                            <br />
                            <FormControlStyled sx={{ my: 1, }} variant="outlined" fullWidth>
                                <OutlinedInput
                                    fullWidth
                                    size="small"
                                    type="text"
                                    value={mobile}
                                    onChange={(e) => {
                                        setMobile(e.target.value);
                                    }}
                                    name="phone"
                                    placeholder='شماره موبایل'
                                />
                            </FormControlStyled>
                            <FormControlStyled sx={{ mt: 2, }} variant="outlined" fullWidth>
                                <OutlinedInput
                                    fullWidth
                                    size="small"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder='رمز عبور'
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControlStyled>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                                <Submit type="submit">
                                    {loading ? (
                                        <div className="lds-ring">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    ) : (
                                        "ورود"
                                    )}
                                </Submit>
                                <Link href="/forgetpassword">
                                    <Typography variant="caption" my={1} role='button' color={"grey"}>
                                        رمز عبور خود را فراموش کردم (بازیابی
                                        گذرواژه)
                                    </Typography>
                                </Link>
                                <Link href="/register">
                                    <Typography variant="caption" role='button' color={"grey"}>
                                        هنوز حساب کاربری ندارید ؟ (ثبت نام رایگان)
                                    </Typography>
                                </Link>


                            </div>
                        </div>
                    </Box2>
                </LeftContent>
            </Content>
        </Main>
    );
}
