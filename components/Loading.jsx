import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { SETTINGS } from './settings'

const Load = styled(Box)`
    
    .loader {
    width: 100px;
    height: 100px;
    background-color: #ff3d00;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 30px 4px rgba(0, 0, 0, 0.5) inset,
      0 5px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 45%;
    top: -40%;
    background-color: #fff;
    animation: wave 5s linear infinite;
  }
  .loader:before {
    border-radius: 30%;
    background: rgba(255, 255, 255, 0.4);
    animation: wave 5s linear infinite;
  }
  @keyframes wave {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`
function Loading() {
    return (
        <Load sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: 'column'
        }}> 
            <Typography marginBottom={4} variant={"h4"}>
              {SETTINGS.WEBSITE_NAME_ENG_NO_SPACE}
            </Typography>
            <br />
            <br />
            <span className='loader'></span>

         </Load>
    )
}

export default Loading