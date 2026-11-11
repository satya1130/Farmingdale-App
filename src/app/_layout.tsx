import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = { initialRouteName: 'index' };

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="map" />
        <Stack.Screen name="events" />
        <Stack.Screen name="schedule" />
        <Stack.Screen name="dining" />
        <Stack.Screen name="announcements" />
        <Stack.Screen name="resources" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="dashboard" />
      </Stack>
    </>
  );
}
