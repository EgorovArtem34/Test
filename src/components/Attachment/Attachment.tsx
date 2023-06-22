import { Suspense, lazy } from 'react';
import './attachment.scss';
import { AttachmentProps, AttachmentType } from '../../types';

const LazyImage = lazy(() => import('./Image'));
const LazyVideo = lazy(() => import('./Video'));

const Attachments = ({ attachment }: AttachmentProps) => {
  const renderVideo = (videoContent: AttachmentType) => (
    <Suspense fallback={<div>Loading video...</div>}>
      <LazyVideo attachment={videoContent} />
    </Suspense>
  );

  const renderImage = (imageContent: AttachmentType) => (
    <div>
      <Suspense fallback={<div>Loading image...</div>}>
        <LazyImage attachment={imageContent} />
      </Suspense>
    </div>
  );

  switch (attachment.type) {
    case 'video':
      return renderVideo(attachment);
    case 'image':
      return renderImage(attachment);
    default:
      return null;
  }
};

export default Attachments;
