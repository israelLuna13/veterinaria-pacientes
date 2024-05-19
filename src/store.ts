import { create } from "zustand"
import { DraftPatient, Patient } from "./types"
import {v4 as uuidv4} from 'uuid'
type PatienteState={
    patients :Patient[]
    addPatient:(data:DraftPatient) => void
}

const createPatient=(patient:DraftPatient) :Patient =>{
    return {...patient, id:uuidv4()}
}
export const usePatientStore = create<PatienteState>((set)=>({
    patients:[],
    addPatient:(data)=>{


        const newPatient = createPatient(data)
        //escribimos en el state
        set((state)=>({
            patients:[...state.patients, newPatient ]
        }))
    }
}))