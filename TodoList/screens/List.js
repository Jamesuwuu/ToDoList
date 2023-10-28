import { useEffect } from 'react';
import React from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Todo from '../components/Todo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './Details';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const NOTES_STORE_KEY = '@notes';

export default function List({navigation, route}) {
  const {title, desc, date, image, listNum, del} = route.params ?? {};
  const [list, setList] = React.useState([]);
  const [sortList, setSortList] = React.useState([]);
  const [sorted, setSorted] = React.useState(false);

  useEffect(() => {if(title || desc || date || image) {
    if (del) {
      setList(
        list.filter(a =>
          a.title != title
        )
      );
    }
    else {
      if (listNum == null) {
        setList((prevList) => [...prevList, {title, desc, date, image}]);
      }
      else {
        editList(listNum);
      }
    }
  } },
  [title, desc, date, image]);

  useEffect(() => {
    const getList = async () => {
      const savedList = await AsyncStorage.getItem(NOTES_STORE_KEY);
      setList(JSON.parse(savedList));
    };
    getList();
  }, []);
  
  useEffect(() => {
    const saveList = async () => {
      await AsyncStorage.setItem(NOTES_STORE_KEY, JSON.stringify(list))
    };
    saveList();
    updateList();
  }, [list])


  function editList(index) {
    const newList = list.map((old, i) => {
      if (index == i) {
        return {title, desc, date, image};
      }
      else {
        return old;
      }
    });
    setList(newList);
  }

  function sortDate() {
    if (!sorted) {
      const newList = list.map((old) => {
        return old;
      });
      newList.sort(function (a,b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      setSortList(newList);
    }
    setSorted(!sorted);
  }

  function updateList() {
    const newList = list.map((old) => {
      return old;
    });
    newList.sort(function (a,b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    setSortList(newList);
  }

  return (
    <View style={styles.container}>
      {
        sorted ?
        sortList.map(({title, desc, date, image}, index) => (
          <Todo title={title} desc={desc} date={date} image={image} navigation={navigation} key={index} listNum={index}/>
        ))
        :
        list.map(({title, desc, date, image}, index) => (
          <Todo title={title} desc={desc} date={date} image={image} navigation={navigation} key={index} listNum={index}/>
        ))
      }
      <Pressable style={styles.button} onPress={() => navigation.navigate("Add Todo")}>
        <Text>Add Todo</Text>
      </Pressable>
      <Pressable style={styles.sortButton} onPress={() => sortDate()}>
        {
          sorted ?  <Text>Unsort</Text> :  <Text>Sort</Text>
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgb(210, 230, 255)',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  sortButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgb(210, 230, 255)',
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
});