import React from "react";

const PastLists = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <rect width="22" height="22" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_226_2049" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_226_2049"
          width="22"
          height="22"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default PastLists;
