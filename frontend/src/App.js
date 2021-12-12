import React from 'react'
import UserList from './components/UserList.js'
import axios from 'axios'
import MenuList from './components/Menu'
import FooterList from './components/Footer';

class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'users': [],
            'footers':[],
            'menus': []
        }
    }

    componentDidMount() {
        axios
        .get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data
            this.setState({
                'users': users,

            })
        })
        .catch(error => console.log(error))

             const footers = [
            {
            'main': <a href ='http://localhost:8000'>main</a>,
            'api': <a href ='http://localhost:8000/api'>api</a>,
            }
        ]
        this.setState(
            {
                'footers': footers
            }
        )
        const menus = [
            {
            'main': <a href ='http://localhost:8000'>main</a>,
            'api': <a href ='http://127.0.0.1:8000/api/'>api</a>
            }
        ]
        this.setState(
            {
                'menus': menus
            }
        )


    }

    render () {
        return (

           <div>
               <div>
                    <MenuList menus={this.state.menus}/>
               </div>
                <div>
                    <UserList users={this.state.users} />
                </div>
                <div>
                    <FooterList footers={this.state.footers}/>
                </div>
           </div>

        )
    }
}

export default App;