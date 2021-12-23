import React from 'react';
import axios from 'axios';
import './App.css';
import {HashRouter, Route, BrowserRouter, Navigate} from "react-router-dom"
import { Routes } from 'react-router-dom';

import MainMenu from './components/MainMenu.js';
import Footer from './components/Footer.js';
import UserList from './components/User.js';
import UserDetail from './components/UserDetail.js';
import ProjectList from './components/Project.js';
import ProjectDetail from './components/ProjectDetail.js';
import TodoList from './components/Todo.js';
import NotFound404 from './components/NotFound404.js';


class App extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
        }
    }
    componentDidMount() {

        axios
        .get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data.results
                this.setState({
                               'users': users
                            })
        })
        .catch(error => console.log(error))

        axios
        .get('http://127.0.0.1:8000/api/projects/')
        .then(response => {
            const projects = response.data.results
                this.setState({
                    'projects': projects
                })
        })
        .catch(error => console.log(error))

        axios
        .get('http://127.0.0.1:8000/api/todo/')
        .then(response => {
            const todo = response.data.results
                this.setState({
                    'todo': todo
                })
        })
        .catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <MainMenu />
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todo' element={<TodoList todo={this.state.todo} />} />
                        <Route path="/users" element={<Navigate to="/"/>} />
                        <Route path='/user/:id' element={<UserList projects={this.state.projects} /> } />
                        <Route path="*" element={<NotFound404 /> } />
                    </Routes>
                </BrowserRouter>
                <Footer />
            </div>
        )
    }
}

export default App;