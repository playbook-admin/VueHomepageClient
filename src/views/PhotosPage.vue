<template>
    <div class="container">
      <div class="row">
        <div class="row-height col">
          <div class="col-md-3 hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
            <div class="row">
              <div class="col-md-12">
                <h4>{{ albumCaption }}</h4>
              </div>
            </div>
          </div>
          <div class="col-md-9 col-md-height">
            <div class="row">
              <div class="buttonbar buttonbar-top">
                <router-link to="/albums">
                  <img alt="" src="/assets/images/button-gallery.gif" />
                </router-link>
              </div>
              <div class="row justify-content-md-center">
                <div class="col-xs-6"></div>
                <div class="col-md-auto">
                  <font-awesome-icon
                    icon="spinner"
                    size="2x"
                    spin
                    :style="{ opacity: opacity }"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <table class="view" style="border-collapse: collapse;">
                  <tbody>
                    <tr v-for="(row, rowIndex) in photoRows" :key="rowIndex">
                      <td v-for="(photo, index) in row" :key="photo.photoID">
                        <div v-if="isAuthorized">
                          <text-area-input
                            :text="captions[index]"
                            placeholder="Enter caption"
                            @textChanged="(value) => handleCaptionChange(value, index)"
                          />
                        </div>
                        <div v-else>{{ captions[index] }}</div>
                        <photo-frame>
                          <div class="fade-in-animation">
                            <router-link :to="`/details/${photo.photoID}/${albumId}/${albumCaption}`">
                              <img
                                :src="`${apiAddress}/Handler/Index/PhotoID=${photo.photoID}/Size=M`"
                                alt=""
                                style="border: 4px solid white"
                              />
                            </router-link>
                        </div>
                        </photo-frame>
                        <div v-if="isAuthorized">
                          <a @click="toggleDelete(index)" style="margin-right: 10px;">
                            <font-awesome-icon icon="trash" size="1x" />
                          </a>
                          <delete-confirmation
                            :showModal="showDeleteConfirmationModals[index]"
                            :confirmModal="() => handleDelete(index)"
                            :hideModal="() => toggleDelete(index)"
                            :message="`Do you want to remove ${photo.caption}?`"
                          />
                          <a @click="handleUpdate(index)" style="margin-left: 10px;">
                            <font-awesome-icon icon="save" size="1x" />
                          </a>
                          <font-awesome-icon
                            icon="spinner"
                            size="2x"
                            spin
                            :style="{ opacity: status === 'loading' && selectedIndex === index ? 1 : 0 }"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr v-if="isAuthorized">
                      <td>
                        <text-area-input
                          :text="photoCaption"
                          placeholder="Enter caption"
                          @textChanged="handleNewCaptionChanged"
                        />
                        <photo-frame :defaultImage="true">
                          <file-upload-function
                            :albumId="albumId"
                            :caption="photoCaption"
                            @photoAdded="handlePhotoAdded"
                          />
                        </photo-frame>
                      </td>
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
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import PhotoFrame from '../photos/PhotoFrame.vue';
  import FileUploadFunction from '../photos/FileUploadFunction.vue';
  import TextAreaInput from '../components/common/TextAreaInput.vue';
  import DeleteConfirmation from '../components/common/DeleteConfirmation.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { useApiAddress, useIsAuthorized, useLoading } from '../providers/useGlobalState';
  import * as apiClient from '../helpers/ApiHelpers';
  
  export default {
    name: 'PhotosPage',
    components: {
      PhotoFrame,
      FileUploadFunction,
      TextAreaInput,
      DeleteConfirmation,
      FontAwesomeIcon
    },
    setup() {
      // Global state hooks
      const { apiAddress } = useApiAddress();
      const { isAuthorized } = useIsAuthorized();
      const { loading, setLoading } = useLoading();
   
      // Reactive states
      const opacity = computed(() => (loading.value ? 1 : 0));

      // Local state
      const route = useRoute();
      const albumId = route.params.albumId;
      const albumCaption = route.params.albumCaption;
      const photos = ref([]);
      const captions = ref([]);
      const showDeleteConfirmationModals = ref([]);
      const photoCaption = ref('');
      const selectedIndex = ref(-1);

      // Fetch photos on mount
      const fetchPhotos = async () => {
        setLoading(true);
        const response = await apiClient.getHelper(`${apiAddress.value}/api/photos/album/${albumId}`);
        photos.value = response;
        captions.value = response.map(p => p.caption);
        showDeleteConfirmationModals.value = response.map(() => false);
 
        setLoading(false);
      };
  
      onMounted(fetchPhotos);
  
      // Update status
      const setStatus = (newStatus) => {
        status.value = newStatus;
      };
  
      // Handle caption change
      const handleCaptionChange = (value, index) => {
        captions.value[index] = value;
      };
  
      // Handle photo addition
      const handlePhotoAdded = async () => {
        await fetchPhotos();
        photoCaption.value = '';
      };
  
      // Handle new caption input
      const handleNewCaptionChanged = (value) => {
        photoCaption.value = value;
      };
  
      // Handle photo deletion
      const handleDelete = async (index) => {
        setLoading(true);
        await apiClient.deleteHelper(`${apiAddress.value}/api/photos/delete/${photos.value[index].photoID}`);
        photos.value.splice(index, 1);
        captions.value.splice(index, 1);
        showDeleteConfirmationModals.value.splice(index, 1);
        setLoading(false);
      };
  
      // Toggle delete confirmation modal
      const toggleDelete = (index) => {
        showDeleteConfirmationModals.value[index] = !showDeleteConfirmationModals.value[index];
      };
  
      // Handle photo update
      const handleUpdate = async (index) => {
        selectedIndex.value = index;
        setLoading(true);
        await apiClient.putHelper(`${apiAddress.value}/api/photos/update/${photos.value[index].photoID}`, {
          caption: captions.value[index]
        });
        setLoading(false);
      };
  
      // Compute photo rows
      const photoRows = computed(() => {
        const rows = [];
        for (let i = 0; i < photos.value.length; i += 5) {
          rows.push(photos.value.slice(i, i + 5));
        }
        return rows;
      });
  
      return {
        albumId,
        albumCaption,
        photos,
        captions,
        showDeleteConfirmationModals,
        status,
        photoCaption,
        selectedIndex,
        handleNewCaptionChanged,
        handlePhotoAdded,
        handleUpdate,
        handleDelete,
        toggleDelete,
        photoRows,
        apiAddress,
        isAuthorized,
        opacity
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  