import { StudentPlannerProvider } from '../hooks/useStudentPlanner';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = { anchor: 'index' };

export default function RootLayout() {
  return (
    <StudentPlannerProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="map" />
        <Stack.Screen name="events" />
        <Stack.Screen name="email" />
        <Stack.Screen name="schedule" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="services" />
        <Stack.Screen name="courses" />
        <Stack.Screen name="deadlines" />
        <Stack.Screen name="dining" />
        <Stack.Screen name="announcements" />
        <Stack.Screen name="resources" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="dashboard" />
      </Stack>
    </StudentPlannerProvider>
  );
}
