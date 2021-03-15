import React, { useState, useEffect }  from 'react'
import './Search.css'
import axios from "../../axios"
import VideoModal from "../VideoModal"
import requests from "../../Requests"
import { truncate } from '../../utils/helpers';
import Loader from "react-loader-spinner";

function Search({ searchString }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [isNetflixMovie, setIsNetflixMovie] = useState(false);
    const [loadingTrailer, setLoadingTrailer] = useState(false);
    const [loadingResults, setLoadingResults] = useState(false);

    const isLargeRow = true;

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const baseImgUrl = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            setLoadingResults(true);
            const request = await axios.get(requests.searchMovie(searchString));
            setMovies(request.data.results);
            setLoadingResults(false);
            return request;
        }
        fetchData();
    }, [searchString]);
 


    const handleClick = async (movie, isNetflixMovie) => {
        setLoadingTrailer(true);
        setIsNetflixMovie(isNetflixMovie);
        setTrailerUrl('');

        const request = await axios.get(movie.media_type === 'tv' ? requests.fetchNetflixMovie(movie.id) : requests.fetchMovieById(movie.id));
        setSelectedMovie(request.data);
        
        const getTrailer = await axios.get(movie.media_type === 'tv' ? requests.fetchNetflixTrailer(movie.id) : requests.fetchMovieTrailer(movie.id));
        const videos = getTrailer.data.results;
        setLoadingTrailer(false);

        if (videos.length > 0) {
            let keyVid = videos.find((i) => i.name.toLowerCase().includes('trailer'));
            if (keyVid === undefined) keyVid = videos[0];

            setTrailerUrl(keyVid.key);
        }
        setShowModal(true);
    }

    return (
        <div className="section">
            <h2 className="search_preview">{searchString}</h2>


            <div className="row">

                {loadingResults
                ? 
                    <div className="loader-wrapper">
                        <Loader
                            type="TailSpin"
                            color="#fff"
                            height={100}
                            width={100}
                        /> 
                    </div>
                : 

                <div className="row__posters search">
                    {movies.length === 0 
                        ? 
                          <p className="no_results">No Search Results Found</p>
                        
                        : movies.map((movie) => { 
                            if (!isLargeRow && (movie.title === undefined && movie.original_title === undefined)) return null;
                            
                            return (
                                ((isLargeRow && movie.poster_path) ||
                                (!isLargeRow && movie.backdrop_path)) && (
                                    <div
                                        key={movie.id}
                                        className="poster__container search"
                                        onClick={
                                            isLargeRow
                                            ? () => handleClick(movie)
                                            : () => handleClick(movie)
                                        }
                                    >
                                        <div className="search__poster__wrapperLarge" key={movie.id}>
                                            <img 
                                                className="search__row__posterLarge"
                                                src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                                                alt={movie.name}
                                            />

                                            {isLargeRow && 
                                                <div className="card__overlay" > 
                                                    <p className="search__movie__name">{movie.title ? truncate(movie.title, 30) : truncate(movie.original_title, 30)}</p> 
                                                    <p className="search__movie__desc">{truncate(movie.overview, 60)}</p> 
                                                    <p className="search__more">View Details</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                            
                                )
                            )}
                    )}
                </div>} 
            </div>


            <VideoModal 
              showModal={showModal} 
              setShowModal={setShowModal} 
              trailerUrl={trailerUrl} 
              movie={selectedMovie}
              loading={loadingTrailer}
              isNetflixMovie={isNetflixMovie}
            />
        </div>
    )
}

export default Search
