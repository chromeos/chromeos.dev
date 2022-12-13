import { ComponentView } from 'sanity/desk';

/**
 *
 * @param {Object} context
 * @return {ComponentView}
 */
export const JsonPreview = (context: ComponentView) => {
  const { document, documentId, schemaType } = context;
  // Site preview URL? This isn't real right now, just a placeholder
  const previewURL = `https://staging.chromeos.dev/en/posts/${document.displayed.slug.current}?id=${document.displayed._id}&rev=${document.displayed._rev}&preview=true`;
  console.log(document);
  console.log(documentId);
  console.log(schemaType);
  console.log(previewURL);

  const style = {
    width: '100%',
    height: '50vh',
  };

  return (
    <div>
      <h1>Document Preview</h1>
      <p>Preview URL: {previewURL}</p>
      <iframe
        title="preview"
        src="https://chromeos.dev"
        frameBorder="0"
        style={style}
      ></iframe>
    </div>
  );
};
