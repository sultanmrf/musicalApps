export const useOverlayManager = () => {
  const active = useState<string | null>("overlay-active", () => null);

  const open = (name: string) => {
    active.value = name;
  };

  const close = () => {
    active.value = null;
  };

  const toggle = (name: string) => {
    active.value = active.value === name ? null : name;
  };

  const isOpen = (name: string) => active.value === name;

  return { active, open, close, toggle, isOpen };
};
