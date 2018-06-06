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
        }
        this.ExamService = ExamService.instance;

    }
    componentDidMount() {
        // const {navigation} = this.props;
        const lessonId = this.props.navigation.getParam("lessonId", 1)
        this.setState({
            lessonId: lessonId
        })
    }

    updateForm(newState) {
        // console.log(newState)
        this.setState(newState)

    }

    createNewExam(){
        this.ExamService.createExam(this.state.title, this.state.description, this.state.lessonId);
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

                    <Button style={styles.buttons}	backgroundColor="green"
                               color="white"
                               title="Save"
                               onPress={()=>{this.createNewExam()
                               this.props.navigation.navigate("Exam", {lessonId: this.state.lessonId})}}
                    />
                    <Button	 style={styles.buttons} backgroundColor="red"
                               color="white"
                               title="Cancel"/>
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


