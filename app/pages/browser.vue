<template>
  <div class="rtl -mx-4 px-4 pb-6">
    <!-- ═══ HERO ═══ -->
    <section class="relative pt-1">
      <div
        class="relative rounded-[1.75rem] overflow-hidden h-[13.5rem] shadow-2xl shadow-black/20"
      >
        <BrowserCoverArt
          :seed="heroSeed"
          variant="grid"
          rounded="rounded-none"
          class="absolute inset-0"
        />

        <div
          class="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent"
        />

        <div class="absolute inset-x-0 bottom-0 p-4 flex items-end gap-3">
          <div class="min-w-0 flex-1">
            <span
              class="inline-flex items-center gap-1.5 text-[0.65rem] font-medium text-primary bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 mb-2"
            >
              <IconsFire size="sm" class="text-primary !w-3 !h-3" />
              {{ hero.kicker }}
            </span>

            <h1 class="text-white text-lg font-bold leading-6 line-clamp-1">
              {{ hero.title }}
            </h1>
            <p class="text-white/70 text-xs mt-0.5 line-clamp-1">
              {{ hero.subtitle }}
            </p>
          </div>

          <UButton
            color="primary"
            square
            class="shrink-0 w-12 h-12 rounded-full shadow-3xl-orage"
            @click="playList(heroSongs)"
          >
            <IconsPlay size="md" class="text-white" />
          </UButton>
        </div>

        <div class="absolute top-3 left-3 flex gap-1.5">
          <button
            v-for="(_, i) in heroes"
            :key="i"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="i === heroIndex ? 'w-5 bg-primary' : 'w-1.5 bg-white/40'"
            :aria-label="`اسلاید ${i + 1}`"
            @click="heroIndex = i"
          />
        </div>
      </div>
    </section>

    <!-- ═══ SEARCH ═══ -->
    <section class="mt-4">
      <div class="flex items-center gap-2">
        <div
          class="flex items-center gap-2 flex-1 rounded-2xl px-3 h-11
            bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10
            focus-within:border-primary/60 transition"
        >
          <IconsSearch size="sm" class="text-gray-400 shrink-0" />
          <input
            v-model="query"
            type="search"
            placeholder="جستجوی آهنگ، آلبوم یا آرتیست..."
            class="flex-1 bg-transparent outline-none text-sm
              text-gray-800 dark:text-white placeholder-gray-400 w-full"
            @focus="isSuggestOpen = true"
            @blur="closeSuggest"
          />
          <button
            v-if="query"
            class="text-gray-400 hover:text-primary transition"
            aria-label="پاک کردن"
            @click="query = ''"
          >
            <IconsXmark size="sm" />
          </button>
        </div>

        <button
          class="relative shrink-0 w-11 h-11 rounded-2xl grid place-items-center border transition
            bg-white dark:bg-white/5 border-gray-200 dark:border-white/10
            hover:border-primary/60 active:scale-95"
          aria-label="فیلترها"
          @click="isFilterOpen = true"
        >
          <IconsTune size="sm" class="text-primary" />
          <span
            v-if="activeFilterCount"
            class="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-primary text-white
              text-[0.6rem] font-bold grid place-items-center"
          >
            {{ activeFilterCount }}
          </span>
        </button>
      </div>

      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        leave-active-class="transition duration-150"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isSuggestOpen && suggestions.length"
          class="mt-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10
            bg-white dark:bg-zinc-900 shadow-xl"
        >
          <button
            v-for="item in suggestions"
            :key="`${item.type}-${item.label}`"
            class="w-full text-right px-3.5 py-2.5 flex items-center gap-3 hover:bg-primary/5 transition"
            @mousedown.prevent="pickSuggestion(item)"
          >
            <BrowserPosterArt
              :src="item.poster"
              :alt="item.label"
              :seed="item.label"
              :width="64"
              :height="64"
              rounded="rounded-lg"
              class="w-8 h-8 shrink-0"
            />
            <span class="text-sm text-gray-700 dark:text-gray-100 truncate flex-1">
              {{ item.label }}
            </span>
            <span class="text-[0.65rem] text-gray-400 shrink-0">{{ item.type }}</span>
          </button>
        </div>
      </Transition>
    </section>

    <!-- ═══ MOOD CHIPS ═══ -->
    <section v-if="!query" class="mt-4">
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          v-for="chip in chips"
          :key="chip.key"
          class="shrink-0 px-3.5 h-8 rounded-full text-xs font-medium border transition-all duration-200"
          :class="
            activeChip === chip.key
              ? 'bg-primary text-white border-primary shadow-3xl-orage'
              : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-primary/40'
          "
          @click="activeChip = chip.key"
        >
          {{ chip.label }}
        </button>
      </div>
    </section>

    <!-- ═══ STATS ═══ -->
    <section
      v-if="!query"
      class="mt-4 grid grid-cols-3 gap-2"
    >
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl p-3 text-center
          bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10"
      >
        <p class="text-base font-bold text-primary leading-6">
          {{ stat.value }}
        </p>
        <p class="text-[0.65rem] text-gray-400 mt-0.5">{{ stat.label }}</p>
      </div>
    </section>

    <!-- ═══ TRENDING TRACKS ═══ -->
    <section class="mt-6">
      <div class="flex items-center justify-between mb-3">
        <h2 class="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-white">
          <IconsFire size="sm" class="text-primary" />
          {{ query ? "نتایج جستجو" : "ترک‌های داغ" }}
        </h2>
        <span class="text-[0.65rem] text-gray-400">
          {{ visibleTracks.length }} آهنگ
        </span>
      </div>

      <div v-if="visibleTracks.length" class="space-y-2">
        <button
          v-for="(song, i) in visibleTracks"
          :key="song._id"
          class="group w-full text-right flex items-center gap-3 p-2.5 rounded-2xl border transition
            bg-white dark:bg-white/5 border-gray-100 dark:border-white/10
            hover:border-primary/40 hover:bg-primary/5"
          @click="playTrack(song)"
        >
          <span
            class="w-5 text-center text-xs font-bold shrink-0
              text-gray-300 dark:text-gray-600 group-hover:hidden"
          >
            {{ String(i + 1).padStart(2, "0") }}
          </span>

          <BrowserPosterArt
            :src="song.poster?.thumb"
            :alt="song.name"
            :seed="song._id"
            :width="120"
            :height="120"
            rounded="rounded-xl"
            class="w-14 h-14 shrink-0"
          />

          <div class="min-w-0 flex-1">
            <p
              class="text-sm font-semibold truncate"
              :class="
                song.status === 'play'
                  ? 'text-primary'
                  : 'text-gray-800 dark:text-white'
              "
            >
              {{ song.name }}
            </p>
            <p class="text-xs text-gray-400 truncate">{{ song.artist }}</p>
          </div>

          <span
            class="w-9 h-9 shrink-0 rounded-full grid place-items-center transition
              bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
          >
            <IconsPause v-if="song.status === 'play'" size="sm" class="text-primary group-hover:text-white" />
            <IconsPlay v-else size="sm" class="text-primary group-hover:text-white" />
          </span>
        </button>
      </div>

      <div
        v-else
        class="rounded-2xl py-10 text-center border border-dashed
          border-gray-200 dark:border-white/10"
      >
        <IconsSearch size="lg" class="text-gray-300 dark:text-gray-600 mx-auto" />
        <p class="text-sm text-gray-400 mt-2">آهنگی پیدا نشد</p>
      </div>
    </section>

    <!-- ═══ ARTISTS ═══ -->
    <section v-if="!query && artists.length" class="mt-7">
      <div class="flex items-center justify-between mb-3">
        <h2 class="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-white">
          <IconsSparkle size="sm" class="text-primary" />
          آرتیست‌ها
        </h2>
        <NuxtLink
          to="/artists"
          class="text-xs text-primary hover:underline flex items-center gap-0.5"
        >
          همه
          <IconsAngleLeft size="sm" class="text-primary !w-3.5 !h-3.5" />
        </NuxtLink>
      </div>

      <div class="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        <BrowserBrowseArtistCard
          v-for="artist in artists"
          :key="artist._id"
          :artist="artist"
        />
      </div>
    </section>

    <!-- ═══ ALBUMS ═══ -->
    <section v-if="!query && albums.length" class="mt-7">
      <div class="flex items-center justify-between mb-3">
        <h2 class="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-white">
          <IconsMusicLibrary size="sm" class="text-primary" />
          آلبوم‌های تازه
        </h2>
        <NuxtLink
          to="/albums"
          class="text-xs text-primary hover:underline flex items-center gap-0.5"
        >
          همه
          <IconsAngleLeft size="sm" class="text-primary !w-3.5 !h-3.5" />
        </NuxtLink>
      </div>

      <div class="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        <BrowserBrowseAlbumCard
          v-for="album in albums"
          :key="album.name"
          :album="album"
        />
      </div>
    </section>

    <!-- ═══ GENRE GRID ═══ -->
    <section v-if="!query" class="mt-7">
      <h2 class="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-white mb-3">
        <IconsListMusic size="sm" class="text-primary" />
        سبک‌های موسیقی
      </h2>

      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="genre in genres"
          :key="genre.label"
          class="relative h-24 rounded-2xl overflow-hidden text-right p-3 flex items-end
            border transition active:scale-[0.97]"
          :class="
            activeChip === genre.key
              ? 'border-primary ring-2 ring-primary/40'
              : 'border-gray-200 dark:border-white/10'
          "
          @click="toggleGenre(genre.key)"
        >
          <BrowserCoverArt
            :seed="genre.label"
            :variant="genre.variant"
            rounded="rounded-none"
            class="absolute inset-0"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          <span class="relative text-white text-sm font-bold">{{ genre.label }}</span>
        </button>
      </div>
    </section>

    <!-- ═══ FILTER SHEET ═══ -->
    <UModal
      v-model:open="isFilterOpen"
      title="فیلترها"
      :ui="{
        content: 'bg-white dark:bg-dark sm:max-w-md',
        header: 'border-b border-gray-200 dark:border-white/10',
        body: 'p-4',
        footer: 'border-t border-gray-200 dark:border-white/10',
      }"
    >
      <template #body>
        <div class="space-y-5">
          <div>
            <p class="text-xs text-gray-400 mb-2">مرتب‌سازی</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="option in sortOptions"
                :key="option.value"
                class="h-10 rounded-xl text-sm border transition"
                :class="
                  sortBy === option.value
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300'
                "
                @click="sortBy = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>

          <div>
            <p class="text-xs text-gray-400 mb-2">مدت زمان</p>
            <div class="flex gap-2">
              <button
                v-for="option in durationOptions"
                :key="option.value"
                class="flex-1 h-10 rounded-xl text-xs border transition"
                :class="
                  durationFilter === option.value
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300'
                "
                @click="durationFilter = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>

          <div>
            <p class="text-xs text-gray-400 mb-2">مرتب‌سازی بر اساس</p>
            <div class="space-y-2">
              <label
                v-for="option in sourceOptions"
                :key="option.value"
                class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition
                  border-gray-200 dark:border-white/10 hover:border-primary/40"
              >
                <span
                  class="w-5 h-5 rounded-full border-2 grid place-items-center shrink-0 transition"
                  :class="
                    source === option.value
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 dark:border-white/20'
                  "
                >
                  <IconsCheck
                    v-if="source === option.value"
                    size="sm"
                    class="text-white !w-3 !h-3"
                  />
                </span>
                <span class="text-sm text-gray-700 dark:text-gray-200">
                  {{ option.label }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-2 w-full">
          <UButton
            color="gray"
            variant="soft"
            class="flex-1 justify-center"
            @click="resetFilters"
          >
            ریست
          </UButton>
          <UButton color="primary" class="flex-1 justify-center" @click="isFilterOpen = false">
            اعمال فیلتر
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useSongsStore } from "~~/stores/songs";
import { useAlbumsStore } from "~~/stores/albums";
import { useArtistsStore } from "~~/stores/artists";
import { useAudioStore } from "~~/stores/audio";
import { useSettingStore } from "~~/stores/setting";

