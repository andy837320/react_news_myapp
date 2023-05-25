//context creation
//provider
//consumer //they remove and create below one
//useContext hook
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "CSS",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (url) => {
    dispatch({
      type: "SET_LOADING",
    });
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
      //   isLoading = false;
    } catch (error) {
      console.log(error);
    }
  };

  //to remove my API posts

  const removePost = (post_ID) => {
    dispatch({
      type: "REMOVE_POST",
      payload: post_ID,
    });
  };

  //search post

  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };

  //pagination
  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
      // pageload:
    });
  };

  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
      // pageload:
    });
  };

  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook creation

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
