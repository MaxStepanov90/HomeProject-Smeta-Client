import React, {Fragment} from 'react';
import Card from "react-bootstrap/Card";
import './ProjectStyle.css';
import {MyToast} from "../../Generic/MyToast/MyToast";
import {IProject} from "../../../interfaces/IProject";
import {ProjectListHeader} from "../projectList/ProjectListHeader";
import {ProjectListTable} from "../projectList/ProjectListTable";
import {ProjectListFooter} from "../projectList/ProjectListFooter";

type ProjectListProps = {}
type ProjectListState = {
    projects: IProject[],
    search: string,
    currentPage: number,
    projectsPerPage: number,
    sortToggle: boolean,
    totalPages: number,
    totalElements: number,
    show: boolean
}
export default class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
    constructor(props: ProjectListProps) {
        super(props);
        this.state = {
            projects: [],
            search: '',
            currentPage: 1,
            projectsPerPage: 6,
            sortToggle: true,
            totalPages: 0,
            totalElements: 0,
            show: false
        };
    }

    componentDidMount() {
        this.findAllProjects(this.state.currentPage);
    }

    findAllProjects(currentPage: number): void {
        currentPage -= 1;
        let sortDir = this.state.sortToggle ? "asc" : "desc";
        fetch("http://localhost:8080/remsmet/projects?pageNumber="
            + currentPage + "&pageSize=" + this.state.projectsPerPage + "&sortBy=projectCreationDate&sortDir=" + sortDir)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    projects: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                })
            });
    }

    deleteProject = (projectId: number): void => {
        fetch("http://localhost:8080/remsmet/projects/" + projectId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(project => {
                if (project) {
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false}), 3000);
                    this.setState({
                        projects: this.state.projects.filter(project => project.id !== projectId)
                    });
                } else {
                    this.setState({show: false});
                }
            })
    };

    sortData = (): void => {
        this.setState(state => ({
            sortToggle: !state.sortToggle
        }));
        this.findAllProjects(this.state.currentPage);
    };

    changePage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllProjects(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        } as any)
    };

    firstPage = (): void => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllProjects(firstPage);
            }
        }
    };

    prevPage = (): void => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            if (this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllProjects(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = (): void => {
        let condition = Math.ceil(this.state.totalElements / this.state.projectsPerPage);
        if (this.state.currentPage < condition) {
            if (this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllProjects(condition);
            }
        }
    };

    nextPage = (): void => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.projectsPerPage)) {
            if (this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllProjects(this.state.currentPage + 1);
            }
        }
    };

    searchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [event.target.name]: event.target.value
        } as any)
    };

    cancelSearch = (): void => {
        this.findAllProjects(this.state.currentPage)
        this.setState({
            search: ''
        })
    };

    searchData = (currentPage: number): void => {
        currentPage -= 1;
        fetch("http://localhost:8080/remsmet/projects/search/" +
            this.state.search + "?page=" + currentPage + "&size=" + this.state.projectsPerPage)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    projects: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                })
            });
    };

    render() {
        const {search, projects, currentPage, totalPages, show, sortToggle} = this.state;
        return (
            <Fragment>
                <MyToast show={show} message={"Проект удален."} type={"danger"}/>
                <Card className="border border-dark m-3">
                    <Card.Header>
                        <ProjectListHeader search={search}
                                           currentPage={currentPage}
                                           onSearchChange={this.searchChange}
                                           onSearchData={this.searchData}
                                           onCancelSearch={this.cancelSearch}
                        />
                    </Card.Header>
                    <Card.Body>
                        <ProjectListTable projects={projects}
                                          sortToggle={sortToggle}
                                          onSortData={this.sortData}
                                          onDeleteProject={this.deleteProject}
                        />
                    </Card.Body>
                    {projects.length > 0 ?
                        <Card.Footer>
                            <ProjectListFooter currentPage={currentPage} totalPages={totalPages}
                                               onFirstPage={this.firstPage} onPrevPage={this.prevPage}
                                               onChangePage={this.changePage} onNextPage={this.nextPage}
                                               onLastPage={this.lastPage}
                            />
                        </Card.Footer> : null}
                </Card>
            </Fragment>
        )
    }
}