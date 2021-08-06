<template>
  <div id="navbar">
    <v-app-bar
      color="secondary darken-2"
      dark
      class="overflow-hidden justify-content-between"
      width="100%"
      elevation="10"
      app
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <div id="username-toolbar">User: <span class="cyan--text">@{{user.userName}}</span></div>
      

      <v-toolbar-title class="mx-auto">
        <router-link to="/home" class="router-link-default" active-class="brand-title"
          ><p class="brand-title ma-auto">iMovies</p></router-link
        >
      </v-toolbar-title>

      <v-btn small color="red darken-1" class="mr-2" @click="logout()">{{displayText ? 'logout' : ''}} <v-icon>mdi-account-cancel</v-icon></v-btn>

      <v-btn small color="primary" to="/about">{{displayText ? 'about' : ''}}<v-icon v-if="!displayText">mdi-information-variant</v-icon></v-btn>

      <a href="https://github.com/Lithos-hub/VUEJS-iMovies" style="text-decoration: none">
        <v-btn icon>
          <v-icon> mdi-github </v-icon>
        </v-btn>
      </a>
      <div id="version-info">
        <p>v.{{ major }}.{{ minor }}.{{ patch }}</p>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      color="secondary darken-2"
      dark
      app
      width="220px"
    >
      <v-list nav class="nav-list">
        <v-list-item-group v-model="group" active-class="black">
          <v-img v-if="user.userAvatar !== undefined" :src="user.userAvatar" width="90" height="90" class="avatar ma-5 ma-auto"></v-img>
          <h5 id="username-drawer" class="text-center my-2 white--text">@{{user.userName}}</h5>
   
            <v-list-item dense to="/home">
              <v-list-item-icon>
                <v-icon class="nav-icons">mdi-home</v-icon>
                <v-list-item-title class="nav-links">Home</v-list-item-title>
              </v-list-item-icon>
            </v-list-item>
   

          <v-divider></v-divider>

          <v-list-item to="/search" v-if="!isDefault">
              <v-list-item-icon>
                <v-icon class="nav-icons">
                  mdi-magnify
                </v-icon>
                <v-list-item-title class="nav-links">
                  Search
                </v-list-item-title>
              </v-list-item-icon>
          </v-list-item>
          <v-list-item to="/mymovies" v-if="!isDefault">
              <v-list-item-icon>
                <v-icon class="nav-icons">
                  mdi-star
                </v-icon> 
                <v-list-item-title class="nav-links">
                  My movies
                </v-list-item-title>
              </v-list-item-icon>
          </v-list-item>
          <v-list-item to="/trending">
              <v-list-item-icon>
                <v-icon class="nav-icons">
                  mdi-table
                </v-icon>
                <v-list-item-title class="nav-links">
                  Trending
                </v-list-item-title>
              </v-list-item-icon>
          </v-list-item>
          <v-list-item to="/trailers">
              <v-list-item-icon>
                <v-icon class="nav-icons">
                  mdi-video-vintage
                </v-icon>
                <v-list-item-title class="nav-links">
                  Trailers
                </v-list-item-title>
              </v-list-item-icon>
          </v-list-item>
          <v-list-item to="/genres">
              <v-list-item-icon>
                <v-icon class="nav-icons">
                  mdi-shape
                </v-icon>
                <v-list-item-title class="nav-links">
                  Genres
                </v-list-item-title>
              </v-list-item-icon>
          </v-list-item>
          <v-list-item to="/ranking" v-if="!isDefault">
              <v-list-item-icon>
                <v-icon class="nav-icons">
                  mdi-format-list-numbered
                </v-icon>
                <v-list-item-title class="nav-links">
                  Ranking
                </v-list-item-title>
              </v-list-item-icon>
          </v-list-item>
          <v-list-item to="/changelog">
              <v-list-item-icon>
                <v-icon class="nav-icons">
                  mdi-lead-pencil
                </v-icon>
                <v-list-item-title class="nav-links">
                  Changelog
                </v-list-item-title>
              </v-list-item-icon>
          </v-list-item>
  
        </v-list-item-group>
      </v-list>

      <v-divider class="name-divider"></v-divider>
      <p id="developedBy">
        {{ date }} - Developed by<br />
        <a href="https://carlosseguragarciaweb.com" style="text-decoration: none">
        <span id="developerName">Carlos Segura García</span>
        <p id="visit-my-website">Go to my website</p>
        </a>
      </p>
    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
      date: new Date().getFullYear(),
      isDefault: Boolean,
      user: {},
      id: null,
      major: 1,
      minor: 9,
      patch: 2,
      group: null,
      drawer: false
    }
  },
  created () {
    this.setUser()
  },
  computed: {
    displayText() {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return false
          case 'sm': return false
          case 'md': return true
          case 'lg': return true
          case 'xl': return true
      }
    },
  },
  methods: {
    setUser () {
      this.isDefault = this.$store.getters.defaultUser
      if (!this.isDefault) {
        const userStorageData = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      const userid = JSON.parse(localStorage.getItem("USERID")) || {};

      this.user = userStorageData[userid.id]
      } else {
        this.user.userName = "DefaultUser"
      }
    },
    logout() {
      this.$store.commit("setDefault", false)
      this.$store.commit("isLogged", false)
      this.$router.push("/")
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

* {
  color: $primary;
  font-family: $style2;
}

#username-toolbar {
  position: absolute;
  left: 5%;
  color: $primary;
  font-weight: lighter;
}

#visit-my-website {
opacity: 0;
transition: 0.5s;
 margin-top: 0px;
 text-transform: uppercase;

}

