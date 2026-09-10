import {Movie} from "../types.ts"

const MovieCard = ({title, id}: Movie) => {
    return (
        <section className="movie-card">
            <h2>{title}</h2>
            <p>id: {id}</p>
        </section>
    )
}

export default MovieCard