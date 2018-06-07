import React from 'react'
import {View, TextInput, StyleSheet, ScrollView, Alert} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamService from '../services/ExamService'

export default class CreateNewExamWidget extends React.Component {
    static navigationOptions = { title: "Create new exam widget"}
    constructor(props) {
        super(props)
        this.state = {
            lessonId: '',
            title: '',
            description: '',
            points: '',
            hiddenUpdateBtn: false,
            examId: '',
            hiddenSaveBtn: true
        }
        this.ExamService = ExamService.instance;
        if(this.props.navigation.getParam("examId")!==undefined){
            const examId = this.props.navigation.getParam("examId");
            fetch("http://10.0.0.138:8080/api/exam/"+examId)
                .then(response => (response.json()))
                .then(exam => {
                    this.setState({hiddenUpdateBtn: true});
                    this.setState({title: exam.title});
                    this.setState({description: exam.description});
                    this.setState({examId: examId})
                    this.setState({hiddenSaveBtn: false})
                })
        }
    }
    componentDidMount() {
        // const {navigation} = this.props;
        const lessonId = this.props.navigation.getParam("lessonId", 1)
        this.setState({
            lessonId: lessonId
        })
        const examId = this.props.navigation.getParam("examId", 1)
        this.setState({
            examId: examId
        })

    }

    updateForm(newState) {
        // console.log(newState)
        this.setState(newState)

    }

    updateExam(){
        console.log("update exam");
        this.ExamService.updateExam(
            this.state.title,
            this.state.description,
            this.state.examId)
            .then(response =>{
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack();
            });
    }


    createNewExam(){
        this.ExamService.createExam(this.state.title, this.state.description, this.state.lessonId)
            .then(response =>{
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack();
            });
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

                    {this.state.hiddenSaveBtn &&
                    <Button style={styles.buttons} backgroundColor="#148C0A"
                            color="white"
                            title="Save"
                            onPress={() => {
                                this.createNewExam()
                                console.log("lessonID in create new exam widget:", this.state.lessonId);
                                this.props.navigation.navigate("Exam", {lessonId: this.state.lessonId})
                            }}
                    />
                    }
                    {this.state.hiddenUpdateBtn &&
                    <Button backgroundColor="#1869AD"
                            color="white"
                            title="Edit"
                            style={styles.buttons}
                            onPress={() => {
                                this.updateExam();
                                this.props.navigation.navigate("ExamWidget", {examId: this.state.examId})
                            }}/>
                    }


                    <Button	 style={styles.buttons} backgroundColor="#89868E"
                                color="white"
                                title="Cancel"
                                onPress={() => {
                                    this.props.navigation.navigate("ExamWidget", {examId: this.state.examId})
                                }}/>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    buttons:{
        margin: 5
    }
});


