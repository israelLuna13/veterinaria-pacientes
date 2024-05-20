import { create } from "zustand"
import { DraftPatient, Patient } from "./types"
import {v4 as uuidv4} from 'uuid'
import { devtools,persist} from  'zustand/middleware'

type PatienteState={
    //state
    patients :Patient[]
    activeId:Patient['id']
    //accion
    addPatient:(data:DraftPatient) => void
    deletePatient:(id:Patient['id'])=>void
    getPatienteById:(id:Patient['id']) => void
    updatePatient:(data:DraftPatient)=>void
}

//creamos un paciente con id, tomamos el paciente temporal y le agregamos un id
const createPatient=(patient:DraftPatient) :Patient =>{
    return {...patient, id:uuidv4()}
}

//devtools: Proporciona herramientas de desarrollo que permiten inspeccionar y modificar el estado desde el navegador.
//persist: Permite persistir el estado en el almacenamiento local del navegador, configurado con el nombre 'patient-storage'
export const usePatientStore = create<PatienteState>()
(devtools(
    persist((set)=>({
    patients:[],
    activeId:'',

    //agregar paciente
    addPatient:(data)=>{
        const newPatient = createPatient(data)//paciente con id
        //escribimos en el state, hacemos una copia de lo que ya tenemos y le agregamos lo nuevo que viene
        set((state)=>({
            patients:[...state.patients, newPatient ]
        }))
    },
    //eliminamos un paciente, mantenemos los pacientes diferentes del que se selecciono 
    deletePatient:(id) => {
        set((state)=>({
            patients:state.patients.filter(patient => patient.id !== id)

        }))
    },
    //obtenemos el id de un paciente que se quiere editar
    getPatienteById:(id) =>{
        set(()=>({
            activeId:id
        }))
    },

    //actualizamos un paciente
    //buscamos en el state el id activo y actualizamos sus datos , si no se encuentra se vuelve el paciente sin editar
    updatePatient:(data)=>{
        set((state)=>({
            patients:state.patients.map(patient => patient.id === state.activeId ? {id:patient.id,...data}
                :patient),
            activeId: ''

        }))
    }
}),
{
    name:'patient-storage', //agregamos al localStorage
})
))