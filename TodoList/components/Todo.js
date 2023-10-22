import { StyleSheet, Text, View, Button, Pressable, Image } from 'react-native';

const del = true;

export default function Todo({title, desc, date, image, navigation, listNum}) {
  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate("Details", {title, desc, date, image, listNum})}>
      <View style={styles.verticalContainer}>
        <View style={styles.todoContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {
            image ? <Text style={styles.header}>{title}</Text> : <Text style={styles.header2}>{title}</Text>
          }
        </View>
        {date && <Text style={styles.date}>{date}</Text>}
      </View>
      <Pressable style={styles.completeButton}  onPress={() => navigation.navigate("Todo List", {title, desc, listNum, del})}>
      </Pressable>
    </Pressable>
  );

  
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 0,
    marginTop: 20,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  header: {
    fontSize: 24,
  },
  header2: {
    marginLeft: 70,
    fontSize: 24,
  },
  date: {
    marginLeft: 70,
  },
  todoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  verticalContainer: {
    gap: 10,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  completeButton: {
    borderRadius: 50,
    borderWidth: 0.5,
    width: 20,
    height: 20,
    right: 0,
    position: 'absolute',
  }
})
