import React, { useMemo, useState } from 'react'
import './Home.css'
import Card from '../../Components/Card/Card'
import Banner from '../../Components/Banner/Banner'
import Pagination from '../../Components/Pagination/Pagination'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getArticles } from '../../redux/articles/articleReducer'
import { v4 as uuidv4 } from 'uuid'

let PageSize = 12;

export default function Home() {
  
  const [currentPage, setCurrentPage] = useState(1);

  const {articles} = useSelector(state => ({
    ...state.articleReducer
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticles());
    }

  }, [])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return articles.slice(firstPageIndex, lastPageIndex);
  }, [articles, currentPage]);

  return (
    <>
        <Banner/>
        <div id="container-home">
          <h1 className="home-title">Tous les articles</h1>
          <div className="container-cards">
            {currentTableData.map(item => {
              return (
                <Card title={item.title} body={item.body} key={uuidv4()}></Card>
              )
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={articles.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
    </>
  )
}
