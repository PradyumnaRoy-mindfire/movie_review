# PixelPoint - Movie Review Site

A simple movie browsing website where you can explore movies, add them to favourites, and organize your watchlist.

## What This Project Does

- Browse popular, trending, top-rated, and upcoming movies
- Search for any movie by name
- Add movies to your favourites list
- Drag and drop movies from favourites to watch later section
- View detailed information about each movie (cast, ratings, trailers)

## Tech Stack

- React 19 with Vite
- Tailwind CSS for styling
- React Query for data fetching and caching
- React Router for navigation
- TMDB API for movie data

## Getting Started

### Prerequisites

- Node.js should be installed on your machine
- TMDB API key is free from https://www.themoviedb.org/settings/api

### Installation

1. Clone the repository

```bash
git clone 'https://github.com/PradyumnaRoy-mindfire/movie_review.git'>
cd movie_review
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root folder and add your API keys

```
VITE_MOVIE_BASE_URL=https://api.themoviedb.org/3
VITE_MOVIE_API_KEY=your_tmdb_api_key
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
VITE_PLACEHOLDER_IMAGE_URL=https://via.placeholder.com/500x750?text=No+Image
```

4. Start the server

```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## Runing with Docker

If you prefer Docker:

```bash
docker-compose up --build
```

Then open http://localhost:5173

## Folder Structure

```
src/
  components/     - Reusable UI components
  pages/          - Page components (Home, Movies, Favourite, etc.)
  context/        - React Context for favourite movies
  services/       - API calls to TMDB
  utils/          - Helper functions and custom hooks
  constants/      - Route definitions
```

## Features Explained

**Search**: Typing a movie name in the navbar search bar and click the search icon. Results will show on a new page.

**Favourites**: Click the heart icon on any movie card to add it to favourite. Go to the Favourites page to see all saved movies.

**Drag and Drop**: On the Favourite page, drag a movie card and drop it in the "Watch Later" section to organize your list.

## API Used

This project uses The Movie Database (TMDB) API to fetch movie information. You need to create a free account on TMDB and generate an API key.

## Author

Pradyumna Roy
