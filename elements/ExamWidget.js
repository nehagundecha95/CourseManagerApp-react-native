import React, {Component} from 'react'
import {View, Alert, Picker, StyleSheet, ScrollView} from 'react-native'
import {Text, ListItem, ButtonGroup, Button} from 'react-native-elements'

export default class ExamWidget extends Component {
    static navigationOptions = {title: 'Exam widget'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            questionType: '',
            examId: ''
        }

        this.temp = this.temp.bind(this);
    }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        this.setState({
            examId: examId
        })
        fetch("http://10.0.0.138:8080/api/exam/" + examId + "/question")
            .then(response => (response.json()))
            .then(questions => (
                // console.log("here:", widgets);
                this.setState({questions: questions})
            ))
    }
    componentWillReceiveProps(){
        fetch("http://10.0.0.138:8080/api/exam/" + this.state.examId + "/question")
            .then(response => (response.json()))
            .then(questions => (
                // console.log("here:", widgets);
                this.setState({questions: questions})
            ))
    }

    temp(){
        {console.log("examId:",this.state.questions)}
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
                                    .navigate("TrueFalseQuestionEditor",{questionId: question.id})
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


                <Text h2>Select question type</Text>
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
                                .navigate("TrueFalseQuestionEditor",{examId: this.state.examId})
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
            </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    buttons:{
        margin: 5
    }
});