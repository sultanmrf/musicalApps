<template>
  <div
    class="rounded-2xl z-10 absolute overflow-hidden bottom-24 right-3 bg-white/10 backdrop-blur-xl shadow-2xl transition-all duration-700 text-center p-0 cursor-pointer text-white"
    :class="classes.parent"
    @dragover.prevent
    @drop.prevent="handleDrop"
  >
    <button
      :class="classes.btn"
      class="text-sm w-full rounded-xl bg-gradient-to-r from-primary-300 to-primary-700 h-full"
      @click="showUpload(true)"
    >
      <IconsUpload size="lg" class="text-white" />
    </button>

    <label
      for="uploadFile1"
      ref="onDropZone"
      class="uploadFile py-14 px-4 m-3 rounded-xl flex flex-col items-center justify-center cursor-pointer border-3 border-dashed border-white/30 hover:border-primary-700 transition gap-3"
      :class="classes.labelUpload"
    >
      <button
        class="absolute top-6 right-6 text-white text-md"
        @click.stop="showUpload(false)"
      >
        ✕
      </button>

      <UInput
        type="file"
        id="uploadFile1"
        size="sm"
        multiple
        class="hidden"
        @change="uploadAudioFiles"
        accept="audio/*"
      />

      <div
        class="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-200 to-primary-600 flex items-center justify-center text-3xl"
      >
        <IconsUpload size="lg" class="text-white" />
      </div>

      <span class="text-lg font-semibold"> Upload music </span>

      <p class="text-sm text-gray-300">
       Drag and drop or click the audio file
      </p>

      <div v-if="audioFiles.length" class="text-green-400 text-xs mt-2">
        {{ audioFiles.length }} File selected
      </div>
    </label>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useIndexStore } from "~~/stores/index";

let classes = reactive({
  parent: "w-[3.5rem] h-[3.5rem]",
  btn: "visibility",
  labelUpload: "invisiblity",
});

let storeIndex = useIndexStore();

const showUpload = (show) => {
  if (show) {
    classes.parent = "w-[95%] h-[17rem]";
    classes.btn = "hidden";
    classes.labelUpload = "visibility";
  } else {
    classes.parent = "w-[3.5rem] h-[3.5rem]";
    classes.btn = "visibility";
    classes.labelUpload = "invisiblity";
  }
};

const audioFiles = ref([]);
let storeSetting = inject("storeSetting");

const uploadAudioFiles = async (event) => {
  audioFiles.value = Array.from(event.target.files);
  sendFiles();
};

const handleDrop = (event) => {
  audioFiles.value = Array.from(event.dataTransfer.files);
  sendFiles();
};

const sendFiles = async () => {
  if (!audioFiles.value.length) return;

  const formData = new FormData();
  audioFiles.value.forEach((file, index) => {
    formData.append(`audio_${index}`, file);
  });

  try {
    await fetchUploadFile(formData);
    alert("🎶 فایل با موفقیت آپلود شد");
    storeIndex.fetchGetSongs();
  } catch (err) {
    console.error(err);
  }
};

const fetchUploadFile = async (formData) => {
  storeSetting.showloadingApi = true;
  await useFetch("/api/files/upload", {
    "Content-Type": "multipart/form-data",
    method: "POST",
    body: formData,
  });
  storeSetting.showloadingApi = false;
};
</script>

<style>
.invisiblity {
  visibility: hidden;
}

.visibility {
  visibility: visible;
}
</style>
