import React, {Dispatch, Fragment} from 'react';
import Card from "react-bootstrap/Card";
import './ProjectStyle.css';
import {MyToast} from "../../Generic/MyToast/MyToast";
import {ProjectListHeader} from "./ProjectListHeader";
import {ProjectListTable} from "./ProjectListTable";
import {ProjectListFooter} from "./ProjectListFooter";
import {connect} from "react-redux";
import {deleteProject, findAllProjects} from "../../../service/actions/projectActions";

type ProjectListProps = {
    show: any,
    messageText: any,
    messageType: any,
    projects: any,
    findAllProjects: () => void,
    deleteProject: (projectId: any) => void
}
type ProjectListState = {
    currentPage: number,
    projectsPerPage: number,
}

class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
    constructor(props: ProjectListProps) {
        super(props);
        this.state = {
            currentPage: 1,
            projectsPerPage: 6,
        };
    }

    componentDidMount() {
        this.props.findAllProjects();
    }

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        let usersLength = this.props.projects.length;
        let condition = Math.ceil(usersLength / this.state.projectsPerPage);
        if (this.state.currentPage < condition) {
            this.setState({
                currentPage: condition
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.props.projects.length / this.state.projectsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    changePage = (event: any) => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        } as any)
    };

    render() {
        const {currentPage, projectsPerPage} = this.state;
        const projects = this.props.projects;
        const lastIndex = currentPage * projectsPerPage;
        const firstIndex = lastIndex - projectsPerPage;
        const currentProjects = projects.slice(firstIndex, lastIndex);
        const totalPages = Math.round(projects.length / projectsPerPage);

        return (
            <Fragment>
                <MyToast show={this.props.show} message={this.props.messageText} type={this.props.messageType}/>
                <Card className="border border-dark m-3">
                    <Card.Header>
                        <ProjectListHeader currentPage={currentPage}/>
                    </Card.Header>
                    <Card.Body>
                        <ProjectListTable projects={currentProjects}
                                          onDeleteProject={this.props.deleteProject}
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

const mapStateToProps = (state: any) => {
    return {
        show: state.app.show,
        messageText: state.app.messageText,
        messageType: state.app.messageType,
        projects: state.projects.projects
    }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        findAllProjects: () => (dispatch(findAllProjects())),
        deleteProject: (projectId: number) => (dispatch(deleteProject(projectId))),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)