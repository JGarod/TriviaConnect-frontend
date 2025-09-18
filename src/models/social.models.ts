export class allUserData {
    constructor(
        public user: UserDataProfile,
        public amigos: AmigoDataProfile[],
    ) {
    }
}
export class AmigoDataProfile {
    constructor(
        public id_usuario: number,
        public nombre_usuario: string,
        public slug: string,
        public uuid_imagen: string,
        public img?: string,
       
    ) {
    }
}
export class UserDataProfile {
    constructor(
        public nombre_usuario: string,
        public slug: string,
        public uuid_imagen: string,
        public codeFriend: string,
        public preferencias: Preferencias,
        public img: string,

       
    ) {
    }
}

export class Preferencias {
    constructor(
        public acepta_solicitud_amistad: boolean,
        public color_primario: string,
        public color_secundario: string,

    ) {
    }
}

