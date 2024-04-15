import React from "react";

const BloodTypeIcon = ({
  svgClass,
  color,
}: {
  svgClass: string;
  color: string;
}) => {
  return (
    <svg
      className={`${svgClass}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 53 66.25"
      xmlSpace="preserve"
    >
      <g>
        <path
          fill={`${color}`}
          d="M27.7763672,41.5415039c-2.0048828,1.9287109-4.6411133,2.9907227-7.4233398,2.9907227   c-5.9052734,0-10.7099609-4.800293-10.7099609-10.7001953c0-0.3710938,0.1069336-1.8378906,1.4848633-5.1333008   c0.2128906-0.5097656-0.027832-1.0952148-0.5371094-1.3085938c-0.5087891-0.2109375-1.0947266,0.027832-1.3085938,0.5371094   c-1.4262695,3.4125977-1.6391602,5.1640625-1.6391602,5.9047852c0,7.0029297,5.7016602,12.7001953,12.7099609,12.7001953   c3.3017578,0,6.4306641-1.2607422,8.8100586-3.5493164c0.3979492-0.3828125,0.4101563-1.0161133,0.0273438-1.4140625   S28.1743164,41.1591797,27.7763672,41.5415039z"
        />
        <path
          fill={`${color}`}
          d="M43.546875,27.5981445c0,4.1303711-3.3598633,7.4902344-7.4897461,7.4902344   c-0.2700195,0-0.5332031-0.0126953-0.7890625-0.0366211c-3.8144531-0.3886719-6.690918-3.5927734-6.690918-7.4536133   c0-0.2465649,0.1142578-2.6083984,4.0693359-9.5844727c0.2744141-0.484375,0.5537109-0.9672852,0.8349609-1.4453125   c0.2802734-0.4760742,0.1210938-1.0888672-0.3544922-1.3691406c-0.4775391-0.2802734-1.0888672-0.1210938-1.3691406,0.3544922   c-0.2871094,0.487793-0.5722656,0.9804688-0.8515625,1.4741211c-3.9072266,6.8920898-4.3291016,9.6879883-4.3291016,10.5703125   c0,5.2043381,4.1409626,9.4902344,9.4799805,9.4902344c5.2324219,0,9.4897461-4.2573242,9.4897461-9.4902344   c0-0.5522461-0.4477539-1-1-1S43.546875,27.0458984,43.546875,27.5981445z"
        />
        <path
          fill={`${color}`}
          d="M10.0507813,16.4267578h1.8071289v1.8071289c0,0.5522461,0.4477539,1,1,1s1-0.4477539,1-1v-1.8071289h1.8071289   c0.5522461,0,1-0.4477539,1-1s-0.4477539-1-1-1h-1.8071289v-1.8071289c0-0.5522461-0.4477539-1-1-1s-1,0.4477539-1,1v1.8071289   h-1.8071289c-0.5522461,0-1,0.4477539-1,1S9.4985352,16.4267578,10.0507813,16.4267578z"
        />
        <path
          fill={`${color}`}
          d="M42.7070313,5.2680664c-1.2717896,0-2.4851685,0.3162842-3.5657959,0.901062   c-1.3305054-1.9784546-2.2636719-3.2720947-2.2740479-3.2868042c-0.1879883-0.2597656-0.4892578-0.4140625-0.8100586-0.4140625   h-0.0004883c-0.3208008,0-0.621582,0.1538086-0.8100586,0.4135742c-0.0391235,0.0539551-3.656189,5.0640869-6.9749146,10.7114258   C24.6456909,7.6994629,21.199646,2.935791,21.1625977,2.8842773C20.9741211,2.625,20.6733398,2.4716797,20.3530273,2.4716797   c0,0-0.0004883,0-0.0009766,0c-0.3203125,0-0.621582,0.1542969-0.8095703,0.4140625   c-0.0100708,0.0144653-0.9545898,1.3231812-2.3539429,3.3775635c-1.3483276-0.6392822-2.8212891-0.991333-4.3257446-0.991333   c-5.6020508,0-10.159668,4.5576172-10.159668,10.159668c0,3.2714844,1.5430298,6.2548828,4.1517334,8.171875   c-2.1506348,4.4616089-3.211792,7.8226929-3.211792,10.2285156c0,9.2080078,7.4960938,16.699707,16.7099609,16.699707   c6.4437866,0,12.2706299-3.7002563,15.0493164-9.4747314c0.2177734,0.0098877,0.4327393,0.0308838,0.6542969,0.0308838   c7.4384766,0,13.4902344-6.0512695,13.4902344-13.4897461c0-1.9839478-0.8828125-4.7491455-2.6699829-8.4100952   c2.1031494-1.3869019,3.4199829-3.7724609,3.4199829-6.3301392C50.296875,8.7296829,46.9433174,5.2680664,42.7070313,5.2680664z    M4.703125,15.4316406c0-4.4990234,3.6606445-8.159668,8.159668-8.159668c4.4756145,0,8.1503906,3.6435947,8.1503906,8.159668   c0,4.4941406-3.65625,8.1503906-8.1503906,8.1503906C8.3619967,23.5820313,4.703125,19.9715633,4.703125,15.4316406z    M20.3530273,48.5317383c-8.1113281,0-14.7099609-6.5942383-14.7099609-14.699707   c0-2.046875,0.9838867-5.1362305,2.9257813-9.1933594c1.1933002,0.5532055,2.8186054,0.9433594,4.2939453,0.9433594   c5.597168,0,10.1503906-4.5532227,10.1503906-10.1503906c0-3.2959242-1.6701508-6.3448238-4.097168-8.1523438   c0.5717773-0.8383789,1.0620117-1.5439453,1.4375-2.0795898c1.315918,1.8745117,4.0458984,5.8510742,6.7822266,10.3691406   c-1.6886959,3.0222912-4.5625,8.5629711-4.5625,12.0332031c0,6.3442802,4.4488964,11.9151535,10.7211914,13.2114258   C30.7397461,45.5415039,25.7924805,48.5317383,20.3530273,48.5317383z M34.8881836,39.0332031   c-5.878418-0.5981445-10.3115234-5.5141602-10.3115234-11.4350586c0-1.5791016,0.7963867-4.8657227,4.5908203-11.5581055   c2.5473633-4.5029297,5.4946289-8.8408203,6.8886719-10.8388672c0.3828125,0.5498047,0.8828125,1.2763672,1.4580078,2.1318359   c-1.5380821,1.4431734-2.3974609,3.5109863-2.3974609,5.5249023c0,2.6337891,1.4023438,5.1259766,3.671875,6.5112305   c1.969017,1.1620579,4.3115959,1.3575382,6.2963867,0.6948242c2.0219727,4.1455078,2.4619141,6.3779297,2.4619141,7.5341797   C47.546875,34.230732,41.8654861,39.6926155,34.8881836,39.0332031z M39.8178711,17.6542969   c-1.6660156-1.0170898-2.7011719-2.8549805-2.7011719-4.7963867c0-2.9928293,2.4366608-5.5898438,5.590332-5.5898438   c3.1221504,0,5.5898438,2.5537529,5.5898438,5.5898438C48.296875,17.1262436,43.622345,19.899353,39.8178711,17.6542969z"
        />
        <path
          fill={`${color}`}
          d="M44.4365234,11.8579102h-3.4594727c-0.5522461,0-1,0.4477539-1,1s0.4477539,1,1,1h3.4594727c0.5522461,0,1-0.4477539,1-1   S44.9887695,11.8579102,44.4365234,11.8579102z"
        />
      </g>
    </svg>
  );
};

export default BloodTypeIcon;
