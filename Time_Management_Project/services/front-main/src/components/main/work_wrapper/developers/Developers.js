import React from 'react'
import Loader from '../../../utils_components/Loader'
import DeveloperSearchForm from './DeveloperSearchForm'
import Pagination from '../../../utils_components/pagination/Pagination'
import {Redirect} from 'react-router-dom'
import * as style from './developers.module.css'
import SingleDeveloper from './developer/Developer'

export default function Developers(props) {

    const {
        page,
        totalPagesCount,
        totalDevelopersCount,
        loading,
        setLoading,
        developersList,
        paginationSize,
        rootPath,
        AddDeveloper,
        onSubmitSearchDevelopers,
        deleteDeveloperAction,
        onSubmitAddDeveloperCreator,
        accessRights
    } = props

    const onSubmitAddDeveloper = onSubmitAddDeveloperCreator
        ? onSubmitAddDeveloperCreator(setLoading)
        : null

    //Второе условие для отлова частного случая, при котором мы не найдем ни одного разработчика при поиске
    //но при этом редирект не нужен
    if((page > totalPagesCount || page < 1) && !(totalDevelopersCount === 0  && page === 1))
        return <Redirect to={`${rootPath}1`}/>

    else
        return (
            <div>
                <div className={style.developers_wrapper_actions}>
                    <DeveloperSearchForm
                        onSubmitSearchDevelopers={onSubmitSearchDevelopers}
                    />
                    {
                        AddDeveloper && accessRights
                            ? <AddDeveloper
                                onSubmitAddDeveloper={onSubmitAddDeveloper}
                            />
                            : null
                    }

                </div>
                <div className='founded'>
                    Developers found:&nbsp;<span>{totalDevelopersCount}</span>
                </div>
                {
                    loading
                        ? <Loader/>
                        : developersList.map(developer => <SingleDeveloper
                            avatarURL={developer.developer_avatar_url}
                            name={developer.developer_name}
                            surname={developer.developer_surname}
                            email={developer.developer_email}
                            id={developer.developer_id}
                            specialty={developer.developer_specialty}
                            position={developer.developer_position}
                            key={developer.developer_id}
                            deleteDeveloperAction={deleteDeveloperAction}
                        />)
                }
                {
                    totalPagesCount > 1
                        ? <Pagination
                            totalCount={totalDevelopersCount}
                            paginationSize={paginationSize}
                            rootValue={rootPath}
                        />
                        : null
                }
            </div>
        )
}