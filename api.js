const url_base = "http://localhost:3000"

async function request(path, option = {}) {
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() =>{
        controller.abort()
    },8000)

    try{
        const response = await fetch(`${url_base}${path}`,{
            ...option,
            signal:controller.signal,
        });
        if(!response.ok){
            const error = new Error("Échec de la requête HTTP");


            error.type = "http";
            error.status = response.status;
            throw error;
        }
        let data;
        try{
            data = await response.json();
        }catch(error){
            const jsonError = new Error("Réponse JSON invalide");


            jsonError.type = "parse";
            jsonError.status = response.status;
            throw jsonError;
        }
        // console.log(data)
        return data;
        
    }catch(error){
        if(error.type){
            throw error;
        }
        if(error.name === "AbortError"){
           const  errorAbort = new Error("La requête a expiré après 8 secondes ")
            errorAbort.type = "timeout";
            errorAbort.status = null;
            throw errorAbort;
        }
        if(!navigator.onLine){
            const offlineError = new Error("Aucune connexion Internet")

            offlineError.type = "offline";
            offlineError.status  = null;

            throw offlineError;
        }
        const errorApi = new Error("Impossible de se connecter au serveur");
        errorApi.type = "network";
        errorApi.status = null;
        throw errorApi;
    }finally{
        clearTimeout(timeoutId)
    }
}
export { request };