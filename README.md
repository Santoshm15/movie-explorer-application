# Movie Explorer

A simple Movie Explorer application built with React and TypeScript. The application integrates with a movie API to allow users to discover movies, search by title, filter by genre, sort by rating, view movie details, and manage favorite movies.

## Live Demo

https://Santoshm15.github.io/movie-explorer-application/

## GitHub Repository

https://github.com/Santoshm15/movie-explorer-application

## Features

- Home page with application introduction and featured movies
- Search movies by title
- Browse popular movies
- Filter movies by genre
- Sort movies by rating:
  - High to Low
  - Low to High
- View movie details
- Add movies to Favorites
- Remove movies from Favorites
- Loading state
- Error state
- Empty-results state
- Responsive design
- React Router navigation
- TypeScript interfaces and typed props, state, events, and functions

## Pages

### 1. Home

The Home page contains:

- Application title
- Short description
- Search bar
- Explore Movies button
- Featured movie cards

### 2. Movies

The Movies page contains:

- Movie search
- Genre filter
- Rating sorting
- Movie cards
- Loading and error handling
- Empty-results handling

### 3. Movie Details

The Movie Details page displays:

- Movie poster
- Movie title
- Overview
- Release date
- Rating
- Genres
- Runtime
- Popularity
- Back to Movies button
- Add/Remove Favorite action

### 4. Favorites

The Favorites page displays saved movies with:

- Poster
- Title
- Rating
- Remove from Favorites button

When there are no favorites, the page displays:

`No favorite movies added.`

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- RapidAPI IMDb API
- CSS
- GitHub Pages

## Project Structure

```text
src/
├── components/
│   ├── Navbar.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   ├── SearchBar.tsx
│   ├── Filter.tsx
│   ├── Loader.tsx
│   └── ErrorMessage.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Movies.tsx
│   ├── MovieDetails.tsx
│   └── Favorites.tsx
│
├── types/
│   └── Movie.ts
│
├── services/
│   └── movieApi.ts
│
├── App.tsx
├── main.tsx
└── index.css
```
