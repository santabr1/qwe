import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import AllTasks from './AllTasks'

function AllTasksSide(props) {

    const {
        tasksList,
        match,
        getTasks,
        getTotalTasksCount,
        totalTasksCount,
        pagSize,
        history,
        accessRights
    } = props

    let page = match.params.page ? +match.params.page : 1
    const projectId = match.params.id
    const totalPagesCount = Math.ceil(totalTasksCount / pagSize)

    const [loading, setLoading] = useState(false)
    const [searchTitle, setSearchTitle] = useState(undefined)

    useEffect(() => {

        setLoading(true)
        getTotalTasksCount(projectId, searchTitle)
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, [])

    useEffect(() => {

        setLoading(true)
        history.push(`/single_project/${projectId}/tasks/all_tasks/1`)

        getTasks(projectId, 1, searchTitle)
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, [totalTasksCount])

    useEffect(() => {

        setLoading(true)

        //Проверка на валидность страницы. Впоследствие произойдет редирект
        if(page >= 1 && page <= totalPagesCount) {
            getTasks(projectId, page, searchTitle)
                .catch((err) => {
                    console.log(err)
                    alert(err.message)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }

    }, [page])

    function onSubmitSearchTasks(values) {
        setLoading(true)
        setSearchTitle(values.title)
        getTotalTasksCount(projectId, values.title)
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    return <AllTasks
        page={page}
        totalPagesCount={totalPagesCount}
        totalTasksCount={totalTasksCount}
        projectId={projectId}
        loading={loading}
        getTotalTasksCount={getTotalTasksCount}
        accessRights={accessRights}
        tasksList={tasksList}
        pagSize={pagSize}
        onSubmitSearchTasks={onSubmitSearchTasks}
    />
}

export default withRouter(AllTasksSide)