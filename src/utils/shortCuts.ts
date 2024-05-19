import { Auth } from "../types/interfaces";
import { Cookie } from "./tools";
import { users } from "./users";

export const firstUpperCase = (string:string) => string.split('')[0].toUpperCase()+string.slice(1);


const cookie = new Cookie();

export const mockingUser = async (data:Auth) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = users.find(element => element.email === data.email && element.password === data.password);

    if(!user)throw new Error("User or password are incorrect.");

    cookie.setAuth(1);
    return {
        name:user.name,
        email:user.email,
        rol:user.rol
    };
}