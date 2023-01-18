import type { StorySection } from '$types/content';

/**
 *
 * @param {StorySection} section - The section of the story
 * @return {Object} - The structured data for the section
 */
export function buildSection(section: StorySection) {
  return {
    icon: `https://chromeos-dev.imgix.net/icons/eyebrows/${section}.svg?auto=format,compress`,
    name: section,
    id: section,
    background: {
      large: `https://chromeos-dev.imgix.net/landings/news/top/banner-${section}.svg?auto=format,compress`,
      small: `https://chromeos-dev.imgix.net/landings/news/banner-${section}.svg?auto=format,compress`,
    },
  };
}
