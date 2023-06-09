import React from 'react'
import styled from '@emotion/styled'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const SpotCampaignsBody = styled.div`
    padding-block: 16px;
    .SpotCampaigns-content{
        .SpotCampaigns-link{
            color: var(--blue900);
            font-size: 0.75rem;
            svg{
                color: var(--white400);
            }
        }
        .date{
            font-size: 0.75rem;
            color: var(--white400);
            margin-inline: 20px;
            position: relative;
            &::After{
                position: absolute;
                top: 0;
                left: -10px;
                height: 100%;
                width: 1px;
                content: " ";
                background-color: var(--white400);
            }
        }
    }
`
function SpotCampaigns() {
    return ;
  return (
    <>
        <SpotCampaignsBody>
            <div className="container">
                <div className="SpotCampaigns-box d-flex align-items-center justify-content-between">
                    <div className="SpotCampaigns-content">
                        <a href="" className="SpotCampaigns-link">Spot Campaigns</a>
                    </div>
                    <div className="SpotCampaigns-items d-flex align-items-center ">
                        <div className="SpotCampaigns-content d-flex align-items-center ">
                            <span className="date">05-29</span>
                            <a href="" className="SpotCampaigns-link">KCS Team Completes 39th (April 2023) KCS Burn</a>
                            
                        </div>
                        <div className="SpotCampaigns-content d-flex align-items-center ">
                            <span className="date">05-29</span>
                            <a href="" className="SpotCampaigns-link">KCS Team Completes 39th (April 2023) KCS Burn</a>
                           
                        </div>
                        <div className="SpotCampaigns-content d-flex align-items-center  ms-lg-5">
                            <span className="date">05-29</span>
                            <a href="" className="SpotCampaigns-link">
                                <ArrowBackIosIcon fontSize='small'/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </SpotCampaignsBody>
    </>
  )
}

export default SpotCampaigns