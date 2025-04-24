import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopVets from '../components/TopVets'
import Banner from '../components/Banner'
import ProductList from '../components/ProductList'

const Home = () => {
  return (
    <div>
     <Header/>
     <SpecialityMenu/>
     <TopVets/>
     <Banner />
     <ProductList/>
    </div>
  )
}

export default Home