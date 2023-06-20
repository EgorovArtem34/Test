import React, { Suspense, lazy } from 'react';
import './attachment.scss';
import { AttachmentProps, AttachmentType } from '../../types';

const LazyImage = lazy(() => import('./Image'));
const LazyVideo = lazy(() => import('./Video'));

const Attachments = ({ attachment }: AttachmentProps) => {
  const renderVideo = (attachment: AttachmentType) => (
    <div>
      <Suspense fallback={<div>Loading video...</div>}>
        <LazyVideo attachment={attachment} />
      </Suspense>
    </div>
  );

  const renderImage = (attachment: AttachmentType) => (
    <div>
      <Suspense fallback={<div>Loading image...</div>}>
        <LazyImage attachment={attachment} />
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
