import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = () => (
  <div className="loading flex-container">
    <span>Loading...</span>
    <BeatLoader color="#123abc" />
  </div>
);

export default Loader;
