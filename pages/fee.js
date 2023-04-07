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

const FeeMain = styled('div')`
    width: 100%;
    margin-top: 50px;
    font-family: IRANSansX, sans-serif;
    p {
        font-family: IRANSansX, sans-serif;
    }
`;
const FeeContent = styled('div')`
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
Fee.title = `صرافی ${SETTINGS.WEBSITE_NAME} | سوالات متداول`
export default function Fee() {
    return (
        <Main>
            <LandingHeaders page="fee" />
            <FeeMain>
                <FeeContent>
                    <div>
                        <p>کارمزد و ببرسی صرافی {SETTINGS.WEBSITE_NAME}</p>
                        <p><strong>صرافی {SETTINGS.WEBSITE_NAME}؛کارمزد، بررسی قیمت و ویژگی صرافی ارز دیجیتال {SETTINGS.WEBSITE_NAME}</strong></p>
                        <p>صرافی {SETTINGS.WEBSITE_NAME} ، یکی از صرافی های فعال در زمینه ارز دیجیتال ، در کشور ایران می باشد ،هدف ما ایجاد بستری شفاف برای معاملات شماست،به همین منظورتمامی هزینه ها و کارمزد های بستر {SETTINGS.WEBSITE_NAME} را بصورت شفاف و دقیق به اطلاع کاربران می رسانیم.</p>
                        <p>&nbsp;ثبت&zwnj;نام و استفاده از سامانه&zwnj;ی {SETTINGS.WEBSITE_NAME} کاملا رایگان می&zwnj;باشد و تنها طبق توضیحات مندرج در این صفحه، از برخی معاملات و اعمال مالی انجام شده در سامانه هزینه&zwnj;ی کمی به عنوان کارمزد کسر می&zwnj;شود</p>
                        <p>کارمزد معاملات</p>
                        <p>کارمزد معاملات در سامانه {SETTINGS.WEBSITE_NAME} بصورت درصد از مبلغ کل معامله است و محاسبه&zwnj;ی آن بر اساس ملاحظات زیر صورت می&zwnj;گیرد. لازم به توضیح است که کسر کارمزد از معاملات باعث جلوگیری از ثبت معاملات صوری و مکرر خواهد شد و شرایط مطلوب&zwnj;تری را در بازار برای تمامی کاربران ایجاد می&zwnj;کند.</p>
                        <p><u>معاملات انجام شده در بازارها، مستقل از حجم به صورت ویژه با کارمزد 0.2% برای معاملات تومان و 0.3% برای معاملات تتر محاسبه می&zwnj;شود. </u></p>
                        <ul>
                            <li>کارمزد از هر دو طرف معامله گرفته می&zwnj;شود.</li>
                            <li>کارمزد به صورت درصد از حجم دارایی درخواستی محاسبه می&zwnj;شود. به طور مثال اگر به عنوان فروشنده، بخواهید در برابر بیت&zwnj;کوین، ریال دریافت کنید کارمزد به صورت درصد از ریال دریافت می&zwnj;شود، و بالعکس اگر به عنوان خریدار بخواهید با ریال خود بیت&zwnj;کوین خریداری نمایید، کارمزد به صورت درصد از بیت&zwnj;کوین دریافت خواهد شد.</li>
                            <li>در هنگام ثبت معاملات از طریق سامانه&zwnj;ی {SETTINGS.WEBSITE_NAME} ، مبلغ دقیق کارمزد برای آن معامله برای شما نمایش داده خواهد شد.</li>
                            <li>لازم به ذکر است در واریز رمزارز باید دقت زیادی داشته باشید،&zwnj; همچنین اطمینان حاصل کنید که اطلاعات کافی درباره شبکه رمزارز ها داشته و مبدا و مقصد مورد نظر از آن پشتیبانی میکنند. در صورت هر گونه اشتباه در ثبت اطلاعات یا شبکه&zwnj;ای که {SETTINGS.WEBSITE_NAME} از آن پشتیبانی نمی&zwnj;کند ممکن است دارایی شما از بین رفته و عملا بازیابی آن غیر ممکن بوده و{SETTINGS.WEBSITE_NAME} هیچ ضمانتی درباره آن ارائه نمیدهد.&nbsp;</li>
                        </ul>
                        <p><strong><u>باتوجه به سیکل&zwnj;های تسویه پایا در کشور بنا بر ابلاغیه بانک مرکزی، زمان&zwnj;های تسویه ریالی {SETTINGS.WEBSITE_NAME} به شرح زیر است:</u></strong></p>
                        <ul>
                            <li>درخواست&zwnj;های برداشت ریال صرفاً در روزهای کاری پردازش می&zwnj;شوند و در روزهای تعطیل به دلیل از سرویس خارج بودن شبکه&zwnj;های ساتنا و پایا امکان تسویه به جز در موارد خاص وجود ندارد.</li>
                            <li>درخواست&zwnj;های ثبت شده تا ساعت 12:30، در سیکل 13:45 توسط بانک مرکزی پردازش و معمولاً با نیم تا یک ساعت تاخیر به حساب کاربران محترم واریز خواهد شد.</li>
                            <li>درخواست&zwnj;های ثبت شده بعد از ساعت 12:30 تا ساعت 22، در روز کاری بعد در ساعت 4 الی 7 صبح به حساب کاربران محترم واریز خواهد شد.️</li>
                            <li>درخواست&zwnj;های ثبت شده بعد از ساعت 22 تا 9 صبح، در ساعت 10:45 دقیقه صبح توسط بانک مرکزی پردازش و معمولاً با نیم تا یک ساعت تاخیر به حساب کاربران محترم واریز خواهد شد.</li>
                        </ul>
                        <p><strong><u>زمان&zwnj;بندی تسویه به مقصد بانک آینده به شرح زیر است:</u></strong></p>
                        <ul>
                            <li>تسویه به مقصد بانک آینده در روزهای کاری از ساعت 9 تا 21، هر یک ساعت یکبار انجام خواهد گردید.</li>
                            <li>در صورتی که درخواست تا قبل از دقیقه 45 هر ساعت ثبت گردد، تسویه برای همان ساعت خواهد بود و در غیر این صورت به ساعت بعدی منتقل خواهد شد.</li>
                            <li>درخواست&zwnj;های تسویه بانک آینده در ساعات 21 تا 22، برای ساعت 23 تسویه خواهد شد.</li>
                            <li>درخواست&zwnj;های ثبت شده پس از ساعت 22، در اولین سیکل روز بعد انجام می گردد.</li>
                            <li>تسویه به مقصد بانک آینده در روزهای تعطیل نیز هر سه ساعت یکبار انجام خواهد شد.</li>
                        </ul>
                        <p>در نظر داشته باشید زمان پردازش سیکل پایا از سوی بانک مرکزی با زمان واریز به حساب شما متفاوت خواهد بود و معمولاً با تاخیر 30 تا 45 دقیقه به حساب مقصد واریز می&zwnj;شود.</p>
                        <p>علاوه بر این، تعیین وضعیت تسویه ریالی ممکن است تا ۷۲ ساعت کاری زمانبر باشد. اختلال&zwnj;های پیش&zwnj;بینی نشده در ارسال، مسدود بودن حساب مقصد، بازگشت وجه به حساب مبدا و ... از جمله عوامل زمانبر در این پروسه هستند.</p>
                        <p><strong><u>&nbsp;</u></strong></p>
                        <p><strong><u>ویژگی های صرافی {SETTINGS.WEBSITE_NAME}</u></strong></p>
                        <p>&nbsp;</p>
                        <p><strong>مدل کسب و کار صرافی</strong><strong> :&nbsp;</strong><strong>فروشگاهی</strong></p>
                        <p><strong>حداکثر زمان احراز هو</strong> <strong>یت : 30دقیقه </strong></p>
                        <p><strong>امنیت شبکه : بسیار قوی &nbsp;</strong></p>
                        <p><strong>واریز و برداشت ریالی :دارد</strong></p>
                        <p><strong>کارمزد برداشت ریالی :صفر </strong></p>
                        <p><strong>نگهداری دارایی در صرافی : دارد </strong></p>
                        <p><strong>قدمت صرافی</strong><strong> :</strong><strong>شروع از سال 1400</strong></p>
                        <p><strong>کارمزد خرید و فروش تتر :ندارد </strong></p>
                        <p><strong>کارمزد انتقال داخلی رمز ارز : ندارد </strong></p>
                        <p><strong>کارمزد خرید و فروش بازار تومانی</strong> <strong>: 0.2%</strong></p>
                        <p><strong>کارمزد خرید و فروش &nbsp;بازار تتری</strong> <strong>:0.3%</strong></p>
                        <p><strong>حداقل مبلغ خرید</strong> <strong>: 400.000 تومان یا 13 تترو این مقدار در ارزهای مختلف متفاوت است </strong></p>
                        <p><strong>حداقل مبلغ فروش</strong><strong> :&nbsp;</strong><strong>بدون محدودیت</strong></p>
                        <p><strong>کیف پول اختصاصی</strong><strong> :&nbsp;</strong><strong>دارد</strong></p>
                        <p><strong>محدودیت معامله :ندارد </strong></p>
                        <p><strong>قیمت لحظه ای ارزهای دیجیتال: دارد </strong></p>
                        <p><strong>ابزار و چارت تحلیل ارزهای دیجیتال : دارد </strong></p>
                        <p><strong>وبلاگ آموزشی : دارای پلتفرم آموزشی آکادمی {SETTINGS.WEBSITE_NAME} آنلاین/ حضوری</strong></p>
                        <p><strong>درصد مشارکت کاربر از درآمد زایی معرفی به دوستان :دارد</strong></p>
                        <p><strong>اخبار:دارای اخبار لحظه ای ارزهای دیجیتال و فاندامنتال در رسانه های اجتماعی</strong></p>
                        <p><strong>قابلیت تبدیل موجودی های کوچک</strong><strong> :&nbsp;</strong><strong>ندارد </strong></p>
                        <p><strong>سیستم درآمد زایی</strong><strong> :&nbsp;</strong><strong>دارد</strong></p>
                        <p><strong>ورود دو مرحله ای</strong><strong> :&nbsp;</strong><strong>دارد </strong></p>
                        <p><strong>اپلیکیشن موبایل</strong><strong> :&nbsp;</strong><strong>دارد </strong></p>
                        <p><strong>پشتیبانی از شبکه ها</strong><strong> :&nbsp;</strong><strong>اتریوم</strong><strong>&nbsp;,&nbsp;</strong><strong>بایننس</strong><strong>&nbsp;,&nbsp;</strong><strong>اسمارت چین</strong><strong>&nbsp;,&nbsp;</strong><strong>ترون</strong></p>
                        <p><strong>پایه پولی</strong><strong> :&nbsp;</strong><strong>تتر</strong><strong>&nbsp;,&nbsp;</strong><strong>تومان</strong></p>
                        <p><strong>راه های ارتباطی</strong><strong> :&nbsp;</strong><strong> پشتبانی چت انلاین 24 ساعته ، تماس تلفنی ، مراجعه حضوری در ساعت های اداری </strong></p>
                        <p><strong>تعداد کارمندان</strong> <strong>: 50-100</strong></p>
                        <p><strong>تسویه</strong><strong> :&nbsp;</strong><strong>معاملات تومنی اولین سیکل بانکی و معاملات   تتری فوری </strong></p>
                        <p>&nbsp;</p>
                        <p>شیراز ، خیابان عفیف آباد ،مجتمع تجاری حافظ ،طیقه3 ،واحد 7</p>
                        <p>توضیحات صرافی:&nbsp;صرافی {SETTINGS.WEBSITE_NAME}&nbsp; BelkaCrypto را میتوان یکی از پرسرعت ترین صرافی ارز دیجیتال در ایران دانست؛ این صرافی از تعداد زیادی از رمز ارزها (بیش از 350 ارز) پشتیبانی می کند و امکان خرید و فروش انلاین به ساده ترین و سریع ترین حالت ممکن وجود دارد و امکان معامله حضوری هم امکان پذیر است.{SETTINGS.WEBSITE_NAME} با داشتن تنوع ارزها و پشتیبانی 24 ساعته و ارائه خدمات وسهولت برای کاربران یکی از صرافی های مطرح محسوب می شود .</p>
                        <p><strong>نقد و بررسی صرافی {SETTINGS.WEBSITE_NAME}</strong><strong> ({SETTINGS.WEBSITE_NAME_ENG})</strong></p>
                        <p>صرافی {SETTINGS.WEBSITE_NAME} یا {SETTINGS.WEBSITE_NAME_ENG} &nbsp;از&nbsp;<u> پاییز سال 1400 </u>&nbsp;فعالیت خود را بصورت رسمی آغاز کرده است. صرافی رمز ارز {SETTINGS.WEBSITE_NAME} از <u>350 </u>&nbsp;ارزدیجیتال در مارکت تومانی با کارمزد&nbsp;<u>0.2%</u>&nbsp;پشتیبانی می کند.&nbsp; پروسه احراز هویت {SETTINGS.WEBSITE_NAME} حداکثر&nbsp;<u>30 </u><u>دقیقه</u>&nbsp;زمان می برد. لازم به ذکر است حداقل مقدار قابل خرید در این صرافی&nbsp;<strong>400هزار تومان</strong>&nbsp;و حداقل مقدار قابل فروش&nbsp;<strong>بدون محدودیت</strong>&nbsp;می باشد.<br />از نکات&nbsp;مثبت&nbsp;این صرافی پشتیبانی از کیف پول اختصاصی، سیستم درآمد زایی، ورود دو مرحله ای، راه های ارتباطی چت&nbsp;,&nbsp;تلفن&nbsp;,&nbsp;حضوری و اپلیکیشن android و پایه پولی تتر&nbsp;,&nbsp;تومان و شبکه اتریوم&nbsp;,&nbsp;بایننس&nbsp;,&nbsp;اسمارت چین&nbsp;,&nbsp;ترون می باشد.</p>
                        <p>&nbsp;</p>
                        <p>خرید و فروش در بازار ارز های دیجیتال، از طریق&nbsp;صرافی&nbsp;های خارجی ارز دیجیتال به یک چالش بزرگ برای ایرانیان تبدیل شده است. تحریم ها و سیاست های بین المللی، موجب شده است تا بسیاری از&nbsp;صرافی&nbsp;های خارجی، از ارائه خدمات مستقیم&nbsp;به کاربران ایرانی، خودداری کنند و در صورت اطلاع از فعالیت آن ها، در پلتفرم خود، حساب کاربری آن ها را مسدود نمایند.</p>
                        <p>در این راستا،&nbsp;صرافی&nbsp;های ارز دیجیتال ،&nbsp;در ایران، راه اندازی شد که&nbsp;صرافی {SETTINGS.WEBSITE_NAME}، به نشانی اینترنتی&nbsp;BelkaCrypto-ex.com، یکی از آن ها است. این&nbsp;صرافی،&nbsp;توانسته است، استفاده از فرصت های سرمایه گذاری در بازار کریپتوکارنسی را برای کاربران ایرانی، تسهیل نماید.</p>
                        <p>باتوجه به اهمیت&nbsp;صرافی {SETTINGS.WEBSITE_NAME}،&nbsp;برای کاربران ایرانی فعال در زمینه ارز های دیجیتالی، در ادامه، در رابطه با معرفی&nbsp;صرافی {SETTINGS.WEBSITE_NAME} ،&nbsp;ورود به&nbsp;سایت {SETTINGS.WEBSITE_NAME}، به نشانی&nbsp;BelkaCrypto-ex.com،&nbsp;ثبت نام&nbsp;و نحوه&nbsp;احراز هویت&nbsp;در این&nbsp;صرافی، ورود به حساب کاربری&nbsp;{SETTINGS.WEBSITE_NAME}، آموزش خرید و فروش در این&nbsp;سایت، دانلود اپلیکیشن آن و همچنین، دیگر خدمات این&nbsp;صرافی&nbsp;رمز ارز ها، مطالبی آورده شده است.&nbsp;</p>
                        <p><br />جهت&nbsp;<strong>ورود</strong>&nbsp; به صرافی {SETTINGS.WEBSITE_NAME} &nbsp;یا&nbsp;<strong>ثبت نام</strong>&nbsp;در {SETTINGS.WEBSITE_NAME} رو دکمه ورود / ثبت نام بالای صفحه کلیک کنید.</p>
                    </div>
                    <img
                        src="/images/fee_metevers.png"
                        width={500}
                        height={500}
                        alt=""
                    />
                </FeeContent>
            </FeeMain>
            <LandingFooter />
        </Main>
    );
}
