import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
// import WidgetTypePicker from "../elements/WidgetTypePicker";

export default class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      lessonId: '',
      widgets: [],
      widgetType: ''

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

          {/*list of all widgets*/}
      {this.state.widgets.map((widget, index) => (

          <ListItem
              onPress={() => {
                // console.log("--", widget);
                  if(widget.widgetType === "Exam")
                      this.props.navigation
                          .navigate("QuestionList", {examId: widget.id})
                  if(widget.widgetType === "Assignment")
                      this.props.navigation
                          .navigate("Assignment", {assignmentId: widget.id})

              }}
            // onPress={() => this.props.navigation.navigate("QuestionList", {examId: widget.id})}
            key={index}
            subtitle={widget.description}
            title={widget.text}/>))}

          <Text h4>Create new widget</Text>
          <Picker
              onValueChange={(itemValue, itemIndex) =>
                  this.setState({widgetType: itemValue})}
              selectedValue={this.state.widgetType}>
              <Picker.Item value="Exam" label="Exam" />
              <Picker.Item value="Assignment" label="Assignment" />
          </Picker>
          <Text>{this.state.widgetType}</Text>
          <Button
              onPress={() => {
                  // console.log("--", widget);
                  if(this.state.widgetType === 'Exam')
                      this.props.navigation
                          .navigate("ExamWidget",{lessonId: this.state.lessonId})
                  if(this.state.widgetType === 'Assignment')
                      this.props.navigation
                          .navigate("AssignmentWidget",{lessonId: this.state.lessonId})

              }}

              title = "click here"/>

      </View>)

  }}
