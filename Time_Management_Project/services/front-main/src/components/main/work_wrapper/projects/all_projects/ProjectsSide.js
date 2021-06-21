import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import AllProjects from './Projects'

function ProjectsSide(props) {

    const {
        projectsList,
        totalCount,
        pagSize,
        getProjects,
        getProjectsCount,
        isAdmin,
        match,
        history
    } = props

    let page = match.params.page ? +match.params.page : 1
    const totalPagesCount = Math.ceil(totalCount / pagSize)

    const [loading, setLoading] = useState(false)
    const [searchTitle, setSearchTitle] = useState(undefined)

    useEffect(() => {

        setLoading(true)
        getProjectsCount(searchTitle)
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, [])

    useEffect(() => {

        setLoading(true)
        history.push('/projects/1')

        getProjects(1, searchTitle)
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, [totalCount])

    useEffect(() => {

        setLoading(true)

        //Проверка на валидность страницы. Впоследствие произойдет редирект
        if(page >= 1 && page <= totalPagesCount) {
            getProjects(page, searchTitle)
                .catch((err) => {
                    console.log(err)
                    alert(err.message)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }

    }, [page])

    function onSubmitSearchProject(values) {
        setLoading(true)
        setSearchTitle(values.title)
        getProjectsCount(values.title)
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    return <AllProjects
        projectsList={projectsList}
        totalCount={totalCount}
        pagSize={pagSize}
        isAdmin={isAdmin}
        page={page}
        totalPagesCount={totalPagesCount}
        loading={loading}
        onSubmitSearchProject={onSubmitSearchProject}
    />
}

export default withRouter(ProjectsSide)

