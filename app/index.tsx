import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

// "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/"

interface Pokemon {
  name: string;
  image: string;
  imageFront: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType = {
  grass: "#7AC74C",
  fire: "#EE8130",
  water: "#6390F0",
  bug: "#A6B91A",
  normal: "#A8A77A",
  poison: "#A33EA1",
  electric: "#F7D02C",
  ground: "#E2BF65",
  fairy: "#D685AD",
  fighting: "#C22E28",
  psychic: "#F95587",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
  dragon: "#6F35FC",
};

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  // console.log(JSON.stringify(pokemon[0], null, 2));
  useEffect(() => {
    //Fetch pokemaniac data when app mounts first time
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10"
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default, // Example of getting an image URL
            imageFront: details.sprites.front_shiny,
            types: details.types,
          };
        })
      );
      // console.log("Detailed Pokemon:", detailedPokemons);

      setPokemon(detailedPokemons);
      // console.log("Fetched pokemons:", data.results); //pressable wala feature
    } catch (error) {
      console.log("Error fetching pokemons:", error);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
      {pokemon.map((pokemon) => (
        <Link key={pokemon.name}
        href={{pathname: "/details", params: {name: pokemon.name}}}
        style={{
            //@ts-ignore
            backgroundColor: colorsByType[pokemon.types[0].type.name] + 55, // here number means opacity in hex
            borderRadius: 20,
            padding: 20,
          }}
        >
        <View>
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 120, height: 120 }}
            />
            <Image
              source={{ uri: pokemon.imageFront }}
              style={{ width: 120, height: 120 }}
            />
          </View>
        </View>
        </Link>
      ))}

      {/* below is click to fetch the data.results, detailedPokemon */}
      {/* <Pressable
            onPress={fetchPokemons}
            style={{
              marginBottom: 20,
              padding: 10,
              backgroundColor: "lightblue",
              borderRadius: 5,
            }}
          >
            <Text>Pokemaniac press me to get the list</Text>{" "}
          </Pressable> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "gray",
    textAlign: "center",
  },
});
