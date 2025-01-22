# Movie Search App

A React application that allows users to search for movies using the OMDB API and manage their favorite movies. Built with React and Material UI.

## Features

- 🎬 Search movies by title
- 📝 View detailed movie information
- ❤️ Add/remove movies to favorites
- 💾 Persistent favorites storage
- 📱 Responsive design
- 🎨 Material UI components
- ⚡ Fast and lightweight

## Demo

[Live Demo](https://your-demo-link.netlify.app)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-search-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd movie-search-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   
4.Get OMDB_API_KEY:
   Get your API key from [OMDB API](https://www.omdbapi.com/)
   and replace it with your omdb_api_key in /src/app.jsx

5. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Enter a movie title in the search box
2. Press Enter or click the Search button
3. View the movie details including:
   - Title, Year, Runtime, Rating
   - Plot summary
   - Director and Cast
   - Genre
   - IMDb Rating
4. Click the heart icon to add/remove movies from favorites
5. View your favorite movies in the Favorites section below

## Technologies Used

- React
- Material UI
- Axios
- Local Storage API
- OMDB API


## Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for providing movie data
- [Material UI](https://mui.com/) for the component library
- [React](https://reactjs.org/) for the JavaScript framework
