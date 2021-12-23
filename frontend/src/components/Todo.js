const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
            <td>{todo.title}</td>
            <td>{todo.text}</td>
        </tr>
    )
}



const TodoList = ({todo}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Проект</th>
                    <th>пользователь-создатель</th>
                    <th>заголовок</th>
                    <th>заметка</th>
                </tr>
            </thead>
            <tbody>
                {todo.map((todo)=> <TodoItem todo={todo}/>)}
            </tbody>
        </table>
    )
}

export default TodoList;