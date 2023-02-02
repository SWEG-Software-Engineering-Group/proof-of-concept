import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import TenantListItem from './TenantListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TenantList(){
    const [error, setError]         = useState(null);
    const [isLoaded, setIsLoaded]   = useState(false);
    const [items, setItems]         = useState([]);
    let [contatore,setcontatore]  = useState(0);
  
    // LOGICA

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("http://localhost:3000/dev/allTenants")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

    let a ;
    let b ;
    let c ;
    let nometenant ;
    let myJSON = JSON.stringify(items);     // prendo i dati dei vari tenant e li metto sottoforma di stringa
    let counter ;
    let listanomitenant = ["prova"];
    let contatorilistanomi = 0;

    //console.log(items);
    while (counter != -1 ){
        a = myJSON.indexOf("name");   // trova l'indice del name
        b = myJSON.slice(a+7);        // toglie tutto quello che nella stringa ( toglie anche "name")  
        c = b.indexOf('"');           // trova le ultime virgolette
        nometenant = b.slice(0,c);    // estrae il nome del tenant  
        //console.log(nometenant);
        myJSON=b;                       
        counter=b.search("name");
        listanomitenant[contatorilistanomi]= nometenant;
        contatorilistanomi++;
    }


    console.log(listanomitenant);

    
    //const arrayDiNomi = ['tenant 1', 'tenant 2', 'tenant 3'];    // variabile di prova da togliere    

    listanomitenant.sort();     // ordino i tenant per ordine alfabetico

    // funzione che ritorna i blocchi html in rect divisi per ogni tenant
    let counter2 : number = 0;
    console.log(listanomitenant);
    const arrayDiTenantListItem : any = listanomitenant.map((nome) => {
      counter2++;
      if(nome != 'nts'){
      return (
      (counter2 %2) == 0 
      ? 
      <TenantListItem bgcolor='primary.main' tenantName={nome}/> 
      :
      <TenantListItem bgcolor='secondary.main' tenantName={nome}/> ) ;
      }
      });
               
    return(
        <List
        sx={{ width: '100%', maxWidth: 360}}
        >
            {arrayDiTenantListItem}
        </List>
    )
      
}