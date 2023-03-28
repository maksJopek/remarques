import * as React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { getFont } from "./Options"

export default class NotesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      search: '',
      font: 0,
      sortOrder: true,
    }
    this.setNotes = this.setNotes.bind(this)
    this.setSearch = this.setSearch.bind(this)
    this.setFont = this.setFont.bind(this)
    this.setSortOrder = this.setSortOrder.bind(this)
    this.funkcja = () => null;
  }
  setNotes(s) { this.setState({ notes: s }) }
  setSearch(s) { this.setState({ search: s }) }
  setFont(s) { this.setState({ font: s }) }
  setSortOrder(s) { this.setState({ sortOrder: s }) }

  componentDidMount() {
    getNotes(this.setNotes); getFont(this.setFont);
    this.props.navigation.addListener('focus', () => { getNotes(this.setNotes); getFont(this.setFont); })
  }
  componentWillUnmount() {
    this.funkcja();
  }
  render() {
    const filterNotes = (n) => {
      return n.title.includes(this.state.search) ||
        n.body.includes(this.state.search) ||
        n.category.includes(this.state.search)
    }
    const sortNotes = (a, b) => {
      return this.state.sortOrder ? a.date - b.date : b.date - a.date;
    }
    return (
      <View style={styles.cont} >
        <View>
          <TextInput
            placeholder="SEARCH IN NOTES..."
            placeholderTextColor="#FFFFFF"
            onChangeText={this.setSearch}
            style={styles.input}
            defaultValue={this.state.search}
          // ref={ti}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.setSortOrder(!this.state.sortOrder)}><Text style={[styles.txt, { textAlign: "center" }]}>Change sort order</Text></TouchableOpacity>
        <View>
          <FlatList
            data={this.state.notes.filter(filterNotes).sort(sortNotes)}
            renderItem={item => {
              const note = item.item
              let date = new Date(note.date)
              const ms = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paz", "Lis", "Gru"]
              date = `${date.toISOString().substr(8, 2)} ${ms[date.getMonth()]}`
              return (
                <TouchableOpacity onLongPress={() =>
                  Alert.alert("Delete?", "There's no way back", [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    {
                      text: "OK",
                      onPress: () => deleteItem(note, this.setNotes)
                    }
                  ])
                }
                  onPress={() => this.props.navigation.navigate("editNote", { note })
                  }
                >
                  <View key={item.index} style={[styles.note, { backgroundColor: note.color }]}>
                    <View><Text style={[styles.category, { color: note.color, fontSize: this.state.font }]}>{note.category}</Text></View>
                    <View><Text style={[styles.date, { fontSize: this.state.font }]}>{date}</Text></View>
                    <View style={{ flex: 1 }}><Text style={[styles.title, { fontSize: this.state.font }]}>{note.title}</Text></View>
                    <View style={{ flex: 1 }}><Text style={[styles.body, { flexWrap: "wrap", fontSize: this.state.font }]}>{note.body}</Text></View>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={styles.list}
            style={styles.list}
            numColumns={2}
          />
        </View>
      </View>
    )
  }
}

async function deleteItem(note, setNotes) {
  let keyList = JSON.parse(await SecureStore.getItemAsync('notesKeys'))
  await SecureStore.deleteItemAsync(note.key.toString())
  keyList = keyList.filter(n => n !== note.key)
  await SecureStore.setItemAsync('notesKeys', JSON.stringify(keyList))

  getNotes(setNotes)
}

async function getNotes(setNotes) {
  let notesKeys = await SecureStore.getItemAsync('notesKeys')
  if (!notesKeys) notesKeys = []; else notesKeys = JSON.parse(notesKeys);
  const notes = [];
  for (const key of notesKeys) {
    notes.push(JSON.parse(await SecureStore.getItemAsync(key.toString())))
  }
  setNotes(notes);
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  note: {
    width: 160,
    height: 160,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    marginLeft: 30,
  },
  list: {
    // height: 680,
  },
  btn: {
    // borderColor: "red",
    borderWidth: 3,
    textAlign: "center",
    flex: 0,
  },
  ico: {
    width: 200,
    height: 200,
  },
  input: {
    fontSize: 25,
    alignSelf: "center",
    textAlign: "center",
    width: "80%",
    backgroundColor: "darkgrey",
    borderRadius: 8,
    margin: 10,
    height: 60,
  },
  category: {
    backgroundColor: "black",
    // width: "fit-content",
    margin: 10,
    padding: 5,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  date: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "right",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  body: {
    fontSize: 25,
    color: "#FFFFFF"
  },
  txt: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
})

