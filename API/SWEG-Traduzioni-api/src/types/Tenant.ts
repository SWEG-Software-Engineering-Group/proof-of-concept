interface Tenant {
    name: string;
    mainlang: string | null;
    languages:[string],
    users:[string],
  }
  
  export { Tenant };