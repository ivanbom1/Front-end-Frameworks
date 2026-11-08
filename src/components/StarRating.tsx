import { useAppContext } from "../context/AppContext";

const StarRating = ({ movieId }: { movieId: number }) => {
  const { getRating, setRating } = useAppContext();
  const current = getRating(movieId);

  return (
    <div className="star-rating" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          role="radio"
          aria-checked={current === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => setRating(movieId, n)}
        >
          {n <= current ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
};

export default StarRating;