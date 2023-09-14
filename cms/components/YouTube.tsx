import { Stack, Text, TextInput } from '@sanity/ui';
import { ObjectInputProps, PreviewProps, set, unset } from 'sanity';
import { useCallback } from 'react';
import getYouTubeId from 'get-youtube-id';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export type YouTube = {
  url: string;
  id: string;
  _key?: string;
  _type?: string;
};

// https://www.sanity.io/guides/your-first-input-component-for-sanity-studio-v3
// https://www.sanity.io/docs/migrating-custom-input-components

export type YouTubeInputProps = ObjectInputProps<YouTube>;

export const YouTubeInput = (props: YouTubeInputProps) => {
  const { value, elementProps, onChange } = props;

  console.log(value);

  const handleChange = useCallback(
    (event) => {
      const nextValue = event.currentTarget.value;
      const newValue = {
        url: nextValue || null,
        id: getYouTubeId(nextValue) || null,
      } as YouTube;

      // If it's used in a block, need key and type
      if (value?._key) {
        newValue._key = value._key;
        newValue._type = value._type;
        onChange(set(newValue));
      } else {
        // If it's not, don't need key and type
        onChange(nextValue ? set(newValue) : unset());
      }
    },
    [onChange, value?._key, value?._type],
  );

  // TODO: Get title and validation working
  return (
    <Stack space={2}>
      <TextInput {...elementProps} onChange={handleChange} value={value?.url} />
      <Text>ID: {value?.id}</Text>
    </Stack>
  );
};

export const YouTubePreview = (props: PreviewProps<YouTube>) => {
  const { id, renderDefault } = props;
  return (
    <div>
      {renderDefault({ ...props, title: 'YouTube Embed' })}
      <LiteYouTubeEmbed id={id} />
    </div>
  );
};
