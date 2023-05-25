import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const DeleteIcon = (props: SvgProps) => (
  <Svg
    //@ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}>
    <Path
      fill="#b91c1c"
      d="M17.338 6.525h5v2h-2v13a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-13h-2v-2h5v-3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3Zm1 2h-12v12h12v-12Zm-4.586 6 1.768 1.768-1.414 1.414-1.768-1.768-1.768 1.768-1.414-1.415 1.768-1.767-1.768-1.768 1.414-1.414 1.768 1.768 1.768-1.768 1.414 1.414-1.768 1.768Zm-4.414-10v2h6v-2h-6Z"
    />
  </Svg>
);
export default DeleteIcon;
