export interface IRegistro {
    nombre_usuario: string;
    email: string;
    passwordUno: string;
    passwordDos: string;
}


export interface ApiResponse {
    message: string;           // Mensaje principal
    detalles?: string[];       // Lista de errores opcional
}
