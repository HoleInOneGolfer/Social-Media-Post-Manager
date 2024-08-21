import './style.css'
const { BASE_URL } = import.meta.env;

document.querySelector<HTMLDivElement>( '#app' )!.innerHTML = `Base URL: ${ BASE_URL }`;