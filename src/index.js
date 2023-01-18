import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';



const countryInfo = document.querySelector ('.country-info')
const countryInput = document.querySelector ('#search-box')

countryInput.addEventListener ('input', debounce(onInputForm, 300))



function onInputForm (evt) {
    evt.preventDefault();
    let item = evt.target.value.trim();

    clearInfo ();

    if (item === '') {
        return;
    };

    fetchCountries(item).then(item => {
        if(item.length > 10){
            return Notiflix.Notify.info ("Too many matches found. Please enter a more specific item.");
        }

        if (item.length <=10 && item.length >= 2){
            return countryList(item);
        }

        if (item.length ===1 ){
            return getCountry(item);
        }
    })

    .catch(error => {
       return Notiflix.Notify.failure ("Oops, there is no country with that name")
    })

}



function getCountry (country){


   const markup = country
   .map(({name, flags, capital,population,languages}) => {
                return `
                <h1><img src=${flags.svg} width='30'> ${name}</h2>
                <ul>
                    <li><b>capital:</b> ${capital}</li>
                    <li><b>population:</b> ${population}</li>
                    <li><b>languages:</b> ${(languages.map(language => language.name)).join(', ')}</li>
                </ul>
                `
            })
            .join('');
            countryInfo.innerHTML = markup;
    }


    function countryList (countries) {
        const markupList = countries
        .map(({name, flags}) => {
           return `
            <ul>
            <li><img src=${flags.svg} width='40'> ${name}</li>
            </ul>
            `
        }).join('');
        countryInfo.innerHTML = markupList;
    }

    function clearInfo () {
        countryInfo.innerHTML = "";
    }

