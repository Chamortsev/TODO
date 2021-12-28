//import React from 'react';
import {Link} from 'react-router-dom'


const ProjectItem = ({project, users}) => {
    return (
        <tr>
            <td><Link to={`/project/${project.id}`}>{project.name}</Link></td>
            <td>{project.repositoryUrl}</td>
            <td>{project.users}</td>

        </tr>
    )
}



const ProjectList = ({projects, users}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Репозиторий</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project)=> <ProjectItem project={project} users={users}/>)}
            </tbody>
        </table>
    )
}

export default ProjectList;