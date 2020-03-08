import { normalize } from "normalizr";

export default function callApiMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      params = {},
      schema
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === "string")
    ) {
      throw new Error("Expected an array of three string types.");
    }
    if (typeof callAPI !== "function") {
      throw new Error("Expected callAPI to be a function.");
    }
    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;
    dispatch(
      Object.assign({}, params, {
        type: requestType
      })
    );

    return callAPI().then(
      response =>
        dispatch(
          Object.assign({}, params, {
            payload: schema ? normalize(response, schema) : response,
            type: successType
          })
        ),
      error =>
        dispatch(
          Object.assign({}, params, {
            error,
            type: failureType
          })
        )
    );
  };
}
