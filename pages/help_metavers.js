import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
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

const SMain = styled.div`
    width: 100%;
    margin-top: 50px;
    font-family: IRANSansX, sans-serif;
    p {
        font-family: IRANSansX, sans-serif;
    }
`;
const SContent = styled.div`
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
                <title>صرافی متاورس | راهنمای متاورس</title>
                <link rel="shortcut icon" href="/images/favicon.ico" />
            </Head>
            <LandingHeaders page="help_buy_usdt" />
            <SMain>
                <SContent>
                <div style={{color: "white"}}>
                    <h2>راهنمای متاورس</h2>

                    <h3>شروع کار با متاورس</h3>

                    <p>&nbsp;</p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-to-trade-in-nobitex/">چه روش&zwnj;هایی برای معامله در متاورس وجود دارد؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/where-to-begin/">از کجا شروع کنم؟</a></p>

                    <p>راهنمای ویدیویی جامع کار با متاورس</p>

                    <p><a href="https://bitex-help.nobitex.ir/type/video/">ویدئو</a></p>

                    <p>مدارک مورد نیاز برای ثبت نام</p>

                    <p>&nbsp;<a href="https://bitex-help.nobitex.ir/knowledgebase/how-to-deposit/">چگونه می&zwnj;توان حساب کاربری خود را شارژ کرد؟</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-do-i-trust-nobitex/">چرا می&zwnj;توان به متاورس اعتماد کرد؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/available-crypto-assets/">چه ارزهایی را می&zwnj;توان در متاورس معامله کرد؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-nobitex-will-help-you/">متاورس چیست و چه خدماتی ارائه می&zwnj;دهد؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/type/video/">ویدئو</a></p>

                    <p>راه&zwnj;های ارتباط با متاورس</p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/why-should-i-send-my-documents/">چرا برای کار با متاورس ، ارائه اطلاعات شخصی الزامی است؟</a></p>

                    <p>ثبت&zwnj;نام و احراز هویت</p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-to-kyc-in-nobitex/">چطور در متاورس احراز هویت کنیم؟</a></p>

                    <p>ویدئ</p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/kyc-selfie-guide/">راهنمای ارسال عکس احراز هویت</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/type/video/">ویدئو</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/kyc-and-complete-user-information/">راهنمای تصویری احراز هویت و تکمیل اطلاعات کاربری</a></p>

                    <p>&nbsp;</p>

                    <h3>واریز و برداشت ارز دیجیتال</h3>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/transaction-recovery/">در صورت واریز در شبکه&zwnj;ای که متاورس از آن پشتیبانی نمی&zwnj;کند؛ چه کنیم؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/what_is_supporting_networks/">شبکه ی انتقال ارز دیجیتال چیست و چرا باید به آن توجه کنیم؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-to-find-supporting-network/">چگونه شبکه انتقال ارز خود را پیدا کنیم؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/nobitex-supporting-networks/">متاورس برای واریز و برداشت رمزارز از چه شبکه&zwnj;هایی پشتیبانی می&zwnj;کند؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/crypto-withdraw-limits/">حداقل میزان برداشت هر رمزارز چقدر است؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/what-is-tag-or-memo-for-depositing/">برچسب تگ یا ممو چیست؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/crypto-withdraw-errors/">دریافت خطا در هنگام برداشت رمزارز چه دلایلی دارد؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/tracking-crypyocurrency-withdrawals/">چگونه می&zwnj;توان وضعیت درخواست برداشت رمزارز را پیگیری کرد؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/cancel-withdrawal/">لغو برداشت به چه شکل است؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/nobitex-account-is-not-charged-with-cryptocurrency/">چرا رمزارز ارسال شده به حساب متاورس، شارژ نشده است؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/crypto-withdrawals/">برداشت رمزارز از حساب متاورس به چه صورت است؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/crypto-transfer-fees/">کارمزد انتقال رمزارزها چقدر است؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/deposit-crypto-to-wallet/">شارژ کیف پول رمزارز به چه شکل است؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/confirm-for-crypto-transfer/">تعداد کانفرم مورد نیاز برای انتقال رمزارزها چقدر است؟</a></p>

                    <p>&nbsp;</p>

                    <h3>واریز و برداشت ریال</h3>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/deposit-and-withdrawal-fee-in-rials/">کارمزدهای واریز و برداشت ریالی</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/rial-withdrawal-time/">برداشت ریالی چقدر زمان می&zwnj;برد؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-to-cancel-my-withdrawal/">چگونه می&zwnj;توان برداشت را لغو کرد؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/why-was-my-rial-wallet-not-charged-after-payment/">چرا کیف پول ریالی پس از پرداخت شارژ نشده است؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-can-i-withdraw-from-rial-wallet/">برداشت ریال از متاورس به چه شکل است؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-can-i-deposit-my-rial-wallet/">شارژ کیف پول ریالی به چه صورت است؟</a></p>

                    <p>&nbsp;</p>

                    <h3>امنیت حساب و اطلاعات</h3>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/2fa_desktop/">راهنمای فعال سازی ورود دوعاملی؛ نسخه دسکتاپ</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/2fa-full-guide/">راهنمای فعالسازی شناسایی دوعاملی؛ نسخه اپلیکیشن</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/how-to-increase-account-security/">چگونه امنیت حساب کاربری را بالا ببریم؟</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/beware-of-phishing-attacks/">چگونه دربرابر حملات فیشینگ ایمن شویم؟</a></p>

                    <p>آموزش فعال سازی ورود دو عاملی <span dir="LTR">2FA</span></p>

                    <p>&nbsp;</p>

                    <h3>سوابق حساب</h3>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/order-history/">تاریخچه سفارشات</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/trading-history/">تاریخچه معاملات</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/deposit-history/">تاریخچه واریزها</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/withdrawal-history/">تاریخچه برداشت&zwnj;ها</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/transaction-history/">تاریخچه تراکنش&zwnj;ها</a></p>

                    <p>&nbsp;</p>

                    <p>خرید و فروش ارزهای دیجیتال</p>

                    <p>&nbsp;</p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/small-assets-to-rial/">تبدیل دارایی کیف پول به ریال</a></p>

                    <p><a href="https://bitex-help.nobitex.ir/knowledgebase/trading-fees/">کارمزد معاملات</a></p>

                    <p>راهنمای ویدیویی ثبت سفارش</p>

                    <p>سفارش خرید در قیمت خاص چیست؟</p>

                    <p>سفارش فروش در قیمت خاص چیست ؟ ثبت</p>
                </div>
                <img style={{marginRight: "20px"}} src="/images/help_metavers.png"
                     alt="" width={550} height={450} />
                </SContent>
            </SMain>
            <LandingFooter />
        </Main>
    );
}
