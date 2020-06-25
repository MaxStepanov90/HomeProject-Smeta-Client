export enum Links {
    FindProjectById = "http://localhost:8080/remsmet/projects/",
    FindAllProjects = "http://localhost:8080/remsmet/projects",
    DeleteProject = "http://localhost:8080/remsmet/projects",
    SaveProject = "http://localhost:8080/remsmet/projects",

    FindAllEstimatesByProjectId = "http://localhost:8080/remsmet/estimates/projectId/",
    FindEstimateById = "http://localhost:8080/remsmet/estimates/",
    DeleteEstimate = "http://localhost:8080/remsmet/estimates/",
    SaveEstimate = "http://localhost:8080/remsmet/estimates",

    FindAllEstimateDetails = "http://localhost:8080/remsmet/estimateDetails/estimateId/",
    DeleteEstimateDetail = "http://localhost:8080/remsmet/estimateDetails/",
    UpdateEstimateDetail = "http://localhost:8080/remsmet/estimateDetails",

    FindAllMarkUps = "http://localhost:8080/remsmet/markUps",
    FindMarkUpById = "http://localhost:8080/remsmet/markUps/",
    UpdateMarkUp = "http://localhost:8080/remsmet/markUps",
    DeleteMarkUp = "http://localhost:8080/remsmet/markUps/",

    FindAllPaymentsByProjectId = "http://localhost:8080/remsmet/payments/projectId/",
    FindAllPaymentsByEstimateId = "http://localhost:8080/remsmet/payments/estimateId/"
}