import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Details.css';
import Rating from '../rating/Rating';
import Tabs from './tabs/Tabs';
import Overview from './overview/Overview';
import Crew from './crew/Crew';
import Media from './media/Media';
import Reviews from './reviews/Reviews';
import { movieDetails } from '../../../redux/actions/moviesAction.';
import { IMAGE_URL } from '../../../services/movies.service';

const Details: any = (props: any) => {
  const { movieDetails, movie } = props;
  const [details, setDetails] = useState({
    backdrop_path: '',
    poster_path: '',
    release_date: '',
    genres: [],
    title: '',
    vote_average: 0.0,
    vote_count: 0
  });
  const id: any = useParams();

  useEffect(() => {
    
    if (movie.length === 0) {
      movieDetails(id.id);
    }
    setDetails(movie[0]);
    // eslint-disable-next-line
  }, [id, movie]);

  return (
    <>
      {details && details.title.length > 0 && (
        <div className="movie-container">
          <div className="movie-bg" style={{ backgroundImage: `url(${IMAGE_URL}${details.backdrop_path})` }}></div>
          <div className="movie-overlay"></div>
          <div className="movie-details">
            <div className="movie-image">
              <img src={`${IMAGE_URL}${details.poster_path}`} alt="" />
            </div>
            <div className="movie-body">
              <div className="movie-overview">
                <div className="title">
                  {details.title} <span>{details.release_date}</span>
                </div>
                <div className="movie-genres">
                  <ul className="genres">
                    {details.genres.map((genre: any) => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="rating">
                  <Rating className="rating-stars" rating={details.vote_average} totalStars={10} />
                  &nbsp;
                  <span>{details.vote_average}</span> <p>({details.vote_count}) reviews</p>
                </div>
                <Tabs>
                  <div>
                    <Overview />
                  </div>
                  <div>
                    <Crew />
                  </div>
                  <div>
                    <Media />
                  </div>
                  <div>
                    <Reviews />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Details.propTypes = {
  movie: PropTypes.array,
  movieDetails: PropTypes.func
};

const mapStateToProps = (state: any) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, { movieDetails })(Details);