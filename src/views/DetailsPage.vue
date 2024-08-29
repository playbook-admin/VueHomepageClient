<template>
  <div class="container">
    <div class="row">
      <div class="col row-height">
        <div class="col-md-3 d-none d-md-block col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <div class="row">
            <div class="col-md-12">
              <h4>{{ albumCaption }}</h4>
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
                <router-link @click="setDetails(first.value)">
                  <img src="/assets/images/button-first.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link @click="setDetails(prev.value)">
                  <img src="/assets/images/button-prev.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link @click="setDetails(next.value)">
                  <img src="/assets/images/button-next.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link @click="setDetails(last.value)">
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
                      <p>{{ photos[page > 0 ? page - 1 : 0].caption }}</p>
                      <photo-frame>
                        <img :src="`${apiAddress.value}/Handler/Index/PhotoID=${photoId.value}/Size=L`" class="photo_198" style="border: 4px solid white; object-fit: contain; min-height: 500px; max-height: 500px; top: 50%; bottom: 50%" alt="PhotoID {{ photoId.value }}" />
                      </photo-frame>
                      <p>
                        <a :href="`${apiAddress.value}/Handler/Download/${photoId.value}/Size=L`">
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
              <div class="col-md-4 col-sm-3 col-xs-2">
                <div v-for="(photo, index) in photos" :key="photo.photoID" style="display: inline">
                  <router-link v-if="index + 1 !== page" @click="setDetails(photo.photoID)">{{ index + 1 }}</router-link>
                  <span v-else>{{ index + 1 }}</span>
                </div>
              </div>
              <div class="col-md-3 col-sm-3 col-xs-3">
                <router-link to="/albums">
                  <img id="FormView1_Image2" src="/assets/images/button-gallery.gif" style="border-width: 0px" alt="" />
                </router-link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <router-link @click="setDetails(first.value)">
                  <img src="/assets/images/button-first.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link @click="setDetails(prev.value)">
                  <img src="/assets/images/button-prev.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link @click="setDetails(next.value)">
                  <img src="/assets/images/button-next.gif" style="border-width: 0px" alt="" />
                </router-link>
                <router-link @click="setDetails(last.value)">
                  <img src="/assets/images/button-last.gif" style="border-width: 0px" alt="" />
                </router-link>
              </div>
              <div class="col-md-5 col-sm-6 col-xs-7"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PhotoFrame from '../photos/PhotoFrame.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as apiClient from '../helpers/ApiHelpers';
import { useApiAddress } from '../components/useGlobalState';

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
    let first = ref();
    let last = ref();
    let prev = ref();
    let next = ref();
    const photoId = ref(parseInt(route.params.photoId));
    const albumId = ref(parseInt(route.params.albumId));
    const albumCaption = route.params.albumCaption;

   const initializedAsync = async () => {
      if (albumId.value === 0) {
        await fetchRandomPhotoDetails();
      } else {
        await fetchPhotosByAlbumId(route.params.albumId);
      }

      first = computed(() => photos.value[0]?.photoID);
      last = computed(() => photos.value[photos.value.length - 1]?.photoID);
      prev = computed(() => (page > 1 ? photos.value[page - 2].photoID : first.value));
      next = computed(() => (page < photos.value.length ? photos.value[page].photoID : last.value));
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

    const setDetails = (newPhotoId) => {
      router.push(`/details/${newPhotoId}/${albumId.value}/${albumCaption}`);
      photoId.value = Number(newPhotoId);
    };

    const getPage = computed(() => {
      const photo = photos.value.find((p) => p.photoID === photoId.value);
      return photo ? photos.value.indexOf(photo) + 1 : 0;
    });

    const page = getPage.value;

    return {
      photos,
      setDetails,
      page,
      first,
      last,
      prev,
      next,
    };
  }
};
</script>


<style scoped>
/* Add your styles here */
</style>
