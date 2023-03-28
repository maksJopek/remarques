import * as React from 'react';
import { SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

let a = true
export default function CategoryView(props) {
  let [font, setFont] = React.useState(0)

  async function setFontSS(f) {
    setFont(f);
    await SecureStore.setItemAsync('font', f.toString())
  }

  React.useEffect(() => getFont(setFont), [])
  if (a) {
    props.navigation.addListener('focus', () => getFont(setFont))
    a = false
  }

  return (
    <SafeAreaView style={styles.cont}>
      <Text style={styles.txt}>Selected font: {font}</Text>
      <TouchableOpacity onPress={() => setFontSS(12)}><Text style={[styles.txt, styles.btn]}>Font 12</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setFontSS(19)}><Text style={[styles.txt, styles.btn]}>Font 19</Text></TouchableOpacity >
      <TouchableOpacity onPress={() => setFontSS(26)}><Text style={[styles.txt, styles.btn]}>Font 26</Text></TouchableOpacity >
    </SafeAreaView >
  )
}
export async function getFont(setFont) {
  let font = await SecureStore.getItemAsync('font')
  if (!font) { font = 22; await SecureStore.setItemAsync('font', '22'); } else font = JSON.parse(font);
  setFont(parseInt(font));
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
  btn: {
    textAlign: "center",
    borderColor: "pink",
    borderWidth: 5,
    margin: 10,
    padding: 10,
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


