import React from 'react'
import {StyleSheet, View, TextInput, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamService from "../services/ExamService";

export default class FillInTheBlanksEditor extends React.Component {
    static navigationOptions = { title: "Fill in the blanks question"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            variables: 'variables',
            hiddenUpdateBtn: false,
            examId: '',
            questionId: '',
            showPreview: false,
            array: []
        }
        if(this.props.navigation.getParam("questionId")!==undefined){
            const questionId = this.props.navigation.getParam("questionId");
            fetch("http://10.0.0.138:8080/api/blanks/"+questionId)
                .then(response => (response.json()))
                .then(fillInTheBlanksQuestion => {
                    this.setState({hiddenUpdateBtn: true});
                    this.setState({title: fillInTheBlanksQuestion.title});
                    this.setState({description: fillInTheBlanksQuestion.description});
                    this.setState({points: fillInTheBlanksQuestion.points});
                    this.setState({variables: fillInTheBlanksQuestion.variables});

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
    componentWillMount(){
        this.getVariablesPreview("default");
    }
    createNewFillInTheBlanksQuestion(){
        this.ExamService.createFillInTheBlanksQuestion(
            this.state.title,
            this.state.description,
            this.state.points,
            this.state.variables,
            this.state.examId)
            .then(console.log("created fill in the blanks question"));
    }
    updateForm(newState) {
        this.setState(newState)
        // this.getVariablesPreview()
    }
    getVariablesPreview(text){
        console.log("variables:", this.state.variables)
        // var string = 'hbjhbhjgb[hbjhb]wjwnjk'
        var myArray = text.split(new RegExp("\\[\\w+\\=*\\]"));
        this.setState({variables: text})
        this.setState({array: myArray})
        this.setState({showPreview: true});
        console.log(myArray)
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

                <FormLabel>Fill In the Blanks Variables</FormLabel>
                <FormInput value={this.state.variables} onChangeText={
                    text => {
                        this.updateForm({variables: text});
                        this.getVariablesPreview(text);
                    }
                }/>

                <FormValidationMessage>
                    Fill In the Blanks variables is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           style={styles.buttons}
                           onPress={()=>{this.createNewFillInTheBlanksQuestion();
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

                <Text style={styles.previewHeader} h3>Preview</Text>

                <View style={styles.previewSection}>

                    <Text h4>{this.state.title}</Text>
                    <Text style={{textAlign: 'right'}} h4>{this.state.points} pts</Text>
                    <Text>{this.state.description}</Text>
                    {this.state.array.map((element, index)=> (
                        <View  style={{flexDirection: 'row'}} key={index}>
                            <Text h4>
                                {element}
                            </Text>
                            <TextInput style={{width:100, borderWidth: 1}}/>
                        </View>
                    ))}
                    {/*<Text>{this.state.variables}</Text>*/}
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
    }
});
