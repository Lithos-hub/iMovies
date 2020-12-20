<template>
  <div>
    <SectionTitle :sectionName="name" />

    <v-sheet class="section-subtitle" elevation="10">Movies per genre</v-sheet>

    <div class="error-sheet-container" v-if="loadingError">
      <v-sheet dark class="error-sheet" height="100%" width="100%" elevation="10">
        {{ loadingError }}
      </v-sheet>
    </div>

    <div v-if="loadingGenre" width="100%" class="snackbar">
      <span class="loadingData-text"> Loading data... </span>
      <v-progress-circular
        :size="40"
        color="white"
        indeterminate
        class="spinner"
      ></v-progress-circular>
    </div>

    <div id="genres-container">
      <v-row no-gutters>
        <v-col cols="12">
          <!-- ********************* ACTION BUTTON ********************* -->
          <v-btn
            id="actionBtn"
            class="genre-btn img1"
            @click="actionMovies()"
            dark
            block
            tile
          >
            Action
          </v-btn>
          <!-- ********************* ADVENTURE BUTTON ********************* -->

          <v-btn
            color="green"
            class="genre-btn img2"
            @click="adventureMovies()"
            dark
            block
            tile
          >
            Adventure
          </v-btn>
          <!-- ********************* ANIMATION BUTTON ********************* -->
          <v-btn
            color="orange"
            class="genre-btn img3"
            @click="animationMovies()"
            dark
            block
            tile
          >
            Animation
          </v-btn>
          <!-- ********************* COMEDY BUTTON ********************* -->
          <v-btn
            color="purple"
            class="genre-btn img4"
            @click="comedyMovies()"
            dark
            block
            tile
          >
            Comedy
          </v-btn>
          <!-- ********************* CRIME BUTTON ********************* -->
          <v-btn
            color="secondary"
            class="genre-btn img5"
            @click="crimeMovies()"
            dark
            block
            tile
          >
            Crime
          </v-btn>
          <!-- ********************* DOCUMENTARY BUTTON ********************* -->
          <v-btn
            color="pink"
            class="genre-btn img6"
            @click="documentaryMovies()"
            dark
            block
            tile
          >
            Documentary
          </v-btn>
          <!-- ********************* DRAMATIC BUTTON ********************* -->
          <v-btn
            color="yellow darken-4"
            class="genre-btn img7"
            @click="dramaticMovies()"
            dark
            block
            tile
          >
            Dramatic
          </v-btn>
          <!-- ********************* FANTASY BUTTON ********************* -->
          <v-btn
            color="blue"
            class="genre-btn img8"
            @click="fantasyMovies()"
            dark
            block
            tile
          >
            Fantasy
          </v-btn>
          <!-- ********************* HISTORY BUTTON ********************* -->
          <v-btn
            color="brown"
            class="genre-btn img9"
            @click="historyMovies()"
            dark
            block
            tile
          >
            History
          </v-btn>
          <!-- ********************* HORROR BUTTON ********************* -->
          <v-btn
            color="gray"
            class="genre-btn img10"
            @click="horrorMovies()"
            dark
            block
            tile
          >
            Horror
          </v-btn>
          <!-- ********************* MUSICAL BUTTON ********************* -->
          <v-btn
            color="cyan"
            class="genre-btn img11"
            @click="musicalMovies()"
            dark
            block
            tile
          >
            Musical
          </v-btn>
          <!-- ********************* ROMANTIC BUTTON ********************* -->
          <v-btn
            color="error"
            class="genre-btn img12"
            @click="romanticMovies()"
            dark
            block
            tile
          >
            Romantic
          </v-btn>
          <!-- ********************* SCI-FI BUTTON ********************* -->
          <v-btn
            color="blue"
            class="genre-btn img13"
            @click="scifiMovies()"
            dark
            block
            tile
          >
            Sci-fi
          </v-btn>
          <!-- ********************* THRILLER BUTTON ********************* -->
          <v-btn
            color="orange"
            class="genre-btn img14"
            @click="thrillerMovies()"
            dark
            block
            tile
          >
            Thriller
          </v-btn>
          <!-- ********************* WAR BUTTON ********************* -->
          <v-btn color="red" class="genre-btn img15" @click="warMovies()" dark block tile>
            War
          </v-btn>
          <!-- ********************* WESTERN BUTTON ********************* -->
          <v-btn
            color="indigo"
            class="genre-btn img16"
            @click="westernMovies()"
            dark
            block
            tile
          >
            Western
          </v-btn>
        </v-col>
        <!-- ********************* GO UP BUTTON ********************* -->
        <a href="#" class="go_up_trigger">
          <v-btn color="secondary" class="go-up-btn" @click="go_up()">Go up!</v-btn>
        </a>
      </v-row>

      <!--********************************** DIALOG ACTION MOVIES ********************************** -->
      <div v-for="(item, i) in action" :key="i">
        <v-row>
          <v-dialog
            v-model="actionDialog"
            v-if="actionDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="red">
                <v-btn icon dark @click="actionDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in action" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG ADVENTURE MOVIES ********************************** -->
      <div v-for="(item, i) in adventure" :key="'A' + i">
        <v-row>
          <v-dialog
            v-model="adventureDialog"
            transition="dialog-bottom-transition"
            v-if="adventureDialog"
            class="movie-genres-dialog"
          >
            <v-card tile>
              <v-toolbar tile elevation="0" dark color="green">
                <v-btn
                  icon
                  dark
                  @click="adventureDialog = false"
                  class="close-dialog-btn"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in adventure" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />

                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG ANIMATION MOVIES ********************************** -->
      <div v-for="(item, i) in animation" :key="'B' + i">
        <v-row>
          <v-dialog
            v-model="animationDialog"
            transition="dialog-bottom-transition"
            v-if="animationDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="orange">
                <v-btn
                  icon
                  dark
                  @click="animationDialog = false"
                  class="close-dialog-btn"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in animation" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG COMEDY MOVIES ********************************** -->

      <div v-for="(item, i) in comedy" :key="'C' + i">
        <v-row>
          <v-dialog
            v-model="comedyDialog"
            transition="dialog-bottom-transition"
            v-if="comedyDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="purple">
                <v-btn icon dark @click="comedyDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in comedy" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG CRIME MOVIES ********************************** -->
      <div v-for="(item, i) in crime" :key="'D' + i">
        <v-row>
          <v-dialog
            v-model="crimeDialog"
            transition="dialog-bottom-transition"
            v-if="crimeDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="secondary">
                <v-btn icon dark @click="crimeDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in crime" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG DOCUMENTARY MOVIES ********************************** -->

      <div v-for="(item, i) in documentary" :key="'F' + i">
        <v-row>
          <v-dialog
            v-model="documentaryDialog"
            transition="dialog-bottom-transition"
            v-if="documentaryDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="pink">
                <v-btn
                  icon
                  dark
                  @click="documentaryDialog = false"
                  class="close-dialog-btn"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in documentary" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG DRAMATIC MOVIES ********************************** -->

      <div v-for="(item, i) in dramatic" :key="'G' + i">
        <v-row>
          <v-dialog
            v-model="dramaticDialog"
            transition="dialog-bottom-transition"
            v-if="dramaticDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="red">
                <v-btn icon dark @click="dramaticDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in dramatic" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG FANTASY MOVIES ********************************** -->

      <div v-for="(item, i) in fantasy" :key="'H' + i">
        <v-row>
          <v-dialog
            v-model="fantasyDialog"
            transition="dialog-bottom-transition"
            v-if="fantasyDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="indigo">
                <v-btn icon dark @click="fantasyDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in fantasy" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG HISTORY MOVIES ********************************** -->

      <div v-for="(item, i) in history" :key="'I' + i">
        <v-row>
          <v-dialog
            v-model="historyDialog"
            transition="dialog-bottom-transition"
            v-if="historyDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="orange">
                <v-btn icon dark @click="historyDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in history" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG HORROR MOVIES ********************************** -->

      <div v-for="(item, i) in horror" :key="'J' + i">
        <v-row>
          <v-dialog
            v-model="horrorDialog"
            transition="dialog-bottom-transition"
            v-if="horrorDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="secondary">
                <v-btn icon dark @click="horrorDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in horror" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG MUSICAL MOVIES ********************************** -->

      <div v-for="(item, i) in musical" :key="'K' + i">
        <v-row>
          <v-dialog
            v-model="musicalDialog"
            transition="dialog-bottom-transition"
            v-if="musicalDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="purple">
                <v-btn icon dark @click="musicalDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in musical" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG ROMANTIC MOVIES ********************************** -->

      <div v-for="(item, i) in romantic" :key="'L' + i">
        <v-row>
          <v-dialog
            v-model="romanticDialog"
            transition="dialog-bottom-transition"
            v-if="romanticDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="pink lighten-3">
                <v-btn icon dark @click="romanticDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in romantic" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG SCIFI MOVIES ********************************** -->

      <div v-for="(item, i) in scifi" :key="'M' + i">
        <v-row>
          <v-dialog
            v-model="scifiDialog"
            transition="dialog-bottom-transition"
            v-if="scifiDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="blue darken-4">
                <v-btn icon dark @click="scifiDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in scifi" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG THRILLER MOVIES ********************************** -->

      <div v-for="(item, i) in thriller" :key="'N' + i">
        <v-row>
          <v-dialog
            v-model="thrillerDialog"
            transition="dialog-bottom-transition"
            v-if="thrillerDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="gray">
                <v-btn icon dark @click="thrillerDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in thriller" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG WAR MOVIES ********************************** -->

      <div v-for="(item, i) in war" :key="'O' + i">
        <v-row>
          <v-dialog
            v-model="warDialog"
            transition="dialog-bottom-transition"
            v-if="warDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="error">
                <v-btn icon dark @click="warDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in war" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <!--********************************** DIALOG WESTERN MOVIES ********************************** -->

      <div v-for="(item, i) in western" :key="'P' + i">
        <v-row>
          <v-dialog
            v-model="westernDialog"
            transition="dialog-bottom-transition"
            v-if="westernDialog"
            class="movie-genres-dialog"
          >
            <v-card>
              <v-toolbar tile elevation="0" dark color="green darken-4">
                <v-btn icon dark @click="westernDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{ genre }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters>
                <div v-for="(item, i) in western" :key="i">
                  <v-col>
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.original_title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col class="d-flex">
                    <img :src="url + item.poster_path" width="200" />
                    <p class="lead" id="genre-overview">
                      <span class="small d-block mb-10">Overview:</span>
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import { mapActions, mapState } from "vuex";

