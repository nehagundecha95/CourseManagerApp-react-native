import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import Exam from './elements/Exam'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import EssayEditor from './elements/EssayEditor'
import Assignment from './components/Assignment'
import AssignmentWidget from './elements/AssignmentWidget'
import ExamWidget from './elements/ExamWidget'
import Widget from './components/Widget'
import FillInTheBlanksEditor from "./elements/FillInTheBlanksEditor";
import CreateNewExamWidget from "./elements/CreateNewExamWidget"



class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ScrollView>
                {/*<AssignmentWidget navigation={this.props.navigation}/>*/}

                {/*<FillInTheBlanksEditor/>*/}
                <StatusBar/>
                <FixedHeader/>

                <Button style={styles.buttons} title="Courses" backgroundColor="#89868E"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />

            </ScrollView>
        )
    }
}



const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    QuestionList,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    Assignment,
    EssayEditor,
    AssignmentWidget,
    ExamWidget,
    Widget,
    Exam,
    FillInTheBlanksEditor,
    CreateNewExamWidget



});

export default App;

const styles = StyleSheet.create({
    buttons:{
        margin: 5,
        borderRadius: 5
    }
});







