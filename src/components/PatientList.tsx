import { usePatientStore } from "../store"
export const PatientList = () => {
  const patients = usePatientStore(state => state.patients)
  console.log(patients)
  return (
    <div>PatientList</div>
  )
}
