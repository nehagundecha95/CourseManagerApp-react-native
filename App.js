import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import ScreenX from './elements/ScreenX'
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
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button style={styles.buttons} title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />





                {/*<Button title="Go to Screen X"*/}
                        {/*onPress={() => this.props.navigation*/}
                            {/*.navigate('ScreenX') } />*/}
                {/*<Button title="Go to Screen A"*/}
                        {/*onPress={() => this.props.navigation*/}
                            {/*.navigate('ScreenA') } />*/}
                {/*<Button title="Go to Screen B"*/}
                        {/*onPress={() => this.props.navigation*/}
                            {/*.navigate('ScreenB') } />*/}


                {/*<TrueFalseQuestionEditor/>*/}
                {/*/!*<EssayEditor/>*!/*/}

                {/*<QuestionTypeButtonGroupChooser/>*/}
                {/*<QuestionTypePicker/>*/}

                {/*<Exam/>*/}

                {/*<Icons/>*/}
                {/*<View style={{padding: 20}}>*/}
                    {/*<TextHeadings/>*/}
                {/*</View>*/}
            </ScrollView>
        )
    }
}

class ScreenA extends React.Component {
    static navigationOptions = {title: "Screen A"}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </View>
        )
    }
}

const ScreenB = () => (
    <View>
        <Text h1>Screen B</Text>
    </View>
)

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    QuestionList,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    ScreenA,
    ScreenB,
    ScreenX,
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
        margin: 5
    }
});
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });






