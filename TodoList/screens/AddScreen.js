import { StyleSheet, Text, View, Button, TextInput, Image, Switch } from 'react-native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function AddScreen({navigation}) {
  const [title, onChangeTitle] = React.useState('');
  const [desc, onChangeDesc] = React.useState('');
  const [image, onChangeImage] = React.useState(null);
  const [dateDate, setDate] = React.useState(new Date);
  const [date, setDateString] = React.useState('');

  const [isEnabled, setIsEnabled] = React.useState(false);

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

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) {
      showDatePicker();
    }
  };

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setDateString(currentDate.toLocaleDateString());
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
      <View style={styles.dateContainer}>
        <Text>Date</Text>
        {isEnabled && <Text>{date}</Text>}
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {
        image ? <Button title="Change image" onPress={pickImage}></Button> : <Button title="Add image" onPress={pickImage}></Button>
      }
      <Button 
        title='Create Todo'
        onPress={() => navigation.navigate("Todo List", {title, desc, date, image})}
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