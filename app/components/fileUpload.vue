<template>
  <div
    class="rounded-2xl z-10 absolute overflow-hidden bottom-45 right-3 bg-gray-300/40 backdrop-blur-sm transition-all duration-1500 text-center p-2 cursor-pointer leading-5 text-white"
   :class="classes.parent">
       <button :class="classes.btn" class="text-base" @click="showUpload(true)">upload</button>
  
      <label
      for="uploadFile1"
      ref="onDropZone"
      class="bg-transparent uploadFile py-4 text-gray-300 font-semibold text-base rounded flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
      :class="classes.labelUpload"
    >
    <button class="w-10 h-10 text-base text-red-400" @click="showUpload(false)">close</button>
      <UInput
        type="file"
        id="uploadFile1"
        size="sm"
        multiple
        icon="i-heroicons-folder"
        class="hidden"
        @change="uploadAudioFiles"
        accept="audio/*"
      />
      <img src="https://www.aparat.com/redesign/static/img/upload/upload-light.svg" alt="upload"/>
     <span> بارگذاری موسیقی</span>
      <p class="text-md font-medium text-white my-3">
       فایل‌ صوتی خود را اینجا بکشید، یا با زدن آیکون بالا آن را انتخاب کنید.
      </p>
    </label>
  </div>
</template>

<script setup>
import { useIndexStore } from "../../stores/index";

let classes = reactive({
  parent: "w-[4.5rem] h-[2.4rem]",
  btn: "visibility",
  labelUpload: "invisiblity"
}) 

const showUpload = (show) => {
  if(show){
   classes.parent = "w-[95%] h-[22rem]";
   classes.btn = "invisiblity hidden";
   classes.labelUpload = "visibility"
  }else{
   classes.parent = "w-[4.5rem] h-[2.4rem]";
   classes.btn = "visibility";
   classes.labelUpload = "invisiblity"
  }
}

let audioFiles = [];

const uploadAudioFiles = async (event) => {
  audioFiles = Array.from(event.currentTarget.files); // ذخیره فایل‌ها به‌صورت آرایه

  if (!audioFiles.length) {
    alert("لطفاً حداقل یک فایل انتخاب کنید.");
    return;
  }

  const formData = new FormData();
  audioFiles.forEach((file, index) => {
    formData.append(`audio_${index}`, file);
  });

  try {
    fetchUploadFile(formData);
    window.alert("فایل شما آپلود شد")
  } catch (error) {
    console.error("خطا در آپلود فایل‌ها:", error);
  }
};

const fetchUploadFile = async (formData) => {
  await $fetch("/api/files/upload", {
    "Content-Type": "multipart/form-data",
    method: "POST",
    body: formData,
  });
  useIndexStore().fetchGetSongs();
};
</script>


<style >
  .invisiblity{
   visibility: hidden; 
  }

  .visibility{
    visibility: visible;
  }
</style>