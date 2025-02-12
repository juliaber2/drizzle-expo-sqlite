import { translate } from '@/core';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import {
  Bluetooth as BluetoothIcon,
  Settings as SettingsIcon,
  Style as StyleIcon,

} from '@/components/icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          title: 'Plants',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="style"
        options={{
          title: translate('tabs.style'),
          headerShown: false,
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      /> */}
      <Tabs.Screen
        name="settings"
        options={{
          title: translate('tabs.settings'),
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="settings" size={28} color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
      <Tabs.Screen
        name="bluetooth"
        options={{
          title: translate('tabs.bluetooth'),
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bluetooth" color={color} />,
          tabBarTestID: 'connections-tab',
        }}
      />
    </Tabs>
  );
}

