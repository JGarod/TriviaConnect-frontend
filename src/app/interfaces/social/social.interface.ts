import { allUserData } from "../../../models/social.models";

export interface socialData {
    message: string;
    data: allUserData;
}


export interface GetUsersByString {
    usuarios: UsuarioByString[];
}

export interface UsuarioByString {
    id_usuario:number,
    nombre_usuario: string;
    slug: string;
    uuid_imagen: string;
    codeFriend: string;
    amistad_status:string|null
    avatar?:string
}



export interface ActivityResponse {
    data: DatumActivity[];
    total: number;
    totalPages: number; 
    page: number;
    lastCreatedAt: string;
}

export interface DatumActivity {
    id: number;
    tipo: string;
    createdAt: Date;
    usuario_a: Usuario;
    usuario_b: Usuario;
}

export interface Usuario {
    id_usuario: number;
    nombre_usuario: string;
    uuid_imagen: string;
    slug: string;
}

