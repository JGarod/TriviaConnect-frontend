export interface getProfile {
    id_usuario: number;
    avatar: string | null;  
    nombre_usuario: string;
    slug: string;
    uuid_imagen?: string;
    img?: string;
    codeFriend?: string;
    //preferencias

    acepta_solicitud_amistad?: boolean;
    color_primario?: string;
    color_secundario?: string;
    }


export interface ProfileResponse {
    existe: getProfile;
    message: string;
}

export interface getImgUser {
    url: string;
    message: string;
}

export interface PrivateProfileResponse {
    existe: getPrivateProfile;
    message: string;
}

export interface getPrivateProfile {
    id_usuario: number;
    email: string;
    nombre_usuario: string;
    slug: string;
}


export interface sendUpdateBasic {
    email: string;
    nombre_usuario: string;
}
export interface receiveUpdateBasic {
    slug: string;
    message: string;
    token: string;
}

export interface sendChangePassword {
    password: string;
    passwordUno: string;
    passwordDos: string;
}