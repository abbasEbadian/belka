import Head from "next/head";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import LandingFooter from "../components/LandingFooter";
import LandingHeaders from "../components/LandingHeaders";
import "bootstrap/dist/css/bootstrap.css";

const Main = styled('div')`
    background-color: #111;
    width: 100%;
    min-height: 100vh;
    .dir-ltr {
        direction: ltr;
        text-align: right;
    }
    .fill-fff {
        fill: #bbbbbb;
        margin: 0 5px;
        cursor: pointer;
    }
    .arrows {
        fill: #fff;
        margin-right: 5px;
        cursor: pointer;
    }
    .changes {
        direction: ltr;
        text-align: center;
        width: 60px;
        margin-right: 22px;
        padding: 2px;
        border-radius: 12px;
        color: #fff;
        font-size: 13px;
    }
    .plus {
        background-color: #04c53e;
    }
    .zero {
        background-color: #7ae2fc;
    }
    .nega {
        background-color: #f14640;
    }
`;

const ContactMain = styled('div')`
    width: 100%;
    font-family: IRANSansX, sans-serif;
    p {
        font-family: IRANSansX, sans-serif;
    }
`;
const Content = styled('div')`
    padding-top: 30px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    h4 {
        font-size: 18px;
        color: #fff;
    }
    p {
        font-size: 14px;
        color: #e0e0e0;
    }
    div {
        width: 50%;
        padding-right: 20px;
        max-height: 700px;
        overflow: scroll;
        overflow-x: hidden !important;
    }
    img {
        position: relative;
        right: -40px;
    }
    @media (max-width: 992px) {
        flex-direction: column;
        div {
            width: 100%;
        }
        img {
            width: 280px;
            height: 350px;
            margin-right: auto;
            margin-left: auto;
            position: relative;
            right: -40px;
            margin-bottom: 30px;
        }
    }
    p {
        direction: rtl;
    }
`;

export default function ContactUs() {
    return (
        <Main>
            <Head>
                <title>صرافی متاورس | سوالات متداول</title>
            </Head>
            <LandingHeaders page="contact_us" />
            <ContactMain>
                <Content>

                    <div>
                        <h4>آدرس</h4>
                        <p>
                        شیراز ، خیابان عفیف آباد ، مجتمع تجاری حافظ ، طبقه ۳ ، اداری ۷{" "}
                        </p>
                        <h4>تلفن</h4>
                        <p className="dir-ltr">(98)9104444028</p>
                        <h4 className="mt-5">شبکه های اجتماعی</h4>
                        <div className="d-flex align-items-center pe-0">
                            <a
                                target="blank"
                                href="https://www.instagram.com/metaverse.exchange"
                            >
                                <svg
                                    className="fill-fff"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22.684"
                                    height="22.637"
                                    viewBox="0 0 214.684 214.637"
                                >
                                    <path
                                        id="instagram"
                                        d="M107.291,84.113a55.03,55.03,0,1,0,55.03,55.03A54.943,54.943,0,0,0,107.291,84.113Zm0,90.807a35.777,35.777,0,1,1,35.777-35.777,35.842,35.842,0,0,1-35.777,35.777Zm70.117-93.058a12.836,12.836,0,1,1-12.836-12.836A12.806,12.806,0,0,1,177.408,81.862Zm36.447,13.027c-.814-17.194-4.742-32.424-17.338-44.972-12.548-12.548-27.778-16.476-44.972-17.338-17.721-1.006-70.835-1.006-88.556,0-17.146.814-32.376,4.741-44.972,17.29S1.541,77.647.679,94.841c-1.006,17.721-1.006,70.835,0,88.556.814,17.194,4.741,32.424,17.338,44.972S45.8,244.845,62.989,245.707c17.721,1.006,70.835,1.006,88.556,0,17.194-.814,32.424-4.741,44.972-17.338,12.548-12.548,16.475-27.778,17.338-44.972,1.006-17.721,1.006-70.787,0-88.508ZM190.962,202.411a36.221,36.221,0,0,1-20.4,20.4c-14.129,5.6-47.654,4.31-63.268,4.31s-49.187,1.245-63.268-4.31a36.221,36.221,0,0,1-20.4-20.4c-5.6-14.129-4.31-47.654-4.31-63.268s-1.245-49.187,4.31-63.268a36.221,36.221,0,0,1,20.4-20.4c14.129-5.6,47.654-4.31,63.268-4.31s49.187-1.245,63.268,4.31a36.221,36.221,0,0,1,20.4,20.4c5.6,14.129,4.31,47.654,4.31,63.268S196.565,188.33,190.962,202.411Z"
                                        transform="translate(0.075 -31.825)"
                                    />
                                </svg>
                            </a>
                            <a
                                target="blank"
                                href="https://t.me/SarafiMetavers"
                            >
                                <svg
                                    className="fill-fff mx-3 telegram"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="23.554"
                                    height="23.554"
                                    viewBox="0 0 237.554 237.554"
                                >
                                    <path
                                        id="telegram"
                                        d="M118.777,8A118.777,118.777,0,1,0,237.554,126.777,118.756,118.756,0,0,0,118.777,8Zm58.335,81.372-19.493,91.861c-1.437,6.514-5.316,8.094-10.728,5.029L117.2,164.374l-14.32,13.793c-1.58,1.58-2.922,2.922-5.987,2.922L99,150.868l55.03-49.714c2.395-2.107-.527-3.3-3.688-1.2L82.33,142.773l-29.311-9.148c-6.37-2.012-6.514-6.37,1.341-9.435L168.874,80.032C174.19,78.117,178.836,81.326,177.112,89.372Z"
                                        transform="translate(0 -8)"
                                    />
                                </svg>
                            </a>
                            <svg
                                className="fill-fff"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24.216"
                                height="24.161"
                                viewBox="0 0 224.216 199.161"
                            >
                                <path
                                    id="twitter"
                                    d="M220.01,97.716c.156,2.178.156,4.357.156,6.535,0,66.438-50.568,142.991-142.991,142.991A142.022,142.022,0,0,1,0,224.682a103.967,103.967,0,0,0,12.136.622A100.65,100.65,0,0,0,74.53,203.832a50.346,50.346,0,0,1-46.99-34.853,63.38,63.38,0,0,0,9.492.778,53.153,53.153,0,0,0,13.225-1.711,50.264,50.264,0,0,1-40.3-49.324V118.1a50.614,50.614,0,0,0,22.717,6.379A50.332,50.332,0,0,1,17.115,57.262a142.853,142.853,0,0,0,103.626,52.591A56.734,56.734,0,0,1,119.5,98.339a50.3,50.3,0,0,1,86.977-34.386,98.947,98.947,0,0,0,31.9-12.136,50.121,50.121,0,0,1-22.094,27.7,100.751,100.751,0,0,0,28.94-7.779A108.033,108.033,0,0,1,220.01,97.716Z"
                                    transform="translate(0 -48.082)"
                                />
                            </svg>
                        </div>
                    </div>
                    <img
                        src="/images/rules.png"
                        width={500}
                        height={500}
                        alt=""
                    />
                </Content>
            </ContactMain>
            <LandingFooter />
        </Main>
    );
}
