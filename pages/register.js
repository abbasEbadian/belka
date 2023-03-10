import Image from "next/image";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import "bootstrap/dist/css/bootstrap.css";
import Router from "next/router";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Main = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e4e3ef;
    padding: 24px;
    .mt-100 {
        margin-top: 50px;
    }
    @media (max-width: 992px) {
        .mt-100 {
            margin-top: 0px !important;
        }
    }
    .mt-45 {
        margin-top: 40px;
    }
`;

const Content = styled.div`
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

const LeftContent = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    width: 750px;
    height: 452px;
    background: #ffffff;
    box-shadow: 5px 7px 26px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 26px -5px #9f9fbb;
    border-radius: 16px;
    margin-top: 32px;
    z-index: 1;
    display: flex;

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
        font-weight: 600;
        font-size: 18px;
        margin-top: 20px;
        line-height: 20px;
        color: #323232;
    }
    @media (max-width: 992px) {
        h4 {
            font-size: 13px;
            margin-top: 20px;
            line-height: 0px;
        }
        input {
            margin-top: 3px !important;
            height: 36px !important;
        }
        .mt-992-20 {
            margin-top: 30px !important;
        }
    }
    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 18px;
        color: #000000;
        @media (max-width: 992px) {
            margin-top: 5px;
            margin-bottom: 0px;
            .show-pass {
                position: absolute;
                right: 14px;
                opacity: 0.4;
                top: 37px !important;
                cursor: pointer;
                z-index: 1;
            }
        }
        font-size: 15px;
        position: relative;
        line-height: 20px;
        .show-pass {
            position: absolute;
            right: 14px;
            opacity: 0.4;
            top: 45px;
            cursor: pointer;
            z-index: 1;
        }
        .ltr {
            direction: ltr;
        }
    }
    input {
        margin-top: 8px;
        background-color: transparent;
        width: 170px;
        height: 44px;
        border: 1.5px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 10px;
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
        height: 100% !important;
        .to-col {
            .me-3 {
                margin-right: 0 !important;
            }
            flex-direction: column;
            input {
                width: 100% !important;
            }
        }
    }
    .to-login {
        font-size: 13px;
        margin-top: 8px;
        margin-right: 20px;
        span {
            cursor: pointer;
            font-weight: 600;
            margin-right: 4px;
            :hover {
                color: #003cff;
            }
        }
    }
`;

const Submit = styled.button`
    width: 90%;
    height: 42px;
    border-radius: 8px;
    transition: 0.3s all;
    color: #fff;
    background-color: #5965f9;
    border-color: #5965f9;
    :hover {
        opacity: 0.83;
    }
