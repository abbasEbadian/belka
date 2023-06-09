import React from 'react'
import styled from '@emotion/styled'
import { SETTINGS } from '../settings'
const FAQBody = styled.div`
  .caption-box{
    .caption{
      font-weight: 500;
      font-size: 2.25rem;
      line-height: 2.5rem;
      color: var(--blue900);

    }
  }
  .faq-box{
    margin-top: 2.5rem;
    .faq-content{
      margin-inline: 50px;
      .title{
        color: var(--dark);
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 0.75rem;;
      }
      .text{
        font-size: 0.875rem;
        line-height: 1.375rem;
        color:var(--white400);
      }
    }
  }
  @media (max-width: 992px){
    .caption-box{
    .caption{
      font-size: 1.25rem;

    }
    }
    .faq-box{
      margin-top: 2.5rem;
      .faq-content{
        margin-inline: 10px;
        .title{
          font-size: 1rem;
          font-weight: bold;
        }
        .text{
          font-size: 0.875rem;
        }
      }
    }
  }
`
function FAQ() {
  return (
    <>
    <FAQBody>
        <div className="container">
            <div className="caption-box d-flex align-items-center justify-content-center ">
                <span className="caption">سوالات متداول</span>

            </div>
            <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="faq-box d-flex flex-column align-item-start">
                    <div className="faq-content d-flex flex-column">
                      <span className="title">بیت کوین چیست؟</span>
                      <p className="text">بیت کوین یک ارز دیجیتال غیرمتمرکز است، به این معنی که فاقد بانک مرکزی یا مدیر واحد است. بیت کوین را می توان از طریق شبکه همتا به همتا بدون نیاز به واسطه از کاربر به کاربر دیگر ارسال کرد.</p>
                    </div>
                    <div className="faq-content d-flex flex-column">
                      <span className="title">آیا می توانم تجارت را فقط با 1 دلار شروع کنم؟</span>
                      <p className="text">{SETTINGS.WEBSITE_NAME} به کاربران اجازه می دهد تا تجربه عملی خود را از طریق انواع محصولات تجاری و مالی با کمتر از 1 دلار بهبود بخشند.</p>
                    </div>
                    
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="faq-box d-flex flex-column align-item-start">
                    <div className="faq-content d-flex flex-column">
                      <span className="title">آیا {SETTINGS.WEBSITE_NAME} یک صرافی امن رمزنگاری شده است؟</span>
                      <p className="text">{SETTINGS.WEBSITE_NAME} دارای یکی از پیچیده ترین تیم های فناوری امنیتی و تعمیر و نگهداری در جهان است و به طور مداوم در حال ارتقاء سیستم های امنیتی خود برای اطمینان از ایمنی دارایی ها و حساب های کاربر است.</p>
                    </div>
                    <div className="faq-content d-flex flex-column">
                      <span className="title">آیا محدودیت مبادله ای بین فیات و کریپتو وجود دارد؟</span>
                      <p className="text">{SETTINGS.WEBSITE_NAME} هیچ محدودیتی در تبادل بین فیات و کریپتو ندارد و از بیش از 50 ارز فیات از طریق بازار P2P و کانال های کارت اعتباری/دبیت ما پشتیبانی می کند.</p>
                    </div>
                    
                  </div>
                </div>
            </div>

        </div>
    </FAQBody>
    </>
  )
}

export default FAQ