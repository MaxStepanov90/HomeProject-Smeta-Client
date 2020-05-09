import React, {Component, Fragment} from 'react';
import Card from "react-bootstrap/Card";
import './ProjectStyle.css';
import ProjectListHeader from "./ProjectListHeader";
import MyToast from "../../Generic/MyToast";
import ProjectListFooter from "./ProjectListFooter";
import ProjectListTable from "./ProjectListTable";

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            search: '',
            currentPage: 1,
            projectsPerPage: 6,
            sortToggle: true
        };
        // this.searchChange = this.searchChange.bind(this);
        // this.searchData = this.searchData.bind(this);
        // this.cancelSearch = this.cancelSearch.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.changePage = this.changePage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
    }

    sortData = () => {
        this.setState(state => ({
            sortToggle: !state.sortToggle
        }));
        this.findAllProjects(this.state.currentPage);
    };

    componentDidMount() {
        this.findAllProjects(this.state.currentPage);
    }

    findAllProjects(currentPage) {
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

    deleteProject = (projectId) => {
        console.log(projectId)
        fetch("http://localhost:8080/remsmet/projects/" + projectId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(project => {
                if (project) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        projects: this.state.projects.filter(project => project.id !== projectId)
                    });
                } else {
                    this.setState({"show": false});
                }
            })
    };

    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllProjects(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        })
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllProjects(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            if (this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllProjects(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.projectsPerPage);
        if (this.state.currentPage < condition) {
            if (this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllProjects(condition);
            }
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.projectsPerPage)) {
            if (this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllProjects(this.state.currentPage + 1);
            }
        }
    };

    searchChange = (search) => {
        this.setState({
            search: search
        })
    };

    cancelSearch = () => {
        this.findAllProjects(this.state.currentPage)
    };

    searchData = (currentPage) => {
        console.log(currentPage)
        console.log(this.state.search)
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
        const {projects, currentPage, totalPages, show, sortToggle} = this.state;
        return (
            <Fragment>
                <MyToast show={show} message={"Проект удален."} type={"danger"}/>
                <Card className="border border-dark m-3">
                    <Card.Header>
                        <ProjectListHeader currentPage={currentPage}
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