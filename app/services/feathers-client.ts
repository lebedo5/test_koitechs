import rest from '@feathersjs/rest-client';
import { feathers } from "@feathersjs/feathers";
import axios from "axios";
const storageKey = 'flipfam-jwt';

axios.defaults.validateStatus = (status) => status >= 200 && status < 400;


const restClient = rest("https://api.github.com/");
export const feathersApp = feathers();
// feathersApp.configure(restClient.axios(axios));
// feathersApp.configure(restClient.fetch(window.fetch.bind(window)))

feathersApp.configure(restClient.axios(axios));

export const usersService = feathersApp.service('users');
export const app = feathersApp;
