import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack initialRouteName="detail" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="detail" />
      <Stack.Screen name="members" />
    </Stack>
  );
}
