<template>
  <div class="space-y-6">
    <!-- Sticky Explore Header -->
    <div
      class="sticky top-0 z-30 bg-black/60 backdrop-blur border-b border-white/10"
    >
      <div class="max-w-5xl mx-auto px-4 py-4 space-y-3">
        <div class="flex items-center gap-3">
          <UInput
            v-model="query"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="جستجو: آهنگ، آلبوم، آرتیست..."
            size="lg"
            class="flex-1"
            @focus="showSuggest = true"
            @blur="onBlurSuggest"
          />

          <UButton
            color="gray"
            variant="soft"
            size="lg"
            @click="isFilterOpen = true"
          >
            فیلتر
          </UButton>

          <USelect
            v-model="sort"
            size="lg"
            :options="sortOptions"
            class="w-40 hidden sm:block"
          />
        </div>

        <!-- Suggestions -->
        <div v-if="showSuggest && filteredSuggestions.length" class="relative">
          <div class="absolute left-0 right-0 top-0">
            <div
              class="rounded-xl border border-white/10 bg-black shadow-xl overflow-hidden"
            >
              <button
                v-for="(s, i) in filteredSuggestions.slice(0, 6)"
                :key="i"
                class="w-full text-right px-4 py-3 hover:bg-white/5 transition flex items-center justify-between"
                @mousedown.prevent="pickSuggestion(s)"
              >
                <span class="text-sm text-white/90">{{ s.label }}</span>
                <span class="text-xs text-white/40">{{ s.type }}</span>
              </button>
            </div>
          </div>
          <div class="h-[140px]" />
        </div>

        <!-- Quick chips -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="chip in chips"
            :key="chip.key"
            @click="toggleChip(chip.key)"
            class="px-3 py-1.5 rounded-full text-xs border transition"
            :class="
              activeChips.has(chip.key)
                ? 'bg-primary/15 border-primary/30 text-primary'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            "
          >
            {{ chip.label }}
          </button>

          <div class="ms-auto hidden md:flex items-center gap-2">
            <span class="text-xs text-white/50">نتایج:</span>
            <UBadge color="gray" variant="soft" size="sm">
              {{ computedHotTracks.length }} ترک
            </UBadge>
          </div>
        </div>
      </div>
    </div>

    <!-- Slider / Featured -->
    <div class="max-w-5xl mx-auto px-4">
      <div
        class="relative w-full h-[18rem] sm:h-[22rem] overflow-hidden rounded-2xl border border-white/10"
      >
        <div
          class="flex h-full transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="w-full h-full flex-shrink-0 relative"
          >
            <img
              :src="slide.bg"
              class="w-full h-full object-cover"
              alt=""
              loading="lazy"
            />

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            />
            <div class="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <div class="flex items-end justify-between gap-4">
                <div class="space-y-2">
                  <p class="text-xs text-white/70">Featured</p>
                  <h3 class="text-xl sm:text-3xl font-bold text-white">
                    {{ slide.title }}
                  </h3>
                  <p class="text-sm text-white/70 line-clamp-1">
                    {{ slide.subtitle }}
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  <UButton
                    color="primary"
                    size="lg"
                    @click="playFeatured(slide)"
                  >
                    پخش
                  </UButton>
                  <UButton
                    color="gray"
                    variant="soft"
                    size="lg"
                    @click="saveFeatured(slide)"
                  >
                    ذخیره
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicators -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(_, index) in slides"
            :key="index"
            class="w-2.5 h-2.5 rounded-full transition"
            :class="
              currentIndex === index
                ? 'bg-white'
                : 'bg-white/30 hover:bg-white/50'
            "
            @click="goToSlide(index)"
            aria-label="slide"
          />
        </div>
      </div>
    </div>

    <!-- Continue Listening -->
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-xl sm:text-2xl font-semibold">
          <span class="text-white">ادامه</span>
          <span class="text-white/50"> گوش دادن</span>
        </h2>
        <a href="#" class="text-sm text-primary hover:underline">مشاهده همه</a>
      </div>

      <div class="flex gap-4 overflow-x-auto pb-2">
        <UCard
          v-for="(t, i) in continueTracks"
          :key="i"
          class="min-w-[260px] bg-white/5 border-white/10"
        >
          <div class="flex items-center gap-3">
            <UAvatar :src="t.cover" size="xl" :ui="{ rounded: 'rounded-xl' }" />
            <div class="min-w-0 flex-1">
              <p class="text-sm text-white truncate">{{ t.title }}</p>
              <p class="text-xs text-white/50 truncate">{{ t.artist }}</p>

              <!-- Fake progress -->
              <div class="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  class="h-full bg-primary/70"
                  :style="{ width: t.progress + '%' }"
                />
              </div>
            </div>

            <UButton
              color="primary"
              variant="soft"
              size="sm"
              @click="playTrack(t)"
            >
              ▶
            </UButton>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Hot Music -->
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex justify-between items-center mb-3 mt-2">
        <h2 class="text-xl sm:text-2xl font-semibold">
          <span class="text-white">موزیک‌های</span>
          <span class="text-white/50"> داغ</span>
        </h2>
        <a href="#" class="text-sm text-primary hover:underline">مشاهده همه</a>
      </div>

      <div class="flex gap-4 overflow-x-auto pb-2">
        <button
          v-for="(track, i) in computedHotTracks"
          :key="i"
          class="min-w-[140px] text-right group"
          @click="playTrack(track)"
        >
          <div class="relative">
            <UAvatar
              :src="track.cover"
              size="3xl"
              class="w-[140px] h-[140px]"
              :ui="{ rounded: 'rounded-2xl' }"
            />

            <!-- Hover play -->
            <div
              class="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center"
            >
              <div
                class="scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition"
              >
                <UButton color="primary" size="sm"> پخش </UButton>
              </div>
            </div>

            <!-- Tiny badge -->
            <div class="absolute top-2 right-2">
              <UBadge color="gray" variant="solid" size="xs"> داغ </UBadge>
            </div>
          </div>

          <p class="text-sm mt-2 truncate text-white/90">{{ track.title }}</p>
          <p class="text-xs text-white/50 truncate">{{ track.artist }}</p>
        </button>
      </div>
    </div>

    <!-- Trending Artists -->
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex justify-between items-center mb-3 mt-2">
        <h2 class="text-xl sm:text-2xl font-semibold">
          <span class="text-white">آرتیست‌های</span>
          <span class="text-white/50"> ترند</span>
        </h2>
        <a href="#" class="text-sm text-primary hover:underline">مشاهده همه</a>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <UCard
          v-for="(a, i) in artists"
          :key="i"
          class="bg-white/5 border-white/10 hover:bg-white/10 transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <UAvatar
              :src="a.avatar"
              size="lg"
              :ui="{ rounded: 'rounded-2xl' }"
            />
            <div class="min-w-0 flex-1">
              <p class="text-sm text-white truncate">{{ a.name }}</p>
              <p class="text-xs text-white/50 truncate">
                {{ a.monthly }} شنونده ماهانه
              </p>
            </div>
            <UButton size="xs" color="gray" variant="soft">Follow</UButton>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Latest Albums -->
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex justify-between items-center mb-3 mt-2">
        <h2 class="text-xl sm:text-2xl font-semibold">
          <span class="text-white">آخرین</span>
          <span class="text-white/50"> آلبوم‌ها</span>
        </h2>
        <a href="#" class="text-sm text-primary hover:underline">مشاهده همه</a>
      </div>

      <div class="flex gap-4 overflow-x-auto pb-2">
        <AlbumCard
          v-for="(album, index) in computedAlbums"
          :key="index"
          :title="album.title"
          :artist="album.artist"
          :image="album.image"
          @click="openAlbum(album)"
        />
      </div>
    </div>

    <!-- Mini Player (نمونه ساده) -->
    <div
      v-if="nowPlaying"
      class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(96%,820px)] z-40"
    >
      <div
        class="rounded-2xl border border-white/10 bg-black/70 backdrop-blur shadow-xl px-4 py-3"
      >
        <div class="flex items-center gap-3">
          <UAvatar
            :src="nowPlaying.cover"
            size="lg"
            :ui="{ rounded: 'rounded-xl' }"
          />

          <div class="min-w-0 flex-1">
            <p class="text-sm text-white truncate">{{ nowPlaying.title }}</p>
            <p class="text-xs text-white/50 truncate">
              {{ nowPlaying.artist }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <UButton color="gray" variant="soft" size="sm" @click="prevTrack"
              >⟨⟨</UButton
            >
            <UButton color="primary" size="sm" @click="togglePlay">
              {{ isPlaying ? "توقف" : "پخش" }}
            </UButton>
            <UButton color="gray" variant="soft" size="sm" @click="nextTrack"
              >⟩⟩</UButton
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Slideover -->
    <USlideover v-model="isFilterOpen">
      <div class="p-4 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">فیلترها</h3>
          <UButton color="gray" variant="soft" size="sm" @click="resetFilters">
            ریست
          </UButton>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-white/60">ژانر</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="g in genres"
              :key="g"
              class="px-3 py-1.5 rounded-full text-xs border transition"
              :class="
                selectedGenre === g
                  ? 'bg-primary/15 border-primary/30 text-primary'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              "
              @click="selectedGenre = g"
            >
              {{ g }}
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-white/60">زبان</p>
          <USelect v-model="selectedLang" :options="langs" size="lg" />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-white/60">Explicit</p>
          <div class="flex items-center gap-2">
            <UButton
              size="sm"
              :variant="explicitOnly ? 'solid' : 'soft'"
              color="primary"
              @click="explicitOnly = !explicitOnly"
            >
              {{ explicitOnly ? "فقط Explicit" : "خاموش" }}
            </UButton>
          </div>
        </div>

        <div class="pt-2">
          <UButton
            color="primary"
            size="lg"
            class="w-full"
            @click="applyFilters"
          >
            اعمال فیلتر
          </UButton>
        </div>
      </div>
    </USlideover>

    <div class="h-10" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const query = ref("");
const showSuggest = ref(false);
const sort = ref("trending");
const sortOptions = [
  { label: "ترند", value: "trending" },
  { label: "جدیدترین", value: "new" },
  { label: "محبوب‌ترین", value: "popular" },
];

/** Filters */
const isFilterOpen = ref(false);
const selectedGenre = ref("All");
const selectedLang = ref("All");
const explicitOnly = ref(false);

const genres = ["All", "Pop", "HipHop", "Lo-fi", "Rock", "EDM", "Traditional"];
const langs = [
  { label: "همه", value: "All" },
  { label: "فارسی", value: "FA" },
  { label: "انگلیسی", value: "EN" },
  { label: "ترکی", value: "TR" },
];

/** Quick chips */
const chips = [
  { key: "mood_chill", label: "Chill" },
  { key: "mood_gym", label: "Gym" },
  { key: "mood_focus", label: "Focus" },
  { key: "genre_pop", label: "Pop" },
  { key: "genre_lofi", label: "Lo-fi" },
  { key: "new", label: "New" },
];
const activeChips = ref(new Set());

const toggleChip = (key) => {
  const s = new Set(activeChips.value);
  s.has(key) ? s.delete(key) : s.add(key);
  activeChips.value = s;
};

/** Slider */
const slides = [
  {
    bg: "https://picsum.photos/1200/700?random=21",
    title: "پلی‌لیست ویژه امروز",
    subtitle: "ترندهای جدید + انتخاب سردبیر",
  },
  {
    bg: "https://picsum.photos/1200/700?random=22",
    title: "مود تمرکز",
    subtitle: "Lo-fi و بی‌کلام برای کار و مطالعه",
  },
  {
    bg: "https://picsum.photos/1200/700?random=23",
    title: "Hot Hits",
    subtitle: "داغ‌ترین ترک‌های این هفته",
  },
];

const currentIndex = ref(0);
let interval = null;

const startSlider = () => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.length;
  }, 4000);
};
const goToSlide = (index) => (currentIndex.value = index);

