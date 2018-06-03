import React from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends React.Component {
  static navigationOptions = {title: 'Courses'}
  constructor(props) {
    super(props)
    fetch('http://10.0.0.138:8080/api/course')
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
      <View style={{padding: 15}}>
        {this.state.courses.map((course, index) => (
          <ListItem
            onPress={() => this.props.navigation.navigate("ModuleList", {courseId: course.id})}
            title={course.title}
            key={index}/>
        ))}
      </View>
    )
  }
}
export default CourseList