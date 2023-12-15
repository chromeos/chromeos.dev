import post from 'posthtml';
import { postHTMLChromeOSWord } from './transforms/chromeos-word';
import { postHTMLGoogleStorageImages } from './transforms/google-storage-images';
import { postHTMLLinkIcons } from './transforms/link-icons';
import { postHTMLMissingAttributes } from './transforms/missing-attributes';
import { postHTMLRemoveTrailingSlash } from './transforms/remove-trailing-slash';

const plugins = [
  postHTMLChromeOSWord,
  postHTMLGoogleStorageImages,
  postHTMLLinkIcons,
  postHTMLMissingAttributes,
  postHTMLRemoveTrailingSlash,
];

export const posthtml = post(plugins);
