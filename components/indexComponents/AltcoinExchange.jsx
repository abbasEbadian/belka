import React from 'react'
import pic1 from '@/p/index_images/staticimg.svg'
import pic2 from '@/p/index_images/staticimg2.svg'
import pic3 from '@/p/index_images/staticimg3.svg'
import pic4 from '@/p/index_images/staticimg4.png'
import icon1 from '@/p/index_images/icon.png'
import icon2 from '@/p/index_images/2.png'
import icon3 from '@/p/index_images/3.png'
import icon4 from '@/p/index_images/4.png'
import icon5 from '@/p/index_images/5.png'
import icon6 from '@/p/index_images/6.png'
import AndroidIcon from '@/p/index_images/AndroidIcon.png'
import AppStore from '@/p/index_images/AppStore.png'
import googlepaly from '@/p/index_images/googlepaly.png'

import styled from '@emotion/styled'
import Image from 'next/image'
const AltcoinExchangeBody = styled.div`
    .box{
        margin-top: 2rem;
        .text2{
        font-size: 1.125rem;
        color: var(--white400);
        line-height: 1.875rem;
        }
        .img-box{
            img{
                width: 100%;
                object-fit: contain;
            }
        }
    }
    .text-body{
        .text-box{
            .text{
                margin-bottom: 1.25rem;
                font-weight: 500;
                font-size: 2.5rem;
                color: var(--blue900);
            }
        }
    }
    .cards{
        .title{
            color: var(--blue900);
            font-size: 1.5rem;
            line-height: 1.625rem;
            margin: 0.625rem 0px 0.5rem;
        }
    }

    .img-4 {
        width: 30rem;
        height: 20.875rem;
        img{
           width: 100%;
           object-fit: contain;
        }
    }
    .APK-box{
        .APK-content{
            margin-inline: 16px;
            cursor: pointer;
            .title{
                margin-top: 0.25rem;
                color:var(--blue900);
                font-weight:600;
                font-size: 1rem;
                min-width: 4.375rem;
            }
        }
    }
    @media (max-width: 992px){
        .box{
        margin-top: 2rem;
            .order1{
                order: 1;
            }
            .order2{
                order: 2;
            }
        .text2{
        font-size: 1rem;
        }
        .img-box{
            img{
                width: 100%;
                object-fit: contain;
            }
        }
    }
    .text-body{
        .text-box{
            .text{
                margin-bottom: 1rem;
           
                font-size: 1.5rem;

            }
        }
    }
    .cards{
        .title{
            font-size: 1rem;
            font-weight: bold;
        }
    }

    .img-4 {
        width: 19rem;
        height: 20.875rem;
        img{
           width: 100%;
           object-fit: contain;
        }
    }
    .APK-box{
        .APK-content{
            margin-inline: 16px;
            cursor: pointer;
            text-align: center;
            .title{
                margin-top: 0.25rem;
                font-weight:600;
                font-size: 1rem;
                min-width: 4.375rem;
            }
        }
    }
    }

`
function AltcoinExchange() {
  return (
    <>
    <AltcoinExchangeBody>
        <div className="box container d-flex flex-column">
            <div className="d-flex align-items-center flex-wrap justify-content-center mb-5 py-3">
                <div className="col-12 col-lg-6">
                    <div className="img-box">
                        <Image src={pic1} alt="" />
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="text-body d-flex flex-column align-items-start">
                        <div className="text-box d-flex flex-column align-items-start">
                            <span className="text"> صرافی برتر آلتکوین</span>
                            <span className="text2">سکه‌های امیدوارکننده‌ای را کشف کنید که در دیگر صرافی‌های ارز دیجیتال یافت نمی‌شوند.</span>
                        </div>
                        <div className="box w-100">
                            <div className="row">
                                <div className="col-6 col-lg-6">
                                    <div className="cards d-flex flex-column align-items-start">
                                        <Image src={icon2} alt=""  width={24} height={24}/>
                                        <span className="title">+50</span>
                                        <span className="text2">رمزارز  </span>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-6">
                                    <div className="cards d-flex flex-column align-items-start">
                                        <Image src={icon1} alt=""  width={24} height={24}/>
                                        <span className="title">+100 میلیون</span>
                                        <span className="text2">حجم معاملات انباشته </span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-center mb-5 py-3">

                <div className="col-12 col-lg-6 order2">
                    <div className="text-body d-flex flex-column align-items-start">
                        <div className="text-box d-flex flex-column align-items-start">
                            <span className="text"> صرافی برتر آلتکوین</span>
                            <span className="text2">سکه‌های امیدوارکننده‌ای را کشف کنید که در دیگر صرافی‌های ارز دیجیتال یافت نمی‌شوند.</span>
                        </div>
                        <div className="box w-100">
                            <div className="row">
                                <div className="col-6 col-lg-6">
                                    <div className="cards d-flex flex-column align-items-start">
                                        <Image src={icon3} alt=""   width={24} height={24}/>
                                        <span className="title">+700</span>
                                        <span className="text2">سکه</span>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-6">
                                    <div className="cards d-flex flex-column align-items-start">
                                        <Image src={icon4} alt=""   width={24} height={24}/>
                                        <span className="title">1+ تریلیون</span>
                                        <span className="text2">حجم معاملات انباشته (USD)</span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12 col-lg-6 order1">
                    <div className="img-box d-flex mx-auto justify-content-center" >
                        <Image src={pic2} alt="" className=' mx-auto' />
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-center mb-5 py-3">
                <div className="col-12 col-lg-6">
                    <div className="img-box d-flex" >
                        <Image src={pic3} alt="" className='mx  -auto' />
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="text-body d-flex flex-column align-items-start">
                        <div className="text-box d-flex flex-column align-items-start">
                            <span className="text"> صرافی برتر آلتکوین</span>
                            <span className="text2">سکه‌های امیدوارکننده‌ای را کشف کنید که در دیگر صرافی‌های ارز دیجیتال یافت نمی‌شوند.</span>
                        </div>
                        <div className="box w-100">
                            <div className="row">
                                <div className="col-6 col-lg-6">
                                    <div className="cards d-flex flex-column align-items-start">
                                        <Image src={icon5} alt=""  width={24} height={24}/>
                                        <span className="title">+700</span>
                                        <span className="text2">سکه</span>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-6">
                                    <div className="cards d-flex flex-column align-items-start">
                                        <Image src={icon6} alt=""  width={24} height={24}/>
                                        <span className="title">1+ تریلیون</span>
                                        <span className="text2">حجم معاملات انباشته (USD)</span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-center mb-5 py-3">

                <div className="col-12 col-lg-6">
                    <div className="text-body d-flex flex-column align-items-start">
                        <div className="text-box d-flex flex-column align-items-start">
                            <span className="text"> معامله از هر جا و از هر مکان</span>
                            <span className="text2"> با اپلیکیشن های مختلف به راحتی از هر دستگاهی خرید و فروش کنید.</span>
                        </div>
                        <div className="box w-100">
                            <div className="APK-box d-flex align-items-center">
                                
                                <div className="APK-content d-flex flex-column align-items-center">
                                    <Image src={AppStore} alt=""  width={40} height={40}/>
                                    <span className="title">App Store</span>
                                </div>
                                <div className="APK-content d-flex flex-column align-items-center">
                                    <Image src={googlepaly} alt=""  width={40} height={40}/>
                                    <span className="title">Google Play</span>
                                </div>
                                <div className="APK-content d-flex flex-column align-items-center">
                                    <Image src={AndroidIcon} alt=""  width={40} height={40}/>
                                    <span className="title">Android APK</span>
                                </div>
                              


                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12 col-lg-6">
                    <div className="img-box img-4 d-flex mx-auto">
                        <Image src={pic4} alt=""   className=''/>
                    </div>
                </div>
            </div>
        </div>
    </AltcoinExchangeBody>
    </>
  )
}

export default AltcoinExchange