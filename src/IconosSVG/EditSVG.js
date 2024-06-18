/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgEdit2(props) {
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
        d="M20.477 3.523a1.747 1.747 0 00-1.024-.517 1.971 1.971 0 00-.266-.019 1.835 1.835 0 00-1.3.526l-3.8 3.8-3.8 3.8v2.6h2.6l3.8-3.8 3.8-3.8a1.59 1.59 0 00.526-1.225 1.961 1.961 0 00-.536-1.365zm-1.59 9.889v5.4a2.221 2.221 0 01-2.2 2.2h-11.5a2.221 2.221 0 01-2.2-2.2V7.313a2.22 2.22 0 012.2-2.2h5.4"
      />
    </Svg>
  );
}

export default SvgEdit2;

