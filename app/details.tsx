import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

export default function Details() {
  const params = useLocalSearchParams();
  console.log("Params received:", params.name);

  useEffect(() => {}, []);

  async function fetchPokemonByName(name: string) {
    //     try {
    // }
    // catch (error) {
    //     console.error("Error fetching pokemon details:", error);
  }

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
        <Text>Details Page for {params.name}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
