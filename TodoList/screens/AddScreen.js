import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function AddScreen({navigation}) {
  const [title, onChangeTitle] = React.useState('');
  const [desc, onChangeDesc] = React.useState('');
  const [image, onChangeImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChangeImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput 
          style={styles.inputTop} 
          placeholder="Title"
          onChangeText={onChangeTitle}
          />
        <TextInput 
          style={styles.inputBot}
          editable
          placeholder="Description"
          multiline
          numberOfLines={4}
          onChangeText={onChangeDesc}
          />
      </View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {
        image ? <Button title="Change image" onPress={pickImage}></Button> : <Button title="Add image" onPress={pickImage}></Button>
      }
      <Button 
        title='Create Todo'
        onPress={() => navigation.navigate("Todo List", {title, desc, image})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },
  inputTop: {
    height: 40,
    borderBottomWidth: 0.5,
    padding: 10,
    width: '90%',
  },
  inputBot: {
    height: 40,
    padding: 10,
    width: '90%',
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
});