import 'react-native-gesture-handler';
import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBookmark,
  faNewspaper,
  faFileAlt,
  faCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Login from './screens/Login';
import MarkAttendanceScreen from './screens/MarkAttendanceScreen';
import TimeTableScreen from './screens/TimeTableScreen';
import SubjectsScreen from './screens/SubjectsScreen';
import ToDoListScreen from './screens/ToDoListScreen';
import ProfileScreen from './screens/ProfileScreen';
const Tab = createBottomTabNavigator();
const LoginStack = createStackNavigator();
const MarkAttendanceStack = createStackNavigator();
const TimeTableStack = createStackNavigator();
const SubjectsStack = createStackNavigator();
const ToDoListStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function Stackfortabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name === 'Attendance') {
            return (
              <FontAwesomeIcon icon={faBookmark} size={25} color={color} />
            );
          } else if (route.name === 'Subjects') {
            return <FontAwesomeIcon icon={faFileAlt} size={25} color={color} />;
          } else if (route.name === 'Time Table') {
            return (
              <FontAwesomeIcon icon={faNewspaper} size={33} color={color} />
            );
          } else if (route.name === 'To Do List') {
            return <FontAwesomeIcon icon={faCheck} size={25} color={color} />;
          } else if (route.name === 'Profile') {
            return <FontAwesomeIcon icon={faUser} size={25} color={color} />;
          }
        },
      })}
      tabBarOptions={{activeTintColor: '#24a0ed', inactiveTintColor: 'gray'}}>
      <Tab.Screen name="Attendance" component={MarkAttendanceStackScreen} />
      <Tab.Screen name="Subjects" component={SubjectsStackScreen} />
      <Tab.Screen name="Time Table" component={TimeTableStackScreen} />
      <Tab.Screen name="To Do List" component={ToDoListStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

class MarkAttendanceStackScreen extends MarkAttendanceScreen {
  _onItemPressed() {
    this.resetvalues();
  }
  render() {
    return (
      <MarkAttendanceStack.Navigator>
        <MarkAttendanceStack.Screen
          name="Mark Attendance"
          component={MarkAttendanceScreen}
          options={{
            headerRight: () => (
              <Button
                style={{paddingRight: 5}}
                onPress={this._onItemPressed.bind(this)}
                title="Reset"
                color="#24a0ed"
              />
            ),
          }}
        />
      </MarkAttendanceStack.Navigator>
    );
  }
}

class TimeTableStackScreen extends TimeTableScreen {
  _onItemPressed() {
    this.chooseFile();
  }
  render() {
    return (
      <TimeTableStack.Navigator>
        <TimeTableStack.Screen
          name="Time Table"
          component={TimeTableScreen}
          options={{
            headerRight: () => (
              <Button
                style={{paddingRight: 5}}
                onPress={this._onItemPressed.bind(this)}
                title="Update"
                color="#24a0ed"
              />
            ),
          }}
        />
      </TimeTableStack.Navigator>
    );
  }
}

function SubjectsStackScreen() {
  return (
    <SubjectsStack.Navigator>
      <SubjectsStack.Screen name="Subjects" component={SubjectsScreen} />
    </SubjectsStack.Navigator>
  );
}

function ToDoListStackScreen() {
  return (
    <ToDoListStack.Navigator>
      <ToDoListStack.Screen name="To Do List" component={ToDoListScreen} />
    </ToDoListStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  const isLoggedIn = true;
  return (
    <NavigationContainer>
      <LoginStack.Navigator>
        {isLoggedIn ? (
          <LoginStack.Screen
            name="Studify"
            component={Stackfortabs}
            options={{headerShown: false}}
          />
        ) : (
          <LoginStack.Screen name="Login" component={Login} />
        )}
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}
