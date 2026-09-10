import MovieCard from "./components/MovieCard";


const App = () => {
  return (
    <div className="app-layout">
      <h1>Movie App</h1>
      <MovieCard title={"12345678"} id={1} />
      <MovieCard title="The Lost People" id={2} />
      <MovieCard title={"true warriors"} id={3} />
    </div>
  );
};

export default App
