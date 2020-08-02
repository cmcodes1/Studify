import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SubjectsScreen extends Component {
  state = {
    subjects: [],
    text: '',
  };

  changeTextHandler = (text) => {
    this.setState({text: text});
  };

  addSubject = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        (prevState) => {
          let {subjects, text} = prevState;
          return {
            subjects: subjects.concat({key: subjects.length, text: text}),
            text: '',
          };
        },
        () => Subjects.save(this.state.subjects),
      );
    }
  };

  deleteSubject = (i) => {
    this.setState(
      (prevState) => {
        let subjects = prevState.subjects.slice();

        subjects.splice(i, 1);

        return {subjects: subjects};
      },
      () => Subjects.save(this.state.subjects),
    );
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? 'keyboardDidShow' : 'keyboardWillShow',
      (e) =>
        this.setState({viewPadding: e.endCoordinates.height + viewPadding}),
    );

    Keyboard.addListener(
      isAndroid ? 'keyboardDidHide' : 'keyboardWillHide',
      () => this.setState({viewPadding: viewPadding}),
    );

    Subjects.all((subjects) => this.setState({subjects: subjects || []}));
  }

  render() {
    let cross = '\u2573';
    return (
      <View style={[styles.container, {paddingBottom: this.state.viewPadding}]}>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          style={styles.list}
          data={this.state.subjects}
          renderItem={({item, index}) => (
            <View>
              <View style={styles.listItemCont}>
                <Text style={[styles.listItem, {paddingLeft: 5}]}>
                  {' '}
                  {item.text}{' '}
                </Text>
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <Button
                      title={cross}
                      onPress={() => this.deleteSubject(index)}
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
          onSubmitEditing={this.addSubject}
          value={this.state.text}
          placeholder="Add Subject"
          returnKeyType="done"
          returnKeyLabel="done"></TextInput>
      </View>
    );
  }
}

let Subjects = {
  convertToArrayOfObject(subjects, callback) {
    return callback(
      subjects
        ? subjects.split('\n').map((subject, i) => ({key: i, text: subject}))
        : [],
    );
  },
  convertToStringWithSeparators(subjects) {
    return subjects.map((subject) => subject.text).join('\n');
  },
  all(callback) {
    return AsyncStorage.getItem('SUBJECTS', (err, subjects) =>
      this.convertToArrayOfObject(subjects, callback),
    );
  },
  save(subjects) {
    AsyncStorage.setItem(
      'SUBJECTS',
      this.convertToStringWithSeparators(subjects),
    );
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
    shadowOffset: {width: 0, height: 2},
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