useHead({ title: "موزیکال | کشف و مرور" });

const songsStore = useSongsStore();
const albumsStore = useAlbumsStore();
const artistsStore = useArtistsStore();
const storeAudio = useAudioStore();
const storeSetting = useSettingStore();

/* ─────────── State ─────────── */
const query = ref("");
const isSuggestOpen = ref(false);
const isFilterOpen = ref(false);
const activeChip = ref("all");
const heroIndex = ref(0);

const sortBy = ref<"default" | "new" | "popular">("default");
const durationFilter = ref<"all" | "short" | "medium" | "long">("all");
const source = ref<"all" | "album" | "single">("all");

let heroTimer: ReturnType<typeof setInterval> | null = null;

/* ─────────── Data ─────────── */
const songs = computed(() => songsStore.list ?? []);
const albums = computed<any[]>(() =>
  [...(albumsStore.list ?? [])].sort((a, b) => (b.count ?? 0) - (a.count ?? 0)),
);
const artists = computed<any[]>(() => (artistsStore.list ?? []).slice(0, 12));

const chips = [
  { key: "all", label: "همه" },
  { key: "new", label: "جدیدترین" },
  { key: "long", label: "بلندترین" },
  { key: "pop", label: "پاپ" },
  { key: "lofi", label: "آرام" },
  { key: "old", label: "کلاسیک" },
];

