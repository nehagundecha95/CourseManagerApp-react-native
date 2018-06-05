import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class LessonList extends Component {
  static navigationOptions = {title: 'Lessons'}
  constructor(props) {
    super(props)
    this.state = {
        courseId: '',
        moduleId: '',
        lessons: []

    }
  }
  componentDidMount() {
    // const {navigation} = this.props;
    const courseId = this.props.navigation.getParam("courseId", 1);
    const moduleId = this.props.navigation.getParam("moduleId", 1);
    this.setState({
        courseId: courseId,
        moduleId: moduleId
    });
    fetch('http://10.0.0.138:8080/api/course/'+courseId+'/module/'+moduleId+'/lesson')
      .then(response => (response.json()))
      .then(lessons => this.setState({lessons: lessons}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.lessons.map(
        (lesson, index) => (
          <ListItem
            onPress={() => this.props.navigation.navigate("Widget", {lessonId: lesson.id})}
            key={index}
            title={lesson.title}/>))}
      </View>
    )
  }
}
export default LessonList