<template>
  <td class="item">
    <!-- <div v-if="isUpdateOldAlbum" style="display: flex; justify-content: center; align-items: center; color: black;">
      <font-awesome-icon
        :icon="['fas', 'save']"
        @click="!isDisabledForAddAndUpdate && handleUpdate(AlbumID, caption)"
        :style="{
          fontSize: '2em',
          margin: '0 50px 0 80px',
          cursor: isDisabledForAddAndUpdate ? 'not-allowed' : 'pointer',
          opacity: isDisabledForAddAndUpdate ? 0.5 : 1
        }"
      />
      <font-awesome-icon
        :icon="['fas', 'trash']"
        @click="!isDisabledForDelete && handleDelete(AlbumID)"
        :style="{
          fontSize: '2em',
          margin: '0 150px 0 30px',
          cursor: isDisabledForDelete ? 'not-allowed' : 'pointer',
          opacity: isDisabledForDelete ? 0.5 : 1
        }"
      />
    </div>
    <div v-if="isAddNewAlbum" style="align-items: center; color: black;">
      <font-awesome-icon
        :icon="['fas', 'save']"
        @click="!isDisabledForAddAndUpdate && handleAdd(caption)"
        :style="{
          fontSize: '2em',
          margin: '0 50px 0 100px',
          cursor: isDisabledForAddAndUpdate ? 'not-allowed' : 'pointer',
          opacity: isDisabledForAddAndUpdate ? 0.5 : 1
        }"
      />
    </div>
    <table cellpadding="0" cellspacing="0" class="album-frame">
      <tbody>
        <-- The image table rows here -->
        <tr>
          <!-- <td class="topx----">
            <img alt="" src="/assets/images/album-l1.gif" style="max-height: 100%; max-width: 100%; vertical-align: top;" />
          </td>
          <td class="top-x---">
            <img alt="" src="/assets/images/album-mtl.gif" style="max-height: 100%; max-width: 100%; vertical-align: top;" />
          </td>
          <td class="top--x--" />
          <td class="top---x-">
            <img alt="" src="/assets/images/album-mtr.gif" style="max-height: 100%; max-width: 100%; vertical-align: top;" />
          </td>
          <td class="top----x">
            <img alt="" src="/assets/images/album-r1.gif" style="max-height: 100%; max-width: 100%; vertical-align: top;" />
          </td> -->
        </tr>
        <!-- Other table rows go here -->
      <!-- </tbody>
    </table>
    <h4 v-if="isUpdateOldAlbum">
      <div style="color: rgb(152, 0, 0);">
        <TextAreaInput v-model="caption" placeholder="Enter caption" />
      </div>
    </h4>
    <h4 v-else>
      <router-link :to="`/photos/${AlbumID}/${Caption}`">{{ Caption }}</router-link>
    </h4>
    <h4 v-if="isAddNewAlbum">
      <div style="color: rgb(152, 0, 0);">
        <TextAreaInput v-model="caption" placeholder="Enter caption" />
      </div>
    </h4>
    <div>{{ PhotoCount }} images</div> --> -->
  </td>
</template>

<script>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TextAreaInput from '../common/TextAreaInput.vue';
import { useApiAddress, useIsAuthorized } from '../useGlobalState';

export default {
  name: "AlbumFrame",
  components: {
    // FontAwesomeIcon,
    // TextAreaInput
  },
  props: {
    albumId: {
      type: Number,
      required: false
    },
    caption: {
      type: String,
      required: false
    },
    photoCount: {
      type: Number,
      required: false
    },
    isPublic: {
      type: Boolean,
      required: false
    },
    itemCount: {
      type: Number,
      required: true
    },
    handleDelete: {
      type: Function,
      required: false
    },
    handleUpdate: {
      type: Function,
      required: false
    },
    handleAdd: {
      type: Function,
      required: false
    }
  },
  setup(props) {
   const { apiAddress } = useApiAddress();
    const { isAuthorized } = useIsAuthorized();
    const isAddNewAlbum = computed(() => props.albumId === 0);
    const cap = ref(props.caption);

    const isUpdateOldAlbum = computed(() => isAuthorized && !isAddNewAlbum.value);
    const isDisabledForAddAndUpdate = computed(() => cap.value.trim() === '');
    const isDisabledForDelete = computed(() => props.photoCount > 0);

    return {
      apiAddress,
      isAddNewAlbum,
      cap,
      isUpdateOldAlbum,
      isDisabledForAddAndUpdate,
      isDisabledForDelete
    };
  }
};
</script>
