import type TranslateOptions from 'i18next';
import i18n from 'i18next';
import memoize from 'lodash.memoize';
import { useCallback } from 'react';
import { I18nManager, NativeModules, Platform } from 'react-native';
import { useEditParameter, useParameters, useEditParameterActions } from '../hooks/use_parameter_store';
import RNRestart from 'react-native-restart';
import type { Language, resources } from './resources';
import type { RecursiveKeyOf } from './types';
import { getLocales } from 'expo-localization';
import { getData, saveData } from '../asyncstorage';

type DefaultLocale = typeof resources.en.translation;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export const LOCAL = 'local';

export const getLanguage = async () => {
  const deviceLanguage = getLocales()[0].languageCode;
  const langParameter = await getData('language');

  console.log("getLanguage: deviceLanguage=" + deviceLanguage + " languageFromAsyncStorage=" + langParameter);

  return langParameter != null ? langParameter as Language : deviceLanguage;
}

export const translate = memoize(
  (key: TxKeyPath, options = undefined) => i18n.t(key, options) as unknown as string,
  (key: TxKeyPath, options: typeof TranslateOptions) => options ? key + JSON.stringify(options) : key
);

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang).then(() => {
    if (lang === 'he') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }

    console.log("changeLanguage: " + lang);

    if (Platform.OS === 'ios' || Platform.OS === 'android') {

      console.log('Platform Android: reload')

      if (__DEV__) NativeModules.DevSettings.reload();
      else RNRestart.restart();
    } else if (Platform.OS === 'web') {
      window.location.reload();
    }
  })
};

export const useSelectedLanguage = async () => {
  const language = await getData('language'); //useParameters();
  //const langParameter = parameters.find((parameter) => { parameter.type === LOCAL })

  const setLanguage = useCallback(
    (lang: Language) => {
      //const { onChangeValue } = useEditParameterActions();r
      //let { type, value } = useEditParameter();

      const value = lang as string;
      //if (lang !== undefined) onChangeValue(value);
      saveData('language', value);
    },
    []
  );

  return { language: language as Language, setLanguage };
};
