import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Background } from "@react-navigation/elements";

export default function Details() {
  const colorsByType: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  type PokemonDetails = {
    height: number;
    weight: number;
    image: string;
    types: string[]; //here types is array of objects which are strings so string[]
    abilities: string[];
  };
  const params = useLocalSearchParams();
  // console.log("Params received:", params);
  // console.log(typeof params.name);
  const name =
    params.name.toString().charAt(0).toUpperCase() + params.name.slice(1); //this to capitalise the first word and use that
  // console.log("Name:", name)
  const [pokeDetails, setPokeDetails] = useState<PokemonDetails | null>(null); // do i need to write null or i can leave () as it is?? => Ans) () is undefined, whereas null means clearly we have nothing yet,,, If data comes later → start with null

  useEffect(() => {
    if (params.name) {
      fetchPokemonByName();
    } else {
      console.log("Error fetching details");
    }
  }, [params.name]);

  async function fetchPokemonByName() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.name}`
      );
      const data = await response.json();

      const cleanedPokemon = {
        height: data.height,
        weight: data.weight,
        image: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name), //Loops over API type, Extract only name.
        abilities: data.abilities.map((item: any) => item.ability.name),
      };
      setPokeDetails(cleanedPokemon);
      console.log("Cleaned pokemon data", cleanedPokemon);
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Details of {name}</Text>
        {pokeDetails && (
          <View style={styles.card}>
            <Image source={{ uri: pokeDetails.image }} style={styles.image} />
            <Text style={styles.details}>
              {" "}
              Height of this {params.name} is: {pokeDetails.height}{" "}
            </Text>
            <Text style={styles.details}>
              {" "}
              Weight of this {params.name} is: {pokeDetails.weight}{" "}
            </Text>
            <Text style={styles.details}>Abilities: </Text>
            {pokeDetails.abilities.map((ability, index) => (
              <Text style={styles.subType} key={index}>
                • {ability}
              </Text>
            ))}
            <Text style={styles.details}>Types:</Text>
            <View style={styles.typeContainer}>
              {pokeDetails.types.map((type) => (
                <View
                  style={[
                    styles.typePill,
                    { backgroundColor: colorsByType[type] || "#ccc" },
                  ]}
                >
                  <Text style={styles.typeText} key={type}>
                    {type}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    fontSize: 18,
    marginVertical: 4,
  },
  subType: {
    fontSize: 18,
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    elevation: 9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  typePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  typeText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
