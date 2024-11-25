import { Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, Link } from "expo-router";

const Details = () => {
  const params = useLocalSearchParams();
  const navigator = useNavigation();
  const [team, setTeam] = useState({} as any);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(
        `http://161.35.143.238:8000/glongui/${params.id}`
      );
      const data = await response.json();
      setTeam(data);
      console.log(team);
    };

    fetchInfo();
  }, []);

  const handleDelete = async () => {
    const response = await fetch(
      `http://161.35.143.238:8000/glongui/${params.id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    navigator.navigate("index");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Details",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      {team && (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            width: "90%",
            margin: 16,
            padding: 16,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 48 }}>{team.name}</Text>
          <Text style={{ fontWeight: "normal" }}>{team.description}</Text>
          <Text style={{ fontWeight: "normal" }}>Puntos: {team.points}</Text>
          <Text style={{ fontWeight: "normal" }}>Goles: {team.goals}</Text>
        </View>
      )}

      <Link href={{ pathname: "/editTeam", params: { id: team.id } }} style={styles.button}>
          <Text>Editar</Text>
      </Link>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "90%",
    height: 50,
    marginTop: 0,
    backgroundColor: "#f4511e",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default Details;