const genres = [
  { key: "pop", label: "پاپ", variant: "blob" as const },
  { key: "lofi", label: "آرام و بی‌کلام", variant: "waves" as const },
  { key: "rock", label: "راک", variant: "grid" as const },
  { key: "hiphop", label: "هیپ‌هاپ", variant: "bars" as const },
  { key: "classic", label: "کلاسیک", variant: "rings" as const },
  { key: "edm", label: "الکترونیک", variant: "hill" as const },
];

const sortOptions = [
  { label: "پیش‌فرض", value: "default" },
  { label: "جدیدترین", value: "new" },
  { label: "محبوب‌ترین", value: "popular" },
];

const durationOptions = [
  { label: "همه", value: "all" },
  { label: "زیر ۳ دقیقه", value: "short" },
  { label: "۳ تا ۵ دقیقه", value: "medium" },
  { label: "بالای ۵ دقیقه", value: "long" },
];

const sourceOptions = [
  { label: "همه آهنگ‌ها", value: "all" },
  { label: "فقط آلبوم‌ها", value: "album" },
  { label: "فقط تک‌آهنگ‌ها", value: "single" },
];

const activeFilterCount = computed(
  () =>
    (sortBy.value !== "default" ? 1 : 0) +
    (durationFilter.value !== "all" ? 1 : 0) +
    (source.value !== "all" ? 1 : 0),
);

