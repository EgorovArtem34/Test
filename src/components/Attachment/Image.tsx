import React from 'react';

const Image = ({ attachment }) => (
  <img src={attachment.url} alt="attachment image" className="attachment__content" loading="lazy" />
);

export default Image;
