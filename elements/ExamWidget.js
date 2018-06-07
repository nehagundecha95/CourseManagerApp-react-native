import React, {Component} from 'react'
import {View, Alert, Picker, StyleSheet, ScrollView} from 'react-native'
import {Text, ListItem, ButtonGroup, Button} from 'react-native-elements'
import ExamService from "../services/ExamService";

export default class ExamWidget extends Component {
    static navigationOptions = {title: 'Exam widget'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            questionType: '',
            examId: '',
            lessonId: ''
        }
        this.ExamService = ExamService.instance;

        this.temp = this.temp.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    refresh(){
        const {navigation} = this.props;
        console.log("in refresh")
        fetch("http://10.0.0.138:8080/api/exam/" + this.state.examId + "/question")
            .then(response => (response.json()))
            .then(questions => {
                console.log("here:", questions);
                this.setState({questions: questions})

            })
    }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        const lessonId = navigation.getParam("lessonId")
        this.setState({
            examId: examId
        })
        this.setState({
            lessonId: lessonId
        })
        fetch("http://10.0.0.138:8080/api/exam/" + examId + "/question")
            .then(response => (response.json()))
            .then(questions => {
                // console.log("here:", widgets);
                this.setState({questions: questions})

            })
    }
    componentWillReceiveProps(){
        fetch("http://10.0.0.138:8080/api/exam/" + this.state.examId + "/question")
            .then(response => (response.json()))
            .then(questions => {
                console.log("here:", questions);
                this.setState({questions: questions})
            })
    }

    temp(){
        {console.log("examId:",this.state.questions)}
    }
    updateExam(){

    }
    deleteExam(){
        this.ExamService.deleteExam(this.state.examId);
    }
    render() {


        return(
            <ScrollView>
            <View style={{padding: 15}}>

                {this.state.questions.map((question, index) => (
                    <ListItem
                        onPress={() => {
                            // {console.log("questionId:",question.id)}
                            // this.props.navigation.navigate("ExamWidget", {examId: question.id})
                            if(question.type === "TrueFalse")
                                this.props.navigation
                                    .navigate("TrueFalseQuestionEditor",{questionId: question.id,refresh:this.refresh})
                            if(question.type === "MultipleChoice")
                                this.props.navigation
                                    .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                            if(question.type === "Essay")
                                this.props.navigation
                                    .navigate("EssayEditor", {questionId: question.id})
                            if(question.type === "FillInTheBlanks")
                                this.props.navigation
                                    .navigate("FillInTheBlanksEditor", {questionId: question.id})
                        }}
                        key={index}
                        subtitle={question.description}
                        title={question.title}/>))}


                {/*<Text h2>Select question type</Text>*/}
                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="MultipleChoice" label="Multiple choice" />
                    <Picker.Item value="Essay" label="Essay" />
                    <Picker.Item value="TrueFalse" label="True or false" />
                    <Picker.Item value="FillInTheBlanks" label="Fill in the blanks" />
                </Picker>
                {/*{console.log("lessonid:",this.state.lessonId)}*/}
                <Button
                    onPress={() => {
                        // this.temp();
                        if(this.state.questionType === "TrueFalse")
                            this.props.navigation
                                .navigate("TrueFalseQuestionEditor",{examId: this.state.examId,refresh:this.refresh})
                        if(this.state.questionType === "MultipleChoice")
                            this.props.navigation
                                .navigate("MultipleChoiceQuestionEditor", {examId: this.state.examId})
                        if(this.state.questionType === "Essay")
                            this.props.navigation
                                .navigate("EssayEditor", {examId: this.state.examId})
                        if(this.state.questionType === "FillInTheBlanks")
                            this.props.navigation
                                .navigate("FillInTheBlanksEditor", {examId: this.state.examId})
                    }}
                    title = "Create new Question"/>
                    }}

                <View style={{flex:1, flexDirection: 'row', justifyContent:'center'}}>
                    <Button
                        backgroundColor="#1869AD"
                            color="white"
                            title="Edit exam"
                            style={styles.examButton}
                            onPress={() => {
                                this.updateExam();
                                this.props.navigation.navigate("CreateNewExamWidget", {examId: this.state.examId},{lessonId: this.state.lessonId})
                            }}/>


                    <Button style={styles.examButton}
                            backgroundColor="#CD2704"
                            color="white"
                            title="Delete exam"
                            onPress={() => {
                                this.deleteExam();
                                this.props.navigation.navigate("Exam", {lessonId: this.state.lessonId})
                                // this.props.navigation.navigate("ExamWidget", {examId: this.state.examId})
                            }}/>

                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    buttons:{
        margin: 5,

    },
    examButton: {
        margin: 5,
        width: 157
    }
});