onMounted(startSlider);
onBeforeUnmount(() => clearInterval(interval));

/** Data */
const hotTracks = [
  {
    title: "Chi Az In Behtar",
    artist: "Unknown",
    cover: "https://picsum.photos/640/640?random=1",
    genre: "Pop",
    lang: "FA",
    explicit: false,
  },
  {
    title: "Hale Aronmesh",
    artist: "Beny Amin",
    cover: "https://picsum.photos/640/640?random=2",
    genre: "Pop",
    lang: "FA",
    explicit: false,
  },
  {
    title: "Bego Kojayi",
    artist: "Sogand",
    cover: "https://picsum.photos/640/640?random=4",
    genre: "HipHop",
    lang: "FA",
    explicit: true,
  },
  {
    title: "Night Drive",
    artist: "Synth Kid",
    cover: "https://picsum.photos/640/640?random=9",
    genre: "EDM",
    lang: "EN",
    explicit: false,
  },
  {
    title: "Lo-fi Rain",
    artist: "Study Beats",
    cover: "https://picsum.photos/640/640?random=11",
    genre: "Lo-fi",
    lang: "EN",
    explicit: false,
  },
];

const continueTracks = [
  {
    title: "Focus Loop",
    artist: "Lo-fi Labs",
    cover: "https://picsum.photos/640/640?random=31",
    progress: 62,
  },
  {
    title: "Morning Walk",
    artist: "Indie Mood",
    cover: "https://picsum.photos/640/640?random=32",
    progress: 28,
  },
  {
    title: "Gym Pump",
    artist: "Energy",
    cover: "https://picsum.photos/640/640?random=33",
    progress: 81,
  },
];

