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
        })
        //     .then(function (response) {
        //     console.log("response:", response)
        //     return response.json();
        // })
    }

    updateTrueFalseQuestion(title,description,points,isTrue, questionId) {
        // console.log("inside update course course service ")
        // console.log("moduleId=",moduleId)
        // console.log("module on=object in module service :",module)
        // console.log("inside updateAssignmentservice class")
        // console.log("assignment id:",assignmentId)
        return fetch('http://10.0.0.138:8080/api/exam/'+questionId+'/update/truefalse',{
            method: 'put',
            body: JSON.stringify({
                title: title,
                description: description,
                points: points,
                isTrue: isTrue
            }),
            headers: {
                'content-type': 'application/json'
            }
        })

    }
    deleteTrueFalseQuestion(id){
        return fetch('http://10.0.0.138:8080/api/exam/truefalse/'+id, {
            method: 'delete'
        })
    }

    createMultipleChoiceQuestion(title,description,points,options,correctOption,questionId) {
        return fetch('http://10.0.0.138:8080/api/exam/'+questionId +'/choice', {
            body: JSON.stringify({
                title: title,
                description: description,
                points: points,
                options: options,
                correctOption: correctOption
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

    updateMultipleChoiceQuestion(title,description,points,options,correctOption, questionId) {

        return fetch('http://10.0.0.138:8080/api/exam/'+questionId+'/update/multi',{
            method: 'put',
            body: JSON.stringify({
                title: title,
                description: description,
                points: points,
                options: options,
                correctOption: correctOption
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response){
                console.log(response)
                return response.json();
            });
    }
    deleteMultipleChoiceQuestion(id){
        return fetch('http://10.0.0.138:8080/api/exam/multi/'+id, {
            method: 'delete'
        })
    }



    createFillInTheBlanksQuestion(title,description,points,variables,questionId) {
        return fetch('http://10.0.0.138:8080/api/exam/'+questionId +'/blanks', {
            body: JSON.stringify({
                title: title,
                description: description,
                points: points,
                variables: variables,
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

    updateFillInTheBlanksQuestion(title,description,points,variables, questionId) {

        return fetch('http://10.0.0.138:8080/api/exam/'+questionId+'/update/blanks',{
            method: 'put',
            body: JSON.stringify({
                title: title,
                description: description,
                points: points,
                variables: variables
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response){
                console.log(response)
                return response.json();
            });
    }
    deleteFillInTheBlanksQuestion(id){
        return fetch('http://10.0.0.138:8080/api/exam/blanks/'+id, {
            method: 'delete'
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

    updateEssayQuestion(title,description,points, questionId) {

        return fetch('http://10.0.0.138:8080/api/exam/'+questionId+'/update/essay',{
            method: 'put',
            body: JSON.stringify({
                title: title,
                description: description,
                points: points

            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response){
                console.log(response)
                return response.json();
            });
    }
    deleteEssayQuestion(id){
        return fetch('http://10.0.0.138:8080/api/exam/essay/'+id, {
            method: 'delete'
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
    updateExam(title,description,examId) {

        return fetch('http://10.0.0.138:8080/api/exam/'+examId+'/update',{
            method: 'put',
            body: JSON.stringify({
                title: title,
                description: description,

            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response){
                console.log(response)
                return response.json();
            });
    }

    deleteExam(id){
        return fetch('http://10.0.0.138:8080/api/exam/'+id, {
            method: 'delete'
        })
    }


}