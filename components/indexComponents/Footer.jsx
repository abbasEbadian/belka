import React from 'react'
import styled from '@emotion/styled'
import LandingFooter from '../LandingFooter'
import { SETTINGS } from '../settings'
const FooterBody = styled.div`
    .copy-right-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-block: 16px;
        margin-top: 100px;
        border-top: 1px solid var(--white300);
        margin-inline: 50px;
        .text{
            color: var(--white400);
            font-size: 16px;
        }
    }
    @media (max-width: 992px){
        .copy-right-box{
        padding-block: 16px;
        margin-top: 50px;
        margin-inline: 16px;
        .text{
            color: var(--white400);
            font-size: 12px;
            width: 100%;
            text-align: center;
        }
    }
    }
`
function footer() {
  return (
    <>
    <FooterBody>
        <LandingFooter />
        <div className="copy-right-box d-flex align-items-center  justify-content-between">
            <span className="text">
                CopyRight © 2017 - 2023 {SETTINGS.WEBSITE_NAME_ENG_NO_SPACE} All Rights Reserved
            </span>
        </div>
    </FooterBody>
    </>
  )
}

export default footer