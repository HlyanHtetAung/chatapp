export const clickOutsideContainer = (containerRef, clickTarget) => {
  if (containerRef.current.contains(clickTarget)) {
    return true;
  } else {
    return false;
  }
};
