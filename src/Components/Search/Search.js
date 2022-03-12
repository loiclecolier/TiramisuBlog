import React, { useState, useMemo } from 'react'
import './Search.css'
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import { v4 as uuidv4 } from 'uuid'

let PageSize = 12;

export default function Search({data}) {

    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (e) => {
        e.preventDefault();
        let lowerCase = e.target.value.toLowerCase();
        setSearchInput(lowerCase);
    }

    const filteredData = data.filter((article) => {
        if (searchInput === '') {
            return data;
        }
        else {
            return article.title.toLowerCase().includes(searchInput);
        }
    });

    const paginatedData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [filteredData, currentPage]);

    return (
        <>
            <div className="header-articles">
                <h1 className="home-title">{searchInput === '' ? "Tous les articles" : "Recherche"}</h1>
                <div className="search">
                    <input
                        type="search"
                        onChange={handleChange}
                        value={searchInput}
                        placeholder="Rechercher un article..."
                        maxLength="50"
                        className="input-search"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
            </div>
            <div className="container-cards">
                {paginatedData.length > 0 ?
                    paginatedData.map(article => {
                        return (
                        <Card title={article.title} body={article.body} key={uuidv4()}></Card>
                        )
                    })
                    : <h2 className="article-not-found">Aucun article ne correspond à votre recherche : {searchInput}</h2>
                }
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={filteredData.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}
