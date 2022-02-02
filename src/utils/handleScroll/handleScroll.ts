export const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
  const scrollPosition = e.currentTarget.scrollTop + 40;

  const target = e.currentTarget;
  const isScrolling = e.currentTarget.classList.contains("scrolling");

  if (isScrolling) {
    return undefined;
  }

  const elemCategories = target.querySelectorAll(".emoji-category");

  for (let index = 0; index < elemCategories.length; index++) {
    const categoryElement = elemCategories.item(index) as HTMLElement;

    if (
      scrollPosition >= categoryElement.offsetTop &&
      scrollPosition < categoryElement.offsetTop + categoryElement.clientHeight
    ) {
      return index;
    }
  }
};
