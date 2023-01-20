import { franshisesSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";


export const getFransheses = ({userId}) => (dispatch) => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          userId,
        }),
      };
      dispatch(franshisesSliceActions.startLoading())

    fetch("http://localhost:4000/getFranshises", options)
    .then(res => res.json()) 
    .then(data => {
        dispatch(franshisesSliceActions.successLoading(normolizeEntities(data)))
    })
    .catch(err => {
      dispatch(franshisesSliceActions.failLoading(err))
    })
}