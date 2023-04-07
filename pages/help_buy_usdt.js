import Head from "next/head";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import LandingFooter from "../components/LandingFooter";
import LandingHeaders from "../components/LandingHeaders";
import "bootstrap/dist/css/bootstrap.css";
import { SETTINGS } from "../components/settings";

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

Fee.title = `صرافی ${SETTINGS.WEBSITE_NAME} | راهنمای خرید تتر`
export default function Fee() {
    return (
        <Main>
            <LandingHeaders page="help_buy_usdt" />
            <SMain>
                <SContent>
                <div style={{color: "white"}}>
                    <h2>آموزش خرید و فروش ارز دیجیتال در صرافی {SETTINGS.WEBSITE_NAME}</h2>

                    <p>در ادامه مراحل لازم برای خرید یا فروش رمزارز در صرافی {SETTINGS.WEBSITE_NAME} می&zwnj;پردازیم. فرض کنید که قصد داریم از این صرافی مقداری   تتر خریداری کنیم. در صفحه اصلی گزینه (خرید و فروش) را انتخاب کنید. از میان لیست ارزها بعنوان مثال   تتر را انتخاب کنید.</p>

                    <p>&nbsp;در این مرحله دو امکان در اختیارتان قرار دارد: خرید با ریال و خرید با تترتوجه داشته باشید که هنگام خرید رمزارز به درگاه پرداخت متصل نمی&zwnj;شوید. بنابراین اگر موجودی شما کافی نیست ابتدا باید نسبت به شارژ موجودی کیف پول ریالی خود اقدام کنید.(عکس)</p>

                    <p>بعد از انتخاب روش پرداخت، دو نوع روش سفارش&zwnj;گذاری با قیمت بازار و قیمت خاص وجود دارد. در روش خرید با قیمت بازار، رمزارز انتخابی شما با قیمت لحظه&zwnj;ای بازار خریداری می&zwnj;شود و شما امکان تعیین قیمت ندارید، اما در روش خرید با قیمت خاص، می&zwnj;توانید برای سفارش خرید رمزارز خود قیمت مشخصی را تعیین کنید. در این موارد سفارش شما زمانی انجام می&zwnj;شود که قیمت بازار به قیمت مورد نظر شما رسیده باشد.(عکس)</p>

                    <p>پروسه فروش فوری نیز مراحل مشابهی دارد و تنها تفاوت آن در انتخاب گزینه فروش است.</p>

                    <p>برای واریز و برداشت رمزارز به این صرافی نیز می&zwnj;توانید در صفحه اصلی از گزینه&zwnj;های واریز و برداشت موجود در کنار نام هر رمزارز استفاده کنید(عکس)</p>

                    <h2>مزایای صرافی {SETTINGS.WEBSITE_NAME}</h2>

                    <p>از مزایای صرافی {SETTINGS.WEBSITE_NAME} می&zwnj;توان به پشتیبانی از تعداد ارز زیاد، انجام فوری سفارشات، امکان تنظیم حد ضرر، بهره&zwnj;مندی از کیف پول رمزارزی و &hellip; اشاره کرد</p>
                </div>
                <img src="/images/help_buy_sell.png"
                     alt="" width="550" height="450" />
                </SContent>
            </SMain>
            <LandingFooter />
        </Main>
    );
}
