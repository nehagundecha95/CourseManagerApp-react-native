import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamService from "../services/ExamService";

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props)
    this.state = {
      questionId: '',
      title: '',
      description: '',
      points: 0,
      isTrue: true

    }
      if(this.props.navigation.getParam("questionId")!==undefined){
          const questionId = this.props.navigation.getParam("questionId");
          fetch("http://10.0.0.138:8080/api/truefalse/"+questionId)
              .then(response => (response.json()))
              .then(trueFalseQuestion => {this.setState({title: trueFalseQuestion.title})
                  this.setState({description: trueFalseQuestion.description})
                  this.setState({points: trueFalseQuestion.points})
                  this.setState({isTrue: trueFalseQuestion.isTrue})})
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
      console.log(newState);
      // this.setTrueFalseQuestion();
  }


  createNewTrueFalseQuestion(){
      this.ExamService.createTrueFalseQuestion(
          this.state.title,
          this.state.description,
          this.state.points,
          this.state.isTrue,
          this.state.questionId)
          .then(console.log("created truefalse question"));
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
           Points is required
        </FormValidationMessage>

        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                  checked={this.state.isTrue} title='The answer is true'/>

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={()=>{this.createNewTrueFalseQuestion();
                     this.props.navigation.navigate("ExamWidget",{questionId: this.state.questionId})}}/>
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

export default TrueFalseQuestionEditor