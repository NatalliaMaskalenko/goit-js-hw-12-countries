export default function fetchCountries(url) {
    return fetch(url).
        then(responce => { return responce.json(); })
      
};
