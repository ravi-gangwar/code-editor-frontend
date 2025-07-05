const getBackendURI = () => {
    console.log(process.env.NEXT_ENV)
    if(process.env.NEXT_ENV === "production"){
        return process.env.NEXT_PUBLIC_BACKEND_URI
    }
    return process.env.NEXT_PUBLIC_BACKEND_URI
}

const getSocketURI = () => {
    if(process.env.NEXT_ENV === "production"){
        return process.env.NEXT_PUBLIC_SOCKET_URI
    }
    return process.env.NEXT_PUBLIC_SOCKET_URI
}

export { getBackendURI, getSocketURI };