<template>
  <v-container fluid>
    <SectionTitle :sectionSubtitle="subtitle" />

    <div class="list-group">
      <div class="list" v-for="(item, i) in changes" :key="i">
        <span class="font-weight-bold">{{ item.version }}</span>
        <ul style="list-style: none;">

        
          <li v-for="(change, i) in item.changes" :key="i">
            <v-icon color="green">mdi-check</v-icon> {{ change }}
          </li>
        </ul>
        
      </div>
    </div>
  </v-container>
</template>

<script>
import SectionTitle from "../components/SectionTitle";

export default {
  components: {
    SectionTitle,
  },
  data() {
    return {
      subtitle: "Changelog",
      changes: [
        {
          version: "Version 1.1.0",
          changes: [
            "Added dynamic routes on main page when you click over a movie image to get details about that movie.",
          ],
        },
        {
          version: "Version 1.2.0",
          changes: [
            "Added dynamic trailers dialogs in /movie/id page.",
            "Added some aesthetic changes in /trailers page.",
          ],
        },
        {
          version: "Version 1.3.0",
          changes: [
            "Optimized code in the Genres section using v-bind and v-on:click to use a single function to return movies of different genres.",
            "Some aesthetic changes in general.",
          ],
        },
        {
          version: "Version 1.4.0",
          changes: [
            "New features in Trending section.",
            "Optimized code in Ranking section.",
            "New responsive features in Ranking section and some aesthetic changes.",
          ],
        },
        {
          version: "Version 1.5.0",
          changes: [
            "Added My Movies section.",
            "Added new features (Watched, Favourite, Rate and To-Watch) in Ranking section using LocalStorage.",
          ],
        },
        {
          version: "Version 1.6.0",
          changes: [
            "Optimized code in Trailers section.",
            "General aesthetic improvements.",
            "Info button available in My Movies section.",
            "Now is possible to save the user rates for each movie in My Movies.",
          ],
        },
        {
          version: "Version 1.6.1",
          changes: ["Dynamic changelog.", "New logo.", "Fixed some api issues."],
        },
        {
          version: "Version 1.7.0",
          changes: ["New section 'Search' added.", "Now you can search for movies and see information such as the platforms where those movies are available for streaming, buying or renting."],
        },
        {
          version: "Version 1.7.2",
          changes: ["More info is shown in Search section: dynamic movie genres (the API returns an ID for each movie genre and you have to 'translate' it in the specific genre); movie overview.",
          "Some aesthetic improvements in that section have been added."],
        },
        {
          version: "Version 1.7.5",
          changes: ["New info displayed in Search section: vote average and vote ratings.",
          "The 'View Trailer' button is now a component anywhere in the app."],
        },
        {
          version: "Version 1.7.6",
          changes: ["Fixed some issues with regard to the display of the trailer component."],
        },
        {
          version: "Version 1.7.7",
          changes: ["Error 404 page added.",],
        },
        {
          version: "Version 1.7.9",
          changes: ["Fixed an issue with the API call in the trending section.", "Added an initial (non functional at this moment) page for user login and register."],
        },
        {
          version: "Version 1.8.0",
          changes: ["Fixed an issue with the API call in the trailers section.", "Aesthetic changes and improvements in the trailers section.", "Responsive improvements in the navbar component."],
        },
        {
          version: "Version 1.9.0",
          changes: ["Added a login/register system without backend using LocalStorage. Added avatar option. The user is now be able to save movies in some categories with each account. On the other hand, the default account has now some hidden features."],
        },
        {
          version: "Version 1.9.1",
          changes: ["Improved the protected router system."],
        },
        {
          version: "Version 1.9.2",
          changes: ["Added permanent icons in the Ranking section. Now the icons will remain over each corresponding movie even if the user exits the view or logs out."],
        },
        {
          version: "Version 1.9.4",
          changes: ["Added reset statistics function in My Movies view.", "In the ranking section, if the movie has been previously selected, it will be deleted. Now you can remove the rate or overwrite it.", "Added 'show details' function when clicking in a movie in Ranking section."]
        },
      ],
    };
  },
  methods: {
    showReverse() {
      this.changes.reverse();
    }
  },
  mounted() {
    this.showReverse();
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .sup-bar {
    background-image: url("../assets/img/background4.jpg");
    background-position: center;
    filter: brightness(2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: white;
    font-size: 2em;
    text-align: center;
    background-size: cover;
  }
  .list {
    font-size: 1em;
  }
  .list-group {
    background: white;
    padding: 20px;
    color: black;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .sup-bar {
    background-image: url("../assets/img/background4.jpg");
    background-position: center;
    filter: brightness(2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: white;
    font-size: 2em;
    text-align: center;
    background-size: cover;
  }
  .list {
    font-size: 1em;
  }
  .list-group {
    background: white;
    padding: 20px;
    color: black;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .sup-bar {
    background-image: url("../assets/img/background4.jpg");
    background-position: center;
    filter: brightness(2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: white;
    font-size: 3em;
    text-align: center;
    background-size: cover;
  }
  .list {
    font-size: 1em;
  }
  .list-group {
    background: white;
    padding: 20px;
    color: black;
  }
}
</style>
