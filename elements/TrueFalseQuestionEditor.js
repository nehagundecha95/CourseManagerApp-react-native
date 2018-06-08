import React from 'react'
import {View, StyleSheet, ScrollView, Alert} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamService from "../services/ExamService";

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False Question"}
  constructor(props) {
    super(props)
    this.state = {
      questionId: '',
      title: 'True False',
      description: '',
      points: 0,
      isTrue: true,
      hiddenUpdateBtn: false,
      examId: '',
        hiddenSaveBtn: true

    }
      if(this.props.navigation.getParam("questionId")!==undefined){
          const questionId = this.props.navigation.getParam("questionId");
          fetch("http://localhost:8080/api/truefalse/"+questionId)
              .then(response => (response.json()))
              .then(trueFalseQuestion => {
                  this.setState({hiddenUpdateBtn: true});
                  this.setState({title: trueFalseQuestion.title});
                  this.setState({description: trueFalseQuestion.description});
                  this.setState({points: trueFalseQuestion.points});
                  this.setState({isTrue: trueFalseQuestion.isTrue})
                  this.setState({questionId: questionId})
                  this.setState({hiddenSaveBtn: false})
              })
      }

      this.ExamService = ExamService.instance;
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
      console.log(newState);
      // this.setTrueFalseQuestion();
  }

    updateTrueFalseQuestion(){
      console.log("update true false question");
        console.log(this.props.navigation.state.params)
        this.ExamService.updateTrueFalseQuestion(
            this.state.title,
            this.state.description,
            this.state.points,
            this.state.isTrue,
            this.state.questionId)
            .then(response =>{
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack();
            });

    }


  createNewTrueFalseQuestion(){

      console.log(this.props.navigation.state.params)
      this.ExamService.createTrueFalseQuestion(
          this.state.title,
          this.state.description,
          this.state.points,
          this.state.isTrue,
          this.state.examId)
          .then(response =>{
          this.props.navigation.state.params.refresh();
          this.props.navigation.goBack();
      });
  }
    delete(){
        this.ExamService.deleteTrueFalseQuestion(this.state.questionId);
    }

  render() {
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
           Points is required
        </FormValidationMessage>

        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                  checked={this.state.isTrue} title='The answer is true'/>

          {this.state.hiddenSaveBtn &&
          <Button backgroundColor="#148C0A"
                  color="white"
                  title="Save"
                  style={styles.buttons}
                  onPress={() => {
                      Alert.alert('Created new true false question');
                      this.createNewTrueFalseQuestion();
                      this.props.navigation.navigate("ExamWidget", {examId: this.state.examId})
                  }}/>
          }

          {this.state.hiddenUpdateBtn &&
          <Button backgroundColor="#148C0A"
                  color="white"
                  title="Edit"
                  style={styles.buttons}
                  onPress={() => {
                      Alert.alert('Updated true false question');
                      this.updateTrueFalseQuestion();
                      this.props.navigation.navigate("ExamWidget", {examId: this.state.examId})
                  }}/>
          }
          {this.state.hiddenUpdateBtn &&
          <Button style={styles.buttons} backgroundColor="#CD2704"
                  color="white"
                  title="Delete"
                  onPress={() => {
                      Alert.alert(
                          'Delete',
                          'Are you sure you want to delete this question?',
                          [
                              {text: 'Yes', onPress: () => {this.delete();
                                      this.props.navigation.navigate("ExamWidget", {examId: this.state.examId})}},
                              {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
                          ],
                          { cancelable: false }
                      )


                  }}/>
          }


          <Button	backgroundColor="#89868E"
                 color="white"
                 title="Cancel"
                   style={styles.buttons}
                   onPress={() => {
                       this.props.navigation.navigate("ExamWidget", {examId: this.state.examId})
                   }}/>

        <Text style={styles.previewHeader} h3>Preview</Text>


          <View style={styles.previewSection}>

              <View flexWrap={'wrap'} style={styles.previewSectionHeader}>
                  <Text style={{margin: 10, color: '#EBE8E7',fontSize: 25}} h4>{this.state.title}</Text>
                  <Text style={{textAlign: 'right',margin: 10, color: '#EBE8E7',fontSize: 25}} h4>{this.state.points} pts</Text>
              </View>
              <View style={styles.previewSectioninside}>
                  <Text style={{fontSize: 20,marginBottom: 20}}>{this.state.description}</Text>
                  <CheckBox title='True'/>
                  <CheckBox title='False'/>
              </View>
              <View style={{flex:1, flexDirection:'row', margin: 10}}>
                  <Button backgroundColor="#89868E" title="Cancel"/>
                  <Button backgroundColor="#89868E" title="Submit"/>
              </View>

          </View>

      </View>
        </ScrollView>
    )
  }
}

export default TrueFalseQuestionEditor

const styles = StyleSheet.create({
    buttons:{
      margin: 5
    },
    previewSection:{
        borderWidth: 1,
        borderColor: '#A19E9D',
        margin: 5,
        backgroundColor: '#D3D1D0',
        borderRadius: 5

    },
    previewSectionHeader:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'black',
        borderTopEndRadius: 5,
        borderTopStartRadius:5
    },
    previewSectioninside:{
        padding: 15,
        // borderWidth: 1,
        margin: 5,
        backgroundColor: '#D3D1D0'

    },
    previewHeader: {
        marginTop: 20,
        margin: 5
    },
    textInputEssayAns: {
        margin: 5,
        borderWidth: 1, borderColor: '#A19E9D', height: 100, backgroundColor: 'white',
        borderRadius: 5
    },
    textInput: {
        margin: 5,
        borderWidth: 1, borderColor: '#A19E9D', height: 50, backgroundColor: 'white',
        borderRadius: 5
    }
});