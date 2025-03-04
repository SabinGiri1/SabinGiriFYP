import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopVets from '../components/TopVets'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
     <Header/>
     <SpecialityMenu/>
     <TopVets/>
     <Banner />
    </div>
  )
}

export default Home