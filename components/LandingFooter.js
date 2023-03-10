import React from "react";
import styled from "styled-components";
import Router from "next/router";
const Footer = styled.footer`
    display: flex;
    justify-content: space-around;
    padding: 40px;
    background: #0c0c0c;
    margin-top: 50px;
    .d-ltr {
        direction: ltr !important;
    }
    h6 {
        color: #fd961a;
        font-size: 16px;
        margin-bottom: 15px;
        line-height: 28px;
        font-weight: 600;
    }
    ul {
        list-style: none;
        .title {
            margin-bottom: 5px;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            line-height: 28px;
        }
        li {
            cursor: pointer;
            color: #999;
            line-height: 28px;
            margin-bottom: 5px;
            color: #999;
            font-size: 13px;
            font-weight: 600;
        }
    }
    @media (max-width: 1100px) {
        flex-wrap: wrap;
        div {
            margin: 20px;
        }
    }
`;
const LandingFooter = () => {
    return (
        <Footer>
            <div>
                <img src="/images/logo.png" width={130} alt="" />
                <ul>
                    <li className="d-ltr">(98)9104444028</li>
                    <li>info@metavers-ex.com</li>
                    <li>
                        <div className="d-flex align-items-center">
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
                                    className="fill-fff telegram"
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
                    </li>
                    <li>
                        آدرس : <br />
              شیراز ، خیابان عفیف آباد ، مجتمع تجاری حافظ ، طبقه ۳ ، اداری ۷
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <div className="title">درباره متاورس</div>
                    <li onClick={() => Router.push("/about_us")}>درباره ما</li>
                    <li onClick={() => Router.push("/contact_us")}>
                        تماس با ما
                    </li>
                    <li onClick={() => Router.push("/our_rules")}>
                        قوانین و مقررات
                    </li>
                    
                    <li onClick={() => Router.push("/reffer_friend")}>معرفی به دوستان</li>
                    <li onClick={() => Router.push("/security_metavers")}>امنیت متاورس</li>
                
                    <li onClick={() => Router.push("/fee")}>کارمزدهای متاورس</li>
                </ul>
            </div>
            <div>
                <ul>
                    <div className="title">سایت های مهم</div>
                    <li>
                        <a href="https://blog.metavers-ex.com">blog.metavers-ex</a>
                    </li>
                    <li>
                        <a href="https://coinmarketcap.com">coinmarketcap</a>
                    </li>
                    <li>
                        <a href="https://coinmarketcap.com">coinmarketcap</a>
                    </li>
                    <li>
                        <a href="https://tradingview.com">tradingview</a>
                    </li>
                    <li>
                        <a href="https://lunarcrush.com">lunarcrush</a>
                    </li>
                    <li>
                        <a href="https://cryptoslate.com">cryptoslate</a>
                    </li>
                    <li>
                        <a href="https://cryptometer.io">cryptometer</a>
                    </li>
                    <li>
                        <a href="https://cointelegraph.com">cointelegraph</a>
                    </li>
                    <li>
                        <a href="https://coin360.com">coin360</a>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <div className="title">راهنمایی و پشتیبانی</div>
                    <li>
                        <a
                            className="no-under"
                            target="blank"
                            href="https://blog.metavers-ex.com"
                        >
                            آکادمی متاورس{" "}
                        </a>
                    </li>{" "}
                    <li
                        onClick={() => {
                            Router.push("/faq");
                        }}
                    >
                        سوالات متداول{" "}
                    </li>{" "}
                    <li onClick={() => {
                            Router.push("/help_buy_sell");
                        }}>آموزش خرید و فروش ارز دیجیتال </li>
                    <li onClick={() => {
                            Router.push("/help_buy_usdt");
                        }}>آموزش خرید و فروش تتر </li>
                    <li onClick={() => {
                            Router.push("/help_register");
                        }}>راهنمای ثبت نام </li>
                </ul>
            </div>
        </Footer>
    );
};

export default LandingFooter;
