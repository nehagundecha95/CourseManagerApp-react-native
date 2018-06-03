import React from 'react';
import {Header} from 'react-native-elements';

const FixedHeader = () => (
    <Header
        leftComponent={{ 		icon: 'menu', color: '#fff' }}
        centerComponent={{	text: 'MY TITLE',
            style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        leftComponent={{
            icon: 'arrow-back',
            color: '#fff' }}/>
);
export default FixedHeader