const albums = [
  {
    title: "The Shawl",
    artist: "Kayeh Alaghi",
    image: "https://picsum.photos/640/640?random=7",
    year: 2026,
  },
  {
    title: "Che Hale Khobieh",
    artist: "Saman Jalili",
    image: "https://picsum.photos/640/640?random=5",
    year: 2026,
  },
  {
    title: "Bad Salighe",
    artist: "Sasy",
    image: "https://picsum.photos/640/640?random=1",
    year: 2025,
  },
  {
    title: "Midnight EP",
    artist: "Unknown",
    image: "https://picsum.photos/640/640?random=15",
    year: 2026,
  },
];

const artists = [
  {
    name: "Sogand",
    monthly: "1.2M",
    avatar: "https://picsum.photos/200/200?random=41",
  },
  {
    name: "Sasy",
    monthly: "980K",
    avatar: "https://picsum.photos/200/200?random=42",
  },
  {
    name: "Beny Amin",
    monthly: "640K",
    avatar: "https://picsum.photos/200/200?random=43",
  },
  {
    name: "Lo-fi Labs",
    monthly: "310K",
    avatar: "https://picsum.photos/200/200?random=44",
  },
];

/** Suggestions */
const suggestions = computed(() => {
  const fromTracks = hotTracks.map((t) => ({ label: t.title, type: "Track" }));
  const fromArtists = artists.map((a) => ({ label: a.name, type: "Artist" }));
  const fromAlbums = albums.map((a) => ({ label: a.title, type: "Album" }));
  return [...fromTracks, ...fromArtists, ...fromAlbums];
});

