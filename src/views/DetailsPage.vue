<template>
  <div class="container container-fluid">
    <b-row>
      <b-col class="row-height">
        <b-col md="3" class="hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <b-row>
            <b-col md="12">
              <h4>{{ albumCaption }}</h4>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="9" sm="9" xs="9" class="col-md-height">
          <b-row>
            <div class="buttonbar buttonbar-top">
              <b-col lg="2" md="2" sm="2" xs="2" />
              <b-col lg="3" md="3" sm="3" xs="3">
                <router-link to="/albums">
                  <img id="FormView1_Image1" src="/assets/images/button-gallery.gif" style="border-width: 0px" alt="" />
                </router-link> &nbsp;&nbsp;&nbsp;&nbsp;
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
              </b-col>
              <b-col lg="7" md="7" sm="7" xs="7" />
            </div>
          </b-row>
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <table class="view" cellspacing="0" cellpadding="0" id="FormView1" style="border-collapse: collapse; border-style: None; border-width: 0px">
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
                    <td style="width: 500px" />
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
          <b-row>
            <div class="buttonbar buttonbar-bottom">
              <b-col md="4" sm="3" xs="2">
                <div v-for="(photo, index) in photos" :key="photo.photoID" style="display: inline">
                  <router-link v-if="index + 1 !== page" @click="setDetails(photo.photoID)">{{ index + 1 }}</router-link>
                  <span v-else>{{ index + 1 }}</span>
                </div>
              </b-col>
              <b-col md="3" sm="3" xs="3">
                <router-link to="/albums">
                  <img id="FormView1_Image2" src="/assets/images/button-gallery.gif" style="border-width: 0px" alt="" />
                </router-link> &nbsp;&nbsp;&nbsp;&nbsp;
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
              </b-col>
              <b-col md="5" sm="6" xs="7" />
            </div>
          </b-row>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
//import PhotoFrame from '../photos/PhotoFrame.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as apiClient from '../helpers/ApiHelpers';
import { useApiAddress } from '../components/useGlobalState';

export default {
  name: "DetailsPage", // Corrected this line
  components: {
    //PhotoFrame
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

      alert("getPage.value: " + getPage.value)
      first = computed(() => photos.value[0]?.photoID);
      alert("first: " + first.value)
      last = computed(() => photos.value[photos.value.length - 1]?.photoID);
      alert("last: " + last.value)
      prev = computed(() => (page > 1 ? photos.value[page - 2].photoID : first.value));
      alert("prev: " + prev.value)
      next = computed(() => (page < photos.value.length ? photos.value[page].photoID : last.value));
      alert("next: " + next.value)  
    };

    onMounted(() => {
      alert("onMounted initializedAsync")
      initializedAsync();
    });

    const fetchRandomPhotoDetails = async () => {
      try {
        alert("fetchRandomPhotoDetails")
        const ph = await apiClient.getHelper(`${apiAddress.value}/api/details/random`);
        photoId.value = ph;
        alert(ph)
        const al = await apiClient.getHelper(`${apiAddress.value}/api/details/albumid/${ph}`);
        alert(al)
        albumId.value = al;
        const response = await apiClient.getHelper(`${apiAddress.value}/api/details/${al}`);
        alert(JSON.stringify(response))
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
      alert("setDetails "+newPhotoId)
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
