import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface TasksProps {
  tasks: Task[];
  handleStatus: Function;
  deleteTask: Function;
}

const List = ({ tasks, handleStatus, deleteTask }: TasksProps) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {tasks.length >= 1 ? (
        tasks.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              width: "100%",
              paddingVertical: 20,
              backgroundColor: "#f5f5f5",
              alignItems: "center",
              justifyContent: "space-between",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              {!item.isFinished ? (
                <Feather
                  name="circle"
                  size={24}
                  color="#333"
                  onPress={() => handleStatus(item.id)}
                  style={{ width: 25 }}
                />
              ) : (
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color="green"
                  onPress={() => handleStatus(item.id)}
                  style={{ width: 25 }}
                />
              )}
              <Text style={{ marginLeft: 7 }}>{item.title}</Text>
            </View>

            <MaterialCommunityIcons
              name="delete-outline"
              size={26}
              color="black"
              onPress={() => deleteTask(item.id)}
              style={{ marginRight: 10 }}
            />
          </View>
        ))
      ) : (
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 40,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <AntDesign
            name="filetext1"
            size={80}
            color="#333"
            style={{ marginBottom: 20 }}
          />
          <Text>Ainda não tens tarefas registadas</Text>
          <Text>Cria tarefas e organiza os teus a fazeres</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default List;

const styles = StyleSheet.create({});
