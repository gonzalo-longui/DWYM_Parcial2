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
  const [numberAlert, setNumberAlert] = useState(false);


  const jsonify = () => {
    return {
      name,
      description,
      goals: parseInt(goals),
      points: parseInt(points),
      logo,
    };
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
    if (!isNaN(json.goals) && !isNaN(json.points)) {
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
      console.log("Error: campos 'Goles' y 'Puntos' deben ser números");
      setNumberAlert(true);
    }
  };

  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        <Text>Nombre:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder=""
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Descripción:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder=""
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Goles:</Text>
        <TextInput
          value={goals}
          onChangeText={setGoals}
          placeholder=""
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Puntos:</Text>
        <TextInput
          value={points}
          onChangeText={setPoints}
          placeholder=""
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Logo:</Text>
        <TextInput
          value={logo}
          onChangeText={setLogo}
          placeholder=""
          style={styles.input}
        />
      </View>
      <Text style={numberAlert ? styles.alert : {display: 'none'}}> ⚠︎ Los campos Goles y Puntos deben ser números</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    margin: 12,
    padding: 10,
    height: 72,
  },
  input: {
    height: 48,
  },
  alert: {
    color: '#f00000',
    fontSize: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
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
