import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";


export const NavigationBar: React.FC = () => {
    return (

        <Navbar bg="dark" variant="dark">
            <Link to={""} className="navbar-brand">
                РемСмет
            </Link>
            <Nav className="mr-auto">
                <Link to={"/addProject"} className="nav-link">Создать проект</Link>
                <Link to={"/projects"} className="nav-link">Список проектов</Link>
                <Link to={"/markUps"} className="nav-link">Наценки</Link>
                <Link to={"/info"} className="nav-link">Контакты</Link>
            </Nav>
        </Navbar>
    )
}
