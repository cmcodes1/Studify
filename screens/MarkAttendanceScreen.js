import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, FlatList, Alert, ScrollView, RefreshControl, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const defaultState = {
  subjects: [],
  text: "",
  present_count: [0, 0, 0, 0, 0, 0, 0],
  total_count: [0, 0, 0, 0, 0, 0, 0],
  present: 0,
  total: 0
}

function fetchData(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class MarkAttendanceScreen extends Component {
  _isMounted = false;
  
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState,
      refreshing: false,
    }
  }

  present = i => {
    let present_count = [...this.state.present_count];
    present_count[i]++;
    let total_count = [...this.state.total_count];
    total_count[i]++;
    let present = this.state.present;
    present++;
    let total = this.state.total;
    total++;
    this.setState({ present_count, total_count, present, total});
    AsyncStorage.setItem("PRESENT_COUNT", JSON.stringify(present_count));
    AsyncStorage.setItem("TOTAL_COUNT", JSON.stringify(total_count));
    AsyncStorage.setItem("PRESENT", JSON.stringify(present));
    AsyncStorage.setItem("TOTAL", JSON.stringify(total));
  };

  total = i => {
    let total_count = [...this.state.total_count];
    total_count[i]++;
    let total = this.state.total;
    total++;
    this.setState({ total_count, total});
    AsyncStorage.setItem("TOTAL_COUNT", JSON.stringify(total_count));
    AsyncStorage.setItem("TOTAL", JSON.stringify(total));
  };

  resetvalues = () => {
    this.setState({
      ...defaultState,
      subjects: this.state.subjects,
      text: this.state.text
    });
  };

  _onRefresh = () => {
    this.setState({refreshing: true}, () => {
      this.componentDidMount();
    });
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ refreshing: false });
    Subjects.all(subjects => this.setState({ subjects: subjects || [] }));
    AsyncStorage.getItem("PRESENT_COUNT").then((value) => {
      if(value) {
        this.setState({ present_count: JSON.parse(value || this.state.present_count) });
      }
    });
    AsyncStorage.getItem("TOTAL_COUNT").then((value) => {
      if(value) {
        this.setState({ total_count: JSON.parse(value || this.state.total_count) });
      }
    });
    AsyncStorage.getItem("PRESENT").then((value) => {
      if(value) {
        this.setState({ present: JSON.parse(value || this.state.present) });
      }
    });
    AsyncStorage.getItem("TOTAL").then((value) => {
      if(value) {
        this.setState({ total: JSON.parse(value || this.state.total) });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let tick = "\u2713", cross = "\u2573";
    return (
      <View style={styles.container}>
        <>
          {
            (this.state.subjects!="")
            ?
            <FlatList style={styles.list} contentContainerStyle={{paddingBottom: 20}}
              data={this.state.subjects}
              renderItem={({item, index }) => {
                return (
                  <View>
                    <View style={styles.listItemCont}>
                      <Text style={styles.listItem}> { item.text } </Text>
                      <View style={styles.buttonContainer}>
                        <Text style={styles.listItem}>{this.state.present_count[index]} / {this.state.total_count[index]} </Text>
                        <View style={styles.button}>
                          <Button title={tick} onPress={() => this.present(index)} color="limegreen" />
                        </View>
                        <View style={styles.button}>
                          <Button title={cross} onPress={() => this.total(index)} color="red" />
                        </View>
                      </View>
                    </View>
                  </View>
                )
              }}
              keyExtractor={ (item, index) => index.toString()}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
            :
            <ScrollView 
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              <Text style={{marginTop: 250}}>Go to the Subjects tab & add your subjects first.</Text>
            </ScrollView>
          }
        </>
      </View>
    );
  }
}

let Subjects = {
  convertToArrayOfObject(subjects, callback) {
    return callback(
    subjects ? subjects.split("\n").map((subject, i) => ({ key: i, text: subject})) : []
    );
  },
  convertToStringWithSeparators(subjects) {
    return subjects.map(subject => subject.text).join("\n");
  },
  all(callback) {
    return AsyncStorage.getItem("SUBJECTS", (err, subjects) =>
    this.convertToArrayOfObject(subjects, callback)
    );
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    width: "95%"
  },
  listItemCont: {
    marginRight: 5,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    fontSize: 20
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  button: {
    paddingTop: 10,
    paddingLeft: 10,
    width: 50,
    height: 20, 
  }
});