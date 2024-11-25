import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";

const AddTeam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [points, setPoints] = useState("");
  const [logo, setLogo] = useState("");
  const navigation = useNavigation();

  const checkIfNumbers = () => {
    try {
      parseInt(goals);
      parseInt(points);
      return true;
    } catch (error) {
      return false;
    }
  };

  const jsonify = () => {
    if (checkIfNumbers()) {
      return {
        name,
        description,
        goals,
        points,
        logo,
      };
    } else {
      return null;
    }
  };

  const resetState = () => {
    setName("");
    setDescription("");
    setPoints("");
    setGoals("");
    setLogo("");
  };

  const handleSubmit = async () => {
    const json = jsonify();
    console.log(json);
    if (json) {
      const response = await fetch(`http://161.35.143.238:8000/glongui`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });
      console.log(response);
      resetState();
      navigation.navigate("index");
    } else {
        console.log("Error: campos 'Goles' y 'Puntos' deben ser números")
    }
  };

  return (
    <ScrollView>
      <View style={styles.input}>
        <Text>Nombre:</Text>
        <TextInput value={name} onChangeText={setName} placeholder="" />
      </View>
      <View style={styles.input}>
        <Text>Descripción:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder=""
        />
      </View>
      <View style={styles.input}>
        <Text>Goles:</Text>
        <TextInput value={goals} onChangeText={setGoals} placeholder="" />
      </View>
      <View style={styles.input}>
        <Text>Puntos:</Text>
        <TextInput value={points} onChangeText={setPoints} placeholder="" />
      </View>
      <View style={styles.input}>
        <Text>Logo:</Text>
        <TextInput value={logo} onChangeText={setLogo} placeholder="" />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text>Agregar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 12,
    padding: 10,
    height: 72,
  },
  button: {
    width: "100%",
    height: 50,
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

export default AddTeam;
