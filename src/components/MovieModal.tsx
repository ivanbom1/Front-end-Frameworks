  import { Movie } from "../types";
  import { getPosterUrl, getBackdropUrl } from "../data/sampleMovies";


  type MovieModalProps = {
    movie: Movie;
    onClose: () => void;
  };

  const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    return (
      <div className="modal-overlay active" onClick={onClose}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
          <div
            className="modal-backdrop-hero"
            style={{ backgroundImage: `url('${getBackdropUrl(movie.backdrop_path)}')` }}
            ></div>
          <div className="modal-body">
            <img src={getPosterUrl(movie.poster_path)} alt={movie.title} className="modal-poster" />

            <div className="modal-content-details">
                <h2 className="modal-title" id="modal-movie-title">{movie.title}</h2>
                <div className="modal-overview">
                <h4 className="modal-overview-heading">Overview</h4>
                <p>{movie.overview || "No plot synopsis available."}</p>
                </div>
            </div>
            </div>
        </div>
      </div>
    );
  };

  export default MovieModal;