import type {
  ObjectInputProps,
  FieldMember,
  PreviewProps,
  InputProps,
} from 'sanity';
import { useCallback } from 'react';
import { Stack, TextInput } from '@sanity/ui';
import { MemberField, set, unset } from 'sanity';
import getYouTubeId from 'get-youtube-id';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export type YouTube = {
  url: string;
  id: string;
  _key?: string;
  _type?: string;
};

export type YouTubeInputProps = ObjectInputProps<YouTube>;

export const YouTubeInput = (props: YouTubeInputProps) => {
  const { value, onChange, members, renderField, renderItem } = props;

  const urlFieldMember = members.find(
    (member): member is FieldMember =>
      member.kind === 'field' && member.name === 'url',
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const customRenderInput = useCallback(
    (renderInputCallbackProps: InputProps) => {
      return (
        <Stack space={2}>
          <TextInput
            {...renderInputCallbackProps.elementProps}
            value={value?.url}
            onChange={handleChange}
          />
        </Stack>
      );
    },
    [handleChange, value?.url],
  );

  return (
    <Stack space={2}>
      <MemberField
        member={urlFieldMember}
        renderInput={customRenderInput}
        renderField={renderField}
        renderItem={renderItem}
      />
      {value?.id && (
        <LiteYouTubeEmbed
          title={'YouTube Video Preview'}
          id={value?.id || ''}
        />
      )}
    </Stack>
  );
};

export const YouTubePreview = (props: PreviewProps<YouTube>) => {
  const { id, renderDefault } = props;
  return (
    <div>
      {renderDefault({ ...props, title: 'YouTube Embed' })}
      <LiteYouTubeEmbed title={'YouTube Video Preview'} id={id || ''} />
    </div>
  );
};
