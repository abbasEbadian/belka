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

Fee.title = `صرافی ${SETTINGS.WEBSITE_NAME} | امنیت ${SETTINGS.WEBSITE_NAME}`
export default function Fee() {
    return (
        <Main>
            <LandingHeaders page="help_register" />
            <SMain>
                <SContent>
                <div style={{color: "white"}}>
                    <h3><strong>جای شما در {SETTINGS.WEBSITE_NAME} امن است!</strong></h3>

                    <p>{SETTINGS.WEBSITE_NAME} به&zwnj;عنوان یکی از بزرگ&zwnj;ترین پلتفرم&zwnj;های معاملاتی ارز دیجیتال به زبان فارسی، امنیت را از تمامی جنبه ها در اولویت اول خود قرار داده است. {SETTINGS.WEBSITE_NAME} بر اساس آخرین استانداردهای امنیتی روز دنیا و با بهره&zwnj;بردن از تجربه و تخصص کارشناسان حوزه امنیت سایبری پایه&zwnj;ریزی شده&zwnj; است<span dir="LTR">.</span></p>

                    <p>&nbsp;</p>

                    <h3><strong>امنیت انتقال داده&zwnj;ها</strong></h3>

                    <p>داده&zwnj;هایی که میان کاربران و {SETTINGS.WEBSITE_NAME} در حال ردوبدل شدن است از اهمیت ویژه&zwnj;ای برخوردار هستند. نظر به این مهم در صرافی {SETTINGS.WEBSITE_NAME} تمامی داده&zwnj;های کاربران با بهره&zwnj;گیری از آخرین استانداردهای امنیتی محافظت می&zwnj;شوند. برای اطمینان بیشتر از امنیت تبادل داده&zwnj;ها، با استفاده از ویژگی&zwnj;های نوین مرورگرها مانند<span dir="LTR"> HSTS </span>تمامی تدابیر ضروری برای جلوگیری از نفوذ در سطح پروتکل انتقال انجام شده است. به&zwnj;علاوه با آشنایی با روش&zwnj;های نفوذ شناخته شده و پیاده&zwnj;سازی پیشگیری&zwnj;های لازم کاربران {SETTINGS.WEBSITE_NAME} از بسیاری از حملات از جمله<span dir="LTR"> POODLE </span>و<span dir="LTR"> Heartbleed </span>و<span dir="LTR"> WeakDH </span>حفاظت شده&zwnj;اند<span dir="LTR">.</span></p>

                    <p>&nbsp;</p>

                    <h3><strong>امنیت دارایی کاربران</strong></h3>

                    <p>دارایی&zwnj;های کاربران به&zwnj;صورت ارز دیجیتال در صرافی {SETTINGS.WEBSITE_NAME} به روش &quot;سرد&quot; نگهداری می&zwnj;شود. نگهداری به روش سرد به اتصال اینترنت نیاز ندارد و ازاین&zwnj;رو امنیت دارایی&zwnj;ها دوچندان می&zwnj;شود و امکان هرگونه هک و سرقت از بین می&zwnj;رود.</p>

                    <p>&nbsp;</p>

                    <h3><strong>امنیت رمز عبور</strong></h3>

                    <p>برای دسترسی به خدمات {SETTINGS.WEBSITE_NAME} باید اطلاعات امنیتی از جمله نام کاربری و رمز عبور شخصی خودتان را ایجاد کنید. شما باید با احتیاط کامل از دستگاه الکترونیکی که از طریق آن به خدمات {SETTINGS.WEBSITE_NAME} دسترسی پیدا می&zwnj;کنید محافظت کنید و در عین&zwnj;حال مسئولیت کامل مراقبت از اطلاعات امنیتی که برای دسترسی به خدمات {SETTINGS.WEBSITE_NAME} استفاده می&zwnj;کنید بر عهده شماست. برای این منظور باید تمام اقدامات منطقی لازم برای جلوگیری از به سرقت رفتن یا سوءاستفاده از دستگاه&zwnj;های الکترونیکی را انجام دهید و مطمئن شوید که از دستگاه&zwnj;هایتان با تعیین رمز عبور محافظت می&zwnj;کنید. هرگونه از دست&zwnj; دادن یا به خطر افتادن دستگاه الکترونیکی یا اطلاعات امنیتی شما ممکن است منجر به دسترسی غیرمجاز یک شخص ثالث به&zwnj; حساب {SETTINGS.WEBSITE_NAME} شما و از بین&zwnj; رفتن یا به سرقت رفتن تمام سرمایه و رمز ارزهایتان شود. برای جلوگیری از چنین اتفاقات ناگواری باید همیشه اطلاعات امنیتی خود را ایمن نگه دارید. به&zwnj;عنوان&zwnj;مثال، نباید چنین اطلاعاتی را یادداشت کنید و آن را در معرض دید یا دسترسی دیگران قرار دهید<span dir="LTR">.</span></p>

                    <p>&nbsp;</p>

                    <p>هنگام ورود به &zwnj;حساب {SETTINGS.WEBSITE_NAME} هرگز نباید اجازه دسترسی از راه دور به کامپیوترتان را به هیچ کسی بدهید یا صفحه &zwnj;نمایش کامپیوترتان را با شخص دیگری به اشتراک بگذارید. {SETTINGS.WEBSITE_NAME} تحت هیچ شرایطی از شما درخواست اطلاعات شناسایی، رمز عبور یا رمز یکبار مصرف یا اشتراک&zwnj;گذاری صفحه &zwnj;نمایشگرتان را نمی&zwnj;کند. برای دسترسی از راه دور به حسابتان نباید اطلاعات حسابتان را در اختیار شخص ثالث قرار دهید، مگر اینکه چنین موردی در قوانین {SETTINGS.WEBSITE_NAME} قید شده باشد. در صورت هرگونه تردید در مورد صحت تماس&zwnj;ها یا هشدارها از سوی {SETTINGS.WEBSITE_NAME} همیشه از طریق سایت به&zwnj; حساب {SETTINGS.WEBSITE_NAME} خود وارد شوید و تراکنش&zwnj;ها یا اقدامات لازم را بررسی کنید و اکیدا توصیه می شود از افشای شماره تماس یا ایمیل خود که با آن در {SETTINGS.WEBSITE_NAME} حساب کاربری ساخته اید، نزد دیگران جلوگیری کنید. {SETTINGS.WEBSITE_NAME} هیچ&zwnj;گونه مسئولیتی در قبال خساراتی که ممکن است به دلیل افشای اطلاعات ورود به &zwnj;حساب از سوی شخص کاربر یا عدم رعایت الزامات مندرج در قوانین سایت توسط یا عدم توجه به هشدارهای ارسالی از سوی {SETTINGS.WEBSITE_NAME} به کاربر به او تحمیل شود ندارد<span dir="LTR">.</span></p>

                    <p>&nbsp;</p>

                    <h3><strong>اعتبارسنجی و تأیید هویت</strong></h3>

                    <p>برای دسترسی به خدمات {SETTINGS.WEBSITE_NAME} باید اطلاعات امنیتی از جمله نام کاربری و رمز عبور شخصی خودتان را ایجاد کنید. شما باید بااحتیاط کامل از دستگاه الکترونیکی که از طریق آن به خدمات {SETTINGS.WEBSITE_NAME} دسترسی پیدا می&zwnj;کنید محافظت کنید و درعین&zwnj;حال مسئولیت کامل مراقبت از اطلاعات امنیتی که برای دسترسی به خدمات {SETTINGS.WEBSITE_NAME} استفاده می&zwnj;کنید بر عهده شماست. برای این منظور باید تمام اقدامات منطقی لازم برای جلوگیری از به سرقت رفتن یا سوءاستفاده از دستگاه&zwnj;های الکترونیکی را انجام دهید و مطمئن شوید که از دستگاه&zwnj;هایتان با تعیین رمز عبور محافظت می&zwnj;کنید. هرگونه ازدست&zwnj;دادن یا به خطر افتادن دستگاه الکترونیکی یا اطلاعات امنیتی شما ممکن است منجر به دسترسی غیرمجاز یک شخص ثالث به &zwnj;حساب {SETTINGS.WEBSITE_NAME} شما و از بین&zwnj; رفتن یا به سرقت رفتن تمام سرمایه و رمز ارزهایتان شود. برای جلوگیری از چنین اتفاقات ناگواری باید همیشه اطلاعات امنیتی خود را ایمن نگه دارید. به &zwnj;عنوان &zwnj;مثال، نباید چنین اطلاعاتی را یادداشت کنید و آن را در معرض دید یا دسترسی دیگران قرار دهید<span dir="LTR">.</span></p>

                    <p>&nbsp;</p>

                    <h3><strong>نقض امنیت</strong></h3>

                    <p>اگر شک کردید که حساب {SETTINGS.WEBSITE_NAME}&zwnj;تان یا هریک از اطلاعات امنیتی مربوط به آن به خطر افتاده است یا از هرگونه کلاهبرداری یا اقدام به کلاهبرداری یا هر حادثه امنیتی دیگری (از جمله حمله امنیت سایبری) که ممکن است شما یا {SETTINGS.WEBSITE_NAME} را تحت تأثیر قرار دهد آگاه هستید باید<span dir="LTR">:</span></p>

                    <ul>
                        <li>در اسرع وقت از طریق شماره &zwnj;تلفن <span dir="LTR">9104444028</span> (98+) و چت آنلاین با بخش پشتیبانی {SETTINGS.WEBSITE_NAME} تماس بگیرید<span dir="LTR">.</span></li>
                        <li>در طول مدت نقض امنیت با مسئولان {SETTINGS.WEBSITE_NAME} همکاری کرده و اطلاعات دقیق و به روز را به آنها ارائه دهید<span dir="LTR">.</span></li>
                        <li>باید هر اقدامی را که برای کاهش، مدیریت یا گزارش هرگونه نقض امنیت لازم است انجام دهید<span dir="LTR">.</span></li>
                    </ul>

                    <p>عدم اطلاع&zwnj;رسانی سریع در مورد هرگونه نقض امنیت ممکن است در تصمیم&zwnj;گیری تیم {SETTINGS.WEBSITE_NAME} در مورد نحوه حل و فصل مناسب موضوع لحاظ شود<span dir="LTR">.</span></p>

                    <p>&nbsp;</p>

                    <h3><strong>امنیت کامپیوتر و دستگاه&zwnj;های کاربر</strong></h3>

                    <p>{SETTINGS.WEBSITE_NAME} در قبال خسارت یا تداخل&zwnj;های ناشی از ویروس&zwnj;های کامپیوتری یا سایر کدهای مخرب که ممکن است روی کامپیوتر یا تجهیزات دیگر شما تأثیر بگذارد، یا هرگونه حمله فیشینگ، کلاهبرداری یا حملات سایبری دیگر مسئولیتی ندارد. به شما توصیه می&zwnj;کنیم از نرم&zwnj;افزارهای امنیتی و آنتی&zwnj;ویروس معتبر و در دسترس استفاده کنید. همچنین باید توجه داشته باشید که پیامک و ایمیل ممکن است هدف حملات کلاهبرداری و فیشینگ قرار بگیرند و باید در بررسی پیام&zwnj;هایی که ادعا می&zwnj;شود از سوی {SETTINGS.WEBSITE_NAME} برایتان ارسال می&zwnj;شود دقت کنید<span dir="LTR">.</span></p>
                </div>
                <img src="/images/security_BelkaCrypto.png"
                     alt="" width="550" height="450" />
                </SContent>
            </SMain>
            <LandingFooter />
        </Main>
    );
}
