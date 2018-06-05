import React from 'react';

let _singleton = Symbol();

export default class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    createTrueFalseQuestion(title,description,points,isTrue,questionId) {
        return fetch('http://10.0.0.138:8080/api/exam/'+questionId +'/truefalse', {
            body: JSON.stringify({
                    title: title,
                    description: description,
                    points: points,
                    isTrue: isTrue,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            console.log("response:", response)
            return response.json();
        })
    }
    createMultipleChoiceQuestion(title,description,points,options,questionId) {
        return fetch('http://10.0.0.138:8080/api/exam/'+questionId +'/choice', {
            body: JSON.stringify({
                title: title,
                description: description,
                points: points,
                options: options,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            console.log("response:", response)
            return response.json();
        })
    }
    createEssayQuestion(title,description,points,questionId) {
        return fetch('http://10.0.0.138:8080/api/exam/'+questionId +'/essay', {
            body: JSON.stringify({
                title: title,
                description: description,
                points: points
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            console.log("response:", response)
            return response.json();
        })
    }

    createExam(title, description, lessonId) {
        return fetch('http://10.0.0.138:8080/api/exam/'+lessonId+'/exam', {
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            console.log("response:", response)
            return response.json();
        })
    }

}