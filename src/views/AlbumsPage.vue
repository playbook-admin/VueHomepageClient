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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { postHelper, putHelper, deleteHelper } from '@/helpers/ApiHelpers'; // Importera hjälpfunktioner

export default {
  name: 'AlbumItem',
  components: {
    FontAwesomeIcon
  },
  props: {
    albumID: Number,
    photoCount: Number,
    caption: {
      type: String,
      default: ''
    },
    isPublic: Boolean,
    itemCount: Number,
    isAuthorized: Boolean
  },
  data() {
    return {
      apiAddress: this.$globalState.apiAddress,
      isAddNewAlbum: false,
      isUpdateOldAlbum: false,
      isDisabledForAddAndUpdate: false,
      isDisabledForDelete: false,
      localCaption: this.caption // Lokal kopia av prop-värdet
    };
  },
  watch: {
    albumID: 'updateStates',
    isAuthorized: 'updateStates',
    caption: 'updateStates',
    localCaption: 'onCaptionChanged' // Lägg till en watch för att hantera ändringar
  },
  methods: {
    updateStates() {
      this.isAddNewAlbum = this.albumID === 0;
      this.isUpdateOldAlbum = this.isAuthorized && !this.isAddNewAlbum;
      this.isDisabledForAddAndUpdate = !this.localCaption.trim();
      this.isDisabledForDelete = this.photoCount > 0;
    },
    onCaptionChanged(newCaption) {
      this.isDisabledForAddAndUpdate = !newCaption.trim();
    },
    async handleUpdate(albumID, newCaption) {
      try {
        this.$globalState.setLoading(true);
        await putHelper(`${this.apiAddress}/albums/${albumID}`, { caption: newCaption }, this.$globalState.authToken);
        this.$emit('update', { albumID, newCaption });
      } catch (error) {
        console.error('Update failed:', error);
      } finally {
        this.$globalState.setLoading(false);
      }
    },
    async handleDelete(albumID) {
      try {
        this.$globalState.setLoading(true);
        await deleteHelper(`${this.apiAddress}/albums/${albumID}`, this.$globalState.authToken);
        this.$emit('delete', albumID);
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        this.$globalState.setLoading(false);
      }
    },
    async handleAdd(newCaption) {
      try {
        this.$globalState.setLoading(true);
        await postHelper(`${this.apiAddress}/albums`, { caption: newCaption }, this.$globalState.authToken);
        this.$emit('add', newCaption);
      } catch (error) {
        console.error('Add failed:', error);
      } finally {
        this.$globalState.setLoading(false);
      }
    }
  },
  mounted() {
    this.updateStates();
  }
};
</script>

<style scoped>
/* Lägg till dina stilar här om nödvändigt */
</style>