const heroes = [
  { seed: "hero-daily", kicker: "پیشنهاد امروز", title: "منتخب سردبیر", subtitle: "ترک‌هایی که این هفته شنیده‌ای" },
  { seed: "hero-focus", kicker: "تمرکز", title: "مطالعه و کار", subtitle: "بی‌کلام و آرام برای تمرکز بیشتر" },
  { seed: "hero-night", kicker: "شب", title: "میکس شبانه", subtitle: "برای وقتی که شهر خوابیده" },
];

const hero = computed(() => heroes[heroIndex.value] ?? heroes[0]);
const heroSeed = computed(() => hero.value.seed);

const heroSongs = computed(() => songs.value.slice(0, 8));

/* ─────────── Computed ─────────── */
const stats = computed(() => [
  { label: "آهنگ", value: songs.value.length },
  { label: "آلبوم", value: albums.value.length },
  { label: "آرتیست", value: artists.value.length },
]);

const normalize = (text: string) =>
  String(text ?? "")
    .toLowerCase()
    .trim()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک");

const searched = computed(() => {
  const q = normalize(query.value);
  if (!q) return songs.value;
  return songs.value.filter((s: any) =>
    [s.name, s.artist, s.album].some((field) =>
      normalize(field).includes(q),
    ),
  );
});

