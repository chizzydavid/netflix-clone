import React, { useState, useEffect }  from 'react'
import './Banner.css'
import axios from "../../axios"
import requests from "../../Requests"
import { truncate } from '../../utils/helpers';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideoModal from "../VideoModal"
import StarRatings from 'react-star-ratings';

function Banner() {
    const [movie, setMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');

    let smallScreen = window.innerWidth <= 700;

    const handleClick = async () => {
        setLoading(true);
        setTrailerUrl('');

        const request = await axios.get(requests.fetchNetflixMovie(movie.id) );
        setSelectedMovie(request.data);
        
        const getTrailer = await axios.get(requests.fetchNetflixTrailer(movie.id));
        const videos = getTrailer.data.results;
        setLoading(false);

        if (videos.length > 0) {
            let keyVid = videos.find((i) => i.name.toLowerCase().includes('trailer'));
            if (keyVid === undefined) keyVid = videos[0];

            setTrailerUrl(keyVid.key);
        }
        setShowModal(true);
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[ Math.floor(Math.random() * request.data.results.length - 1)]);
            return request;
        }
        fetchData();
    }, [])

    return (
        <header className="banner" style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}
        >

            <div className="banner__contents">
                <h2 className="banner__intro">Today's Featured Film</h2>
                
                {movie 
                
                ? (
                    <>
                        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                    
                            <StarRatings
                                rating={movie.vote_average/2}
                                starRatedColor="#E9BF0E"
                                starDimension="25px"
                                starSpacing="5px"
                            />
                            <span className="ratings"> {movie.vote_average.toFixed(1)}  ({movie.vote_count})</span>               
                            <h1 className="banner__description">{truncate(movie?.overview, smallScreen ? 150 : 250)} </h1>
                    
                        <div className="banner__buttons">
                            <button className="banner__button"
                            onClick={() => handleClick()}
                            >
                                <VideocamIcon className="videoIcon"/>
                                Play Trailer
                            </button>
                        </div>
                    </>
                ) 
                : null}
            </div>

            <div className="banner__fadeBottom" />
            
            <VideoModal 
              showModal={showModal} 
              setShowModal={setShowModal} 
              trailerUrl={trailerUrl} 
              movie={selectedMovie}
              loading={loading}
              isNetflixMovie={true}
            />

        </header>
    )
}

export default Banner
