export default interface Tenant{
    name:string,
    admin: string,
    defaultLanguage: string,
    users: string[],
    languages: string[],
}