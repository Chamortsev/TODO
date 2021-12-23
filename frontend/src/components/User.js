//import UserItem from './UserItem.js'
import {Link} from 'react-router-dom'

const UserItem = ({user}) => {
    return (
        <tr>
            <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table>
            <th>
                UserName
            </th>
            <th>
                First Name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Email
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UserList;



import {Link} from 'react-router-dom'


const UserItem = ({user}) => {
    return(
        <tr>
            <td>{user.first_name}</td>
            <td><Link to={`/user/${user.id}`}>{author.last_name}</Link> </td>
            <td>{author.birthday_year}</td>
        </tr>
    )
}

const AuthorList = ({authors}) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Birthday year
            </th>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>
    )
}

export default AuthorList