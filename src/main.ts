import './style.css'
const { BASE_URL } = import.meta.env;

import alt from './alt';

document.querySelector<HTMLDivElement>( '#app' )!.innerHTML = `Base URL: ${ BASE_URL }`;
alt();