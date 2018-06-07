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
            questionId: '',
            hiddenSaveBtn: true

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
    }
    createNewEssayQuestion(){
        this.ExamService.createEssayQuestion(
            this.state.title,
            this.state.description,
            this.state.points,
            this.state.examId)
            .then(console.log("created essay question"));
    }
    updateEssayQuestion(){
        console.log("update true false question");
        this.ExamService.updateEssayQuestion(
            this.state.title,
            this.state.description,
            this.state.points,
            this.state.questionId);
    }
    delete(){
        this.ExamService.deleteEssayQuestion(this.state.questionId);
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

                {this.state.hiddenSaveBtn &&
                <Button backgroundColor="#148C0A"
                        color="white"
                        title="Save"
                        style={styles.buttons}
                        onPress={() => {
                            this.createNewEssayQuestion();
                            this.props.navigation.navigate("ExamWidget", {examId: this.state.questionId})
                        }}/>
                }

                {this.state.hiddenUpdateBtn &&
                <Button backgroundColor="#1869AD"
                        color="white"
                        title="Edit"
                        style={styles.buttons}
                        onPress={() => {
                            this.updateEssayQuestion();
                            this.props.navigation.navigate("ExamWidget", {examId: this.state.questionId})
                        }}/>
                }
                {this.state.hiddenUpdateBtn &&
                <Button style={styles.buttons} backgroundColor="#CD2704"
                        color="white"
                        title="Delete"
                        onPress={() => {
                            this.delete();
                            this.props.navigation.navigate("ExamWidget", {examId: this.state.examId})
                        }}/>
                }

                <Button	backgroundColor="#89868E"
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

                    <View style={styles.previewSectionHeader}>
                        <Text style={{margin: 10, color: '#EBE8E7'}} h4>{this.state.title}</Text>
                        <Text style={{textAlign: 'right',margin: 10, color: '#EBE8E7'}} h4>{this.state.points} pts</Text>
                    </View>
                    <View style={styles.previewSectioninside}>
                    <Text>{this.state.description}</Text>
                    <Text h4>Essay answer</Text>
                    <TextInput style={styles.textInputEssayAns}

                               editable = {true}
                               maxLength = {40}
                    />
                    </View>

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
        borderWidth: 1, borderColor: '#A19E9D',height: 100, backgroundColor: 'white',
        borderRadius: 5
    },
    textInput: {
        margin: 5,
        borderWidth: 1, borderColor: '#A19E9D',height: 50, backgroundColor: 'white',
        borderRadius: 5
    },
});