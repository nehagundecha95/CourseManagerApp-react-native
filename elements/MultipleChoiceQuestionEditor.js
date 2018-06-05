import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamService from "../services/ExamService";

class MultipleChoiceQuestionEditor extends React.Component {
  static navigationOptions = { title: "Multiple Choice"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      options: ''
    }
      if(this.props.navigation.getParam("questionId")!==undefined){
          const questionId = this.props.navigation.getParam("questionId");
          fetch("http://10.0.0.138:8080/api/multi/"+questionId)
              .then(response => (response.json()))
              .then(MultipleChoiceQuestion => {this.setState({title: MultipleChoiceQuestion.title})
                  this.setState({description: MultipleChoiceQuestion.description})
                  this.setState({points: MultipleChoiceQuestion.points})
                  this.setState({options: MultipleChoiceQuestion.options})})
      }
      this.ExamService = ExamService.instance;
  }
    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.setState({
            questionId: questionId
        })
    }
  updateForm(newState) {
    this.setState(newState)
  }
    createNewMultipleChoiceQuestion(){
        this.ExamService.createMultipleChoiceQuestion(
            this.state.title,
            this.state.description,
            this.state.points,
            this.state.options,
            this.state.questionId)
            .then(console.log("created multiple choice question"));
    }
  render() {
    return(
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput value={this.state.title} onChangeText={
          text => this.updateForm({title: text})
        }/>
        <FormValidationMessage>
          Title is required
        </FormValidationMessage>

        <FormLabel>Description</FormLabel>
        <FormInput value={this.state.description} onChangeText={
          text => this.updateForm({description: text})
        }/>
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

          <FormLabel>Points</FormLabel>
          <FormInput value={this.state.points.toString()} onChangeText={
              text => this.updateForm({points: text})
          }/>
          <FormValidationMessage>
              Description is required
          </FormValidationMessage>

        <FormLabel>Choices</FormLabel>
        <FormInput value={this.state.options} onChangeText={
          text => this.updateForm({options: text})
        }/>

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={()=>this.createNewMultipleChoiceQuestion()}/>

        <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>{this.state.description}</Text>

      </View>
    )
  }
}

export default MultipleChoiceQuestionEditor