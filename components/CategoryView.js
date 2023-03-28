import * as React from 'react';
import { SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function CategoryView() {
  let [name, setName] = React.useState("")
  const ti = React.createRef()

  async function addCategory() {
    let nk = await SecureStore.getItemAsync('categories')
    let categories = []
    if (!nk) categories = ["default"]; else categories = JSON.parse(nk);
    if (!categories.find(c => c === name))
      categories.push(name)
    await SecureStore.setItemAsync('categories', JSON.stringify(categories))

    ti.current.clear()

    // props.navigation.navigate('s1')
  }
  return (
    <SafeAreaView style={styles.cont}>
      <TextInput
        underlineColorAndroid="#FFFFFF"
        placeholder="NAME..."
        placeholderTextColor="#FFFFFF"
        onChangeText={setName}
        style={styles.input}
        ref={ti}
      />
      <TouchableOpacity onPress={addCategory}><Text style={styles.txt}>Add</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    alignItems: "center"
  },
  ico: {
    width: 200,
    height: 200,
  },
  txt: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#FFFFFF",
  }
})

