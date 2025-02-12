import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

//import { isRTL } from '@/core';

const isRTL = 1;

export const Bluetooth = ({ color = '#CCC', style, ...props }: SvgProps) => (
  <Svg
    width={64}
    height={64}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
    style={StyleSheet.flatten([
      style,
      { transform: [{ scaleX: isRTL ? -1 : 1 }] },
    ])}
  >
    <Path
      d="M7 17L17 7L12 2V22L17 17L7 7"
      fill={color}
    />
  </Svg>
);
