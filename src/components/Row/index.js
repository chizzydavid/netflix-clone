import React, { useState, useEffect }  from 'react'
import './Row.css'
import axios from "../../axios"
import VideoModal from "../VideoModal"
import requests from "../../Requests"
import StarRatings from 'react-star-ratings';
import { truncate, shuffleArray } from '../../utils/helpers';

function Row({ title, fetchUrl, isLargeRow }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [isNetflixMovie, setIsNetflixMovie] = useState(false);
    const [loading, setLoading] = useState(false);

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const baseImgUrl = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(shuffleArray(request.data.results));
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = async (movie, isNetflixMovie) => {
        setLoading(true);
        setIsNetflixMovie(isNetflixMovie);
        setTrailerUrl('');

        const request = await axios.get(isNetflixMovie ? requests.fetchNetflixMovie(movie.id) : requests.fetchMovieById(movie.id));
        setSelectedMovie(request.data);
        
        const getTrailer = await axios.get(isNetflixMovie ? requests.fetchNetflixTrailer(movie.id) : requests.fetchMovieTrailer(movie.id));
        const videos = getTrailer.data.results;
        setLoading(false);

        if (videos.length > 0) {
            let keyVid = videos.find((i) => i.name.toLowerCase().includes('trailer'));
            if (keyVid === undefined) keyVid = videos[0];

            setTrailerUrl(keyVid.key);
        }
        setShowModal(true);
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => { 
                    if (!isLargeRow && (movie.title === undefined && movie.original_title === undefined)) return null;
                    
                    return (
                        ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) && (
                            <div
                                key={movie.id}
                                className="poster__container"
                                onClick={
                                    isLargeRow
                                    ? () => handleClick(movie, true)
                                    : () => handleClick(movie, false)
                                }
                            >
                                <div className={`${isLargeRow ? "poster__wrapperLarge" : "poster__wrapper"}`} key={movie.id}>
                                    <img 
                                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                        src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                                        alt={movie.name}
                                    />

                                    {!isLargeRow && 
                                        <div className="card__footer" > 
                                            <p className="movie__name">{movie.title ? truncate(movie.title, 30) : truncate(movie.original_title, 30)}</p> 
                                            <StarRatings
                                                rating={movie.vote_average/2}
                                                starRatedColor="#E9BF0E"
                                                starDimension="10px"
                                                starSpacing="2px"
                                                starEmptyColor="#b3b3b3"
                                            />
                                            <span className="ratings">{movie.vote_average.toFixed(1)}</span> 
                                            <span className="more">View Details</span>
                                        </div>
                                    }
                                </div>
                            </div>
                    
                    
                        )
                    )}
                )}
            </div>

            <VideoModal 
              showModal={showModal} 
              setShowModal={setShowModal} 
              trailerUrl={trailerUrl} 
              movie={selectedMovie}
              loading={loading}
              isNetflixMovie={isNetflixMovie}
            />
        </div>
    )
}

export default Row
