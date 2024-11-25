import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";

const EditTeam = () => {
  const params = useLocalSearchParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [points, setPoints] = useState("");
  const [logo, setLogo] = useState("");
  const navigation = useNavigation();
  const [numberAlert, setNumberAlert] = useState(false);

  const fetchTeamData = async () => {
    try {
      const response = await fetch(
        `http://161.35.143.238:8000/glongui/${params.id}`
      );
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
      setGoals(data.goals);
      setPoints(data.points);
      setLogo(data.logo);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const jsonify = () => {
    console.log(goals);
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
      const response = await fetch(`http://161.35.143.238:8000/glongui/${params.id}`, {
        method: "PUT",
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

  const handleCancel = async () => {
    navigation.navigate("index");
  }

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
      <Text style={numberAlert ? styles.alert : {display: 'none'}}> ⚠︎ Los campos Goles y Puntos deben ser números</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleCancel()}>
        <Text>Cancelar</Text>
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
  alert: {
    color: '#f00000',
    fontSize: 18,
  },
  button: {
    width: "90%",
    marginLeft: "5%",
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

export default EditTeam;
