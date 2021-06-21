import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Developers from './Developers'

function DevelopersSide(props) {

    const {
        totalDevelopersCount,
        paginationSize,
        developersList,
        getDevelopers,
        getTotalCount,
        match,
        history,
        rootPath,
        AddDeveloper,
        deleteDeveloperAction,
        onSubmitAddDeveloperCreator,
        accessRights
    } = props

    let page = match.params.page ? +match.params.page : 1
    const totalPagesCount = Math.ceil(totalDevelopersCount / paginationSize)

    const [loading, setLoading] = useState(false)
    const [searchEmail, setSearchEmail] = useState(undefined)
    const [searchSurname, setSearchSurname] = useState(undefined)

    useEffect(() => {
        setLoading(true)

        getTotalCount()
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, [])

    useEffect(() => {

        //При изменении общего числа пользователей переход на первую страницу
        //и получение разрабочиков по данным, полученым из DevelopersSearchForm.
        //Если данных не получено - получение всех пользователей
        history.push(rootPath + '1')
        getDevelopers(1, searchEmail, searchSurname)
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, [totalDevelopersCount])

    useEffect(() => {
        setLoading(true)

        //Запрос на получение только при валидной странице.
        //Впоследствие произойдет редирект
        if(page >= 1 && page <= totalPagesCount) {

            //Получение разработчиков при изменении страницы
            getDevelopers(page, searchEmail, searchSurname)
                .catch((err) => {
                    console.log(err)
                    alert(err.message)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }

    }, [page])

    function onSubmitSearchDevelopers(values) {
        setLoading(true)
        setSearchEmail(values.email)
        setSearchSurname(values.surname)

        //При изменении общего числа пользователей
        //в родительской компоненте будут получены пользователи по данным
        //email и surname
        getTotalCount(values.email, values.surname)
            .then(() => setLoading(false))
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
    }

    function deleteDeveloper(developerId) {
        // eslint-disable-next-line no-restricted-globals
        if(deleteDeveloperAction && confirm('Are you sure to delete this developer from task?')) {
            setLoading(true)
            deleteDeveloperAction(developerId)
                .then(() => getTotalCount())
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                })
                .finally(() => setLoading(false))
        }
    }

    return <Developers
        page={page}
        totalPagesCount={totalPagesCount}
        totalDevelopersCount={totalDevelopersCount}
        getDevelopers={getDevelopers}
        setLoading={setLoading}
        getTotalCount={getTotalCount}
        setSearchEmail={setSearchEmail}
        setSearchSurname={setSearchSurname}
        loading={loading}
        developersList={developersList}
        paginationSize={paginationSize}
        AddDeveloper={AddDeveloper}
        rootPath={rootPath}
        onSubmitSearchDevelopers={onSubmitSearchDevelopers}
        deleteDeveloperAction={deleteDeveloperAction ? deleteDeveloper : null}
        onSubmitAddDeveloperCreator={onSubmitAddDeveloperCreator}
        accessRights={accessRights}
    />
}

export default withRouter(DevelopersSide)