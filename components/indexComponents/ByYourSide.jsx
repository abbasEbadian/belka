import React from 'react'
import styled from '@emotion/styled'
import BySidePic1 from '@/p/index_images/24h-icone.svg'
import BySidePic2 from '@/p/index_images/Community.svg'
import BySidePic3 from '@/p/index_images/News.svg'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Image from 'next/image'
import { SETTINGS } from '../settings'

const ByYourSideBody = styled.div `
    .by-your-side-box{
        padding-block: 5rem;
        .caption-box{
            margin-bottom: 2.5rem;
            .caption{
                color: var(--blue900);
                font-size: 2.5rem;
                line-height: 3rem;
            }
        }
        .by-your-side-item{
            .title{
                font-weight: 500;
                font-size: 1.5rem;
                line-height: 2rem;
                color:var(--gray900);
                margin-top: 1.5rem;
            }
            .text{
                font-weight: 400;
                color: var(--white400);
                font-size: 1rem;
                line-height: 1.875rem;
                margin-top: 0.75rem;
                margin-bottom: 0px;
            }
            .by-your-side-link{
                color: var(--green);
                margin-top: 1rem;
                padding: 0.5rem 0.5rem 0.5rem 0px;
                font-weight: 500;
                font-size: 0.875rem;

                }
            }
    }
    @media (max-width: 992px){
        .by-your-side-box{
        padding-block: 2rem;
        .caption-box{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            .caption{
                font-size: 2rem;
                text-align: center;
            }
        }
        .by-your-side-item{
            margin-bottom: 32px;
            .title{
                font-size: 1rem;
                margin-top: 1rem;
            }
            .text{
                font-size: 1rem;
                margin-top: 0.75rem;
                margin-bottom: 0px;
            }
            .by-your-side-link{
                margin-top: 1rem;
                font-size: 0.875rem;

                }
            }
        }
    }
 
`
function ByYourSide() {
  return (
    <>
    <ByYourSideBody>
        <div className="container">
            <div className="by-your-side-box d-flex flex-column  ">
                <div className="caption-box">
                    <span className="caption">در کنار شما</span>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="by-your-side-item mx-4 d-flex flex-column align-items-lg-start align-items-center">
                            <Image src={BySidePic1} alt="" />
                            <span className="title">خدمات مشتریان 24/7</span>
                            <p className="text">در هر زمان با پشتیبانی مشتری {SETTINGS.WEBSITE_NAME} با سوالات خود تماس بگیرید.</p>
                            
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="by-your-side-item mx-4 d-flex flex-column align-items-lg-start align-items-center">
                            <Image src={BySidePic2} alt="" />
                            <span className="title">انجمن</span>
                            <p className="text">جامعه جهانی {SETTINGS.WEBSITE_NAME} با پشتیبانی از بیش از 20 زبان، میزبان میلیون ها کاربر از 200+ کشور است.</p>
                           
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="by-your-side-item mx-4 d-flex flex-column align-items-lg-start align-items-center">
                            <Image src={BySidePic3} alt="" />
                            <span className="title">اخبار</span>
                            <p className="text">شما را در جریان آخرین اخبار کریپتو قرار می دهد.</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ByYourSideBody>
    </>
  )
}

export default ByYourSide