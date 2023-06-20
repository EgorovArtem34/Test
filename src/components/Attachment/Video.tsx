import React from 'react';

const Video = ({ attachment }) => (
  <div>
    <video controls className="attachment__content">
      <source src={attachment.url} type="video/mp4" />
    </video>
  </div>
);

export default Video;
