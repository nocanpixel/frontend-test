import { Cookies } from "react-cookie";
import { Position, User } from "../types/interfaces";

const cookies = new Cookies();

const _AUTH = import.meta.env.VITE_AUTH_COOKIE;
const _SESSION = import.meta.env.VITE_SESSION_COOKIE;
const _POSITION = import.meta.env.VITE_POSITION;

export class Cookie {
    setAuth(val:number){
        return cookies.set(_AUTH, val, {secure:false,path:'/',maxAge:60*60});
    }
    setUser(val:User){
        return cookies.set(_SESSION, val, {secure:false, path:'/',maxAge:60*60})
    }
    auth(){
        return cookies.get(_AUTH);
    }
    user(){
        return cookies.get(_SESSION);
    }
    removeUser(){
        return cookies.remove(_SESSION);
    }
    setPosition(val:Position){
        return cookies.set(_POSITION, val, {secure:false,path:'/'})
    }
    position(){
        return cookies.get(_POSITION);
    }
}