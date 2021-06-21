import React from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import * as style from './pagination.module.css'

function Pagination({totalCount, paginationSize, match, history, rootValue}) {

    const page = +match.params.page,
        pagesRadiusArray = [],
        countOfPages = Math.ceil(totalCount / paginationSize),

        /*  Границы для заполнение массива значениями 1...[5, 6, 7, 8]...12 */
        startOfIteration = page <= 4 ? 1 : page - 2,
        endOfIteration = page >= (countOfPages - 3) ? countOfPages : page + 2

    for(let i = startOfIteration; i <= endOfIteration; i++)
        pagesRadiusArray.push(i)

    function pageNext() {
        history.push(`${rootValue}${page + 1}`)
    }
    function pagePrev() {
        history.push(`${rootValue}${page - 1}`)
    }

    return (
        <div className={style.pagination_wrapper}>
            <button className={style.arrow + ' ' + (page <= 1 ? style.disabled : '')} onClick={pagePrev} disabled={page <= 1}>
                <span className={style.pagination_item}><b>{'<'}</b></span>
            </button>
            {
                page > 4
                    ? <>
                        <span className={style.pagination_item}><NavLink to={rootValue + '1'}>1</NavLink></span>
                        <span className={style.pagination_item}>&nbsp;...&nbsp;</span>
                    </>
                    : null
            }
            {
                pagesRadiusArray.map(pageItem =>
                    <span className={style.pagination_item + ' ' + (pageItem === page ? style.active : '')} key={pageItem}>
                        &nbsp;<NavLink to={rootValue + pageItem}>{pageItem}</NavLink>
                    </span>)
            }
            {
                page < countOfPages - 3
                    ?  <>
                        <span className={style.pagination_item}>&nbsp;...&nbsp;</span>
                        <span className={style.pagination_item}><NavLink to={rootValue + countOfPages}>{countOfPages}</NavLink></span>
                    </>
                    : null
            }
            <button
                className={style.arrow + ' ' + (page === countOfPages ? style.disabled : '')}
                onClick={pageNext}
                disabled={page === countOfPages}
            >
                <span className={style.pagination_item}><b>{'>'}</b></span>
            </button>
        </div>
    )
}

export default withRouter(Pagination)