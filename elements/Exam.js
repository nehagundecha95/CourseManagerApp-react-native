import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, ListItem, ButtonGroup, Button} from 'react-native-elements'
import ExamService from "../services/ExamService";

export default class Exam extends Component {
    static navigationOptions = {title: 'Exam '}
    constructor(props) {
        super(props)
        this.state = {
            lessonId: '',
            widgets: []
        }
        this.createNewExam = this.createNewExam.bind(this);
        this.ExamService = ExamService.instance;
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        this.setState({
            lessonId: lessonId
        })
        fetch("http://10.0.0.138:8080/api/lesson/" + lessonId + "/exam")
            .then(response => (response.json()))
            .then(widgets => (
                // console.log("here:", widgets);
                this.setState({widgets: widgets})
            ))
    }
    componentWillReceiveProps(){
        fetch("http://10.0.0.138:8080/api/lesson/" + this.state.lessonId + "/exam")
            .then(response => (response.json()))
            .then(widgets => (
                // console.log("here:", widgets);
                this.setState({widgets: widgets})
            ))
    }

    createNewExam(){
        console.log("state:",this.state.widgets)
    }
    render() {

        return(
            <View style={{padding: 15}}>
                {this.state.widgets.map((widget, index) => (
                    <ListItem
                        onPress={() => {
                            {console.log("widgetId:",widget.id)}
                            this.props.navigation.navigate("ExamWidget", {examId: widget.id})
                        }}
                        key={index}
                        subtitle={widget.description}
                        title={widget.title}/>))}
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("CreateNewExamWidget", {lessonId: this.state.lessonId})
                    }}
                    title = "Create new Exam"/>
                }}
            </View>
        )
    }
}







// import React, {Component} from 'react'
// import {View} from 'react-native'
// import {ListItem, Text} from 'react-native-elements'
//
// const questions = [
//   {	title: 'Question 1', subtitle: 'Multiple choice',
//     icon: 'list'},
//   {	title: 'Question 2', subtitle: 'Fill-in the blanks',
//     icon: 'code'},
//   {	title: 'Question 3', subtitle: 'True or false',
//     icon: 'check'},
//   {	title: 'Question 4', subtitle: 'Essay',
//     icon: 'subject'}]
//
// export default class Exam extends Component {
//   render() {
//     return(
//       <View style={{padding: 15}}>
//         <Text h2>Lists</Text>
//         {questions.map( (question, index) => (
//           <ListItem
//             key={index}
//             leftIcon={{name: question.icon}}
//             subtitle={question.subtitle}
//             title={question.title}/>
//         ))}
//       </View>
//     )
//   }
// }