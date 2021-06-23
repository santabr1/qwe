import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Profile from './profile/ProfileContainer'
import Projects from './projects/all_projects/ProjectsContainer'
import DevelopersContainer from './developers/DevelopersContainer'
import PutDeveloperForm from './put_developer_form/PutDeveloperForm'
import WorkWithProjectForm from './work_with_project_form/WorkWithProjectForm'
import AllNotificationsContainer from './notifications/AllNotificationsContainer'
import * as style from './work_wrapper.module.css'
import ProjectsManageSide from './projects/projects_manage/ProjectsManageSide'
import AchievementsContainer from './achievements/AchievementsContainer'
import TimeManagementContainer from "./time_management/TimeManagementContainer";


export default function WorkWrapper(props) {

    const {
        onSubmitPutProject,
        onSubmitPutDeveloper,
        initialValuesPutDeveloper,
        actualProject,
        isAdmin,
        location,
        authId,
        getProjectById,
        deleteProject,
        changeProject,
        putTask
    } = props

    function returnProjectAccessRights(isAdmin, actualProject, authId) {
        const projectLeadId = actualProject ? +actualProject.project_lead_id : null
        return isAdmin || +projectLeadId === +authId
    }

    return (
        <div className={style.work_wrapper}>
            {
                <>
                    <Route path='/profile' exact={true} render={() => <Profile/>}/>
                    <Route path='/achievements' exact={true} render={ isAdmin
                        ? () => <AchievementsContainer />
                        : () => <Redirect to={'/profile'}/>
                    }/>
                    <Route path='/profile/:id' exact={true} render={() => <Profile />}/>

                    <Route path='/projects/:page?' render={() => <Projects />}/>
                    <Route path='/developers/:page?' render={ isAdmin
                        ? () => <DevelopersContainer />
                        : () => <Redirect to={'/profile'}/>
                    }/>
                    <Route path='/time_management' render={() => <TimeManagementContainer

                    />}/>

                    <Route path='/put-developer' exact={true} render={ isAdmin
                        ? () => <PutDeveloperForm onSubmitPutDeveloper={onSubmitPutDeveloper} />
                        : () => <Redirect to={'/profile'}/>
                    }/>
                    <Route path='/put-project' render={ isAdmin
                        ? () => <WorkWithProjectForm
                            onSubmit={onSubmitPutProject}
                            initialValues={initialValuesPutDeveloper}
                            actualProject={actualProject}
                            action={'Put'}
                            location={location}/>

                        : () => <Redirect to={'/profile'}/>
                    }/>

                    <Route path={`/single_project/:id?`} render={() => <ProjectsManageSide
                        getProjectById={getProjectById}
                        actualProject={actualProject}
                        deleteProject={deleteProject}
                        changeProject={changeProject}
                        putTask={putTask}
                        accessRights={returnProjectAccessRights(isAdmin, actualProject, authId)}
                    />}/>

                    <Route path={`/notifications/:page?`}
                           render={() => <AllNotificationsContainer
                               rootPath={`/notifications/`}
                               accessRights={isAdmin}
                           />}/>
                </>
            }
        </div>
    )
}