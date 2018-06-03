import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      lessonId: '',
      widgets: []

    }
  }
  componentDidMount() {
    // const {navigation} = this.props;
    const lessonId = this.props.navigation.getParam("lessonId", 1)
      this.setState({
          lessonId: lessonId
      })
    fetch("http://10.0.0.138:8080/api/lesson/"+lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => {console.log("here:",widgets);this.setState({widgets: widgets})})
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.widgets.map((widget, index) => (
          <ListItem
              onPress={() => {
                  if(widget.dtype === "Assignment")
                      this.props.navigation
                          .navigate("Assignment", {assignmentId: widget.id})
                  if(widget.dtype === "Exam")
                      this.props.navigation
                          .navigate("QuestionList", {examId: widget.id})
              }}
            // onPress={() => this.props.navigation.navigate("QuestionList", {examId: widget.id})}
            key={index}
            subtitle={widget.description}
            title={widget.text}/>))}
      </View>
    )
  }
}
export default WidgetList