import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";

interface Team {
  id: number;
  name: string;
  description: string;
  goals: number;
  points: number;
  logo: string;
}

export default function Index() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsSortedByPoints, setTeamsSortedByPoints] = useState<Team[]>([]);
  const [orderByPoints, setOrderByPoints] = useState(false);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`http://161.35.143.238:8000/glongui`);
      const data = await response.json();
      setTeams(data);
      console.log(teams);
      const sortedTeams = teams.sort((a, b) => b.points - a.points);
      setTeamsSortedByPoints(sortedTeams);
      console.log(teamsSortedByPoints);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [orderByPoints]);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <Link
        href={{
          pathname: "/addTeam",
        }}
        
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agregar equipo</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={() => setOrderByPoints(!orderByPoints)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Ordenar por: {orderByPoints ? `orden original` : `puntos`}
        </Text>
      </TouchableOpacity>
      {!orderByPoints &&
        teams &&
        teams.map((team) => {
          return (
            <View
              key={team.id}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                width: "90%",
                margin: 16,
              }}
            >
              <Link
                href={{ pathname: "/details", params: { id: team.id } }}
                style={styles.container}
              >
                <Text style={styles.headerText}>{team.name}</Text>
                {"\n"}
                <Text>{team.description}</Text>
              </Link>
            </View>
          );
        })}
      {orderByPoints &&
        teamsSortedByPoints &&
        teamsSortedByPoints.map((team) => {
          return (
            <View
              key={team.id}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                width: "90%",
                margin: 16,
              }}
            >
              <Link
                href={{ pathname: "/details", params: { id: team.id } }}
                style={styles.container}
              >
                <Text style={styles.headerText}>{team.name}</Text>
                {"\n"}
                <Text>{team.description}</Text>
              </Link>
            </View>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e8f5ff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    flexShrink: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 16,
    flex: 0,
  },
});
