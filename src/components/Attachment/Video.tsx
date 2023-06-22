/* eslint-disable jsx-a11y/media-has-caption */
import { AttachmentType } from '../../types';

const Video = ({ attachment }: { attachment: AttachmentType }) => (
  <video controls className="attachment__content" preload="metadata">
    <source src={attachment.url} type="video/mp4" />
  </video>
);

export default Video;
