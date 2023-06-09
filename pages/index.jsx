import React from 'react'
import styled from '@emotion/styled'
import Header from '@/c/indexComponents/Header'
import Intro from '@/c/indexComponents/Intro'
import SpotCampaigns from '@/c/indexComponents/SpotCampaigns'
import ByYourSide from '@/c/indexComponents/ByYourSide'
import StartCrypto  from '@/c/indexComponents/StartCrypto '
import Table from '@/c/indexComponents/Table'

import Footer from '@/c/indexComponents/Footer'
import FAQ from '@/c/indexComponents/FAQ'
import AltcoinExchange from '@/c/indexComponents/AltcoinExchange'
import NewUsersOnly from '@/c/indexComponents/NewUsersOnly'
const HomeBody = styled.div`

`

function Home() {
  return (
    < >
        <HomeBody>
            <Header/>
            <Intro/>
          
            <SpotCampaigns/>
            <Table/>
            {/* <NewUsersOnly/> */}
            <AltcoinExchange/>

            <ByYourSide/>
            <FAQ/>
            <StartCrypto/>
            <Footer/>
        </HomeBody>
        
    </>
  )
}

export default Home