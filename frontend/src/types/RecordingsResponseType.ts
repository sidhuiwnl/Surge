interface User{
    email : string,
    firstName : string,
    id : string,
    image : string,
    lastName : string,


}

export interface RecordingsResponseType{
    createdAt : Date,
    id  : string,
    url : string,
    user : User
}