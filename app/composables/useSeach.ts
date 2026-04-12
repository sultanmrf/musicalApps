import { ref } from "vue";

interface Song {
  _id: string;
  name: string;
}

interface Artist {
  _id: string;
  name: string;
}

interface Album {
  _id: string;
  name: string;
}

type SearchResult =
  | (Song & { type: "song" })
  | (Artist & { type: "artist" })
  | (Album & { type: "album" });

export const useSearch = () => {
  const searchQuery = ref<string>("");
  const normalize = (text: string): string => {
    return text.toLowerCase().trim().replace(/ي/g, "ی").replace(/ك/g, "ک");
  };

  const search = (
    songs: Song[],
    artists: Artist[],
    albums: Album[],
  ): SearchResult[] => {
    const query = normalize(searchQuery.value);
    if (!query) return [];

    const songResults: SearchResult[] = songs
      .filter((song) => normalize(song.name).includes(query))
      .map((song) => ({
        ...song,
        type: "song",
      }));

    const artistResults: SearchResult[] = artists
      .filter((artist) => normalize(artist.name).includes(query))
      .map((artist) => ({
        ...artist,
        type: "artist",
      }));

    const albumResults: SearchResult[] = albums
      .filter((album) => normalize(album.name).includes(query))
      .map((album) => ({
        ...album,
        type: "album",
      }));

      console.log([...songResults, ...artistResults, ...albumResults]);
    return [...songResults, ...artistResults, ...albumResults];
  };

  const clearSearch = () => {
    searchQuery.value = "";
  };

  return {
    searchQuery,
    search,
    clearSearch,
  };
};
