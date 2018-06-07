import React from 'react';

let _singleton = Symbol();
const ASSIGNMENT_API_URL = 'http://localhost:8080/api/lesson/{lid}/assignment';
const COURSE_API_URL_UPDATE ='http://localhost:8080/api/course/{ID}';

export default class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    createAssignment(title,description,points, lessonId) {
        return fetch('http://10.0.0.138:8080/api/lesson/'+lessonId+'/assignment', {
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
            // console.log("response:", response)
            return response.json();
        })
    }
    updateAssignment(title,description,points,assignmentId) {
        return fetch('http://10.0.0.138:8080/api/assignment/'+assignmentId+'/update',{
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
                return response.json();
            });
    }
    deleteAssignment(id){
        return fetch('http://10.0.0.138:8080/api/assignment/'+id, {
            method: 'delete'
        })
    }
    findAssignmentById(assignmentId){
        return fetch("http://10.0.0.138:8080/api/assignment/" + assignmentId)
            .then(response => (response.json()))

    }



}