import type { ChangeEvent } from "react";
import type { Genre } from "../types/Movie";

interface FilterProps {
  genres: Genre[];
  selectedGenre: string;
  selectedSort: string;
  onGenreChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Filter = ({
  genres,
  selectedGenre,
  selectedSort,
  onGenreChange,
  onSortChange,
}: FilterProps) => {
  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="genre">Genre</label>

        <select id="genre" value={selectedGenre} onChange={onGenreChange}>
          <option value="all">All Genres</option>

          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Sort by Rating</label>

        <select id="sort" value={selectedSort} onChange={onSortChange}>
          <option value="default">Default</option>

          <option value="high">Rating — High to Low</option>

          <option value="low">Rating — Low to High</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
