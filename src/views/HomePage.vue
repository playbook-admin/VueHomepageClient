<template>
  <div class="container">
    <div class="row">
      <div class="row-height">
        <div
          class="col-md-3 hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <div class="row">
            <div class="col-md-12">
              <h4 />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-primary center-block">
                <div class="panel-heading text-center">
                  <h3 class="panel-title">Today's photo</h3>
                </div>
                <div class="panel-body">
                  <div class="row text-center">
                    <div class="col-md-12 d-flex justify-content-center" id="divSwirl">
                      <div class="fade-in-animation">
                        <div class="rotate-animation">
                          <div class="scale-animation">
                            <PhotoFrame>
                              <router-link :to="detailsRoute">
                                <img :src="imageUrl" alt="Animated Image"
                                  style="border: 4px solid white; max-height: 100%; max-width: 100%; vertical-align: middle;" />
                              </router-link>
                            </PhotoFrame>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row text-center">
                    <hr />
                    <div id="divText" style="min-height: 60px">Photos</div>
                    <div id="divDownload" style="min-height: 50px">
                      <p>
                        <a :href="`${apiAddress}/Handler/Download/0/M`">
                          <img src="/assets/images/button-download.gif" alt="download photo" />
                        </a>
                      </p>
                      <hr />
                      <p>
                        See <router-link to="/albums">more photos</router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="divContact" style="min-height: 90px">
                <div class="fade-in-animation">
                    <h4>Contact information</h4>
                    <p>
                      &nbsp;&nbsp;
                      <span class="glyphicon glyphicon-phone-alt" style="color: gray" />
                      &nbsp;010-123 456
                    </p>
                    <p>
                      <img src="/assets/images/mail.png" alt="epost" class="img-responsive" />
                    </p>
                  </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="panel panel-primary">
                    <div class="panel-heading">
                      <h3 class="panel-title text-center">Today's weather</h3>
                    </div>
                    <div class="panel-body panel-height_small">
                      <div id="divWeather" class="opaque">
                          <a class="weatherwidget-io" href="https://forecast7.com/en/40d71n74d01/new-york/"
                            data-label_1="NEW YORK" data-label_2="WEATHER" data-theme="original">
                            NEW YORK WEATHER
                          </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-md-height">
          <div class="row">
            <div class="col-md-12">
              <h4 />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h3 class="panel-title">Panel 1</h3>
                </div>
                <div class="panel-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas euismod orci velit, id tincidunt massa mollis ac.
                  Aliquam volutpat facilisis lacinia. Aenean auctor justo non
                  faucibus efficitur. Sed mollis, orci faucibus suscipit
                  pellentesque, nunc augue blandit ante, eget gravida ex erat
                  sed lectus. Mauris eu congue lacus, gravida aliquam ligula.
                  Aenean in diam eget mi tincidunt iaculis. Sed ac mi velit. Nam
                  vestibulum, metus id auctor bibendum, purus mi congue urna,
                  vitae maximus nibh orci eu orci. Donec viverra nisl diam,
                  pellentesque tincidunt risus hendrerit nec. Nulla at magna
                  dui. Mauris nec tristique enim. Ut a feugiat odio. Nullam
                  efficitur bibendum lorem. Curabitur pharetra risus neque, a
                  molestie quam ultrices at. Etiam molestie libero odio.
                  Suspendisse volutpat, justo vitae varius facilisis, quam ex
                  placerat orci, sit amet cursus ante mi et purus. Vivamus dolor
                  sem, suscipit ut nisl id, malesuada commodo metus. Ut at orci
                  non arcu ornare fringilla pharetra non nunc. Suspendisse arcu
                  odio, commodo nec porta et, viverra et arcu. Nullam nec
                  lacinia velit. Pellentesque commodo fringilla est, sed
                  ullamcorper risus vestibulum vitae. Nunc facilisis, eros vitae
                  rhoncus consectetur, velit magna interdum felis, quis
                  convallis arcu nisl a lorem. Proin gravida, elit non volutpat
                  maximus, urna purus commodo ante, quis viverra lectus urna
                  eget nisi.
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h3 class="panel-title">Panel 2</h3>
                </div>
                <div class="panel-body">
                  Phasellus diam dolor, molestie quis arcu nec, fermentum
                  lobortis ante. Nunc sagittis condimentum felis sit amet
                  ultrices. Donec aliquam dolor sit amet tempor elementum. Proin
                  auctor justo mi, quis consectetur tortor molestie at. Sed
                  aliquet odio turpis, at efficitur justo egestas quis. Duis
                  facilisis dui arcu, sit amet ullamcorper lacus tristique id.
                  Donec euismod arcu urna, sed pellentesque nibh ornare et. Duis
                  sed imperdiet neque. Morbi fermentum scelerisque quam non
                  luctus. Vestibulum vehicula sollicitudin nibh, quis hendrerit
                  massa ullamcorper a. Quisque posuere euismod elit, nec rutrum
                  tellus pellentesque in. Nulla facilisi. Donec fringilla, neque
                  ac vulputate rutrum, nisl tortor facilisis urna, ac cursus
                  urna nibh vitae odio. Nunc lorem dui, consequat nec ex eget,
                  lobortis pharetra nibh. Nunc pretium odio nisl, vel gravida
                  urna tristique at. Mauris ut nibh quis lorem vulputate
                  ullamcorper. Quisque condimentum purus vitae massa porttitor,
                  in feugiat elit blandit. Praesent lectus tortor, molestie nec
                  libero vitae, aliquam aliquam sapien. Quisque blandit iaculis
                  mauris eu feugiat. Aenean eget diam quis elit pretium
                  vestibulum. Donec velit sapien, commodo eu posuere et, commodo
                  sit amet purus. Aliquam erat volutpat. Maecenas non hendrerit
                  ligula, quis feugiat risus. Morbi et efficitur mauris.
                  Curabitur ut bibendum elit. Pellentesque sit amet cursus nunc.
                  Donec rhoncus et dui at tempus. Vestibulum et nibh pulvinar
                  nibh bibendum bibendum non finibus velit. Maecenas non odio
                  ultrices, dignissim odio id, ullamcorper tortor. Curabitur
                  lacinia arcu et malesuada sollicitudin. Integer sed cursus
                  felis. Aenean porta, tortor vel aliquet tempor, neque lectus
                  euismod dolor, non dapibus ligula nisl ut nisl.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useApiAddress } from './../providers/useGlobalState';
import PhotoFrame from "../photos/PhotoFrame.vue";

// Access API address from global state
const { apiAddress } = useApiAddress();
const currentTicks = ref(new Date().getTime());

// Compute the image URL dynamically
const imageUrl = computed(() => `${apiAddress.value}/Handler/Index/PhotoID=0/Size=M?${currentTicks.value}`);

// Define the details URL using a named route with parameters
const detailsRoute = computed(() => `/details/0/0/-`);

// Lifecycle hook to handle mounting behavior
onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://weatherwidget.io/js/widget.min.js";
  script.async = true;

  // Ensure the script has loaded before making the widget visible
  script.onload = () => {
    // Apply a small delay to ensure the widget is fully rendered
    setTimeout(() => {
      const divWeather = document.getElementById("divWeather");
      if (divWeather) {
        divWeather.classList.add("delayed-fade-in-animation");
      }
    }, 1000); // 1-second delay after script loading
  };

  // Handle script loading errors
  script.onerror = () => {
    console.error("Failed to load the weather widget script.");
  };

  document.body.appendChild(script);
});

</script>

