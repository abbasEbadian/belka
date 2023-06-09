import React from 'react'
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import styled from '@emotion/styled'
import googleplay from '@/p/index_images/googlepaly.png'
import mobilePic from '@/p/index_images/mobile.svg'
import { SETTINGS } from '../settings';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
const IntroBoody = styled.div`
    .intro-box {
	padding-block: 7rem;
	background: rgb(247, 248, 250) url("https://assets.staticimg.com/public-web/3.0.4/svg/bg-logo.c9dd9d5b.svg") 122px 0% / contain no-repeat;
    }   

    .intro-content {
        .title{
            color: var(--blue900);
            font-weight: 500;
            font-size: 2.5rem;
          
        }
        .title2{
            margin-top: 0.25rem;
            color: var(--blue100);
            font-weight: normal;
            font-size: 1.125rem;
            
        }
        .sign-up-box{
            background-color: var(--green);
            border-radius: 0.25rem;
            padding: 0px 2.5rem;
            margin-top: 1.875rem;
            padding-block: 0.5rem;
            
            .sign-up{
                color: var(--white);
                font-weight: normal;
                font-size: 1.125rem;
                text-align: center;
             
               
            }
        }
        .ttile3{
            font-weight: normal;
            font-size: 0.875rem;
            line-height: 1.125rem;
           
        }
        .color-green{
            color: var(--green);
        }
        .color-blue100{
            color: var(--blue100);
        }
        .gift-icon{
            
            display: inline-block;
            margin-left: 0.375rem;
            animation: 4s ease-in-out 0s infinite normal none running animation-1fpwq2i;
        }
   
    }
    .download-app-body{
        width: 19.75rem;
        height: 19.75rem;
        padding-bottom: 3.5rem;
        position: relative;
        margin-right: auto;
        .title{
            color: var(--blue900);
            z-index: 50;
        }
        .mobile{
            position: absolute;
            object-fit: cover;
            text-align: left;
            z-index: 30;

        }
        .download-app-conent{
            margin-top: 3.75rem;
            padding: 0px 1.625rem;
            z-index: 50;
            .download-app{
                background-color: var(--white);
                padding:10px;
                margin-inline: 5px;
                min-width: 83px;
                .text-download-app{
                    margin-top: 0.25rem;
                    color:var(--blue900);
                    font-size: 0.75rem;
                    white-space: nowrap;
                }
            }
            
        }

    }
    @media (max-width: 992px){
        .intro-box {
	    padding-top: 3rem;
	
        }  
        
        .intro-content {
            .title{

                font-size: 1.25rem;
        
            }
            .title2{
                margin-top:0px;
                font-size: 1rem;
            }
            .sign-up-box{
                text-align: center;
                width: 100%;
                margin-top: 1rem;
                margin-bottom: 10px;
               
                
                .sign-up{
                    color: var(--white);
                    font-weight: normal;
                    font-size: 1.125rem;
                    text-align: center;
                
                
                }
            }
            .ttile3{
                font-weight: normal;
                font-size: 0.875rem;
                line-height: 1.125rem;
            
            }
            .color-green{
                color: var(--green);
            }
            .color-blue100{
                color: var(--blue100);
            }
            .gift-icon{
                
                display: inline-block;
                margin-left: 0.375rem;
                animation: 4s ease-in-out 0s infinite normal none running animation-1fpwq2i;
            }
    
        }
        .download-app-body{
    
            width: 19.75rem;
            height: 19.75rem;
            margin-top: 50px;
            padding-bottom: 3.5rem;
            position: relative;
            margin-right: auto;
            .title{
                color: var(--blue900);
                z-index: 50;
            }
            .mobile{
                position: absolute;
                object-fit: cover;
                text-align: left;
                z-index: 30;

            }
            .download-app-conent{
                margin-top: 3.75rem;
                padding: 0px 1.625rem;
                z-index: 50;
                .download-app{
                    background-color: var(--white);
                    padding:10px;
                    margin-inline: 5px;
                    min-width: 83px;
                    .text-download-app{
                        margin-top: 0.25rem;
                        color:var(--blue900);
                        font-size: 0.75rem;
                        white-space: nowrap;
                    }
                }
                
            }

        }
    }
`
function Intro() {
  return (
    <>
    <IntroBoody>
        
        <div className="intro-box ">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div className="col-12 col-lg-7">
                        <div className="intro-content d-flex flex-column align-items-center align-items-lg-start text-center text-lg-start  ">
                            <Typography variant='h3' display={"flex"}  color={'black'} gap={2} flexWrap={"wrap"} justifyContent={{
                                lg: "flex-start",
                                xs: "center"
                            }} textAlign={{
                                lg: "right" ,
                                xs: "center"
                            }}>
                                <Typography  color={'primary.main'} variant='h3' component={'span'}>
                                    سریع    
                                </Typography> 
                                و 
                                <Typography  color={'primary.main'} variant='h3' component={'span'}>
                                    امن؛
                                </Typography> 
                             این شعار  {SETTINGS.WEBSITE_NAME} است </Typography>
                            <Typography mt={2}>خرید و فروش امن بیت کوین و ارزهای دیجیتال با { SETTINGS.WEBSITE_NAME}</Typography>
                            <Link href="/signup">
                                <Button variant='contained' sx={{my: 4, minWidth: 100}}>
                                    ثبت نام
                                </Button>
                            </Link>
                           

                        </div>
                    </div>
                   
                </div>
            </div>

        </div>

    </IntroBoody>
    </>
  )
Boody}

export default Intro