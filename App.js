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
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />
                <Button title="Go to Screen X"
                        onPress={() => this.props.navigation
                            .navigate('ScreenX') } />
                <Button title="Go to Screen A"
                        onPress={() => this.props.navigation
                            .navigate('ScreenA') } />
                <Button title="Go to Screen B"
                        onPress={() => this.props.navigation
                            .navigate('ScreenB') } />


                <TrueFalseQuestionEditor/>

                <QuestionTypeButtonGroupChooser/>
                <QuestionTypePicker/>

                <Exam/>

                <Icons/>
                <View style={{padding: 20}}>
                    <TextHeadings/>
                </View>
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
    ScreenX
});

export default App;


//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });











// import React from 'react';
// import { StyleSheet, View, StatusBar} from 'react-native';
// import {ListItem, Text, Button} from'react-native-elements'
// import FixedHeader from './elements_old/test'
// import TextHeadings from './elements_old/TestHeadings'
// import Icons from './elements_old/Icons'
// import QuestionTypeChooser from './elements_old/Buttons'
// import QuestionTypePicker from './elements_old/QuestionTypePicker'
// import EssayQuestion from './elements_old/EssayQuestion'
// import TrueFalseQuestion from "./elements_old/TrueFalseQuestion";
//
// const lists = [
//     {	title: 'Question 1', subtitle: 'Multiple choice',
//         icon: 'list'},
//     {	title: 'Question 2', subtitle: 'Fill-in the blanks',
//         icon: 'code'},
//     {	title: 'Question 3', subtitle: 'True or false',
//         icon: 'check'},
//     {	title: 'Question 4', subtitle: 'Essay',
//         icon: 'subject'}]
//
// export default class App extends React.Component {
//
//
//     render() {
//     return (
//       <View>
//           {/*<Text>Hello world</Text>*/}
//           <StatusBar/>
//           <StatusBar barStyle="light-content"/>
//           <FixedHeader/>
//         {/*<TextHeadings/>*/}
//         {/*<Text>Hello</Text>*/}
//         {/*<Icons/>*/}
//
//           <Text h1>Lists</Text>
//           {lists.map((list, i) => (
//               <ListItem
//                   key={i}
//                   title={list.title}
//                   subtitle={list.subtitle}
//                   leftIcon={{name: list.icon}}/>
//           ))}
//           {/*<QuestionTypeChooser/>*/}
//           {/*<QuestionTypePicker/>*/}
//           <EssayQuestion/>
//           <TrueFalseQuestion/>
//
//       </View>
//
//   );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
