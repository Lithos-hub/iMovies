# iMovies

![logo](https://user-images.githubusercontent.com/57297760/104850259-56674000-58ee-11eb-9add-8f684be8bbbd.jpg)

iMovies is a web app I'm developing using Vue.js.

This application uses The Movie Database (TMDB) API to show info about movies (release dates, titles, vote average, overviews, etc). In adition, since the Version 1.5.0, the user can create custom lists of movies based in some categories like favourite movies or want to watch. That information is shown in My Movies section and is storaged using LocalStorage.

//////////////

Changelog:

Version 2.0.0

- Added internationalization (ENG / SPA) in all the app.
- Improved and expanded the search system. Now, is posible to search by movie title or actor/actress name.

Version 1.9.5

- Added reset statistics function in My Movies view.
- In the ranking section, if the movie has been previously selected, it will be deleted. Now you can remove the rate or overwrite it.
- Added 'show details' function when clicking in a movie in Ranking section.

Version 1.9.2

- Added permanent icons in the Ranking section. Now the icons will remain over each corresponding movie even if the user exits the view or logs out.

Version 1.9.1

- Improved the protected router system.

Version 1.9.0

- Added a login/register system without backend using LocalStorage.
- Added avatar option.
- The user is now be able to save movies in some categories with each account. On the other hand, the default account has now some hidden features.

Version 1.8.0

- Fixed an issue with the API call in the trailers section.
- Aesthetic changes and improvements in the trailers section.
- Responsive improvements in the navbar component.

Version 1.7.9

- Fixed an issue with the API call in the trending section.
- Added an initial (non functional at this moment) page for user login and register.

Version 1.7.7

- Error 404 page added.

Version 1.7.6

- Fixed some issues with regard to the display of the trailer component.

Version 1.7.5

- New info displayed in Search section: vote average and vote ratings.
- The 'View Trailer' button is now a component anywhere in the app.

Version 1.7.2

- More info is shown in Search section: dynamic movie genres (the API returns an ID for each movie genre and you have to 'translate' it in the specific genre); movie overview.
- Some aesthetic improvements in that section have been added.

Version 1.7.0

- New section 'Search' added.
- Now you can search for movies and see information such as the platforms where those movies are available for streaming, buying or renting.

Version 1.6.1

- Dynamic changelog.
- New logo.
- Fixed some api issues.

Version 1.6.0

- Optimized code in Trailers section.
- General aesthetic improvements.
- Info button available in My Movies section.
- Now is possible to save the user rates for each movie in My Movies.

Version 1.5.0

- Added My Movies section.
- Added new features (Watched, Favourite, Rate and To-Watch) in Ranking section using LocalStorage.

Version 1.4.0

- New features in Trending section.
- Optimized code in Ranking section.
- New responsive features in Ranking section and some aesthetic changes.

Version 1.3.0

- Optimized code in the Genres section using v-bind and @click to use a single function to return movies of different genres.
- Some aesthetic changes in general.

Version 1.2.0

- Added dynamic trailers dialogs in /movie/id page.
- Added some aesthetic changes in /trailers page.

Version 1.1.0

- Added dynamic routes on main page when you click over a movie image to get details about that movie.

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
