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
    p {
        direction: rtl;
    }
`;

export default function Fee() {
    return (
        <Main>
            <Head>
                <title>صرافی متاورس | دعوت از دوستان</title>
            </Head>
            <LandingHeaders page="help_register" />
            <SMain>
                <SContent>
                <div style={{color: "white"}}>
                    <h2><span>معرفی به دوستان</span></h2>

                    <p><span>چگونه دوستانمان را به متاورس دعوت کنیم؟</span></p>

                    <p><img alt="invitationStep1" height="49" src="images/reffer_step01.png" width="49" /></p>

                    <p><strong><span>مرحله 1</span>&nbsp;<span>دریافت لینک</span></strong></p>

                    <p><span>ثبت نام کنید و لینک دعوت خود را &nbsp;دریافت نمایید</span></p>

                    <p><img alt="invitationStep2" height="49" src="images/reffer_step02.png" width="50" /></p>

                    <p><strong><span>مرحله 2</span>&nbsp;<span>دعوت از دوستان</span></strong></p>

                    <p><span>لینک معرفی به دوستانتان را در وبسایت یا شبکه های اجتماعی به اشتراک بگذارید</span></p>

                    <p><img alt="invitationStep3" height="53" src="images/reffer_step03.png" width="40" /></p>

                    <p><strong><span>مرحله 3</span>&nbsp;<span>دریافت پاداش</span></strong></p>

                    <p><span>برای هر معامله کاربری که دعوت کردید تا </span><span>۳۰٪</span><span> از کارمزدش به شما تعلق می&zwnj;گیرد</span></p>

                    <p>&nbsp;</p>

                    <h3>قوانین دعوت از دوستان</h3>

                    <ul>
                        <li>در حال حاضر ۳۰٪ از کارمزد تمامی معاملات انجام شده توسط کاربر معرفی شده در بازارهای متاورس به فرد ارجاع دهنده تعلق می&zwnj;گیرد</li>
                        <li>برای هر معامله دقیقاً ۳۰٪ ارزش معادل ریالی کارمزد کسر شده از طرف دعوت شده به فرد ارجاع دهنده تعلق می&zwnj;گیرد. مبلغ کارمزد بر اساس درصد کارمزد کاربر دعوت شده و ارزش معادل ریالی کارمزد در لحظه انجام معامله با دقت یک ریال محاسبه می&zwnj;شود. در بازارهای تتر قیمت خرید لحظه&zwnj;ای استاندارد تتر در متاورس برای تعیین ارزش ریالی کارمزد لحاظ می&zwnj;شود<span dir="LTR">.</span></li>
                        <li>هدیه&zwnj;ی ارجاع به صورت تجمیعی پس از رسیدن مجموع مبالغ آن به حد نصاب ده هزار تومان به حساب کیف پول ریال معرف در متاورس &nbsp;واریز می&zwnj;شود. در صورت کمتر بودن مجموع مبالغ از این حد نصاب، مجموع مبالغ پس از گذشت هفت روز به حساب معرف واریز می&zwnj;شود<span dir="LTR">.</span></li>
                        <li>ملاک ثبت رابطه&zwnj;ی دعوت، وجود کد دعوت در فرم ثبت&zwnj;نام یا استفاده از همان پیوند معرف برای ثبت&zwnj;نام است. در صورتی که به هر دلیل ثبت&zwnj;نام بدون کد یا پیوند معرف صورت بگیرد، مبلغی برای معرف در نظر گرفته نمی&zwnj;شود<span dir="LTR">.</span></li>
                        <li>فرد معرفی شده می&zwnj;تواند حداکثر تا ۲۴ ساعت پس از زمان ثبت&zwnj;نام با ورود به سامانه کد معرف خود را ثبت نماید. مسئولیت اطمینان از ثبت معرف برای کاربران دعوت شده صرفاً بر عهده&zwnj;ی معرف بوده و متاورس مسئولیتی در قبال عدم ورود کد معرف توسط فرد معرفی شده ندارد<span dir="LTR">.</span></li>
                        <li>محدودیتی در تعداد دوستان معرفی شده توسط یک معرف وجود ندارد</li>
                        <li>محاسبه&zwnj;ی درصد ارجاع دهنده در لحظه&zwnj;ی انجام هر معامله صورت می&zwnj;گیرد. هر گونه تغییر در درصد تعیین شده برای ارجاع یا ثبت معرف برای کاربران تاثیری در سهم معرف در کارمزد معاملات انجام شده پیش از آن تاریخ نخواهد داشت<span dir="LTR">.</span></li>
                        <li>متاورس این حق را برای خود محفوظ می&zwnj;داند که هر زمان در صورت صلاحدید قوانین طرح معرفی دوستان را تغییر دهد</li>
                    </ul>
                </div>
                <img src="/images/reffer_friend.png"
                     alt="" width="550" height="450" />
                </SContent>
            </SMain>
            <LandingFooter />
        </Main>
    );
}
