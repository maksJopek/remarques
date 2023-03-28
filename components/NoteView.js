import * as React from 'react';
import { SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

export default class NoteView extends React.Component {
  constructor(props) {
    super(props)
    const note = props.route.params?.note ?? {};
    this.state = {
      note: note,
      isNew: Object.keys(note).length === 0,
      title: note.title ?? "",
      body: note.body ?? "",
      category: note.category ?? "",
      ti1: React.createRef(),
      ti2: React.createRef(),
      categories: [],
    }
    this.setTitle = this.setTitle.bind(this)
    this.setBody = this.setBody.bind(this)
    this.setCategory = this.setCategory.bind(this)
    this.setCategories = this.setCategories.bind(this)
    this.addNote = this.addNote.bind(this)
    this.funkcja = () => null;
  }
  componentDidMount() {
    const a = () => {
      const n = this.props.route.params?.note ?? {};
      getCategories(this.setCategories, this.setCategory, this.state.category)
      console.log('note', n, '     ', Date.now())
      this.setState({ note: n })
      this.setTitle(n.title ?? "")
      this.setBody(n.body ?? "")
      this.setCategory(n.category ?? "")
    }
    a()
    this.props.navigation.addListener('focus', a)
  }
  componentWillUnmount() {
    this.funkcja();
  }

  setTitle(t) { this.setState({ title: t }) }
  setBody(t) { this.setState({ body: t }) }
  setCategory(t) { this.setState({ category: t }) }
  setCategories(t) { this.setState({ categories: t }) }

  async addNote() {
    try {
      let nk = await SecureStore.getItemAsync('notesKeys')
      let notesKeys = []
      if (!nk) notesKeys = [0]; else notesKeys = JSON.parse(nk);
      const key = this.state.isNew ? Math.max(...notesKeys) + 1 : this.state.note.key;
      const date = Date.now();
      const colors = ["darkred", "darkblue", "darkcyan", "darkgreen"]
      const color = this.state.isNew ? colors[Math.floor(Math.random() * colors.length)] : this.state.note.color
      if (this.state.isNew)
        notesKeys.push(key);
      let [title, body, category] = [this.state.title, this.state.body, this.state.category]
      if (category === "") category = this.state.categories[0]
      await SecureStore.setItemAsync(key.toString(), JSON.stringify({ title, body, date, color, key, category }))
      await SecureStore.setItemAsync('notesKeys', JSON.stringify(notesKeys.filter(el => el !== 0)))
      console.log(key.toString(), JSON.stringify({ title, body, date, color, key, category }))
      console.log('notesKeys', JSON.stringify(notesKeys.filter(el => el !== 0)))
      console.log('categories', this.state.categories)

      // this.state.ti1.current.clear()
      // this.state.ti2.current.clear()

      this.props.navigation.navigate('notesList')
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.cont}>
        <TextInput
          underlineColorAndroid="#FFFFFF"
          placeholder="TITLE..."
          placeholderTextColor="#FFFFFF"
          onChangeText={this.setTitle}
          value={this.state.title}
          style={styles.input}
          ref={this.state.ti1}
        />
        <TextInput
          underlineColorAndroid="#FFFFFF"
          placeholder="BODY..."
          placeholderTextColor="#FFFFFF"
          onChangeText={this.setBody}
          value={this.state.body}
          style={styles.input}
          multiline={true}
          ref={this.state.ti2}
        />
        <Picker
          selectedValue={this.state.category}
          onValueChange={(v, _) => this.setCategory(v)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {this.state.categories.map((c, i) => <Picker.Item value={c} label={c} key={i} />)}
        </Picker>
        <TouchableOpacity onPress={this.addNote}><Text style={styles.txt}>{this.state.isNew ? "Add" : "Confirm"}</Text></TouchableOpacity>
      </SafeAreaView>
    )
  }
}
async function getCategories(setCategories, setCategory, category) {
  let categories = await SecureStore.getItemAsync('categories')
  if (!categories) categories = ["default"]; else categories = JSON.parse(categories);
  setCategories(categories);
  if (category === "")
    setCategory(categories[0])
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
  picker: {
    color: "white",
    borderColor: "white",
    width: 200,
    height: 30,
    backgroundColor: "darkgrey",
    margin: 15,
  },
  pickerItem: {
    backgroundColor: "black",
    color: "white",
  },
  input: {
    // height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#FFFFFF",
  }
})