const chipFilter = (list: any[]) => {
  let out = list;

  if (durationFilter.value !== "all") {
    out = out.filter((s: any) => {
      const d = s.duration ?? 0;
      if (durationFilter.value === "short") return d < 180;
      if (durationFilter.value === "medium") return d >= 180 && d <= 300;
      return d > 300;
    });
  }

  if (source.value === "album") {
    out = out.filter((s: any) => s.album && s.album !== "unknown");
  }
  if (source.value === "single") {
    out = out.filter((s: any) => !s.album || s.album === "unknown");
  }

  switch (activeChip.value) {
    case "new":
      out = [...out].reverse();
      break;
    case "long":
      out = [...out].sort((a, b) => (b.duration ?? 0) - (a.duration ?? 0));
      break;
    case "old":
      out = [...out].sort((a, b) => (a.duration ?? 0) - (b.duration ?? 0));
      break;
    case "pop":
      out = out.filter((s: any) => /پاپ|pop/i.test(`${s.album} ${s.artist}`));
      break;
    case "lofi":
      out = out.filter((s: any) => /lofi|instrumental/i.test(s.artist ?? ""));
      break;
  }

  if (sortBy.value === "new") {
    out = [...out].reverse();
  }
  if (sortBy.value === "popular") {
    out = [...out].sort(
      (a, b) => (b.loves?.length ?? 0) - (a.loves?.length ?? 0),
    );
  }

  return out;
};

const toggleGenre = (key: string) => {
  activeChip.value = activeChip.value === key ? "all" : key;
};

const resetFilters = () => {
  sortBy.value = "default";
  durationFilter.value = "all";
  source.value = "all";
};

const visibleTracks = computed(() => {
  const list = chipFilter(searched.value);
  return list.slice(0, 12);
});

const suggestions = computed(() => {
  const q = normalize(query.value);
  const out: Array<{ label: string; type: string; poster?: string }> = [];

  songs.value.forEach((s: any) => {
    if (out.length >= 6) return;
    if (q && !normalize(s.name).includes(q)) return;
    out.push({ label: s.name, type: "آهنگ", poster: s.poster?.thumb });
  });

  artists.value.forEach((a: any) => {
    if (out.length >= 6) return;
    if (q && !normalize(a.name).includes(q)) return;
    out.push({ label: a.name, type: "آرتیست", poster: a.poster?.thumb });
  });

  albums.value.forEach((a: any) => {
    if (out.length >= 6) return;
    if (q && !normalize(a.name).includes(q)) return;
    out.push({ label: a.name, type: "آلبوم", poster: a.poster?.medium });
  });

  return out;
});

/* ─────────── Actions ─────────── */
const closeSuggest = () => setTimeout(() => (isSuggestOpen.value = false), 150);

const pickSuggestion = (item: { label: string; type: string }) => {
  query.value = item.label;
  isSuggestOpen.value = false;
};

const playTrack = (song: any) => {
  if (song.status === "play") {
    storeAudio.pauseSong(song._id);
    return;
  }

  storeAudio.setListPlay(visibleTracks.value as any);
  storeAudio.playSong(song._id, song.path);
  storeSetting.setDataOpen(true);
};

const playList = (list: any[]) => {
  if (!list?.length) return;
  storeAudio.setListPlay(list as any);
  storeAudio.playSong(list[0]._id, list[0].path);
  storeSetting.setDataOpen(true);
};

/* ─────────── Hero autoplay ─────────── */
const startHeroTimer = () => {
  heroTimer = setInterval(() => {
    heroIndex.value = (heroIndex.value + 1) % heroes.length;
  }, 5000);
};

onBeforeUnmount(() => {
  if (heroTimer) clearInterval(heroTimer);
});

if (!songs.value.length) {
  await Promise.all([
    songsStore.fetchSongs().catch(() => {}),
    albumsStore.fetchAlbums().catch(() => {}),
    artistsStore.fetchArtists().catch(() => {}),
  ]);
}

onMounted(startHeroTimer);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
