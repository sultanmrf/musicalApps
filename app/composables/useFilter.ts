import { useSongsStore } from "~~/stores/songs";

export function useFilter() {
  const { artists } = useArtists();
  const { albums } = useAlbums();
  const songsStore = useSongsStore();

  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  const getDataSort = (onSort: string = "songs") => {
    if (onSort === "artists") return artists.value;
    if (onSort === "albums") return albums.value;
    return songsStore.list;
  };

  const sorting = (type: string, onSort: string = "songs") => {
    const data: any[] = getDataSort(onSort);

    switch (type) {
      case "Ascending":
        data.sort((a, b) =>
          collator.compare(
            a.name || a.name,
            b.name || b.name
          )
        );
        break;

      case "Descending":
        data.sort((a, b) =>
          collator.compare(
            b.name || b.name,
            a.name || a.name
          )
        );
        break;

      case "DateAdd":
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;

      case "DateEdit":
        data.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime()
        );
        break;
    }
  };

  return {
    sorting,
  };
}
