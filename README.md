# iMovies

![logo](https://user-images.githubusercontent.com/57297760/104850259-56674000-58ee-11eb-9add-8f684be8bbbd.jpg)

iMovies is a web app I'm developing using Vue. 

This application uses The Movie Database (TMDB) API to show info about movies (release dates, titles, vote average, overviews, etc).

The app is divided into some sections that can be accesible by the expandible side menu:

* Famous current movies (Trending).
* The latest available movie trailers (Trailers);
* Movies classified by genres and popularity (Genres);
* And a popular movies classification by year, from 2010 to 2020.

In some of those sections you may get or access certain info with buttons that trigger a modal window.

Also, since Version 1.5 you can create your own movie lists in some categories like Watched Movies or Favorite Movies. That information can be watched in My Movies section.

Little by little, I try to expand the possibilities of the application with each version.

//////////////

Changelog:

Version 1.1.0
* Added dynamic routes on main page when you click over a movie image to get details about that movie.


Version 1.2.0
* Added dynamic trailers dialogs on /movie/id page.
* Added some aesthetic changes on /trailers page.

Version 1.3.0

* Optimized code in the Genres section using v-bind and v-on:click to use a single function to return movies of different genres.
* Some aesthetic changes in general.

Version 1.4.0

* New features in Trending section.
* Optimized code in Ranking section.
* New responsive features in Ranking section and some aesthetic changes.

Version 1.5.0

* Added My Movies section
* Added new features (Watched, Favourite, Rate and To-Watch) in Ranking section
* Now you can create your custom movie lists with those categories and find them in My Movies section. 

Version 1.6.0

* Optimized code in Trailers section.
* General aesthetic improvements.
* Info button available in My Movies section.
* Now is possible to save the user rates for each movie in My Movies.

Version 1.6.1

* Dynamic changelog.
* New logo.
* Fixed some api issues.

Version 1.7.0

* New section 'Search' added.
* Now you can search for movies and see information such as the platforms where those movies are available for streaming, buying or renting.

Version 1.7.2

* More info is shown in Search section: dynamic movie genres (the API returns an ID for each movie genre and you have to 'translate' it in the specific genre) and each movie overview.
* Some aesthetic improvements in that section have been added.

Version 1.7.5

* New info displayed in Search section: vote average and vote ratings.
* The 'View Trailer' button is now a component anywhere in the app.

Version 1.7.6

* Fixed some issues with regard to the display of the trailer component.

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
