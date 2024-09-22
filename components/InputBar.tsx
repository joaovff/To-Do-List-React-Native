import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface SetTask {
  setTask: Function;
  task: string;
  onSubmit: Function;
  tasks: Task[];
}

const InputBar = ({ setTask, task, onSubmit, tasks }: SetTask) => {
  const [finishedTasks, setFinishedTasks] = useState<number>(0);
  function handleChangeText(value: string) {
    setTask(value);
  }

  function handleSubmitEditing() {
    if (!task) {
      return;
    }

    onSubmit(task);
    setTask("");
  }

  useEffect(() => {
    let counter: number = 0;
    tasks.map((task) => {
      task.isFinished && counter++;
    });

    setFinishedTasks(counter);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.textInput}
          placeholder="Adiciona sua nova tarefa"
          autoCorrect={false}
          value={task}
          clearButtonMode="always"
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
        />
        <Pressable style={styles.button} onPress={handleSubmitEditing}>
          <AntDesign
            style={styles.icon}
            name="pluscircleo"
            size={18}
            color="white"
          />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
          paddingVertical: 25,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text>Criadas</Text>
          <Text
            style={{
              backgroundColor: "#5D60CE",
              color: "white",
              marginLeft: 5,
              paddingHorizontal: 8,
              borderRadius: 10,
            }}
          >
            {tasks.length}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text>Concluídas</Text>
          <Text
            style={{
              backgroundColor: "#4EA8DE",
              color: "white",
              marginLeft: 5,
              paddingHorizontal: 8,
              borderRadius: 10,
            }}
          >
            {finishedTasks}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={{
          fontWeight: 100,
          marginTop: -20,
          marginBottom: 10,
        }}
      >
        ________________________________________________________________________
      </Text>
    </View>
  );
};

export default InputBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    color: "white",
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: "space-evenly",
  },
  textInput: {
    paddingVertical: 12,
    color: "#333",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: "#5D60CE",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 11,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#5D60CE",
    marginLeft: 4,
    borderWidth: 1,
    borderColor: "#5D60CE",
  },
  icon: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    width: 30,
    textAlign: "center",
  },
});
