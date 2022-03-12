import React from 'react'
import './Home.css'
import Banner from '../../Components/Banner/Banner'
import ArticlesList from '../../Components/ArticlesList/ArticlesList'

export default function Home() {

  return (
    <>
        <Banner/>
        <div id="container-home">
          <ArticlesList/>
        </div>
    </>
  )
}
