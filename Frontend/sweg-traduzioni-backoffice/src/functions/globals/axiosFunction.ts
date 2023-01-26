// import Auth from '@aws-amplify/auth';
import axios from 'axios';

// async function getDefaultHeaders(){
//     const user = await Auth.currentAuthenticatedUser();
//     console.log('user', user);
//     const token = user.signinUserSession.idtoken.jwtToken;    
// }

// export async function getData(url:string){
//     const headers = await getDefaultHeaders();
//     return axios.get(url, headers);
// }


export async function getData(url:string){
    return axios.get(url);
}