import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export const Reload = ({
  color = "white",
  width = 24,
  height = 24,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M20.145 13.7286C19.778 15.5924 18.7766 17.2714 17.3112 18.48C15.8457 19.6886 14.0068 20.352 12.1073 20.3575C10.2078 20.363 8.36502 19.7101 6.89262 18.51C5.42023 17.3099 4.40914 15.6367 4.03141 13.7751C3.65368 11.9136 3.93264 9.97859 4.82083 8.29951C5.70902 6.62042 7.15156 5.30096 8.90299 4.56564C10.6544 3.83032 12.6065 3.72456 14.4271 4.26638C16.2478 4.80819 17.8244 5.96409 18.8888 7.5374"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        opacity={0.1}
        d="M19.395 2.94385L19.0687 7.7926L14.22 7.4626"
        stroke={color}
        strokeWidth={1.5}
      />

      <Path
        d="M20.145 13.7286C19.778 15.5924 18.7766 17.2714 17.3112 18.48C15.8457 19.6886 14.0068 20.352 12.1073 20.3575C10.2078 20.363 8.36502 19.7101 6.89262 18.51C5.42023 17.3099 4.40914 15.6367 4.03141 13.7751C3.65368 11.9136 3.93264 9.97859 4.82083 8.29951C5.70902 6.62042 7.15156 5.30096 8.90299 4.56564C10.6544 3.83032 12.6065 3.72456 14.4271 4.26638C16.2478 4.80819 17.8244 5.96409 18.8888 7.5374"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M19.395 2.94385L19.0687 7.7926L14.22 7.4626"
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
};
