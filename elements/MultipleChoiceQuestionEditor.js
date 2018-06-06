import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, Button, CheckBox, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamService from "../services/ExamService";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class MultipleChoiceQuestionEditor extends React.Component {
  static navigationOptions = { title: "Multiple Choice"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      options: [],
      examId: '',
      questionId: '',
      hiddenUpdateBtn: false,
      createOption: '',
      option: '',
      correctOption: ''

    }
      if(this.props.navigation.getParam("questionId")!==undefined){
          const questionId = this.props.navigation.getParam("questionId");
          fetch("http://10.0.0.138:8080/api/multi/"+questionId)
              .then(response => (response.json()))
              .then(MultipleChoiceQuestion => {
                  this.setState({hiddenUpdateBtn: true});
                  this.setState({title: MultipleChoiceQuestion.title})
                  this.setState({description: MultipleChoiceQuestion.description})
                  this.setState({points: MultipleChoiceQuestion.points})
                  this.setState({options: MultipleChoiceQuestion.options})
                  this.setState({correctOption: MultipleChoiceQuestion.correctOption})

              })
      }
      this.ExamService = ExamService.instance;
      this.deleteRadioBtn = this.deleteRadioBtn.bind(this);
      this.setCorrectOption = this.setCorrectOption.bind(this);
      this.createNewOption = this.createNewOption.bind(this);
  }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        this.setState({
            examId: examId
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
            this.state.correctOption,
            this.state.examId)
            .then(console.log("created multiple choice question"));
  }
  createNewOption(){
      var temp = this.state.options
      temp.push(this.state.option)
      this.setState({options: temp})
      // this.setState({options: this.state.option})
      console.log(this.state.options)
  }
    deleteRadioBtn(index){
      console.log("delete")
      var temp = this.state.options;
        console.log(temp);
      temp.splice(index, 1);
        console.log(temp);
      this.setState({options: temp})

    }
    setCorrectOption(index){
      console.log("correct option:",index)
      this.setState({correctOption: index})
    }



  render() {
      var radio_props = [
          {label: this.state.option, value: 0 }
      ];
    return(
        <ScrollView>
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

                <FormLabel>Options</FormLabel>
                <FormInput onChangeText={
                      text => this.updateForm({option: text})
                  }/>
                  <Button style={styles.buttons} title="Create new Option"
                  onPress={()=>{this.createNewOption()
                  console.log("options:",this.state.options)}}/>



                <Button	backgroundColor="green"
                         color="white"
                         title="Save"
                         style={styles.buttons}
                         onPress={()=>{this.createNewMultipleChoiceQuestion();
                             this.props.navigation.navigate("ExamWidget",{examId: this.state.questionId})}}/>

                  {this.state.hiddenUpdateBtn &&
                  <Button backgroundColor="blue"
                          color="white"
                          title="Edit"
                          style={styles.buttons}
                          onPress={() => {
                              // this.updateMultiChoiceQuestionQuestion();
                              this.props.navigation.navigate("ExamWidget", {examId: this.state.questionId})
                          }}/>
                  }

                  <Button backgroundColor="red"
                             color="white"
                             title="Cancel"
                             style={styles.buttons}
                             onPress={() => {
                                 this.props.navigation.navigate("ExamWidget", {examId: this.state.questionId})
                             }}/>

                <Text h3>Preview</Text>
                  <View style={styles.previewSection}>

                      <Text h4>{this.state.title}</Text>
                      <Text style={{textAlign: 'right'}} h4>{this.state.points} pts</Text>
                      <Text>{this.state.description}</Text>
                      <RadioGroup onSelect={(index)=>this.setCorrectOption(index)}>
                          {this.state.options.map((option, index)=> (

                              <RadioButton key={index}>
                                  <View style={{flexDirection: 'row'}}>
                                      <Text h4>
                                          {option}
                                      </Text>
                                      <Button title="Delete" onPress={()=>{this.deleteRadioBtn(index)}}/>
                                  </View>
                              </RadioButton>

                          ))}
                      </RadioGroup>

                  </View>



                  {/**/}
                {/*<Text h2>{this.state.title}</Text>*/}
                {/*<Text>{this.state.description}</Text>*/}
                {/*/!*<Text>{this.state.options}</Text>*!/*/}


              </View>
        </ScrollView>
    )
  }
}

export default MultipleChoiceQuestionEditor

const styles = StyleSheet.create({
    buttons:{
        margin: 5
    },
    previewSection:{
        padding: 15,
        borderWidth: 1,
        margin: 5

    },
    previewHeader: {
        marginTop: 20,
        margin: 5
    }
});