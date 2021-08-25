import httpService from "./httpService";
// import axios from "axios";
const apiendpoint = "http://localhost:3900/api/auth";


export function signin(input){
    return httpService.post(apiendpoint,{
        email:input.username,
        password:input.password
    })
}