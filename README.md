# Sinema
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/amitesh-183/Sinema)

Sinema is a sleek and modern web application for discovering, searching, and exploring an extensive library of movies and TV shows. Built with React, TypeScript, and Vite, it leverages The Movie Database (TMDB) API to provide up-to-date information, including popular, top-rated, and upcoming titles.

## Key Features

-   **Comprehensive Browsing**: Discover movies and TV shows across various categories like Popular, Now Playing, Top Rated, and Upcoming.
-   **Advanced Search**: Instantly search for movies, TV series, and genres with a responsive search interface.
-   **Genre-Based Filtering**: Easily filter content by specific genres for both movies and TV shows.
-   **Detailed Information**: Access detailed views for each title, including overview, ratings, runtime, revenue, cast, and available seasons.
-   **Integrated Player**: Watch trailers and stream content directly within the application using an embedded player.
-   **Responsive Design**: A beautiful and functional user interface that adapts seamlessly to desktop, tablet, and mobile devices.
-   **Theme Support**: Switch between Dark, Light, and System default themes for a personalized viewing experience.
-   **Data Visualization**: Includes an analytics page with charts to visualize traffic and user data.

## Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS, shadcn/ui
-   **Routing**: React Router
-   **Data Fetching**: Axios
-   **State Management**: React Context API
-   **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
-   **Charts**: AMCharts 5

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the root directory.

`VITE_API_BASE_URL`: The base URL for the TMDB API.
`VITE_API_TOKEN_KEY`: Your personal read access token from the TMDB API.

```sh
# .env file example

VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_API_TOKEN_KEY=your_tmdb_api_read_access_token
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/amitesh-183/Sinema.git
    cd Sinema
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the variables as described in the "Environment Variables" section.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Starts the development server with Hot Module Replacement.
-   `npm run build`: Compiles the TypeScript code and builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the codebase for potential errors and style issues.
-   `npm run preview`: Serves the production build locally to preview before deployment.
