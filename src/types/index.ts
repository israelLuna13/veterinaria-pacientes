//oaciente id
export type Patient = {
    id:string
    name:string
    carataker:string
    email:string
    date:Date
    symptoms:string
}

//para un paciente sin id
export type DraftPatient = Omit<Patient,'id'>