import React from 'react';
import axios from 'axios';
//import './App.css';
import {HashRouter, BrowserRouter, Route, Routes, Link, Navigate, useLocation} from 'react-router-dom'
//import {HashRouter, Route, BrowserRouter, Navigate, useLocation} from "react-router-dom"
//import { Routes } from 'react-router-dom';

import MainMenu from './components/MainMenu.js';
import Footer from './components/Footer.js';
import UserList from './components/User.js';
import UserDetail from './components/UserDetail.js';
import ProjectList from './components/Project.js';
import ProjectDetail from './components/ProjectDetail.js';
import TodoList from './components/Todo.js';
import NotFound404 from './components/NotFound404.js';
import LoginForm from './components/LoginForm.js';



class App extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token':''
        }
    }

    get_token(login, password) {
        axios
        .post('http://127.0.0.1:8000/api-token-auth/', {'username' : login, 'password': password} )
        .then(response => {
            const token = response.data.token
            console.log(token)
            localStorage.setItem('token', token)
            this.setState({
                'token': token
            }, this.get_data)
        })
        .catch(error => console.log(error))

    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.get_data)
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.get_data)
    }


    is_auth() {
        return !!this.state.token
    }

    get_headers() {
        if (this.is_auth()) {
        return {
            'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    get_data() {
        let headers = this.get_headers()
        axios
        .get('http://127.0.0.1:8000/api/users/', {headers} )
        .then(response => {
            const users = response.data
                this.setState({
                               'users': users
                            })
        })
        .catch(error => {
            this.setState({
                'users': []
            })
            console.log(error)
        })

        axios
        .get('http://127.0.0.1:8000/api/projects/', {headers} )
        .then(response => {
            const projects = response.data.results
                this.setState({
                    'projects': projects
                })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                'projects': []
            })
        })


        axios
        .get('http://127.0.0.1:8000/api/todo/', {headers} )
        .then(response => {
            const todo = response.data.results
                this.setState({
                    'todo': todo
                })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                'todo': []
            })
        })
    }



    render () {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <button type="button" class="btn btn-link" Link><Link to='/'>Users</Link></button>
                        <button type="button" class="btn btn-link"><Link to='/projects'>Projects</Link></button>
                        <button type="button" class="btn btn-link"><Link to='/todo'>ToDo</Link></button>
                        {this.is_auth() ? <button type="button" class="btn btn-link" onClick={()=>this.logout()}>Logout</button> : <button type="button" class="btn btn-link"><Link to='/login'>Login</Link></button>}
                    </div>


                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todo' element={<TodoList todo={this.state.todo} />} />
                        <Route path="/users" element={<Navigate to="/"/>} />
                        <Route exact path='/login' element={<LoginForm get_token={(login, password) => this.get_token(login, password)}/> } />
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