import 'react-native-gesture-handler';
import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark, faNewspaper, faFileAlt, faCheck, faUser, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import MarkAttendanceScreen from './screens/MarkAttendanceScreen';
import TimeTableScreen from './screens/TimeTableScreen';
import SubjectsScreen from './screens/SubjectsScreen';
import TasksScreen from './screens/TasksScreen';
import ConcentrateScreen from './screens/ConcentrateScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const MarkAttendanceStack = createStackNavigator();
const TimeTableStack = createStackNavigator();
const SubjectsStack = createStackNavigator();
const TasksStack = createStackNavigator();
const ConcentrateStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function MarkAttendanceStackScreen() {
  return (
    <MarkAttendanceStack.Navigator>
      <MarkAttendanceStack.Screen name="Mark Attendance" component={MarkAttendanceScreen} />
    </MarkAttendanceStack.Navigator>
  );
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
                style={{ paddingRight: 5 }}
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

function TasksStackScreen() {
  return (
    <TasksStack.Navigator>
      <TasksStack.Screen name="Tasks" component={TasksScreen} />
    </TasksStack.Navigator>
  );
}

function ConcentrateStackScreen() {
  return (
    <ConcentrateStack.Navigator>
      <ConcentrateStack.Screen name="Concentrate" component={ConcentrateScreen} />
    </ConcentrateStack.Navigator>
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
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Profile"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            if (route.name === 'Attendance') {
              return (<FontAwesomeIcon icon={faBookmark} size={22} color={color} />);
            } else if (route.name === 'Subjects') {
              return <FontAwesomeIcon icon={faFileAlt} size={22} color={color} />;
            } else if (route.name === 'Time Table') {
              return (<FontAwesomeIcon icon={faNewspaper} size={33} color={color} />);
            } else if (route.name === 'Tasks') {
              return <FontAwesomeIcon icon={faCheck} size={22} color={color} />;
            } else if (route.name === 'Concentrate') {
              return <FontAwesomeIcon icon={faHeadphones} size={22} color={color} />;
            } else if (route.name === 'Profile') {
              return <FontAwesomeIcon icon={faUser} size={22} color={color} />;
            }
          },
        })}
        tabBarOptions={{ activeTintColor: '#24a0ed', inactiveTintColor: 'gray' }}
      >
        <Tab.Screen name="Attendance" component={MarkAttendanceStackScreen} />
        <Tab.Screen name="Subjects" component={SubjectsStackScreen} />
        <Tab.Screen name="Time Table" component={TimeTableStackScreen} />
        <Tab.Screen name="Tasks" component={TasksStackScreen} />
        <Tab.Screen name="Concentrate" component={ConcentrateStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
