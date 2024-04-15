import React from "react";

const ViewLists = () => {
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
          <use xlinkHref="#image0_225_2048" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_225_2048"
          width="128"
          height="128"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default ViewLists;
