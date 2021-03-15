import React from 'react'
import './HomeScreen.css'
import Nav from '../../components/Nav'
import Banner from '../../components/Banner'
import Row from '../../components/Row'
import Footer from '../../components/Footer'
import Search from '../../components/Search'
import requests from "../../Requests"
import { selectQuery } from '../../features/movieSlice'
import { useSelector } from 'react-redux';

function HomeScreen() {
    const searchString = useSelector(selectQuery);

    return (
        <div>
            <Nav />

            {searchString 
            
                ? <Search searchString={searchString} />
            
                : (
                    <>
                        <Banner />
            
                        <Row title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                        <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
                        <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
                        <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
                        <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
                        <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
                        <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
                        <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
                        <Footer />
                    </>
                )
            }

        </div>
    )
}

export default HomeScreen