const filteredSuggestions = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return suggestions.value.slice(0, 6);
  return suggestions.value.filter((s) => s.label.toLowerCase().includes(q));
});

const pickSuggestion = (s) => {
  query.value = s.label;
  showSuggest.value = false;
};
const onBlurSuggest = () => {
  // تا کلیک پیشنهادها کار کنه
  setTimeout(() => (showSuggest.value = false), 150);
};

/** Computed lists */
const computedHotTracks = computed(() => {
  let list = [...hotTracks];

  // Apply drawer filters
  if (selectedGenre.value !== "All")
    list = list.filter((t) => t.genre === selectedGenre.value);
  if (selectedLang.value !== "All")
    list = list.filter((t) => t.lang === selectedLang.value);
  if (explicitOnly.value) list = list.filter((t) => t.explicit);

  // Apply quick chips (نمونه ساده)
  if (activeChips.value.has("genre_pop"))
    list = list.filter((t) => t.genre === "Pop");
  if (activeChips.value.has("genre_lofi"))
    list = list.filter((t) => t.genre === "Lo-fi");
  if (activeChips.value.has("new")) {
    // فرض ساده: دو مورد آخر جدیدتر
    list = list.slice(-3);
  }

  // Apply sort
  if (sort.value === "new") list = [...list].reverse();
  if (sort.value === "popular") list = [...list]; // اینجا بعداً با دیتا واقعی
  return list;
});

const computedAlbums = computed(() => {
  let list = [...albums];
  if (sort.value === "new")
    list = list.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  return list;
});

/** Player (نمونه) */
const nowPlaying = ref(null);
const isPlaying = ref(false);

const playTrack = (t) => {
  nowPlaying.value = t;
  isPlaying.value = true;
};
const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};
const prevTrack = () => {};
const nextTrack = () => {};

const playFeatured = (slide) => {
  playTrack({
    title: slide.title,
    artist: slide.subtitle,
    cover: slide.bg,
  });
};
const saveFeatured = (slide) => {
  // TODO: call API/save state
  console.log("Saved", slide.title);
};

const openAlbum = (album) => {
  console.log("Open album", album.title);
};

/** Filter actions */
const resetFilters = () => {
  selectedGenre.value = "All";
  selectedLang.value = "All";
  explicitOnly.value = false;
};
const applyFilters = () => {
  isFilterOpen.value = false;
};
</script>

<style scoped>
/* اسکرول افقی تمیز */
::-webkit-scrollbar {
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
}
</style>