#developerName {
color: cyan;
transition: 0.5s;
opacity: 1;
text-transform: uppercase;
}

#developedBy:hover {

  #developerName {
    color: white;
  }

#visit-my-website {
    opacity: 1;
    color: white;
    margin-top: 10px;
    letter-spacing: 2px;
  }
}

.avatar {
  border-radius: 50%;
  border: 2px solid $primary;
}



// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {

    #username-toolbar {
  display: none;
  }

  #username-drawer {
    font-size: 12px;
  }


  .brand-title {
    padding-left: 0px;
    letter-spacing: 0px;
    margin: 0 auto;
  }

  .nav-icons {
    font-size: 1em !important;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 15px !important;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #developedBy {
    position: relative;
    text-align: center;
    margin-top: 40px;
    letter-spacing: 2px;
    font-size: 12px;
    font-family: $style2;

  }

  #version-info {
    position: relative;
    padding-top: 15px;
    right: 0px;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {

  #username-toolbar {
    display: block;
  }

  #username-drawer {
    font-size: 15px;
  }


  .brand-title {
    padding-left: 120px;
    letter-spacing: 10px;
    margin: 10px;
  }

  .nav-icons {
    font-size: 12px !important;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 12px !important;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #developedBy {
    position: relative;
    text-align: center;
    margin-top: 40px;
    letter-spacing: 2px;
    font-size: 13px;
    font-family: $style2;

  }

  #version-info {
    position: relative;
    padding-top: 15px;
    right: 5px;
  }

  #csg-link {
  transition: 0.5s;
  
  &:hover{ 
    color: white;
    transform: scale(1.1)
  }
}


}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
    #username-toolbar {
    display: block;
    }

    #username-drawer {
      font-size: 18px;
    }


  .brand-title {
    padding-left: 120px;
    letter-spacing: 10px;
    margin: 15px;
  }

  .nav-icons {
    font-size: 16px !important;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 16px !important;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #developedBy {
    position: relative;
    text-align: center;
    margin-top: 40px;
    letter-spacing: 2px;
    font-size: 13px;
    font-family: $style2;
  }


  #version-info {
    position: relative;
    padding-top: 15px;
    right: 5px;
  }

  #csg-link {
  transition: 0.5s;
  
  &:hover{ 
    color: white;
    transform: scale(1.1)
  }
}
}
</style>
