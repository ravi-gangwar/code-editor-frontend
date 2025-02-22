const getBackendURI = (environment: "development" | "production") => {
    if(environment === "development"){
        return "http://localhost:5001/api/v1/"
    }
    return "https://code-editor-backend-cf7c.onrender.com/api/v1/"
}

export default getBackendURI;