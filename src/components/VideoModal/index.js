import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import CloseIcon from '@material-ui/icons/Close';
import YouTube from "react-youtube"
import './VideoModal.css'
import StarRatings from 'react-star-ratings';
import Loader from "react-loader-spinner";
import { truncate } from '../../utils/helpers';

const VideoModal = ({ showModal, setShowModal, trailerUrl, movie, loading, isNetflixMovie }) => {
  const modalRef = useRef();
  const baseImgUrl = "https://image.tmdb.org/t/p/original/";
  let smallScreen = window.innerWidth <= 700;

  const imgUrl = `${baseImgUrl}${movie.backdrop_path || movie.poster_path}`;
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  let videoEmbedHeight = smallScreen ? 200 : 400;
  const opts = {
    height: `${videoEmbedHeight}`,
    width: "100%",
    playerVars: {
        autoplay: 1
    },
  }

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <>
      {loading 
      ? 
         <div className="VideoBackground" onClick={closeModal} ref={modalRef}>
            <Loader
              type="TailSpin"
              color="#fff"
              height={100}
              width={100}
            /> 
         </div> 
      : 
        showModal ? (
          <div className="VideoBackground" onClick={closeModal} ref={modalRef}>
            <animated.div className="animated" style={animation}>
              
              <div className="VideoModalWrapper">
                <div className="videoEmbed" >
                  {trailerUrl === '' 
                    ? (
                        <img
                            className="imageModal"
                            src={`${imgUrl}`} 
                            alt={movie.name}
                        />                  
                      )
                    : (<YouTube videoId={trailerUrl} opts={opts} />)}
                  
                </div>

                <div className="VideoModalContent">

                {isNetflixMovie
                  ? <h2>{movie.name ? movie.name : movie.original_name}</h2>
                  : <h2>{movie.title ? movie.title : movie.original_title}</h2>}
                  <p className="overview">{smallScreen ? truncate(movie.overview, 200) : movie.overview}</p>

                  <div className="video__details">
                    <div>
                      <StarRatings
                        rating={movie.vote_average/2}
                        starRatedColor="#E9BF0E"
                        starDimension= {smallScreen ? "10px" : "20px"}
                        starSpacing={smallScreen ? "2px" : "4px"}
                      />
                      <span className="ratings">{movie.vote_average.toFixed(1)}</span>
                      <div></div>
                    
                      <p className="content_key genre">Genres:</p>
                      {movie.genres.map((genre, i) => 
                        <span key={genre.id} className="movie__genre">{genre.name}{i === movie.genres.length - 1 ? '' : ', '}</span>)
                      }
                    </div>

                    <div>
                      {isNetflixMovie
                        ? <p className="content_key">Episode Run Time: <span className="white_text">{movie.episode_run_time[0]}mins</span></p>
                        : <p className="content_key">Run Time: <span className="white_text">{movie.runtime}mins</span></p>}

                      {isNetflixMovie
                        ? <p className="content_key">No. of Seasons: <span className="white_text">{movie.number_of_seasons}</span></p>
                        : <p className="content_key">Released: <span className="white_text">{movie.release_date}</span></p>} 
                      {isNetflixMovie
                        ? <p className="content_key">First Air Date: <span className="white_text">{movie.first_air_date}</span></p>
                        : null}
                    </div>
                  </div>
                </div>

                <CloseIcon 
                  className="CloseVideoModalButton"
                  aria-label='Close modal'
                  onClick={() => setShowModal(prev => !prev)}              
                />
              </div>
            
            </animated.div>
          
          </div>
        ) : null}   
    </>
  );
};

export default VideoModal;

