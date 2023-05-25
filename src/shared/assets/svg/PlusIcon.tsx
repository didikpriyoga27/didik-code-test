import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const PlusIcon = (props: SvgProps) => (
  <Svg
    //@ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}>
    <Path fill="#fff" d="M11 11.5v-6h2v6h6v2h-6v6h-2v-6H5v-2h6Z" />
  </Svg>
);
export default PlusIcon;
