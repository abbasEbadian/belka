import React from 'react'
import Crypto from '@/p/index_images/Crypto.png'
import styled from '@emotion/styled'
import Image from 'next/image'
import { SETTINGS } from '../settings'
import { Box, Button, Link } from '@mui/material'

const StartCryptoBody = styled.div`
    padding-top: 4rem;
    .start-crypto-box{
        position: relative;
        img{
            position: absolute;
            width: 100%;
            z-index: 20;
        }
        .start-crypto-content{
            padding-top: 7rem;
            z-index: 50;
            position: relative;

            
            .caption{
                color: var(--blue900);
                font-weight: 500;
                font-size: 2.25rem;
                line-height: 2.5rem;
            }
            .text{
                margin-top: 0.75rem;
                margin-bottom: 3rem;
                padding: 0px;
                color: var(--white400);
                font-weight: 400;
                font-size: 1.5rem;
            }
            .start-crypto-link{
                color: var(--white);
                font-size: 1rem;
                background-color: var(--green);
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                text-align: center;
            }
        }
    }
    @media (max-width: 992px){
        .start-crypto-box{
        position: relative;
        img{
           
        }
        .start-crypto-content{
            padding-top: 15%;
            z-index: 50;
            position: relative;

            
            .caption{
                font-size: 1.25rem;
            }
            .text{
                margin-top: 0.75rem;
                margin-bottom: 1.5rem;
                font-size: 1rem;
            }
            .start-crypto-link{
                font-size: 1rem;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                text-align: center;
                width: 100%;
            }
        }
        }
    }
`
function StartCrypto () {
  return (
    <>
    <StartCryptoBody>
        <div className=" start-crypto-box">
            <Box position={"absolute"} sx={{inset: 0}}>
             <Image src={"/index_images/Crypto.png"} alt="" layout='fill' sx={{ position: "absolute", inset: 0, width: "100%" }}/>
            </Box>
            <Box className=" container " pb={8}>
                
                <div className="col-12">
                <div className="start-crypto-content d-flex align-items-center justify-content-center flex-column">
                    <span className="caption">
                    اکنون سفر رمزنگاری خود را شروع کنید!
                    </span>
                    <p className="text">با اپلیکیشن و وب سایت {SETTINGS.WEBSITE_NAME} تجارت هرگز آسان تر از امروز نبوده است.
                    </p>
                    <Link href="/register">
                        <Button variant='contained'>
                            ثبت نام کن
                        </Button>
                    </Link>
                </div>
                </div>
            </Box>

        </div>
    </StartCryptoBody>
    </>
  )
}

export default StartCrypto 