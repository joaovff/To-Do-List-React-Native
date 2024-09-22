import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import List from "./components/List";
import InputBar from "./components/InputBar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const createNewTask = (text: string): void => {
    const newTask = {
      id: Date.now(),
      title: text,
      isFinished: false,
    };
    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    getAsyncTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@keyOne", JSON.stringify(tasks));
  }, [tasks]);

  const getAsyncTasks = async () => {
    try {
      const getAsyncTasks = await AsyncStorage.getItem("@keyOne");
      if (getAsyncTasks) {
        setTasks(JSON.parse(getAsyncTasks));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTask = (id: number): void => {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
  };

  const handleStatus = (id: number): void => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isFinished: !task.isFinished };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ marginTop: 40 }}>
        <Image
          source={require("./assets/logo.png")}
          style={{ alignSelf: "center" }}
        />
        <InputBar
          tasks={tasks}
          setTask={setTask}
          task={task}
          onSubmit={createNewTask}
        />
      </View>
      <List tasks={tasks} handleStatus={handleStatus} deleteTask={deleteTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});
