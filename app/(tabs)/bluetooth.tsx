/* eslint-disable simple-import-sort/imports */
import { FocusAwareStatusBar } from '@/ui/focus-aware-status-bar';
import * as React from 'react';

import {SafeAreaView, ScrollView, Text} from 'react-native';

// TODO: not to use ScrollView , use FlashList or Flat list instead
export default function Bluetooth() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
        <Text >Bluetooth will be here but it's empty !!!</Text>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