`;

export default function Register() {
    const [activeTab, setActiveTab] = useState("reg");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState();
    useEffect(() => {
        setCode(
            window.location.href.substring(
                window.location.href.indexOf("=") + 1
            )
        );
    }, []);
  
    const subHandler = async (e) => {
        setLoading(true);
        let data = {
            first_name: firstName,
            last_name: lastName,
            mobile: mobile,
            password: password,
        };
        let config = {
            method: "POST",
            url: `${baseUrl}token/register/`,
            data: data,
        };

        await axios(config)
            .then((response) => {
              setLoading(false);
		     if(response.data.error === 1) {
				 toast.error(response.data.message, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
	                     

                          })
			 }
		    
			
			    if(response.data.error === 0) {

                    localStorage.setItem("token", response.data.access);
                    localStorage.setItem(
                        "refresh_token",
                        response.data.refresh
                    );
                    
				 toast.success("ثبت نام با موفقیت انجام شد", {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
							       onClose: () => {
                                    Router.push("/dashboard");
	

							  }
							  
                          })
			 }
			
		  
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error, {
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
                <title>صرافی متاورس | ثبت نام</title>
            </Head>
            {/* Same as */}
            <ToastContainer />
            <Content>
                <LeftContent>
                    <Box>
                        <div className="right">
                            <div className="loggo"></div>
                            <h5>برای شروع یک سرمایه گذاری موفق...</h5>
                            <p>
                                در دنیای متاورس زندگی کنید و با لذت خرید و فروش
                                به آن عشق بورزید ، داشتن سال ها تجربه و تیمی
                                متخصص افتخار ماست ، سعی کرده ایم برای پاسخ دهی
                                به اعتماد و اطمینان مشتریان خود با خدمات کار آمد
                                و امن همیشه در کنار مشتریان بمانیم و برای جذب
                                اعتماد بیشتر، تلاش و خدمات خود را مطابق با
                                استانداردهای بین المللی به روز خواهیم کرد .
                            </p>
                        </div>
                        <div className="left">
                            <h4>ثبت نام کاربر</h4>
                            <div className="d-flex mt-3 to-col">
                                <label htmlFor="name">
                                    نام
                                    <input
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                        type="text"
                                        name="name"
                                        id="name"
                                        onKeyDown={(e) => {
                                            e.key === "Enter"
                                                ? subHandler()
                                                : "";
                                        }}
                                    />
                                </label>
                                <label className="me-3" htmlFor="family">
                                    نام خانوادگی
                                    <input
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                        type="text"
                                        name="family"
                                        id="family"
                                        onKeyDown={(e) => {
                                            e.key === "Enter"
                                                ? subHandler()
                                                : "";
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="d-flex to-col">
                                <label htmlFor="name">
                                    شماره موبایل
                                    <input
                                        className="ltr"
                                        onChange={(e) => {
                                            setMobile(e.target.value);
                                        }}
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        onKeyDown={(e) => {
                                            e.key === "Enter"
                                                ? subHandler()
                                                : "";
                                        }}
                                    />
                                </label>
                                <label className="me-3" htmlFor="password">
                                    رمز عبور
                                    <input
                                        className="ltr"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        type={
                                            !showPassword ? "password" : "text"
                                        }
                                        name="password"
                                        id="password"
                                        onKeyDown={(e) => {
                                            e.key === "Enter"
                                                ? subHandler()
                                                : "";
                                        }}
                                    />
                                    {!showPassword ? (
                                        <svg
                                            className="show-pass"
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                            width="22"
                                            height="15"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 346.184 221.173"
                                        >
                                            <path
                                                id="eye"
                                                d="M342.189,167.94a196.99,196.99,0,0,0-338.2,0,28.848,28.848,0,0,0,0,29.293,196.99,196.99,0,0,0,338.2,0A28.847,28.847,0,0,0,342.189,167.94Zm-169.1,96.384a81.738,81.738,0,1,1,81.738-81.738A81.694,81.694,0,0,1,173.092,264.324ZM235.6,182.586A62.505,62.505,0,1,1,117.94,153.153v.019a25.738,25.738,0,1,0,25.738-25.738h-.019A62.52,62.52,0,0,1,235.6,182.586Z"
                                                transform="translate(0 -72)"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="show-pass"
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                            width="22"
                                            height="15"
                                            viewBox="0 0 346.184 307.718"
                                        >
                                            <path
                                                id="eye-slash"
                                                d="M172.306,235.588l19.58,27.972q-9.371.883-18.795.886a195.91,195.91,0,0,1-169.1-95.94,28.848,28.848,0,0,1,0-29.293A194.378,194.378,0,0,1,61.706,77.587l34.3,49.006a81.8,81.8,0,0,0,76.3,109Zm169.883-67.082a194.924,194.924,0,0,1-81.242,75.412l.007.009,24.924,35.58a14.421,14.421,0,0,1-3.546,20.086l-7.879,5.517a14.421,14.421,0,0,1-20.086-3.546L60.305,28.212A14.421,14.421,0,0,1,63.851,8.126l7.879-5.517A14.421,14.421,0,0,1,91.817,6.154L122.491,49.8a198.367,198.367,0,0,1,50.6-6.525,195.911,195.911,0,0,1,169.1,95.94,28.85,28.85,0,0,1,0,29.292Zm-87.36-14.646A81.792,81.792,0,0,0,142.6,77.995l11.6,16.262a62.622,62.622,0,0,1,48.321,4.454h-.018a25.735,25.735,0,1,0,25.735,25.735v-.018a62.492,62.492,0,0,1-4.958,66.682v.006L234.89,207.38A81.425,81.425,0,0,0,254.829,153.859ZM157.474,214.4l-46.6-66.566A62.525,62.525,0,0,0,157.474,214.4Z"
                                                transform="translate(0 0)"
                                            />
                                        </svg>
                                    )}
                                </label>
                            </div>
                            <label htmlFor="name">
                                <span>
                                    کد دعوت{" "}
                                    <small className="me-0">(اختیاری)</small>
                                </span>
                                <input
                                    className="ltr"
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                    }}
                                    value={code}
                                    type="number"
                                    name="code"
                                    onKeyDown={(e) => {
                                        e.key === "Enter" ? subHandler() : "";
                                    }}
                                />
                            </label>
                            <div className="d-flex justify-content-center mt-45 mt-992-20">
                                <Submit onClick={subHandler}>
                                    {loading ? (
                                        <div className="lds-ring">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    ) : (
                                        "ثبت نام"
                                    )}
                                </Submit>
                            </div>
                            <div className="to-login">
                                قبلا ثبت نام کرده اید ؟
                                <span
                                    onClick={() => {
                                        Router.push("/login");
                                    }}
                                >
                                    ورود
                                </span>
                            </div>
                        </div>
                    </Box>
                </LeftContent>
            </Content>
        </Main>
    );
}
