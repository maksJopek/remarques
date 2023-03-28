import * as React from "react"
import { Image, Alert, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import icon from "../assets/pencil-circle.png"
import iIcon from "../assets/i.png"
import cIcon from "../assets/text-plus-icon.png"
import plusIcon from "../assets/plus.png"
import newIcon from "../assets/new-icon.png"

export default function DrawerContent(props) {
  window.navigation = props.navigation
  return (
    <DrawerContentScrollView {...props}>
      <Image source={icon} style={styles.topImg} />
      <DrawerItem
        label="Notes list"
        icon={() => <Image source={newIcon} style={styles.icon} />}
        onPress={() => props.navigation.navigate("notesList")}
      />
      <DrawerItem
        label="Add note"
        icon={() => <Image source={plusIcon} style={styles.icon} />}
        onPress={() => props.navigation.navigate("addNote")}
      />
      <DrawerItem
        label="Add category"
        icon={() => <Image source={cIcon} style={styles.icon} />}
        onPress={() => props.navigation.navigate("addCategory")}
      />
      <DrawerItem
        label="Info"
        icon={() => <Image source={iIcon} style={styles.icon} />}
        onPress={() => Alert.alert("Alert", "Alerting from best note app, version 2.0")}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  topImg: { width: 100, height: 100, margin: 30, alignSelf: "center" },
  icon: { width: 30, height: 30 },
})
