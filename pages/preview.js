import { WordPressTemplate } from '@faustwp/core';
import { SEO } from 'components';
import { buildAbsoluteUrl } from 'utilities';

export default function Preview(props) {
  return (
    <>
      <SEO
        title="Preview"
        description="Content preview"
        url={buildAbsoluteUrl('/preview/')}
        noindex
        noarchive
      />
      <WordPressTemplate {...props} />
    </>
  );
}
