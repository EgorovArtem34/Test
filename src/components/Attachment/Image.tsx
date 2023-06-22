import React from 'react';
import { AttachmentType } from '../../types';

const Image = ({ attachment }: { attachment: AttachmentType }) => (
  <img src={attachment.url} alt="attachment" className="attachment__content" loading="lazy" />
);

export default Image;
