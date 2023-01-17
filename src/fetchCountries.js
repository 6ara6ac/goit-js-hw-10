function fetchCountries(name) {
return fetch (`https://restcountries.com/v2/name/${name}`)
.then(resp => {
    if (!resp.ok){
    throw new Error;
    }
    return resp.json()
})
    
}

    export { fetchCountries }