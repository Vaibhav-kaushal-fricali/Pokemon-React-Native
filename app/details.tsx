import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Animated,
} from "react-native";
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
    types: string[]; //here "types" is array of objects which are strings so string[]
    abilities: string[];
  };
  const params = useLocalSearchParams();
  // console.log("Params received:", params);
  // console.log(typeof params.name);
  const name =
    params.name.toString().charAt(0).toUpperCase() + params.name.slice(1); //this to capitalise the first word and use that
  // console.log("Name:", name)
  const [pokeDetails, setPokeDetails] = useState<PokemonDetails | null>(null); // do i need to write null or i can leave () as it is?? => Ans) () is undefined, whereas null means clearly we have nothing yet,,, If data comes later → start with null
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(20))[0];
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
      //-------- Animated thingy --------
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();

      // console.log("Cleaned pokemon data", cleanedPokemon);
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} /> {/* iski koi zarrorat nhi waise bas modal ke top pe naam likhega */}
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
          <Animated.View
            style={[
              styles.card,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/*Header Section*/}
            <View style={{justifyContent:"center", alignItems:"center", alignContent:"center"}}>
              <Image source={{ uri: pokeDetails.image }} style={styles.image} />
              <Text style={styles.title}>{name}</Text>
            </View>
            {/**/}

            {/* STATS Section*/}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Height</Text>
                <Text style={styles.statValue}>{pokeDetails.height}</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>{pokeDetails.weight}</Text>
              </View>
            </View>

            {/* Types */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Types</Text>
              <View style={styles.typeContainer}>
                {pokeDetails.types.map((type) => (
                  <View
                    key={type}
                    style={[
                      styles.typePill,
                      { backgroundColor: colorsByType[type] || "#ccc" },
                    ]}
                  >
                    <Text style={styles.typeText}>{type}</Text>
                  </View>
                ))}
              </View>
            </View>
{/** */}
            {/* 4️⃣ ABILITIES */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Abilities</Text>
              {pokeDetails.abilities.map((ability, index) => (
                <Text key={index} style={styles.abilityText}>
                  • {ability}
                </Text>
              ))}
            </View>
          </Animated.View>
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
    padding: 20,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  image: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
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
  header: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f6f8fc",
    padding: 16,
    borderRadius: 16,
    width: "100%",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    width: "100%",
  },

  statBox: {
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    minWidth: 100,
    elevation: 4,
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  section: {
    width: "100%",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 8,
  },

  abilityText: {
    fontSize: 14,
    marginLeft: 6,
  },
});
