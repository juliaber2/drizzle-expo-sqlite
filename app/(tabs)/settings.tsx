/* eslint-disable react/react-in-jsx-scope */

import { useColorScheme } from 'nativewind';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { useThemeConfig } from "@/core/use-theme-config"
import { colors, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import { translate } from '@/core/i18n';
import Config from 'react-native-config';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Accessing individual variables
const appName = Config.API_BASE_URL;
const appVersion = Config.API_KEY;

export default function Settings() {
  const theme = useThemeConfig();
  //const signOut = useAuth.use.signOut();
  //const { colorScheme } = useColorScheme();
  const iconColor =  colors.neutral[500]; //colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  console.log("app_name: " + appName + " version:" + appVersion)

  return (
    <GestureHandlerRootView style={{ flex: 1 }} className={theme.dark ? `dark` : undefined}	>
      <BottomSheetModalProvider>
        <FocusAwareStatusBar />
        <ScrollView>
          <View className="flex-1 px-4 pt-16 ">
            <Text className="text-xl font-bold">
              {translate('settings.title')}
            </Text>
            <ItemsContainer title="settings.generale">
              {/* <LanguageItem /> */}
              <ThemeItem />
            </ItemsContainer>
            {/* <ItemsContainer title="settings.about">
              <Item text="settings.app_name" value={appName} />
              <Item text="settings.version" value={appVersion} />
            </ItemsContainer> */}
          </View>
        </ScrollView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
