import React from 'react'
import {View} from 'react-native'
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

        }
        if(this.props.navigation.getParam("questionId")!==undefined){
            const questionId = this.props.navigation.getParam("questionId");
            fetch("http://10.0.0.138:8080/api/essay/"+questionId)
                .then(response => (response.json()))
                .then(essayQuestion => {this.setState({title: essayQuestion.title})
                    this.setState({description: essayQuestion.description})
                    this.setState({points: essayQuestion.points})
                    })
        }
        this.ExamService = ExamService.instance;
    }
    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.setState({
            questionId: questionId
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
            this.state.questionId)
            .then(console.log("created essay question"));
    }
    render() {
        return(
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
                           onPress={()=>this.createNewEssayQuestion()}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.description}</Text>

            </View>
        )
    }
}
