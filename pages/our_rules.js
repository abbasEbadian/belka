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

const RulesMain = styled('div')`
    width: 100%;
    margin-top: 50px;
    font-family: IRANSansX, sans-serif;
    p {
        font-family: IRANSansX, sans-serif;
    }
`;
const Content = styled('div')`
    padding-top: 30px;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
    h2 {
        font-size: 22px;
        color: #fff;
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
	p a {
	text-decoration: underline !important;
	}
    img {
        position: relative;
        right: 40px;
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
OurRules.title = `صرافی ${SETTINGS.WEBSITE_NAME} | قوانین ما`
export default function OurRules() {
    return (
        <Main>
            <LandingHeaders page="our_rules" />
            <RulesMain>
                <Content>
                    <div style={{color: "white"}}>
                        <h2>قوانین و مقررات {SETTINGS.WEBSITE_NAME}</h2>

                        <p>در جهت حفظ حریم شخصی و افزایش امنیت کاربران هنگام انجام معاملات، مجموعه ی {SETTINGS.WEBSITE_NAME} در صدد اجرای قوانینی بر آمده است که بخشی از این قوانین مربوط به کاربران و بخشی بر عهده ی {SETTINGS.WEBSITE_NAME}&shy; است. این قوانین به شرح زیر آمده است<span>.</span></p>

                        <h3>سیاست&zwnj;های حفظ حریم خصوصی کاربر<span>:</span></h3>

                        <p>۱<span>. </span>مجموعه {SETTINGS.WEBSITE_NAME} در راستای جلوگیری از پول&zwnj;شویی و افزایش ضریب امنیتی معاملات، تکمیل فرایند احراز هویت را برای تمامی کاربرانی که قصد ایجاد حساب کاربری، خرید و فروش و واریز و برداشت ارز دیجیتال را دارند، اجباری در نظر گرفته است<span>.</span></p>

                        <p>۲<span>. </span>به&zwnj; منظور انجام مراحل احراز هویت کاربر، اطلاعاتی از قبیل شماره ملی، شماره موبایل، تصویر مدرک شناسایی معتبر و تصویر سلفی (طبق فرمت درخواستی {SETTINGS.WEBSITE_NAME}) مورد نیاز است. در صورت وجود ھرگونه تخلف در احراز ھویت، اعم از تغییر نرم&zwnj;افزاری و استفاده از مدارک دیگران، بدیھی است که مسئولیت حساب کاربری بر عھده&zwnj;&zwnj;ی شخص صاحب حساب است و {SETTINGS.WEBSITE_NAME} حق توقف ارائه&zwnj;&zwnj;ی خدمات به کاربر مذکور و ارجاع کاربر به مراجع ذی صلاح را دارد. ھمچنین {SETTINGS.WEBSITE_NAME} موظف به نگھداری اطلاعات شخصی کاربران است و متعھد می&zwnj;شود که از ھیچ یک از مدارک سوءاستفاده&zwnj;ای نخواھد شد. اگر از فعالیت&zwnj;ھای غیر قانونی کاربر خسارتی به {SETTINGS.WEBSITE_NAME} وارد شود، {SETTINGS.WEBSITE_NAME} می&zwnj;تواند ضرر وارد شده را از کاربر مطالبه نماید<span>.</span></p>

                        <p>۳<span>. </span>{SETTINGS.WEBSITE_NAME} خود را ملزم به حفظ حریم خصوصی و اطلاعات شخصی کاربر می&zwnj;داند و این اطلاعات را بر بستر<span> Cold Storage </span>نگهداری می&zwnj;کند. شایان ذکر است که این اطلاعات نزد {SETTINGS.WEBSITE_NAME} محفوظ هستند و به&zwnj; غیر از استعلام قضایی یا انتظامی، تحت هیچ شرایطی در اختیار شخص و یا سازمان ثالثی قرار داده نمی&zwnj;شوند<span>.</span></p>

                        <p>۴<span>. </span>{SETTINGS.WEBSITE_NAME} اطمینان می&zwnj;دھد که دارایی ھای کاربران را نزد خود به امانت (با رعایت استانداردھای موجود در حوزه امنیت) حفظ کند. در صورت بروز ھرگونه مشکل امنیتی، {SETTINGS.WEBSITE_NAME} متعھد به جبران خسارت خواھد بود<span>.</span></p>

                        <p>۵<span>. </span>توصیه می&zwnj;گردد جھت جلوگیری از کلاھبرداری&zwnj;ھای موجود، از رمز ورود با پیچیدگی بالا و کد شناسایی دو عاملی استفاده شود. حفظ اطلاعات امنیتی به عهده&zwnj;ی شخص کاربر بوده و باید در حفظ آن کوشا باشد و {SETTINGS.WEBSITE_NAME} هیچ مسئولیتی در قبال این موضوع به عهده نخواهد داشت<span>.</span></p>

                        <p>۶<span>. </span>كاربران {SETTINGS.WEBSITE_NAME} متعهد می&zwnj;شوند برای حفظ امنيت حساب کاربری خود، اطلاعات امنیتی اعم از رمز ورود، كد پيامکی، ایمیل ثبت شده و كد شناسایی دو عاملی (گوگل اتنتيكيتور) را در اختيار شخص ديگری قرار ندهند. همچنین حفظ امنیت ایمیل و سیم&zwnj;کارت کاملا بر عهده کاربر است و استفاده شخص دیگر از حساب کاربری شخص صاحب حساب، خلاف قوانین {SETTINGS.WEBSITE_NAME} می&zwnj;باشد. در صورت بروز چنین مشکلاتی کاربر وظیفه دارد سریعا {SETTINGS.WEBSITE_NAME} &nbsp;را در جریان گذاشته و در غیر این صورت {SETTINGS.WEBSITE_NAME} &nbsp;مسئولیتی در قبال دارایی&zwnj;های کاربر نخواهد داشت<span>.</span></p>

                        <p>۷<span>. </span>حساب کاربری باید فقط از طرف کاربر مورد استفاده قرار گیرد و استفاده شخص دیگر از حساب کاربری شخص صاحب حساب، خلاف قوانین می&zwnj;&zwnj;باشد. مسئولیت حقوق ھر کاربر برای استفاده از سایت به خود کاربراختصاص دارد و مسئولیت کلیه&zwnj;ی تراکنش&zwnj;ھای انجام شده از حساب کاربری وی به عھده&zwnj;ی خود شخص صاحب حساب است<span>.</span></p>

                        <p>۸<span>. </span>جھت حفظ امنیت و جلوگیری از سوءاستفاده از حساب كاربران، در صورت نیاز، تیم پشتیبانی {SETTINGS.WEBSITE_NAME} با كاربر تماس صوتی و یا تصویری خواھد داشت. در تماس مذكور ھیچگونه اطلاعات شخصی از قبیل رمز ورود به حساب کاربری و رمز كیف پول شخصی از كاربر خواسته نمی&zwnj;شود. لذا موارد مذکور تحت ھیچ شرایطی نباید در اختیار شخص دیگری، حتی پشتیبان&zwnj;ھای {SETTINGS.WEBSITE_NAME}، قرار داده شود. در غیر این صورت تمامی عواقب بر عھده&zwnj;ی صاحب حساب می&zwnj;باشد<span>.</span></p>

                        <h3>قوانین و مقررات<span>:</span></h3>

                        <p>تمامی فعالیت&zwnj;ھای سایت {SETTINGS.WEBSITE_NAME} در چارچوب قوانین جمھوری اسلامی می&zwnj;باشد و استفاده از خدمات {SETTINGS.WEBSITE_NAME}، اعم از ثبت نام، خرید و فروش رمزارز و غیره، بر مبنای مطالعه&zwnj;ی دقیق و پذیرش قوانین آن است. لذا کاربر اذعان می&zwnj;دارد منبع و مقصد کلیه&zwnj;ی ارزھای دیجیتال در تراکنش&zwnj;ھای سایت، کاملا قانونی و مطابق با قوانین بین المللی و مقررات جمھوری اسلامی ایران باشند<span>.</span></p>

                        <p>۱<span>. </span> تمامی ھزینه‌ھای خدمات و  <a href="https://BelkaCrypto-ex.com/fee/">  كارمزد تراكنش‌ھا </a>   در {SETTINGS.WEBSITE_NAME}، مطابق با توضیحات ارائه شده در صفحه‌ی   <a href="https://BelkaCrypto-ex.com/trade/"> خرید و فروش </a>  و     <a href="https://BelkaCrypto-ex.com/trade/"> واریز و برداشت </a>  می باشد   <span>.</span></p>

                        <p>۲<span>. </span>كاربران {SETTINGS.WEBSITE_NAME} متعھد می&zwnj;شوند که با بازار ارزھای دیجیتال آشنا ھستند و با وجود ریسک&zwnj;ھای مربوط به سرمایه گذاری در این حوزه، با علم و آگاھی کامل اقدام به سرمایه گذاری می&zwnj;نمایند و سود و ضرر ناشی از ھرگونه فعالیت كاربر در {SETTINGS.WEBSITE_NAME} به عھده وی می&zwnj;باشد<span>.</span></p>

                        <p>۳<span>. </span>{SETTINGS.WEBSITE_NAME} این اختیار را دارد تا در صورت تشخیص ھرگونه عمل خلاف و ناقض شرایط و قوانین ذکر شده، بلافاصله نسبت به مسدود کردن حساب کاربری شخص اقدام کند. در صورت مشاهده&zwnj;ی هرگونه سوءاستفاده از کد ریفرال {SETTINGS.WEBSITE_NAME} در فعالیت&zwnj;ھای خلاف قانون، تمامی مسئولیت آن به عھده&zwnj;&shy;ی کاربر بوده و ھمچنین {SETTINGS.WEBSITE_NAME} حق باطل کردن کد معرف و بستن حساب بدون نیاز به دستور قضایی را خواھد داشت<span>.</span></p>

                        <p>۴<span>. </span>{SETTINGS.WEBSITE_NAME} این اختیار را دارد که مبادله&zwnj;ی تومان را در صورت درخواست کتبی از محاکم و نھادھای دولتی یا در صورت مجرم شناخته شدن کاربر یا مظنون بودن او به تملک عواید از محل ارتکاب جرم و در سایر مواردی که بر سیاست عملیاتی {SETTINGS.WEBSITE_NAME} ضروری تشخیص داده شود، ممنوع اعلام کند<span>.</span></p>

                        <p>۵<span>. </span>اگر {SETTINGS.WEBSITE_NAME} تحت ھر عنوان اشتباھاً وجوه یا رمز ارزی را به حساب کاربر محاسبه یا واریز نماید، ھر زمان مجاز و مختار است بدون انجام ھیچ گونه تشریفات اداری و قضایی و بدون اخذ اجازه&zwnj;ی کتبی از صاحب حساب در رفع اشتباه و برداشت از حساب&zwnj;ھای وی اقدام نماید و تشخیص {SETTINGS.WEBSITE_NAME} نسبت به وقوع اشتباه یا پرداخت بدون حق و لزوم برداشت از حساب معتبر خواھد بود و کاربر حق ھرگونه اعتراض و ادعایی را در خصوص نحوه&zwnj;ی عملکرد {SETTINGS.WEBSITE_NAME} ، از ھر جھت، از خود ساقط می&zwnj;نماید<span>.</span></p>

                        <p>۶<span>. </span>در صورت بروز ھرگونه مشکل یا ابھام در ھر یک از معاملات یا سفارشات، {SETTINGS.WEBSITE_NAME} حق دارد مستقلاً آن سفارش را لغو و دارایی&zwnj;ھای ھر یک از طرفین را به حساب خودشان عودت دھد. بدیھی است که در صورتی که اشکال از سمت {SETTINGS.WEBSITE_NAME} باشد، موظف به جبران خسارت وارده خواھد بود و در غیر این صورت کاربر حق ھرگونه اعتراض و ادعایی را در خصوص نحوه&zwnj;ی عملکرد {SETTINGS.WEBSITE_NAME}، از ھر جھت، از خود ساقط می&zwnj;نماید<span>.</span></p>

                        <p>۷<span>. </span>{SETTINGS.WEBSITE_NAME} ھیچ گونه مسئولیتی در ارتباط با تاخیر یا تراکنش ناموفق ایجاد شده در انجام سفارش، به علت نقص یا مشکل یا تعمیرات در سیستم و شبکه&zwnj;ی رمز ارز مربوطه یا شبکه&zwnj;ی بانکی را پذیرنده نخواھد بود<span>.</span></p>

                        <p>۸<span>. </span>پرداخت وجه در {SETTINGS.WEBSITE_NAME}، با استفاده از بن کارت، کارت ھدیه و امثال این موارد امکان پذیر نیست<span>.</span></p>

                        <p>۹<span>. </span>{SETTINGS.WEBSITE_NAME} در مقابل واریز ھر رمز ارزی بر بستر اشتباه یا رمز ارزھایی که در {SETTINGS.WEBSITE_NAME} &nbsp;پشتیبانی نمی&zwnj;شود، ھیچ گونه مسئولیتی نخواھد داشت. لذا مسئولیت ھرگونه واریز اشتباه با خود کاربر بوده و کاربر حق ھیچ گونه شکایتی را نخواھد داشت<span>.</span></p>

                        <p>۱۰<span>. </span>در صورتی كه كاربر به سن قانونی نرسیده باشد (18 سال كامل شمسی)، {SETTINGS.WEBSITE_NAME} از ارائه&zwnj;ی خدمات به ایشان اجتناب می&zwnj;نماید. مگر اینکه ثبت نام و مدارک احراز از سمت و با دخالت ولی خاص یا یک قیم قانونی صورت بگیرد<span>.</span></p>

                        <p>۱۱<span>. </span>در صورت فوت یا حجر صاحب حساب، {SETTINGS.WEBSITE_NAME} این حق را دارد به محض مطلع شدن از آن نسبت به واریز وجوه ریالی کاربر نزد شرکت، به حساب اعلام شده&zwnj;ی ایشان در زمان ثبت نام اقدام کند و در مورد دارایی رمز ارز نیز این حق و اختیار به شرکت واگذار شده است که نسبت به تبدیل آن به ریال معادل قیمت روز و واریز آن به حساب فوق اقدام نماید و این حق و امتیاز توسط کاربر به شرکت صلح و اعطا گردید<span>.</span></p>

                        <p>۱۲<span>. </span>لازم به ذکر است ملاک زمانی محاسبه&zwnj;ی قیمت فروش دارایی رمز ارز کاربر، بر اساس ارائه&zwnj;ی اسناد توسط ذی نفع و تایید اصالت آن توسط واحد حقوقی {SETTINGS.WEBSITE_NAME} است. کاربر با علم و اطلاع از مقررات این بند نسبت به افتتاح حساب کاربری در {SETTINGS.WEBSITE_NAME} &nbsp;اقدام نموده و کاربر، اشخاص ثالث، ورثه یا قائم مقام قانونی ایشان حق اعتراض و یا ادعایی در آینده در این خصوص را نخواھند داشت<span>.</span></p>

                        <p>۱۳<span>. </span>استفاده از خدمات سایت {SETTINGS.WEBSITE_NAME} از جمله ثبت نام و احراز ھویت، خرید، فروش، واریز، برداشت و... به این معنی تلقی می&zwnj;شود که کاربر قوانین مذکور را تایید و قبول کرده&zwnj;است و در غیر این صورت، حق استفاده از امکانات سایت را ندارد<span>.</span></p>

                        <p>مواردی که در این موافقت&zwnj;نامه نمی&zwnj;باشد، تابع قوانین و مقررات جمھوری اسلامی ایران و یا تابع قواعد اعلامی از سوی {SETTINGS.WEBSITE_NAME} خواھد بود.</p>
                    </div>
                    <img
                        src="/images/rules.png"
                        width={550}
                        height={450}
                        alt=""
                    />
                </Content>
            </RulesMain>
            <LandingFooter />
        </Main>
    );
}
