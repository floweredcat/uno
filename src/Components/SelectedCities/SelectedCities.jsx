import { useSelector } from "react-redux";
import { selectCityFranshisesById } from "../../store/CityFranshises/selectors";


export function SelectedCity ({id}) {
    
    const selectedCity = useSelector(state => selectCityFranshisesById(state, {id}))

    return <span >{selectedCity.NAME}</span>
}