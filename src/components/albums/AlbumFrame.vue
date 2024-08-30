<template>
    <td class="item">
      <div v-if="isUpdateOldAlbum" style="display: flex; justify-content: center; align-items: center; color: black;">
        <font-awesome-icon 
          icon="save" 
          size="2x" 
          :style="{ margin: '0 50px 0 50px', opacity: isDisabledForAddAndUpdate ? '0.5' : '1', cursor: isDisabledForAddAndUpdate ? 'not-allowed' : 'pointer' }"
          @click="!isDisabledForAddAndUpdate && handleUpdate(albumID, localCaption)"
        />
  
        <font-awesome-icon 
          icon="trash" 
          size="2x" 
          :style="{ margin: '0 150px 0 40px', opacity: isDisabledForDelete ? '0.5' : '1', cursor: isDisabledForDelete ? 'not-allowed' : 'pointer' }"
          @click="!isDisabledForDelete && handleDelete(albumID)"
        />
      </div>
      <br v-else />
  
      <div v-if="isAddNewAlbum" style="align-items: center; color: black;">
        <font-awesome-icon 
          icon="save" 
          size="2x" 
          :style="{ margin: '0 50px 0 50px', opacity: isDisabledForAddAndUpdate ? '0.5' : '1', cursor: isDisabledForAddAndUpdate ? 'not-allowed' : 'pointer' }"
          @click="!isDisabledForAddAndUpdate && handleAdd(localCaption)"
        />
      </div>
      <br v-else />
  
      <table cellpadding="0" cellspacing="0" class="album-frame">
        <tbody>
          <!-- (ditt befintliga HTML-innehåll här) -->
        </tbody>
      </table>
  
      <h4 v-if="isUpdateOldAlbum">
        <div style="color: rgb(152, 0, 0);">
          <TextAreaInput 
            v-model="localCaption" 
            placeholder="Enter caption" 
            @textChanged="onCaptionChanged"
          />
        </div>
      </h4>
      <h4 v-else>
        <router-link :to="`/photos/${albumID}/${localCaption}`">{{ localCaption }}</router-link>
      </h4>
  
      <h4 v-if="isAddNewAlbum">
        <div style="color: rgb(152, 0, 0);">
          <TextAreaInput 
            v-model="localCaption" 
            placeholder="Enter caption" 
            @textChanged="onCaptionChanged"
          />
        </div>
      </h4>
      <br v-else />
      <div>{{ photoCount }} images</div>
    </td>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import TextAreaInput from '../common/TextAreaInput.vue';
  import { useApiAddress, useLoading, useIsAuthorized } from '../components/useGlobalState';
  
  export default {
    name: 'AlbumItem',
    components: {
      FontAwesomeIcon,
      TextAreaInput
    },
    setup() {
    // Using hooks
    const { apiAddress } = useApiAddress();
    const {isAuthorized } = useIsAuthorized();
    const { loading, setLoading } = useLoading();
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
    },
    data() {
      return {
        isAddNewAlbum: false,
        isUpdateOldAlbum: false,
        isDisabledForAddAndUpdate: false,
        isDisabledForDelete: false,
        localCaption: this.caption // Skapa en lokal kopia av prop-värdet
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
        setLoading(true);
        // await this.$emit('update', { albumID, newCaption });
        this.$globalState.setLoading(false);
      },
      async handleDelete(albumID) {
        this.$globalState.setLoading(true);
        // await this.$emit('delete', albumID);
        this.$globalState.setLoading(false);
      },
      async handleAdd(newCaption) {
        this.$globalState.setLoading(true);
        // await this.$emit('add', newCaption);
        this.$globalState.setLoading(false);
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
  