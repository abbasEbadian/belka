import React from 'react'
import gift from '@/p/index_images/gift.png'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import styled from '@emotion/styled'
import Link from 'next/link';
import { Box, Button, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
const NewUsersOnlyBody = styled.div`
    background: rgb(247, 248, 250);
    padding: 60px 24px 80px;  
  .new-users-box{
  
    .img-box{
      width: 480px;
      height: 360px;
      img{
        width: 100%;
        object-fit: cover;
      }
    }
    .caption-box{
      .title{
        margin-bottom: 4px;
        font-weight: 500;
        font-size: 40px;
        line-height: 48px;
        color: var(--blue900);
      }
      .text{
        margin-bottom: 41px;
        font-size: 18px;
        line-height: 30px;
        color: var(--white400);
      }
    }
    .new-users-only-items{
      div.steps{
        background-color: var(--green) !important;
        color: var(--white);
        border: none;
      }
      .step-box{
        margin-left: 24px;
        
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--white);
        border-radius: 50%;
        border: 1px solid var(--white400);
        width: 48px;
        height: 48px;
        font-size: 18px;


      }
      .line5478{
        position: relative;
        &::after{
          content: " ";
          position: absolute;
          left: 23px;
          bottom: -74px;
          height: 150%;
          width: 1px;
          background-color: var(--white400);

        }
      }
    }
    .new-users-only-content{
      svg{
        color: var(--blue900);
      }
      .caption-link{
        color: var(--blue900);
        font-size: 24px;
        text-decoration: none;
      }
      padding-bottom: 42px;
      .title{
        color: var(--blue900);
        font-size: 24px;

      }
      .text{
        font-size: 16px;
        line-height: 26px;
        color: var(--white400);
      }
    }
  }
    @media (max-width: 992px){
     

	    padding: 32px 15px 48px;

      .new-users-box{
    
    .img-box{
      width: 280px;
      img{
        width: 100%;
        object-fit: cover;
      }
    }
    .caption-box{
      .title{
        font-size: 24px;

      }
      .text{
        margin-bottom: 32px;
        font-size: 15px;

      }
    }
    .new-users-only-items{
      div.steps{
        background-color: var(--green) !important;
        color: var(--white);
        border: none;
      }
      .step-box{
        margin-left: 15px;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        font-size: 18px;


      }
      .line5478{
        position: relative;
        &::after{
          content: " ";
          position: absolute;
          left: 20px;
          bottom: -74px;
          height: 150%;
          width: 1px;


        }
      }
    }
    .new-users-only-content{
      svg{
      }
      .caption-link{
        
        font-size: 16px;
      
      }
      padding-bottom: 20px;
      .title{
        font-size: 16px;

      }
      .text{
        font-size: 14px;
  
      }
    }
  }
    }
  
  

`
const steps = [
  {
    label: "ثبت نام",
    arrow: true,
    href: "/register"
  },
  {
    label: " خرید رمزارز",
  },
  {
    label: "تبادل و خرید و فروش"
  }
]
function NewUsersOnly() {
  return (
    <>
      <NewUsersOnlyBody>
        <div className="container">
          <div className="new-users-box d-flex  flex-column">
            <div className="caption-box mb-5">
              <span className="title"> کاربران جدید</span>
            </div>
            <div className="row">
              <div className="col-12 col-lg-6">
                <Stepper orientation="vertical">
                  {
                    steps.map(step => {
                      return <Step key={step.label}>
                        <StepLabel>
                          <Link href={step.href??"#"} >
                            <Typography role='button' color="grey" variant='h6'>
                              {step.label}
                              {step.arrow && <KeyboardArrowLeftIcon fontSize='large' />}
                            </Typography>
                          </Link>
                        </StepLabel>
                      </Step>
                    })


                  }

                </Stepper>
              </div>
              <div className="col-12 col-lg-6">
                <div className="img-box">
                  <img src={gift} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </NewUsersOnlyBody>
    </>
  )
}

export default NewUsersOnly