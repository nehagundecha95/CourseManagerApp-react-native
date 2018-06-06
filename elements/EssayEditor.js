import React from 'react'
import {StyleSheet, View, TextInput,ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamService from "../services/ExamService";

export default class EssayEditor extends React.Component {
    static navigationOptions = { title: "Essay"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            hiddenUpdateBtn: false,
            examId: '',
            questionId: ''

        }
        if(this.props.navigation.getParam("questionId")!==undefined){
            const questionId = this.props.navigation.getParam("questionId");
            fetch("http://10.0.0.138:8080/api/essay/"+questionId)
                .then(response => (response.json()))
                .then(essayQuestion => {
                    this.setState({hiddenUpdateBtn: true});
                    this.setState({title: essayQuestion.title})
                    this.setState({description: essayQuestion.description})
                    this.setState({points: essayQuestion.points})
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
    }
    createNewEssayQuestion(){
        this.ExamService.createEssayQuestion(
            this.state.title,
            this.state.description,
            this.state.points,
            this.state.examId)
            .then(console.log("created essay question"));
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

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           style={styles.buttons}
                           onPress={()=>{this.createNewEssayQuestion();
                               this.props.navigation.navigate("ExamWidget",{examId: this.state.questionId})}}/>

                {this.state.hiddenUpdateBtn &&
                <Button backgroundColor="blue"
                        color="white"
                        title="Edit"
                        style={styles.buttons}
                        onPress={() => {
                            this.updateTrueFalseQuestion();
                            this.props.navigation.navigate("ExamWidget", {examId: this.state.questionId})
                        }}/>
                }
                <Button	backgroundColor="red"
                    color="white"
                    title="Cancel"
                    style={styles.buttons}
                    onPress={() => {
                    this.props.navigation.navigate("ExamWidget", {examId: this.state.questionId})
                }}/>



                <Text style={styles.previewHeader} h3>Preview</Text>
                {/*<Text h2>{this.state.title}</Text>*/}
                {/*<Text>{this.state.description}</Text>*/}

                <View style={styles.previewSection}>

                    <Text h4>{this.state.title}</Text>
                    <Text style={{textAlign: 'right'}} h4>{this.state.points} pts</Text>
                    <Text>{this.state.description}</Text>
                    <Text h4>Essay answer</Text>
                    <TextInput style={styles.textInputEssayAns}

                               editable = {true}
                               maxLength = {40}
                    />

                </View>

            </View>
            </ScrollView>
        )
    }
}
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
    },
    textInputEssayAns: {
        margin: 5,
        borderWidth: 1, height: 100, backgroundColor: 'white'
    },
    textInput: {
        margin: 5,
        borderWidth: 1, height: 50, backgroundColor: 'white'
    },
});