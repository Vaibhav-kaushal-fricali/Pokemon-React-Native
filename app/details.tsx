import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

export default function Details() {
 type PokemonDetails = {
  height: number;
  weight: number;
};
  const params = useLocalSearchParams();
  // console.log("Params received:", params);
  // console.log(typeof params.name);
  const name = params.name.toString().charAt(0).toUpperCase() + params.name.slice(1) //this to capitalise the first word and use that
  // console.log("Name:", name)
  const [pokeDetails, setPokeDetails] = useState<PokemonDetails | null>(null); // do i need to write null or i can leave () as it is?? => Ans) () is undefined, whereas null means clearly we have nothing yet,,, If data comes later → start with null


  useEffect(()=>{
    if (params.name) {
    fetchPokemonByName();
    }
    else{
      console.log("Error fetching details")
    }
  },[params.name]);

  async function fetchPokemonByName() {
    try {
      const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${params.name}`)
      const data = await response.json();
      
      const cleanedPokemon = {
        height: data.height,
        weight: data.weight,
      }
      setPokeDetails(cleanedPokemon);
      console.log("Cleaned pokemon data",cleanedPokemon)
    } 
    catch (error) {
        console.error("Error fetching pokemon details:", error);
  }
 }

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView contentContainerStyle={{ gap: 16, padding: 16, justifyContent:"center", alignItems:"center" }}>
        <Text style={styles.text}>Details of {name}</Text>
        {pokeDetails && (
          <>
            <Text style={styles.details}> Height of this {params.name} is: {pokeDetails.height}  </Text>
            <Text style={styles.details}> Weight of this {params.name} is: {pokeDetails.weight}  </Text>
          </>
        )}
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
  },
  details: {
    fontSize: 20,
    fontWeight:"400",
    
  }
});
