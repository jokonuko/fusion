import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Defs, G, Path, Rect, ClipPath } from "react-native-svg";

export const ThumbsUp = ({
  color = "white",
  width = 18,
  height = 18,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_2351_3109)">
        <Path
          d="M17.4633 6.48C17.0208 5.95543 16.3827 5.65714 15.6933 5.65714H11.5461V2.82857C11.5461 1.26514 10.2804 0 8.63387 0C7.91353 0 7.26521 0.432 6.97707 1.10057L4.36324 7.2H2.43889C1.09081 7.2 0 8.29029 0 9.63771V15.5726C0 16.9097 1.10111 18 2.43889 18H14.3349C15.4566 18 16.4136 17.1977 16.6091 16.0869L17.9675 8.37257C18.0807 7.69371 17.8955 7.00457 17.453 6.48H17.4633ZM2.43889 16.4571C1.94494 16.4571 1.5436 16.056 1.5436 15.5726V9.63771C1.5436 9.144 1.94494 8.74286 2.43889 8.74286H5.64958V16.4571H4.09569H2.43889ZM15.0964 15.8194C15.0347 16.1897 14.7157 16.4571 14.3349 16.4571H5.64958V8.74286L8.39719 1.69714C8.43835 1.60457 8.53097 1.53257 8.72649 1.53257C9.43654 1.53257 10.0025 2.10857 10.0025 2.81829V7.18971H15.6933C15.93 7.18971 16.1358 7.28229 16.2798 7.45714C16.4239 7.632 16.4857 7.85829 16.4445 8.09486L15.0861 15.8091L15.0964 15.8194Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2351_3109">
          <Rect width={width} height={height} fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
