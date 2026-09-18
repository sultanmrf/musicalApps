<template>
  <form @submit.prevent="submitHandel" class="space-y-5 p-4">
    <div class="flex gap-4 items-center">
      <div
        class="w-24 h-24 rounded-xl overflow-hidden bg-neutral-800 flex items-center justify-center"
      >
        <img v-if="preview" :src="preview" class="w-full h-full object-cover" />
        <NuxtImg
          v-else
          src="/images/playList.png"
          class="w-full h-full object-cover"
        />
      </div>

      <UInput type="file" accept="image/*" @change="coverChange" />
    </div>

    <UFormField label="Playlist Name">
      <UInput v-model="form.name" placeholder="My Playlist" size="lg" />
    </UFormField>

    <UFormField label="Description">
      <UTextarea v-model="form.description" :rows="3" />
    </UFormField>

    <UButton type="submit" block size="lg" :disabled="!form.name">
      Create Playlist
    </UButton>
  </form>
</template>

<script setup lang="ts">
import { useSettingStore } from "~~/stores/setting";
import { useAuthStore } from "~~/stores/auth";

const { createPlaylist, addPlaylist } = usePlaylist();
const storeSetting = useSettingStore();
const authStore = useAuthStore();
const toast = useToast();

const form = reactive({
  name: "",
  description: "",
  cover: null as File | null,
});

const preview = ref<string | null>(null);

const coverChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) {
    form.cover = target.files[0];
    preview.value = URL.createObjectURL(target.files[0]);
  }
};

const submitHandel = async () => {
  let cover = "";

  if (form.cover) {
    try {
      const formData = new FormData();
      formData.append("file", form.cover);

      const uploaded = await $fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });
      cover = uploaded.path;
    } catch (err) {
      toast.add({
        title: "خطا در آپلود کاور",
        color: "error",
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }
  }

  const { data, error } = await createPlaylist({
    name: form.name,
    description: form.description,
    cover,
    userId: authStore.user?._id || "",
  });

  if (error.value || !data.value) {
    toast.add({
      title: "خطا در ساخت پلی‌لیست",
      color: "error",
      icon: "i-heroicons-exclamation-triangle",
    });
    return;
  }

  addPlaylist(data.value);
  storeSetting.showModal = false;

  form.name = "";
  form.description = "";
  form.cover = null;
  preview.value = null;

  toast.add({
    title: "پلی‌لیست با موفقیت ساخته شد",
    color: "success",
    icon: "i-heroicons-check-circle",
  });
};
</script>