<template>
<div class="container container-fluid">
    <div class="row">
        <div class="row-height col">
            <div class="col-md-3 hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
                <div class="row">
                    <div class="col-md-12">
              <h4>{{ albumCaption || '-' }}</h4>
            </div>
          </div>
        </div>
        <div class="col-md-height col-md-9 co-sm-9 col-9">
          <div class="row">
            <div class="buttonbar buttonbar-top">
              <div class="col-lg-2 col-md-2 col-2"></div>
              <div class="col-lg-3 col-md-3 col-3">
                <router-link to="/albums">
                  <img id="FormView1_Image1" src="/assets/images/button-gallery.gif" style="border-width: 0px" alt="" />
                </router-link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <router-link :to="getDetailsUrl(first)">
                  <img src="/assets/images/button-first.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link :to="getDetailsUrl(prev)">
                  <img src="/assets/images/button-prev.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link :to="getDetailsUrl(next)">
                  <img src="/assets/images/button-next.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link :to="getDetailsUrl(last)">
                  <img src="/assets/images/button-last.gif" style="border-width: 0px" alt="" />
                </router-link>
              </div>
              <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <table class="view" cellspacing="0" cellpadding="0" id="FormView1" style="border-collapse: collapse; border-style: none; border-width: 0px">
                <tbody>
                  <tr>
                    <td>
                      <p>{{ captionToShow }}</p>
                      <photo-frame>
                        <img 
                          :src="`${apiAddress}/Handler/Index/PhotoID=${photoId}/Size=L`" 
                          class="photo_198" 
                          style="border: 4px solid white; object-fit: contain; min-height: 500px; max-height: 500px; top: 50%; bottom: 50%" 
                          alt="PhotoID" 
                      />
                      </photo-frame>
                      <p>
                        <a :href="`${apiAddress}/Handler/Download/${photoId}/Size=L`">
                          <img src="/assets/images/button-download.gif" alt="download this photo" />
                        </a>
                      </p>
                    </td>
                    <td style="width: 500px"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="buttonbar buttonbar-bottom">
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <div v-for="(photo, index) in photos" :key="photo.photoID" style="display: inline;">
                  <template v-if="index + 1 !== page">
                    <router-link :to="getDetailsUrl(photo.photoID)" @click="setDetails($event, photo.photoID)">
                      {{ index + 1 }}
                    </router-link>
                  </template>
                  <template v-else>
                    <span>{{ index + 1 }}</span>
                  </template>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <router-link to="/albums">
                  <img id="FormView1_Image1" src="/assets/images/button-gallery.gif" style="border-width: 0px" alt="" />
                </router-link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <router-link :to="getDetailsUrl(first)">
                  <img src="/assets/images/button-first.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link :to="getDetailsUrl(prev)">
                  <img src="/assets/images/button-prev.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link :to="getDetailsUrl(next)">
                  <img src="/assets/images/button-next.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link :to="getDetailsUrl(last)">
                  <img src="/assets/images/button-last.gif" style="border-width: 0px" alt="" />
                </router-link>
              </div>                        
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PhotoFrame from '../photos/PhotoFrame.vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as apiClient from '../helpers/ApiHelpers';
import { useApiAddress } from '../providers/useGlobalState';

export default {
  name: "DetailsPage",
  components: {
    PhotoFrame
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { apiAddress } = useApiAddress();

    const photos = ref([]);
    const photoId = ref(parseInt(route.params.photoId));
    const albumId = ref(parseInt(route.params.albumId));
    const albumCaption = ref(route.params.albumCaption);

    const captionToShow = computed(() => {
      const index = page.value > 0 ? page.value - 1 : 0;
      const photo = photos.value[index];
      return photo ? photo.caption || 'No caption available' : 'No caption available';
    });
    
    const first = computed(() => photos.value[0]?.photoID);
    const last = computed(() => photos.value[photos.value.length - 1]?.photoID);
    const page = computed(() => {
      const photo = photos.value.find((p) => p.photoID === photoId.value);
      return photo ? photos.value.indexOf(photo) + 1 : 0;
    });
    const prev = computed(() => (page.value > 1 ? photos.value[page.value - 2].photoID : first.value));
    const next = computed(() => (page.value < photos.value.length ? photos.value[page.value].photoID : last.value));
    
    const getDetailsUrl = (id) => {
      return `/details/${id}/${albumId.value}/${albumCaption.value}`;
    };

    const setDetails = (event, id) => {
      event.preventDefault(); // Prevent the default link behavior
      if (typeof id === 'number' && !isNaN(id)) {
        router.push(getDetailsUrl(id));
      } else {
        console.error('Invalid photoID:', id);
      }
    };

    const initializedAsync = async () => {
      if (albumId.value == 0) {
        await fetchRandomPhotoDetails();
      } else {
        await fetchPhotosByAlbumId(albumId.value);
      }
    };

    onMounted(() => {
      initializedAsync();
    });

    watch(() => route.params.photoId, async (newPhotoId) => {
      photoId.value = parseInt(newPhotoId);
      await initializedAsync(); // Re-fetch data based on the new photoId
    });

    const fetchRandomPhotoDetails = async () => {
      try {
        const ph = await apiClient.getHelper(`${apiAddress.value}/api/details/random`);
        photoId.value = ph;
        const al = await apiClient.getHelper(`${apiAddress.value}/api/details/albumid/${ph}`);
        albumId.value = al;
        const response = await apiClient.getHelper(`${apiAddress.value}/api/details/${al}`);
        photos.value = response;
      } catch (error) {
        alert('Could not contact server ' + JSON.stringify(error));
      }
    };

    const fetchPhotosByAlbumId = async (albumId) => {
      try {
        const response = await apiClient.getHelper(`${apiAddress.value}/api/details/${albumId}`);
        photos.value = response;
      } catch (error) {
        alert('Could not contact server ' + JSON.stringify(error));
      }
    };

    watch(() => route.params.albumCaption, (newAlbumCaption) => {
      albumCaption.value = newAlbumCaption;
    });

    return {
      photos,
      getDetailsUrl,
      setDetails,
      page,
      first,
      last,
      prev,
      next,
      albumCaption,
      captionToShow,
      apiAddress,
      photoId
    };
  }
};
</script>


<style scoped>
/* Add your styles here */
</style>
