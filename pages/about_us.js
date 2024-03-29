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
const ContactMain = styled('div')`
    width: 100%;
    margin-top: 50px;
    
    font-family: IRANSansX, sans-serif;
    p {
        font-family: IRANSansX, sans-serif;
    }
`;
const Content = styled('div')`
    padding-top: 60px;
    padding-left: 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
    *{
        text-align: left;
    }
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

AboutUs.title = `صرافی ${SETTINGS.WEBSITE_NAME} | سوالات متداول`
export default function AboutUs() {
    return (
        <Main>
            <LandingHeaders page="about_us" />
            <ContactMain>
                <Content>
                    <div dir="rtl">
                        <h2>(کسب درامد دلاری با ترید در دنیای ارزهای دیجیتال)</h2>

                        <p>{SETTINGS.WEBSITE_NAME} یک پلتفرم خرید و فروش ارزهای دیجیتال است .شما از طریق {SETTINGS.WEBSITE_NAME} میتوانید پرداخت های ارزی خود را به ریال تبدیل کنید و خرید آنلاین از سایت های بین المللی داشته باشید .</p>

                        <p>{SETTINGS.WEBSITE_NAME} یکی از فعالان در عرصه خرید و فروش ارزهای دیجیتال است که تلاش می کند با منصفانه ترین کارمزد و رقابتی ترین نرخ ها یکی از پلتفرم های امن و سریع در این حوزه باشد .</p>

                        <p>تمامی مبادلات در این پلتفرم به صورت آنی و اتوماتیک انجام می گردد.</p>

                        <p>&nbsp;</p>

                        <h2>درباره ما</h2>

                        <p>{SETTINGS.WEBSITE_NAME} از دو واژه <span dir="LTR">Meta </span>&nbsp;(متا) به معنی فراتر و<span dir="LTR"> Verse </span>(یونیورس) به معنی جهان تشکیل شده . که درکل معنی واژه {SETTINGS.WEBSITE_NAME} ( فراجهان) است ، هدف ما فراهــــم نمودن بستری امن، سریع و آسان جهت خرید و فروش مستقیم ارزهای<br />
                            دیجیتال بین خریدار و فروشنده است،این بستر به عنوان واسطه ای میان خریداران و فروشندگان، امنیت معاملات و وصول دارایی های &nbsp;مبادله شده را تضمین می کند.</p>

                        <p>&nbsp;</p>

                        <h3>تیم {SETTINGS.WEBSITE_NAME}</h3>

                        <p>{SETTINGS.WEBSITE_NAME} با هدف رفع نیاز کاربران ایرانی برای مبادله دارایی های دیجیتال در ابتدای سال 1399 شکل گرفت . پس از تحقیقات اولیه و سنجش میزان نیاز بازار ایران به چنین محصولی، هسته اولیه تیم که سابقه بیش از 30 سال در بازارهای مبادلات مالی بین المللی دارند استقرار یافت و به تدریج و با افزوده شدن مهندسین با تخصص های مختلف در زمینه بلاک چین و ارزهای دیجیتال و برنامه نویسان و طراحان متخصص در این حوزه در کنار اساتید و کارشناسان آموزشی و در ادامه با بهره گیری از تیمی جوان،خلاق،پویا و علاقه مند تیم {SETTINGS.WEBSITE_NAME} بزرگتر شد و مسیر رشد را ادامه داد . با تلاش شبانه روزی ،این تیم موفق شد اولین نسخه بازار را در زمستان 1400 رو نمایی کنند.</p>

                        <p>{SETTINGS.WEBSITE_NAME} در ابتدا با هدف سهولت در خرید و فروش ارز تتر برای کاربران ایرانی پایه گذاری شد و پس از مدتی پر معامله ترین رمز ارزهای جهانی نیز به این پلتفرم افزوده شد و به صورت دوره ای ارزهای جدید نیز متناسب با درخواست کاربران به این پلتفرم افزوده میشود .در حال حاضر امکان خرید و فروش حدود 350 رمز ارز معتبر در {SETTINGS.WEBSITE_NAME} وجود دارد ؛ ضمن اینکه شما میتوانید رمز ارز مورد نیاز خود را اطلاع دهید تا در اسرع وقت به این پلتفرم افزوده شود .{SETTINGS.WEBSITE_NAME} امروز با بیش از سیصد هزار کاربر یکی از محبوب ترین پلتفرم های بومی در حوزه ارزهای دیجیتال است و روزانه هزاران معامله در این پلتفرم انجام میشود .</p>

                        <p>معامله سریع ،قیمت رقابتی و مناسب و عدم محدودیت در مبلغ معامله و امنیت بالا این پلتفرم سبب شده تا روزانه پذیرای هزاران کاربر باشیم .</p>

                        <p>در پلتفرم متاوررس شما می توانید تمامی رمز ارز های خود را در حساب کاربریتان نگه داشته و در صورت نیاز رمز ارز خود را در لحظه به تتر یا دلار یا ریال تبدیل کنید . با این قابلیت شما می توانید بدون پرداخت هیچ گونه کارمزدی و به هر میزانی ارز مورد نظر خود را به حساب کاربر دیگر در {SETTINGS.WEBSITE_NAME} انتقال دهید .در {SETTINGS.WEBSITE_NAME} امکان معامله به هر دو صورت حضوری و آنلاین امکان پذیر است . قابلیت های معامله به صورت پیشرفته از قبیل سفارش در قیمت مشخص و تعیین حد ضرر نیز در پلتفرم {SETTINGS.WEBSITE_NAME} ایجاد شده است . در این روش شما میتوانید سفارش خرید یا فروش خود را در قیمت مورد نظر ثبت کرده و در صورت رسیدن قیمت بازار به قیمت تعیین شده در هر ساعتی از شبانه روز بدون نیاز به ارتباط آنلاین ،خرید یا فروش خود را نهایی کنید .</p>

                        <p>{SETTINGS.WEBSITE_NAME} به صورت 24 ساعته و در 7 روز هفته آماده پاسخگویی و ارائه خدمات پشتیبانی به صورت آنلاین و تلفنی و سیستم تیکتینگ به کاربران خود می باشد . همچنین امکان مراجعه و انجام خرید و فروش به صورت حضوری در روزهای کاری از شنبه تا پنج شنبه از 10 صبح الی 2 بعد از ظهر &nbsp;فراهم می باشد .</p>

                        <p>&nbsp;</p>

                        <h3>راز موفقیت صرافی {SETTINGS.WEBSITE_NAME} در چیست ؟</h3>

                        <p>افتخار می کنیم که یکی از سخت کوش ترین و با استعداد ترین تیم های ایران را داریم . {SETTINGS.WEBSITE_NAME} با کمک تیم پویای خود همواره کوشیده پیشرفته ترین و فناورانه ترین قابلیتها و ویژگیها را همگام با بازارهای جهانی در اختیار کاربران قرار دهد ،{SETTINGS.WEBSITE_NAME} این افتخار را دارد که بعنوان اولین پلتفرم معاملاتی در ایران جهت ارتقا سطح علمی کاربران خود آکادمی آموزش {SETTINGS.WEBSITE_NAME} را با استفاده از اساتید و کارشناسان متخصص و با تجربه در این حوزه راه اندازی کند که کاربران می توانند به پلتفرم آموزشی آکادمی {SETTINGS.WEBSITE_NAME} به آدرس</p>

                        <p><a href="http://www.blog.BelkaCrypto-ex.com"><span dir="LTR">www.blog.BelkaCrypto-ex.com</span></a>&nbsp;&nbsp;</p>

                        <p>مراجعه کرده و با استفاده از دوره های آموزشی رایگان و تخصصی جهت ارتقا سطح علمی خود در این حوزه استفاده نمایند</p>

                        <p>دوست دارید به تیم {SETTINGS.WEBSITE_NAME} ملحق شوید ؟</p>

                        <h3>&nbsp;</h3>

                        <h3>معرفی شرکت :</h3>

                        <p>{SETTINGS.WEBSITE_NAME} یک استارت آپ فینتک با تمرکز بر حوزه مبادلات رمز ارزها بوده که به سرعت در حال رشد است .</p>

                        <p>اصلی ترین محصول ما پلتفرم آنلاین {SETTINGS.WEBSITE_NAME} است .این پلتفرم یک اکسچنج یا صرافی آنلاین تمام اتوماتیک است که امکان مبادله بیتکوین ، اتریوم و سایر رمز ارزها را بصورت مستقیم با ریال ایران فراهم میکند .</p>

                        <p>امنیت ،سرعت ،راحتی و امکان مبادله بی واسطه بین خریدار و فروشنده ،مهمترین مزایای این پلتفرم برای کاربران در مقایسه با سایر راهکارها هستند .</p>

                        <p>با مراجعه به سایت صرافی {SETTINGS.WEBSITE_NAME} به آدرس</p>

                        <p><a href="http://www.BelkaCrypto-ex.com"><span dir="LTR">www.BelkaCrypto-ex.com</span></a></p>

                        <p>می توانید معاملات خرید و فروش رمز ارزهای خود را انجام دهید و در آمد خود را به راحتی به ریال تبدیل کنید .</p>

                        <p>مزایای همکاری با صرافی {SETTINGS.WEBSITE_NAME} عبارتند از :</p>

                        <p>- پشتیبانی 7 روز هفته و 24 ساعت شبانه روز</p>

                        <p>- نرخ های رقابتی</p>

                        <p>- دریافت و پرداخت فوری در 24 ساعت شبانه روز در 7 روز هفته</p>

                        <p>- انجام امور با سرعت بالا</p>

                        <p>- کارمزد مناسب ورقابتی</p>

                        <p>- پشتیبانی و همراهی کاربران تا حصول نتیجه</p>

                        <p>- پشتیبانی بیش از سیصد رمز ارز پر مخاطب</p>

                        <p>- احراز هویت سریع</p>

                        <p>- مجهز به سیستم آموزشی آکادمی {SETTINGS.WEBSITE_NAME} با استفاده از اساتید متخصص و مطرح در سطح کشور</p>

                        <p>- امکان مراجعه حضوری در ساعات اداری : از شنبه تا چهارشنبه 10 صبح تا 2 بعد از ظهر &nbsp;</p>
                    </div>
                    <img
                        src="/images/aboutus.png"
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
