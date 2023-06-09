import Head from "next/head";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import LandingFooter from "@/c/LandingFooter";
import LandingHeaders from "@/c/LandingHeaders";
import "bootstrap/dist/css/bootstrap.css";
import { SETTINGS } from "@/c/settings";

const Main = styled('div')`
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

const SMain = styled('div')`
    width: 100%;
    margin-top: 50px;
    font-family: IRANSansX, sans-serif;
    p {
        font-family: IRANSansX, sans-serif;
    }
`;
const SContent = styled('div')`
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
    
`;

Fee.title = `صرافی ${SETTINGS.WEBSITE_NAME} | راهنمای ثبت نام`
export default function Fee() {
    return (
        <Main>

            <LandingHeaders page="help_register" />
            <SMain>
                <SContent>
                <div style={{color: "white"}}>
                    <h2>آموزش ثبت نام و استفاده از صرافی {SETTINGS.WEBSITE_NAME}</h2>

                    <p>برای ورود به صرافی {SETTINGS.WEBSITE_NAME} و ثبت نام اولیه تنها کافی است که شماره موبایل خود را وارد کرده و با استفاده از کد ارسالی به شماره موبایل واردشده، آن را تأیید نمایید. با گذراندن این مرحله می&zwnj;توانید از گزینه خرید و فروش فوری استفاده کنید<span dir="LTR">.</span>(عکس)</p>

                    <p>همچنین با استفاده از طرح معرفی دوستان در صرافی {SETTINGS.WEBSITE_NAME}، می&zwnj;توانید تا 30 درصد از کارمزد معاملات افراد زیرمجموعه خود را از آن خود کنید<span dir="LTR">.</span></p>

                    <p>این صرافی برای ثبت &zwnj;نام نیازی به ایمیل ندارد اما در صورتی که قصد فعال سازی ورود با کد تایید گوگل را دارید، باید نسبت به ثبت آدرس ایمیل خود اقدام کنید<span dir="LTR">.</span></p>

                    <p>احراز هویت در{SETTINGS.WEBSITE_NAME}</p>

                    <p>احتمالاً یکی از نقاط قوت صرافی {SETTINGS.WEBSITE_NAME} احراز هویت سریع و آسان آن است که طبق دستورالعمل زیر در سه مرحله صورت می&zwnj;گیرد<span dir="LTR">:</span></p>

                    <p><strong>مرحله اول</strong>: وارد کردن نام و نام خانوادگی، کد ملی و بارگذاری عکس کارت ملی</p>

                    <p>(عکس)</p>

                    <p><strong>مرحله دوم</strong>: بارگذاری عکس سلفی همراه با متن دست&zwnj;نوشته</p>

                    <p>(عکس)</p>

                    <p><strong>مرحله سوم</strong>: بارگذاری اطلاعات بانکی</p>

                    <p>(عکس)</p>

                    <p>اگر چه گرفتن تصاویر سلفی در مراحل مختلف ممکن است در ابتدای کار برای کاربران سخت و پیچیده به نظر بیاید و کمی کلافه&zwnj;کننده باشد اما بد نیست بدانید که تمامی این مراحل به منظور حفظ امنیت کاربران و دارایی&zwnj;های آنها و تنها یکبار برای همیشه صورت می&zwnj;گیرد. این مراحل به دستور پلیس فتا به صرافی&zwnj;های ارز دیجیتال ابلاغ شده است<span dir="LTR">.</span></p>
                </div>
                <img src="/images/help_register.png"
                     alt="" width="550" height="450" /> 
                </SContent>
            </SMain>
            <LandingFooter />
        </Main>
    );
}
