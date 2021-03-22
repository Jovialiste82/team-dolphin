import React, { useContext, useEffect } from "react";
import { authenticate, setRedirect } from "../actions/user";
import { UserContext } from "../context/user";

const PagesWrapper = ({ children }) => {
  const { dispatch, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    authenticate(dispatch);
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default PagesWrapper;
