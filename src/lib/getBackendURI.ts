const getBackendURI = (environment: "development" | "production") => {
    if(environment === "development"){
        return "http://localhost:5001/api/v1/"
    }
    return "https://code-editor-backend-0pia.onrender.com/api/v1/"
}

export default getBackendURI;