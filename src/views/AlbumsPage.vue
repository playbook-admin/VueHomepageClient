<template>
  <div class="container">
    <div class="row">
      <div class="row-height col">
        <div class="col-md-3 hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <div class="row">
            <div class="col-md-12">
              <h4>Photo album</h4>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-md-height">
          <div class="row">
            <font-awesome-icon 
              icon="spinner" 
              size="2x" 
              spin 
              style="text-align:center"
              :style="{ opacity: opacity }"
            />
            <table class="album-frame" style="font-size: 10px; font-family: verdana, arial, helvetica, sans-serif;">
              <tbody>
                <tr v-for="row in getAlbumRows()" :key="row[0].AlbumID">
                  <td v-for="(album, index) in row" :key="album.AlbumID">
                    <AlbumFrame
                      :AlbumID="album.AlbumID"
                      :PhotoCount="album.PhotoCount"
                      :Caption="album.Caption"
                      :IsPublic="album.IsPublic"
                      :ItemCount="index"
                      :IsAuthorized="isAuthorized"
                      @delete="handleDelete(album.AlbumID)"
                      @update="(newCaption) => handleUpdate(album.AlbumID, newCaption)"
                      @add="handleAdd"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import * as apiClient from '../helpers/ApiHelpers';
import { useApiAddress, useIsAuthorized, useLoading } from '../components/useGlobalState';
import AlbumFrame from '../components/albums/AlbumFrame.vue'; // Ensure this component is correctly imported
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'AlbumsPage',
  components: {
    AlbumFrame,
    FontAwesomeIcon
  },
  setup() {
    // Using hooks
    const { apiAddress } = useApiAddress();
    const { isAuthorized } = useIsAuthorized();
    const { loading, setLoading } = useLoading();

    // Reactive states
    const opacity = computed(() => (loading.value ? 1 : 0));

    const albums = ref([]);
    const isAddNewAlbum = ref(false);
    const isUpdateOldAlbum = ref(isAuthorized.value && !isAddNewAlbum.value);

    const isDisabledForAddAndUpdate = ref(false);
    const isDisabledForDelete = ref(false);

    // Function to update state based on loading status
    // const updateStates = () => {
    //   isAddNewAlbum.value = false; // Example logic; adjust as needed
    //   isUpdateOldAlbum.value = isAuthorized.value && !isAddNewAlbum.value;
    //   isDisabledForAddAndUpdate.value = false; // Example logic; adjust as needed
    //   isDisabledForDelete.value = false; // Example logic; adjust as needed
    // };

    // Function to fetch albums
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getHelper(`${apiAddress.value}/api/albums`);
        albums.value = response; // Adjust according to the API response
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      } finally {
        setLoading(false);
      }
    };

    // Event handlers
    const handleUpdate = async (albumID, newCaption) => {
      try {
        setLoading(true);
        await apiClient.putHelper(`${apiAddress.value}/api/albums/${albumID}`, { caption: newCaption });
        fetchAlbums(); // Refresh albums after update
      } catch (error) {
        console.error('Update failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (albumID) => {
      try {
        setLoading(true);
        await apiClient.deleteHelper(`${apiAddress.value}/api/albums/${albumID}`);
        fetchAlbums(); // Refresh albums after deletion
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleAdd = async (newCaption) => {
      try {
        setLoading(true);
        await apiClient.postHelper(`${apiAddress.value}/api/albums`, { caption: newCaption });
        fetchAlbums(); // Refresh albums after addition
      } catch (error) {
        console.error('Add failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const getAlbumRows = () => {
      const rows = [];
      for (let i = 0; i < albums.value.length; i += 2) {
        rows.push(albums.value.slice(i, i + 2));
      }

      return rows;
    };

    // Lifecycle hooks
    onMounted(() => {
      fetchAlbums();
    });

    return {
      opacity,
      isAddNewAlbum,
      isUpdateOldAlbum,
      isDisabledForAddAndUpdate,
      isDisabledForDelete,
      handleUpdate,
      handleDelete,
      handleAdd,
      getAlbumRows
    };
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
