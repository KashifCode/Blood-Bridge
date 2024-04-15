import React from "react";

const TickIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <rect width="16" height="16" fill="url(#pattern0)" />
      <rect width="16" height="16" fill="url(#pattern1)" />
      <rect width="16" height="16" fill="url(#pattern2)" />
      <rect width="16" height="16" fill="url(#pattern3)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_220_3282" transform="scale(0.0078125)" />
        </pattern>
        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_220_3282" transform="scale(0.0078125)" />
        </pattern>
        <pattern
          id="pattern2"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_220_3282" transform="scale(0.0078125)" />
        </pattern>
        <pattern
          id="pattern3"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_220_3282" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_220_3282"
          width="128"
          height="128"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAYcSURBVHic7d1biFVVHMfx7zhNat7G0sxLNyON0uqlJEgJK0kSiyKi1ISIInoou9kNkSjsgkEPBWKGSC8FhoHRQykV3cMuNF3Qyu6WoaWO42Wa2T0sD042M2df1vqvs8/5feD/Oue/9n+dPfus2wYRERERERERERERERERqU/NsRMQ7yYC1wLHAt9FzkUMnQCsADqB5FA8FjUjMTEUWArs4XDhK3EAGBYtMwmqGbgF2Mb/C1+Jf4DWWAlKONOBT+m78JV4OlaCEsY4YA3QTbriD4iTpvh2NHA/0E71wh8A5sdJU0K4EGijeuETXAe5LE6a4ttI3G28i3TF3wFcECVT8e56YDvpCp8AW4FJUTIVr8YAa0lf+AT4EpgQI1nxawHuNp6l+B/i/lVIiY0C1pGt8AnwHjAiQr7i0UzgF7IX/x1geIR8xZMW4HHSP+H3jLdw4/9SUqfgbt9ZC58AH6DJnVK7gd5n7dLE57g5fimh4cAL5Ct8AmzGzfdLCZ0FbCF/8b8HxptnLV7MAf4mf/H/BCabZy2FNQGLyfeUX4m9aGy/lIYBL5O/8AluJc8V1olLcafjxuaLFL8buNE6cSluNsX+31diiXXiUtxC4CDFi/8S7vlBSmQx6dboVYtNwDHGuUsBzcCzFC98AvyG5vRLZSDudu2j+PuA823TlyJGAm/jp/jduOVfUhLHA1/gp/gJbkpYSsJ38d8EjrJsgOTnu/i/43b5SAn4Ln4nMMO0BZLbGNLvykkb95i2QHIbBXyF3+KvQyN9pTAUt+beZ/F/Rmv4S6EFeA2/xe/CLQGXGtcErMZv8RPgScM2SAFP4b/4bcAgy0ZIPnfiv/j7gCmWjZB8ZuGWYfnuAHdYNiKPtD9JWnEHEIb6CZPgDjXcFejv92cybseN79O03sB1rMTz3zU3D+jA/7fjyOgE7jJqU0Ur8I2H3I+MdtwWsNIbiPtWhi5+z7jZpGXuBC3fP/cqscioDcGNxrb4lTvBbIO2PRQo/4+oszOYN2LfCXYD5wZs03T+e6aurzgInB0w7yhGA19j3wl+BU4K0J6RwA+Bcn4kQL414UTgR+w7QRt+n86byHccS5rYTJ0P+EwC/sC+E2zEnZTpw6JAOXYDF3vKsaZNI/8BB0XiOQ+5T8Udoxoiv9Ue8iuNmcB+7DvBgwVyHkD+Y1mqxR4acHnXlYR5iq52m12QM9+7A+b1QM6cSm8hfrZEZYmDZP9feyrpTtnOEz/R4Nu57sO2AyS4HbhpZ9iagNcD5nJNyjzq2hPYd4KtuAWb1cwPmMO7aH0f4C7CSuw7wcfAkH7yGky4sYsu4Lzsl6p+NeNvs2SWWE/f4+5LA37uqnyXqb4NAjZg3wl6ezHSBNwhSyE+by8wtsB1qmvDcLdm605w+xF5rAr4WcuLXqR6F2JDRbXoAq469PknE27Er510D58NbzzhZtz6ig7cuXohv/3azp3BGWR7742P2I6fw5p6iz24qXHJ4BzgL2w7QahY5vnaNIyLcOvjYxdQ3/6I5mI/eeQz6nalj6UF2E8e+Yhd6EUN3oSclg0Vjwa5Eg1sGfGLmjb2o1E/75qAFcQvbppYGegaNLwBwIvEL3B/0Q2cGeoCiFvpG2prlo9YH67pUjEUtzM3drF7i0sDtlt6aAU+I37Be8YWtNrH1Djc69FiF74SNX+wQz06DdhG/OJ3oIGfaKYCO4nbAfTTL7IZ2JxI0lfo5Q01YA7h5vX7izaLxkk68yj25s08YX1GkVRxG3bF70Rv6K5JD2PTAdZZNUiye4bwHeBqs9ZIZqEOca7EbtxWMqlhLcCrhOkAawzbIQUMxt87+3rG5ZaNkGJGAJ/gr/g78XcIlRgZiztc2kcHeN44d/FkIu6ly0U7wFzrxMWfKcAO8he/gwY/46ceTCP/IVCvRMhXAriEfGcX3hQjWQnjOrJNHnWhsf+6cyvpO8CmSDlKYEtI1wF02EMdW071DjArWnYSXBNugKev4h+g/zMGpQ40A2vpvQNsiJiXGOpr8ujemEmJrRHA+xwu/rfAcVEzqiGNsv2pBTflOwQ3+tceNx0RERERERERERERERERkdD+BQiCa0P/TpLVAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};

export default TickIcon;
