import './style.css'
const { BASE_URL } = import.meta.env;

document.title = `Base URL: ${ BASE_URL }`;

var app = document.querySelector<HTMLDivElement>( '#app' )!;