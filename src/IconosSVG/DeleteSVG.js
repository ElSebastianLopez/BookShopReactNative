/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DeleteSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      stroke={props.stroke || "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      {...props}>
      <Path
        d="M3.4 6.2h17.2m-15.3 0V19a2.063 2.063 0 00.538 1.413A1.836 1.836 0 007.2 21h9.6a1.861 1.861 0 001.325-.587A2.039 2.039 0 0018.7 19V6.2M10 15.6v-4m4 0v4M9.4 6.2V3.9a.98.98 0 01.212-.637A.746.746 0 0110.2 3h3.6a.743.743 0 01.587.263.975.975 0 01.213.637v2.3"
      />
    </Svg>
  );
}

export default DeleteSVG;

