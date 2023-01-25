interface Tenant {
    name: string;
    mainlang: string | null;
    languages:Array<string>,
    users:Array<string>,
  }
  
  export { Tenant };