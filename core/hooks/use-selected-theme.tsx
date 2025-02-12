import { colorScheme, useColorScheme } from 'nativewind';
import React from 'react';
import { useEditParameter, useParameters, useEditParameterActions } from './use_parameter_store';

const SELECTED_THEME = 'SELECTED_THEME';
export type ColorSchemeType = 'light' | 'dark' | 'system';
/**
 * this hooks should only be used while selecting the theme
 * This hooks will return the selected theme which is stored in DB
 * selectedTheme should be one of the following values 'light', 'dark' or 'system'
 * don't use this hooks if you want to use it to style your component based on the theme, then use useColorScheme from nativewind instead
 *
 */
export const useSelectedTheme = () => {
  // get color scheme from nativewind
  const { colorScheme: _color, setColorScheme } = useColorScheme();
  const parameters = useParameters();
  const themeParameter = parameters.find((parameter) => { parameter.type === SELECTED_THEME })

  const setSelectedTheme = React.useCallback((t: ColorSchemeType) => {
    const { onChangeValue } = useEditParameterActions();
    let { type, value } = useEditParameter();

    value = t as string;
    type = SELECTED_THEME;
    
    setColorScheme(t);
    onChangeValue(value);// TODO: if to use saveParameter function instead
  },
    [setColorScheme]
  );

  const selectedTheme = (themeParameter?.value ?? 'system') as ColorSchemeType;
  return { selectedTheme, setSelectedTheme } as const;
};

// to be used in the root file to load the selected theme from DB
export const loadSelectedTheme = () => {

  const parameters = useParameters()
  const themeParameter = parameters.find((parameter) => parameter.type === SELECTED_THEME)

  if (themeParameter !== undefined) {
    console.log('theme', themeParameter.value);
    colorScheme.set(themeParameter.value as ColorSchemeType);
  }
}

