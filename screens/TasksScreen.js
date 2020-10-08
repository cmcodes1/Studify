import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Keyboard, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class TasksScreen extends Component {
  state = {
    tasks: [],
    text: '',
  };

  changeTextHandler = (text) => {
    this.setState({ text: text });
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        (prevState) => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: '',
          };
        },
        () => Tasks.save(this.state.tasks),
      );
    }
  };

  deleteTask = (i) => {
    this.setState(
      (prevState) => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks),
    );
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? 'keyboardDidShow' : 'keyboardWillShow',
      (e) =>
        this.setState({ viewPadding: e.endCoordinates.height + viewPadding }),
    );

    Keyboard.addListener(
      isAndroid ? 'keyboardDidHide' : 'keyboardWillHide',
      () => this.setState({ viewPadding: viewPadding }),
    );

    Tasks.all((tasks) => this.setState({ tasks: tasks || [] }));
  }

  render() {
    let tick = '\u2713';
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) => (
            <View>
              <View style={styles.listItemCont}>
                <Text style={[styles.listItem, { paddingLeft: 5 }]}>
                  {' '}
                  {item.text}{' '}
                </Text>
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <Button
                      title={tick}
                      onPress={() => this.deleteTask(index)}
                      color="#24a0ed"
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput
          style={styles.textInput}
          textAlign={'center'}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Task"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split('||').map((task, i) => ({ key: i, text: task })) : [],
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map((task) => task.text).join('||');
  },
  all(callback) {
    return AsyncStorage.getItem('TASKS', (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback),
    );
  },
  save(tasks) {
    AsyncStorage.setItem('TASKS', this.convertToStringWithSeparators(tasks));
  },
};

const isAndroid = Platform.OS == 'android';
const viewPadding = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    width: '95%',
  },
  listItemCont: {
    marginRight: 5,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  button: {
    width: 40,
  },
  textInput: {
    fontSize: 25,
    height: 50,
    width: '90%',
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: isAndroid ? 0 : 1,
    justifyContent: 'flex-end',
  },
});
