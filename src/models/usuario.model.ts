
export class Usuario {

    // el orden de las propiedades del objeto es importante,
    // debido a que a la hora de instanciar un objeto de este tipo se debe respetar el orden.
    // Si una propiedad es OPCIONAL:
    //            TODAS LAS QUE VIENEN A CONTINUACION DEBEN SER OPCIONALES,
    //            O TIENE QUE TENER UN VALOR POR DEFECTO.
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }

}