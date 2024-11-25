import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:"Home"}}/>
      <Stack.Screen name="details" options={{title:"Detalles"}}/>
      <Stack.Screen name="addTeam" options={{title:"Agregar equipo"}}/>
    </Stack>
  );
}
