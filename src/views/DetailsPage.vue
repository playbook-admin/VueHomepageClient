<template>
  <div class="container">
    <div class="row">
      <div class="col row-height">
        <div
          class="col-md-3 d-none d-md-block col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <div class="row">
            <div class="col-md-12">
              <h4>{{ albumCaption || '-' }}</h4>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-9 col-md-height">
          <div class="row">
            <div class="buttonbar buttonbar-top">
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
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
                      <!-- <photo-frame>
                        <img :src="`${apiAddress.value}/Handler/Index/PhotoID=${photoId.value}/Size=L`" class="photo_198" style="border: 4px solid white; object-fit: contain; min-height: 500px; max-height: 500px; top: 50%; bottom: 50%" alt="PhotoID {{ photoId.value }}" />
                      </photo-frame>
                      <p>
                        <a :href="`${apiAddress.value}/Handler/Download/${photoId.value}/Size=L`">
                          <img src="/assets/images/button-download.gif" alt="download this photo" />
                        </a>
                      </p> -->
                    </td>
                    <td style="width: 500px"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import PhotoFrame from '../photos/PhotoFrame.vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import * as apiClient from '../helpers/ApiHelpers';
import { useApiAddress } from '../components/useGlobalState';

export default {
  name: "DetailsPage",
  components: {
    //PhotoFrame
  },
  setup() {
    const route = useRoute();
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

    const fetchRandomPhotoDetails = async () => {
      try {
        const ph = await apiClient.getHelper(`${apiAddress.value}/api/details/random`);
        photoId.value = ph;
        const al = await apiClient.getHelper(`${apiAddress.value}/api/details/albumid/${ph}`);
        albumId.value = al;
        const response = await apiClient.getHelper(`${apiAddress.value}/api/details/${al}`);
        console.log("fetchRandomPhotoDetails", JSON.stringify(response))
        photos.value = response;
      } catch (error) {
        alert('Could not contact server ' + JSON.stringify(error));
      }
    };

    const fetchPhotosByAlbumId = async (albumId) => {
      try {
        const response = await apiClient.getHelper(`${apiAddress.value}/api/details/${albumId}`);
        console.log("fetchPhotosByAlbumId :",{albumId}, JSON.stringify(response))
        photos.value = response;
      } catch (error) {
        alert('Could not contact server ' + JSON.stringify(error));
      }
    };

    watch(() => route.params.albumCaption, (newAlbumCaption) => {
      albumCaption.value = newAlbumCaption;
    });

    watch(photos, (newPhotos) => {
      console.log('Photos updated:', JSON.stringify(newPhotos));
    });

    return {
      photos,
      getDetailsUrl,
      page,
      first,
      last,
      prev,
      next,
      albumCaption,
      captionToShow
    };
  }
};
</script>


<style scoped>
/* Add your styles here */
</style>
