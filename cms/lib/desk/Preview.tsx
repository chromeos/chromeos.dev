import { DeskToolContextValue } from 'sanity/desk';
import { FaRegCopy } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';
import { RxOpenInNewWindow } from 'react-icons/rx';

/**
 *
 * @param {Object} context
 * @return {ComponentView}
 */
export const Preview = (context: DeskToolContextValue) => {
  const { document: d, schemaType } = context;
  const types = [
    'documentation',
    'post',
    'story',
    'tutorial',
    // 'landing',
    // 'release',
  ];

  if (!types.includes(schemaType.name)) {
    return <h1>Preview not supported for this content type</h1>;
  }

  console.log(schemaType);
  // Site preview URL?
  const previewURL = `https://chromeos.dev/preview?id=${d.displayed._id}&rev=${
    d.displayed._rev
  }&key=${encodeURIComponent(process.env.SANITY_STUDIO_PREVIEW_KEY)}`;

  const id = `preview-${Math.round(Math.random() * 1000)}`;

  return (
    <div>
      <h1>Preview</h1>
      <div
        className="actions"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingInline: '1rem',
          paddingBlock: '.5rem',
          backgroundColor: '#111',
          gap: '1rem',
        }}
      >
        <button
          style={{
            appearance: 'none',
            border: 'none',
            backgroundColor: '#111',
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
            cursor: 'pointer',
          }}
          onClick={async () => {
            await navigator.clipboard.writeText(previewURL);
          }}
        >
          <FaRegCopy></FaRegCopy> Copy URL
        </button>
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <button
            style={{
              appearance: 'none',
              border: 'none',
              backgroundColor: '#111',
              cursor: 'pointer',
            }}
            onClick={() => {
              const iframe = document.querySelector(`#${id}`);
              if (iframe) iframe.src = previewURL;
            }}
          >
            <IoReload></IoReload>
          </button>
          <a
            href={previewURL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'white',
            }}
          >
            <RxOpenInNewWindow />
          </a>
        </span>
      </div>
      <iframe
        title="preview"
        src={previewURL}
        style={{
          width: '100%',
          height: '50vh',
        }}
        id={id}
      ></iframe>
    </div>
  );
};
