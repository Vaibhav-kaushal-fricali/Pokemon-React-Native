import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pokemaniac by Fricali",
          headerTintColor: "Yellow",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerTintColor: "red",
          presentation: "formSheet",
          sheetAllowedDetents: [0.5, 0.7],
          sheetGrabberVisible: true,
          headerShown: true,
        }}
      />
    </Stack>
  );
}
