import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function Details({navigation, route}) {
  const [title, onChangeTitle] = React.useState(route.params.title);
  const [desc, onChangeDesc] = React.useState(route.params.desc);
  const [image, onChangeImage] = React.useState(route.params.image);
  const [date, onChangeDateString] = React.useState(route.params.date);
  const [dateDate, setDate] = React.useState(new Date);

  const listNum = route.params.listNum;
  const del = true;
  console.log(listNum);

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

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    onChangeDateString(currentDate.toLocaleDateString());
  }

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: dateDate,
      onChange: changeDate,
      mode: 'date',
    })
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput 
          style={styles.inputTop} 
          placeholder="Title"
          value={title}
          onChangeText={onChangeTitle}
          />
        <TextInput 
          style={styles.inputBot}
          editable
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={desc}
          onChangeText={onChangeDesc}
          />
      </View>
      <View style={styles.dateContainer}>
        <Text>Date</Text>
        {date && <Text>{date}</Text>}
        <Button onPress={showDatePicker} title="Change Date"></Button>
      </View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button 
        title='Change Image'
        onPress={pickImage}
      />
      <Button 
        title='Save'
        onPress={() => navigation.navigate("Todo List", {title, desc, date, image, listNum})}
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
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingLeft: 25,
    backgroundColor: 'white',
    borderRadius: 10,

  }
});