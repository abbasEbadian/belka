import Head from "next/head";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import LandingFooter from "../components/LandingFooter";
import LandingHeaders from "../components/LandingHeaders";
import "bootstrap/dist/css/bootstrap.css";

const Main = styled.div`
    background-color: #111;
    width: 100%;
    min-height: 100vh;
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

const FaqMain = styled.div`
    width: 100%;
    margin-top: 50px;
    font-family: IRANSansX, sans-serif;
    p {
        font-family: IRANSansX, sans-serif;
    }
`;
const FaqContent = styled.div`
    padding-top: 30px;
    padding-left: 20px;
    justify-content: center;
    display: flex;
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

export default function Faq() {
    return (
        <Main>
            <Head>
                <title>صرافی متاورس | سوالات متداول</title>
                <link rel="shortcut icon" href="/images/favicon.ico" />
            </Head>
            <LandingHeaders page="faq" />
            <FaqMain>
                <FaqContent>
                <div style={{color: "white"}}>
                    <h2><strong>سوالات متداول</strong></h2>

                    <p>از کجا شروع کنم؟</p>

                    <p>برای شروع به کار با متاورس، پیش از هر چیز باید مراحل زیر را تکمیل کنید<span dir="LTR">:</span></p>

                    <ol>
                        <li><strong>ایجاد حساب کاربری در متاورس با ایمیل معتبر&nbsp;&nbsp; فیلم آموزشی</strong></li>
                        <li><strong>انجام فرآیند احراز هویت</strong> <strong>فیلم آموزشی</strong></li>
                        <li><strong>واریز ریال یا رمزارز</strong></li>
                        <li><strong>انجام معامله در بازار متاورس</strong></li>
                    </ol>

                    <p><strong>مدارک مورد نیاز برای احراز هویت چیست؟</strong></p>

                    <p><strong>چرا عکس احراز هویت رد می شود ؟</strong></p>

                    <p><strong>در صورت نداشتن تلفن ثابت چه باید کرد ؟</strong></p>

                    <p><strong>سقف برداشت ریالی در روز چقدر هست؟</strong></p>

                    <p><strong>واریز به کیف پول ریالی یا برداشت از آن چه هزینه&zwnj;هایی دارد؟</strong></p>

                    <p><strong>آیا می&zwnj;توان تراکنش&zwnj; برداشت ریال را لغو کرد؟</strong></p>

                    <p><strong>چرا واریز ریال به حساب کاربری موفقیت آمیز نبوده است؟</strong></p>

                    <p><strong>چرا با وجود کسر مبلغ از حساب بانکی، حساب متاورس شارژ نشده است؟</strong></p>

                    <p><strong>خطای &ldquo;کارت شما مجاز به پرداخت در این سامانه نمی&zwnj;باشد&rdquo; در هنگام واریز به چه معناست؟</strong></p>

                    <p><strong>سقف برداشت ریالی در روز چقدر است؟</strong></p>

                    <p><strong>چرا برداشت ریالی هنوز به حساب بانکی واریز نشده است؟</strong></p>

                    <p><strong>خطای </strong><strong>۹۹</strong><strong> در درگاه بانکی به چه معنی است؟</strong></p>

                    <p><strong>کارمزد برداشت ریال چقدر است؟</strong></p>
                </div>
                    <img
                        src="/images/faq.png"
                        width={500}
                        height={500}
                        alt=""
                    />
                </FaqContent>
            </FaqMain>
            <LandingFooter />
        </Main>
    );
}
