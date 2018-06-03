import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: ''
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
      this.setState({
          examId: examId
      })

    fetch("http://10.0.0.138:8080/api/exam/"+examId+"/question")//is this an error in something you typed? no! Im accessing the widgets. Thats where the problem is, but
      .then(response => (response.json()))
      .then(questions => this.setState({questions: questions}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.questions.map((question) => (
          <ListItem
            onPress={() => {
              if(question.type === "TrueFalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionEditor", {questionId: question.id})
              if(question.type === "MultipleChoice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
            }}
            key={index}
            subtitle={question.description}
            title={question.title}/>))}
      </View>
    )
  }
}
export default QuestionList