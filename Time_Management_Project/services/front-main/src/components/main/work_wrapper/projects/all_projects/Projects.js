import React from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import Project from './single_project/SingleProject'
import Loader from '../../../../utils_components/Loader'
import Pagination from '../../../../utils_components/pagination/Pagination'
import ProjectsSearchForm from './ProjectsSearchForm'
import * as style from './all_projects.module.css'

export default function Projects(props) {

    const {
        projectsList,
        totalCount,
        pagSize,
        isAdmin,
        page,
        totalPagesCount,
        loading,
        onSubmitSearchProject
    } = props

    //Второе условие для отлова частного случая, при котором мы не найдем ни одного проекта при поиске
    //но при этом редирект не нужен
    if ((page > totalPagesCount || page < 1) && !(totalCount === 0  && page === 1))
        return <Redirect to='/projects/1'/>

    if(loading)
        return <Loader/>

    else
        return (
            <>
                <div className={style.projects_actions_wrapper}>
                    <ProjectsSearchForm
                        onSubmitSearchProject={onSubmitSearchProject}
                    />
                    {
                        isAdmin
                            ? <NavLink to='/put-project' className='primary-btn'>Add project</NavLink>
                            : null
                    }
                </div>
                <div className='founded'>
                    Projects found:&nbsp;<span>{totalCount}</span>
                </div>
                <div className={style.all_projects_wrapper}>
                    {
                        projectsList.map(project => <Project
                            id={project.project_id}
                            title={project.project_title}
                            description={project.project_description}
                            deadline={project.project_deadline}
                            projectLead={project.lead}
                            key={project.project_id}
                        />)
                    }
                </div>
                {
                    Math.ceil(totalCount / pagSize) > 1
                        ? <Pagination
                            rootValue='/projects/'
                            paginationSize={pagSize}
                            totalCount={totalCount}
                        />
                        : null
                }
            </>
        )
}