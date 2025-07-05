const getBackendURI = () => {
    console.log(process.env.NEXT_ENV)
    if(process.env.NEXT_ENV === "production"){
        return "http://localhost:5002/api/v1/"
    }
    return "http://34.28.102.147:5000/api/v1/"
}

const getSocketURI = () => {
    if(process.env.NEXT_ENV === "production"){
        return "ws://localhost:8080"
    }
    return "ws://34.28.102.147:8080"
}

export { getBackendURI, getSocketURI };