export default {
  name: "Genres",
  components: {
    SectionTitle,
  },
  data() {
    return {
      name: "Genres",
      actionDialog: false,
      adventureDialog: false,
      animationDialog: false,
      comedyDialog: false,
      crimeDialog: false,
      documentaryDialog: false,
      dramaticDialog: false,
      fantasyDialog: false,
      historyDialog: false,
      horrorDialog: false,
      musicalDialog: false,
      romanticDialog: false,
      scifiDialog: false,
      thrillerDialog: false,
      warDialog: false,
      westernDialog: false,
      genreDialog: false,
      url: "https://image.tmdb.org/t/p/original",
      no_overview: "We sorry. This movie has not overview available.",
    };
  },
  computed: {
    ...mapState([
      "loadingError",
      "action",
      "adventure",
      "animation",
      "comedy",
      "crime",
      "documentary",
      "dramatic",
      "family",
      "fantasy",
      "history",
      "horror",
      "musical",
      "mistery",
      "romantic",
      "scifi",
      "tvmovie",
      "thriller",
      "war",
      "western",
      "genre",
      "loadingGenre",
    ]),
  },

  methods: {
    ...mapActions([
      "getAction",
      "getAdventure",
      "getAnimation",
      "getComedy",
      "getCrime",
      "getDocumentary",
      "getDramatic",
      "getFantasy",
      "getHistory",
      "getHorror",
      "getMusical",
      "getRomantic",
      "getScifi",
      "getThriller",
      "getWar",
      "getWestern",
    ]),
    // ********* //
    actionMovies(item) {
      this.getAction();
      this.actionDialog = true;
    },
    adventureMovies() {
      this.getAdventure();
      this.adventureDialog = true;
    },
    animationMovies(item) {
      this.getAnimation();
      this.animationDialog = true;
    },
    comedyMovies(item) {
      this.getComedy();
      this.comedyDialog = true;
    },
    crimeMovies(item) {
      this.getCrime();
      this.crimeDialog = true;
    },
    documentaryMovies(item) {
      this.getDocumentary();
      this.documentaryDialog = true;
    },
    dramaticMovies(item) {
      this.getDramatic();
      this.dramaticDialog = true;
    },
    fantasyMovies(item) {
      this.getFantasy();
      this.fantasyDialog = true;
    },
    historyMovies(item) {
      this.getHistory();
      this.historyDialog = true;
    },
    horrorMovies(item) {
      this.getHorror();
      this.horrorDialog = true;
    },
    musicalMovies(item) {
      this.getMusical();
      this.musicalDialog = true;
    },
    romanticMovies(item) {
      this.getRomantic();
      this.romanticDialog = true;
    },
    scifiMovies(item) {
      this.getScifi();
      this.scifiDialog = true;
    },
    thrillerMovies(item) {
      this.getThriller();
      this.thrillerDialog = true;
    },
    warMovies(item) {
      this.getWar();
      this.warDialog = true;
    },
    westernMovies(item) {
      this.getWestern();
      this.westernDialog = true;
    },
    go_up() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #genres-container {
    position: relative;
    width: 100%;
    margin-bottom: 50px;
  }

  .genre-btn {
    letter-spacing: 0px;
    height: 350px !important;
    font-size: 3em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(0);
  }

  .movie-genres-dialog {
    z-index: 99999;
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 3em;
    text-transform: uppercase;
    letter-spacing: 10px;
    text-align: right;
  }

  .snackbar {
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 99999999;
    box-shadow: 0px -20px 20px black;
    background-image: url("../assets/img/gradient1.jpg");
    background-position: center;
    background-size: auto;
    animation: 2s motion ease-in-out infinite alternate-reverse;

    &:hover {
      text-shadow: none;
    }

    .loadingData-text {
      font-size: 2em;
    }

    .spinner {
      display: block;
      margin: 0 auto;
      justify-content: center;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  .img1 {
    background: url("../assets/img/actionimg.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img2 {
    background: url("../assets/img/adventureimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img3 {
    background: url("../assets/img/animationimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img4 {
    background: url("../assets/img/comedyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img5 {
    background: url("../assets/img/crimeimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img6 {
    background: url("../assets/img/documentaryimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img7 {
    background: url("../assets/img/dramaticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img8 {
    background: url("../assets/img/fantasyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img9 {
    background: url("../assets/img/historyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img10 {
    background: url("../assets/img/horrorimg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img11 {
    background: url("../assets/img/musicalimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img12 {
    background: url("../assets/img/romanticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img13 {
    background: url("../assets/img/scifiimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img14 {
    background: url("../assets/img/thrillerimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img15 {
    background: url("../assets/img/warimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img16 {
    background: url("../assets/img/westernimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 2em;
  }
  #genre-date {
    position: absolute;
    right: 15px;
    color: $primary;
  }

  #genre-overview {
    padding: 50px;
    font-size: 25px;
    text-align: justify;
  }

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background6.jpg");
    background-repeat: repeat;
    color: white !important;
    text-shadow: 0px 0px 6px rgb(43, 123, 209);
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  @keyframes motion {
    0% {
      background-position: top;
    }

    100% {
      background-position: bottom;
    }

    0% {
      background-position: top;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #genres-container {
    position: relative;
    width: 100%;
    margin-bottom: 50px;
  }

  .genre-btn {
    letter-spacing: 40px;
    height: 350px !important;
    font-size: 3em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(1);

    &:focus {
      outline: none;
    }

    &:hover {
      color: white;
      text-shadow: 0px 0px 10px cyan, 0px 0px 3px cyan;
      font-size: 6em;
      letter-spacing: 50px;
      filter: none;
    }
  }

  .movie-genres-dialog {
    z-index: 99999;
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 3em;
    text-transform: uppercase;
    letter-spacing: 10px;
    text-align: right;
  }

  .snackbar {
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 99999999;
    box-shadow: 0px -20px 20px black;
    background-image: url("../assets/img/gradient1.jpg");
    background-position: center;
    background-size: auto;
    animation: 2s motion ease-in-out infinite alternate-reverse;

    &:hover {
      text-shadow: none;
    }

    .loadingData-text {
      font-size: 2em;
    }

    .spinner {
      display: block;
      margin: 0 auto;
      justify-content: center;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  .img1 {
    background: url("../assets/img/actionimg.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img2 {
    background: url("../assets/img/adventureimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img3 {
    background: url("../assets/img/animationimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img4 {
    background: url("../assets/img/comedyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img5 {
    background: url("../assets/img/crimeimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img6 {
    background: url("../assets/img/documentaryimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img7 {
    background: url("../assets/img/dramaticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img8 {
    background: url("../assets/img/fantasyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img9 {
    background: url("../assets/img/historyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img10 {
    background: url("../assets/img/horrorimg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img11 {
    background: url("../assets/img/musicalimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img12 {
    background: url("../assets/img/romanticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img13 {
    background: url("../assets/img/scifiimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img14 {
    background: url("../assets/img/thrillerimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img15 {
    background: url("../assets/img/warimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img16 {
    background: url("../assets/img/westernimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 2em;
  }
  #genre-date {
    position: absolute;
    right: 15px;
    color: $primary;
  }

  #genre-overview {
    padding: 50px;
    font-size: 25px;
    text-align: justify;
  }

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background6.jpg");
    background-repeat: repeat;
    color: white !important;
    text-shadow: 0px 0px 6px rgb(43, 123, 209);
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  @keyframes motion {
    0% {
      background-position: top;
    }

    100% {
      background-position: bottom;
    }

    0% {
      background-position: top;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #genres-container {
    position: relative;
    width: 100%;
    margin-bottom: 50px;
  }

  .genre-btn {
    letter-spacing: 40px;
    height: 350px !important;
    font-size: 3em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(1);

    &:focus {
      outline: none;
    }

    &:hover {
      color: white;
      text-shadow: 0px 0px 10px cyan, 0px 0px 3px cyan;
      font-size: 10em;
      letter-spacing: 50px;
      filter: none;
    }
  }

  .movie-genres-dialog {
    z-index: 99999;
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 3em;
    text-transform: uppercase;
    letter-spacing: 10px;
    text-align: right;
  }

  .snackbar {
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 99999999;
    box-shadow: 0px -20px 20px black;
    background-image: url("../assets/img/gradient1.jpg");
    background-position: center;
    background-size: auto;
    animation: 2s motion ease-in-out infinite alternate-reverse;

    &:hover {
      text-shadow: none;
    }

    .loadingData-text {
      font-size: 2em;
    }

    .spinner {
      display: block;
      margin: 0 auto;
      justify-content: center;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  .img1 {
    background: url("../assets/img/actionimg.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img2 {
    background: url("../assets/img/adventureimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img3 {
    background: url("../assets/img/animationimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img4 {
    background: url("../assets/img/comedyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img5 {
    background: url("../assets/img/crimeimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img6 {
    background: url("../assets/img/documentaryimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img7 {
    background: url("../assets/img/dramaticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img8 {
    background: url("../assets/img/fantasyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img9 {
    background: url("../assets/img/historyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img10 {
    background: url("../assets/img/horrorimg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img11 {
    background: url("../assets/img/musicalimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img12 {
    background: url("../assets/img/romanticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img13 {
    background: url("../assets/img/scifiimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img14 {
    background: url("../assets/img/thrillerimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img15 {
    background: url("../assets/img/warimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img16 {
    background: url("../assets/img/westernimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 2em;
  }
  #genre-date {
    position: absolute;
    right: 15px;
    color: $primary;
  }

  #genre-overview {
    padding: 50px;
    font-size: 25px;
    text-align: justify;
  }

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background6.jpg");
    background-repeat: repeat;
    color: white !important;
    text-shadow: 0px 0px 6px rgb(43, 123, 209);
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  @keyframes motion {
    0% {
      background-position: top;
    }

    100% {
      background-position: bottom;
    }

    0% {
      background-position: top;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
