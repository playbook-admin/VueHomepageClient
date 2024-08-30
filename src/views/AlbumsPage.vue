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
import { mapState } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AlbumFrame from '../components/albums/AlbumFrame.vue';

export default {
  name: 'AlbumsPage',
  components: {
    FontAwesomeIcon,
    AlbumFrame,
  },
  data() {
    return {
      albums: [],
    };
  },
  computed: {
    ...mapState({
      isAuthorized: state => state.sessionUserContext.isAuthorized,
      loading: state => state.globalStateContext.loading,
    }),
    opacity() {
      return this.loading ? '1' : '0';
    },
  },
  methods: {
    async getAlbumsWithPhotoCount(url) {
      this.$store.commit('setLoading', true);
      try {
        const response = await this.$http.get(url);
        this.albums = response.data || [];

        if (this.isAuthorized && this.noEmptyAlbumsExist(this.albums)) {
          this.albums.push({ AlbumID: 0, PhotoCount: 0, Caption: '', IsPublic: true });
        }
      } catch (ex) {
        console.error('Could not contact server: ', ex.message);
      } finally {
        this.$store.commit('setLoading', false);
      }
    },
    noEmptyAlbumsExist(albums) {
      return albums.every(album => album.PhotoCount > 0);
    },
    async handleDelete(albumId) {
      this.$store.commit('setLoading', true);
      try {
        await this.$http.delete(`/api/albums/delete/${albumId}`);
        await this.getAlbumsWithPhotoCount('/api/albums');
      } catch (ex) {
        console.error('Error deleting album: ', ex.message);
      } finally {
        this.$store.commit('setLoading', false);
      }
    },
    async handleUpdate(albumId, newCaption) {
      this.$store.commit('setLoading', true);
      try {
        const content = { newCaption };
        await this.$http.put(`/api/albums/update/${albumId}`, content);
        await this.getAlbumsWithPhotoCount('/api/albums');
      } catch (ex) {
        console.error('Error updating album: ', ex.message);
      } finally {
        this.$store.commit('setLoading', false);
      }
    },
    async handleAdd(newCaption) {
      this.$store.commit('setLoading', true);
      try {
        const content = { newCaption };
        await this.$http.post('/api/albums/add', content);
        await this.getAlbumsWithPhotoCount('/api/albums');
      } catch (ex) {
        console.error('Error adding album: ', ex.message);
      } finally {
        this.$store.commit('setLoading', false);
      }
    },
    getAlbumRows() {
      const rows = [];
      for (let i = 0; i < this.albums.length; i += 2) {
        const row = [this.albums[i]];
        if (i + 1 < this.albums.length) {
          row.push(this.albums[i + 1]);
        }
        rows.push(row);
      }
      return rows;
    },
  },
  async mounted() {
    this.$router.push('/albums');
    await this.getAlbumsWithPhotoCount('/api/albums');
  },
};
</script>

<style scoped>
/* Lägg till dina stilar här om nödvändigt */
</style>
