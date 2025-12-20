import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

export default function Details() {
  const params = useLocalSearchParams();
  // console.log("Params received:", params.name);
  // console.log(typeof params.name);
  const name = params.name.toString().charAt(0).toUpperCase() + params.name.slice(1) //capitalise the first word and use that
  // console.log("Name:", name)


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
      <ScrollView contentContainerStyle={{ gap: 16, padding: 16, justifyContent:"center", alignItems:"center" }}>
        <Text style={styles.text}>Details of {name}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine:"underline",
    alignItems: "center",
    justifyContent: "center",
  }
});
