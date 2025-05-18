import React from 'react';
import { Stack } from 'expo-router';
import EditAccountScreen from '@features/profile/screens/EditAccountScreen';

export default function EditAccountRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditAccountScreen id={0} />
    </>
  );
} 