import React, {Fragment, useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import './ProjectStyle.css';
import {MyToast} from "../../Generic/MyToast/MyToast";
import {ProjectListHeader} from "./ProjectListHeader";
import {ProjectListTable} from "./ProjectListTable";
import {ProjectListFooter} from "./ProjectListFooter";
import {useDispatch, useSelector} from "react-redux";
import {findAllProjects} from "../../../service/actions/projectActions";
import {IRootState} from "../../../interfaces/IRootState";

const ProjectList: React.FC = () => {

    const projectsPerPage = 5
    const dispatch = useDispatch()
    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)
    const projects = useSelector((state: IRootState) => state.projects.projects)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(findAllProjects())
    }, [dispatch])

    const firstPage = () => {
        if (currentPage > 1) {
            setCurrentPage(1)
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    };

    const lastPage = () => {
        let usersLength = projects.length;
        let condition = Math.ceil(usersLength / projectsPerPage);
        if (currentPage < condition) {
            setCurrentPage(condition)
        }
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    };

    const changePage = (event: any) => {
        setCurrentPage(event.target.value)
    };

    const lastIndex = currentPage * projectsPerPage;
    const firstIndex = lastIndex - projectsPerPage;
    const currentProjects = projects.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    return (
        <Fragment>
            <MyToast show={show} message={messageText} type={messageType}/>
            <Card className="border border-dark m-3">
                <Card.Header>
                    <ProjectListHeader/>
                </Card.Header>
                <Card.Body>
                    <ProjectListTable projects={currentProjects}/>
                </Card.Body>
                {currentProjects.length > 0 ?
                    <Card.Footer>
                        <ProjectListFooter currentPage={currentPage} totalPages={totalPages}
                                           onFirstPage={firstPage} onPrevPage={prevPage}
                                           onChangePage={changePage} onNextPage={nextPage}
                                           onLastPage={lastPage}
                        />
                    </Card.Footer> : null}
            </Card>
        </Fragment>
    )
}

export default ProjectList