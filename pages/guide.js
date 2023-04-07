import LandingHeaders from "../components/LandingHeaders";
import Head from "next/head";
import { styled } from '@mui/material/styles';
import LandingFooter from "../components/LandingFooter";
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

Guide.title = `صرافی ${SETTINGS.WEBSITE_NAME} | راهنمای ${SETTINGS.WEBSITE_NAME}`
export default function Guide() {
    return (
        <Main>
            <LandingHeaders page="guide" />
			<h1>راهنمای کاربران</h1>

<div>
<a href="https://BelkaCrypto-ex.com/help_buy_sell" > آموزش خرید و فروش ارز دیجیتال</a>
</div>
    <div>
<a href="https://BelkaCrypto-ex.com/help_buy_usdt" > آموزش خرید و فروش تتر</a>
</div>
<div>
<a href="https://BelkaCrypto-ex.com/help_register" > راهنمای ثبت نام</a>
</div>     




            <LandingFooter />
        </Main>
    );
}
