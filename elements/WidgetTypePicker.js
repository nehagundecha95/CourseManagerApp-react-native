import React from 'react'
import {Picker, Text, View} from 'react-native'

class WidgetTypePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            widgetType: 0
        }
    }
    render() {
        return (
            <View>
                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({widgetType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="Exam" label="Exam" />
                    <Picker.Item value="Assignment" label="Assignment" />
                </Picker>
                <Text>{this.state.widgetType}</Text>
            </View>
        )
    }
}

export default WidgetTypePicker