interface User{
    email : string,
    firstName : string,
    id : string,
    image : string,
    lastName : string,


}

export interface RecordingsResponseType{
    createdAt : Date,
    title : string,
    description : string,
    id  : string,
    url : string,
    user : User
}