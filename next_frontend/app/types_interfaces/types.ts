type productType = {
    productId: string,
    Img: string, Description: string,
    Title: string
}

type userInterface = {
    Name: string;
    FullName: string;
    ProfileImage: string;
    Email: string;
    Password: string;
    Phone: number | string
    IsAdmin: boolean;
    IsBlocked: boolean;
}

type responseType = {
    status:boolean,
    message:string,
    token?:string,
    data?:any
}