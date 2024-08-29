<template>
  <div class="container">
    <div class="row">
      <div class="col row-height">
        <div class="col-md-3 d-none d-md-block col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <div class="row">
            <div class="col-md-12">
              <h4>{{ albumCaption.value }}</h4>
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
import { useRoute, useRouter } from 'vue-router';
import * as apiClient from '../helpers/ApiHelpers';
import { useApiAddress } from '../components/useGlobalState';

export default {
  name: "DetailsPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { apiAddress } = useApiAddress();

    const photos = ref([]);
    const photoId = ref(parseInt(route.params.photoId));
    const albumId = ref(parseInt(route.params.albumId));
    const albumCaption = ref(route.params.albumCaption);

    const first = computed(() => photos.value[0]?.photoID);
    const last = computed(() => photos.value[photos.value.length - 1]?.photoID);
    const page = computed(() => {
      const photo = photos.value.find((p) => p.photoID === photoId.value);
      return photo ? photos.value.indexOf(photo) + 1 : 0;
    });
    const prev = computed(() => (page.value > 1 ? photos.value[page.value - 2].photoID : first.value));
    const next = computed(() => (page.value < photos.value.length ? photos.value[page.value].photoID : last.value));

    const initializedAsync = async () => {
      if (albumId.value === 0) {
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
      router.push(`/details/${newPhotoId}/${albumId.value}/${albumCaption.value}`);
      photoId.value = Number(newPhotoId);
    };

    watch(() => route.params.albumCaption, (newAlbumCaption) => {
      albumCaption.value = newAlbumCaption;
    });

    return {
      photos,
      setDetails,
      page,
      first,
      last,
      prev,
      next,
      albumCaption,
    };
  }
};
</script>


<style scoped>
/* Add your styles here */
</style>
