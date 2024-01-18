import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export const HeartHandShake = ({ color = "#5E6068", ...props }: SvgProps) => {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M20.189 13.4359L12.689 20.8639L5.18902 13.4359C4.69433 12.9546 4.30466 12.376 4.04457 11.7366C3.78447 11.0972 3.65958 10.4109 3.67776 9.72088C3.69594 9.03086 3.85678 8.35208 4.15018 7.72728C4.44357 7.10248 4.86316 6.5452 5.38251 6.09053C5.90186 5.63585 6.50973 5.29364 7.16783 5.08543C7.82594 4.87722 8.52003 4.80753 9.20639 4.88075C9.89275 4.95397 10.5565 5.1685 11.1559 5.51085C11.7553 5.8532 12.2773 6.31595 12.689 6.86995C13.1026 6.31997 13.6252 5.86127 14.2241 5.52255C14.8231 5.18383 15.4855 4.9724 16.17 4.90147C16.8544 4.83054 17.5461 4.90164 18.2018 5.11034C18.8575 5.31903 19.463 5.66082 19.9806 6.11431C20.4981 6.5678 20.9164 7.12323 21.2094 7.74584C21.5024 8.36845 21.6638 9.04483 21.6833 9.73265C21.7029 10.4205 21.5803 11.1049 21.3232 11.7432C21.066 12.3815 20.6799 12.9598 20.189 13.4419"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.6891 6.86401L9.39606 10.157C9.20859 10.3445 9.10327 10.5988 9.10327 10.864C9.10327 11.1292 9.20859 11.3835 9.39606 11.571L9.93906 12.114C10.6291 12.804 11.7491 12.804 12.4391 12.114L13.4391 11.114C14.0358 10.5173 14.8451 10.182 15.6891 10.182C16.533 10.182 17.3423 10.5173 17.9391 11.114L20.1891 13.364"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.189 16.364L15.189 18.364"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.689 13.864L17.689 15.864"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};