# iMovies

![logo](https://user-images.githubusercontent.com/57297760/105691900-16134d80-5efe-11eb-9cbc-85a05ce46968.jpg)

iMovies is a web app I'm developing using Vue.js.

This application uses The Movie Database (TMDB) API to show info about movies (release dates, titles, vote average, overviews, etc). In adition, since the Version 1.5.0, the user can create custom lists of movies based in some categories like favorite movies or want to watch. That information is shown in My Movies section and is storaged using LocalStorage.

The app is divided into some sections that can be accesible by the expandible side menu. 

With version 1.7.9 a temporary dummy login system was added. The idea is to add a system of account creation and access from this in future versions and that the information that is saved corresponds to each account that the user creates.

//////////////

Changelog:

Version 1.8.0

 * Fixed an issue with the API call in the trailers section.
 * Aesthetic changes and improvements in the trailers section.
 * Responsive improvements in the navbar component.

Version 1.7.9

 * Fixed an issue with the API call in the trending section.
 * Added an initial (non functional at this moment) page for user login and register.

Version 1.7.7

 * Error 404 page added.

Version 1.7.6

 * Fixed some issues with regard to the display of the trailer component.

Version 1.7.5

 * New info displayed in Search section: vote average and vote ratings.
 * The 'View Trailer' button is now a component anywhere in the app.

Version 1.7.2

 * More info is shown in Search section: dynamic movie genres (the API returns an ID for each movie genre and you have to 'translate' it in the specific genre); movie overview.
 * Some aesthetic improvements in that section have been added.

Version 1.7.0

 * New section 'Search' added.
 * Now you can search for movies and see information such as the platforms where those movies are available for streaming, buying or renting.

Version 1.6.1

 * Dynamic changelog.
 * New logo.
 * Fixed some api issues.

Version 1.6.0

 * Optimized code in Trailers section.
 * General aesthetic improvements.
 * Info button available in My Movies section.
 * Now is possible to save the user rates for each movie in My Movies.

Version 1.5.0

 * Added My Movies section.
 * Added new features (Watched, Favourite, Rate and To-Watch) in Ranking section using LocalStorage.

Version 1.4.0

 * New features in Trending section.
 * Optimized code in Ranking section.
 * New responsive features in Ranking section and some aesthetic changes.

Version 1.3.0

 * Optimized code in the Genres section using v-bind and v-on:click to use a single function to return movies of different genres.
 * Some aesthetic changes in general.

Version 1.2.0

 * Added dynamic trailers dialogs in /movie/id page.
 * Added some aesthetic changes in /trailers page.

Version 1.1.0

 * Added dynamic routes on main page when you click over a movie image to get details about that movie

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
