import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import React, { useState } from 'react'

function WalletTableC({ wallet }) {
    const [expanded, setExpanded] = useState(null)
    const isMobile = useMediaQuery("(max-width: 992px)");
    const changeExpanded = (item) => {
        if(!isMobile) return 
        setExpanded(item)
    }
  return (
    <Box>
        {
            wallet.map((item, idx) => {
                return <Accordion expanded={expanded === item.id} onChange={changeExpanded(item.id)} key={item.id}>
                <AccordionSummary expandIcon={isMobile && <GridExpandMoreIcon />}
                >
                  <Stack direction={'row'} sx={{width: "100%"}}>
                    <Typography sx={{ width: 32, flexShrink: 0 }}>
                        {idx +1}
                    </Typography>
                    <Typography sx={{ width: "25%", flexShrink: 0 }}>
                        {item.service.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', width: "40%",  }}> 
                        <Typography variant='caption'> {item.service.small_name_slug} </Typography>
                        {Number(item.balance).toLocaleString()} 
                    </Typography>
                    <Stack direction={"row"} spacing={2} display={{
                        xs: "none",
                        lg: "flex"
                    }}>
                            <Button size="small" variant='outlined' color="success"> واریز </Button>
                            <Button size="small" variant='outlined' color="error">  برداشت</Button>
                            <Button size="small" variant='outlined' color="info">  معامله</Button>
                    </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            })
        }
        
     
     
    </Box>
  )
}

export default WalletTableC