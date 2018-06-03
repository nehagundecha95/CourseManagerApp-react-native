import React from 'react'
import {CheckBox} from 'react-native-elements'

export default class TrueFalseQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isTrue: true
        }
        this.formUpdate = this.formUpdate.bind(this)
    }
    formUpdate(update) {
        this.setState(update)
    }
    render(){
        return(
            <CheckBox
                title = 'This answer is true'
                onPress={()=> this.formUpdate({isTrue: !this.state.isTrue})}
                checked = {this.state.isTrue}
            />
        )
    }

}