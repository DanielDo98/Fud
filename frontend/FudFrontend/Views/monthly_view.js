import React from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { styles } from '../Styles/styles'
import CalendarPicker from 'react-native-calendar-picker';
import * as Progress from 'react-native-progress';
import { API_PATH } from '../assets/constants'
import {
  Button,
  Card,
  Input,
  ListItem,
  Overlay,
  Slider,
} from 'react-native-elements'

/*
This view is a Calendar view that lets the user look at their meal plan for any
given day.

TODO:
Integrate with backend via API calls to actually fetch the user history, as
opposed to using hard-coded model data.
*/

// HARD CODED DATA
// THIS SHOULD EVENTUALLY COME FROM OUR API
const DATA = [
  {
    date: '2020-02-02',
    protein: 88,
    carbs: 85,
    fat: 100,
  },
  {
    date: '2020-01-26',
    protein: 100,
    carbs: 200,
    fat: 120,
  },
  {
    date: '2020-01-09',
    protein: 112,
    carbs: 205,
    fat: 100,
  },
  {
    date: '2020-01-12',
    protein: 0,
    carbs: 25,
    fat: 69,
  },
];


function Day_Component({
  date,
  protein,
  carbs,
  fat,
  meal_button_async
}) {
  var protein_progress = protein / 175
  var carb_progress = carbs / 135
  var fat_progress = fat / 135

  return (
    <TouchableHighlight
      style={styles.info_item}
      onPress={meal_button_async}
    >
      <View>
        <Text style={styles.title}>Week of {date}</Text>
        <Text style={styles.detail}>Protein: {protein}/175 g</Text>
        <Progress.Bar progress={protein_progress} width={null} height={8} color={'white'}/>
        <Text style={styles.detail}>Carbs: {carbs}/135 g</Text>
        <Progress.Bar progress={carb_progress} width={null} height={8} color={'white'}/>
        <Text style={styles.detail}>Fat: {fat}/135 g</Text>
        <Progress.Bar progress={fat_progress} width={null} height={8} color={'white'}/>
      </View>
    </TouchableHighlight>
  );
}


export class MonthScreen extends React.Component {
  constructor(props) {
    super(props);

    let curr_date = (new Date()).toISOString().slice(0, 10);

    this.state = {
      selectedDate: curr_date,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.viewMeals = this.viewMeals.bind(this);
  }

  onDateChange = async(date) => {
    let curr_date = date.toISOString().slice(0, 10);
    await this.setState({
      selectedDate: curr_date,
    });
  }

  viewMeals = async () => {
    this.props.navigation.navigate('Home', {date: this.state.selectedDate});
  }

  static navigationOptions = {
    title: 'Your monthly progress',
  };

  render() {
    const { selectedDate } = this.state;
    const startDate = selectedDate ? selectedDate.toString() : '';
    return (
      <SafeAreaView style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
          selectedDayColor="#3b821b"
          selectedDayTextColor="#ffffff"
        />

        <Button
          title={`View Meals: ${this.state.selectedDate}`}
          onPress={this.viewMeals}
          buttonStyle={styles.nav_button}
          titleStyle={styles.nav_text}
        />

      </SafeAreaView>
    );
  }
}
