import { franshisesSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";


export const getFransheses = ({userId}) => (dispatch) => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          id: userId,
        }),
      };
      dispatch(franshisesSliceActions.startLoading())

    fetch("https://wsuno.xyz/api/getFransheses", options)
    .then(res => res.json()) 
    .then(data => {
      if (!data.OK) {
        throw Error(data.error)
      }
        dispatch(franshisesSliceActions.successLoading(normolizeEntities(data.result)))
    })
    .catch(err => {
      console.log(err)
      dispatch(franshisesSliceActions.failLoading(err))
    })
}