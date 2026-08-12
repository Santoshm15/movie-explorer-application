import type { Movie } from "../types/Movie";

interface FavoritesProps {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

const Favorites = ({ favorites, onToggleFavorite }: FavoritesProps) => {
  return (
    <main className="page-container">
      <section className="page-header">
        <p className="hero-label">YOUR COLLECTION</p>

        <h1>Favorites</h1>

        <p>Movies you have saved as favorites.</p>
      </section>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>No favorite movies added.</h2>

          <p>Add a movie to your favorites and it will appear here.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <article className="favorite-card" key={movie.id}>
              {movie.poster_path ? (
                <img src={movie.poster_path} alt={movie.title} />
              ) : (
                <div className="favorite-poster-placeholder">No Poster</div>
              )}

              <div className="favorite-card-content">
                <h3>{movie.title}</h3>

                <p>
                  ⭐{" "}
                  {movie.vote_average > 0
                    ? movie.vote_average.toFixed(1)
                    : "Not Rated"}
                </p>

                <button type="button" onClick={() => onToggleFavorite(movie)}>
                  Remove from Favorites
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Favorites;
