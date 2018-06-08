import React from 'react'
import {View, Alert, StyleSheet, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends React.Component {
  static navigationOptions = {title: 'Courses'}
  constructor(props) {
    super(props)
    fetch('http://localhost:8080/api/course')
      .then(response => (response.json()))
      .then(courses => {
        // console.log(courses)
        this.setState({courses: courses})
      })
    this.state = {
      courses: []
    }
  }

  render() {
    return(
        <ScrollView>
      <View style={{padding: 15}}>
        {this.state.courses.map((course, index) => (
          <ListItem
            onPress={() => this.props.navigation.navigate("ModuleList", {courseId: course.id})}
            title={course.title}
            key={index}/>
        ))}
      </View>
        </ScrollView>
    )
  }
}
export default CourseList

