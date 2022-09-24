import { useDispatch, useSelector } from "react-redux";

import { api } from "../api/AxiosClient";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthenticate = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const onRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post("/register", { name, email, password });
      localStorage.setItem("token", data.token);
      dispatch(onLogin(data.name));
    } catch (error) {
      dispatch(onLogout("Ha ocurrido un error, revise los campos digitados"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 4000);
    }
  };
  const startLogin = async (email, password) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post("/login", { email: email, password });
      localStorage.setItem("token", data.token);
      dispatch(onLogin(data.name));
    } catch (error) {
      dispatch(onLogout("Ha ocurrido un error, revise los campos digitados"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 4000);
    }
  };

  const checkToken = async () => {
    dispatch(onChecking());
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await api.get("/renew");

      localStorage.setItem("token", token);

      dispatch(onLogin(data.name));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,
    onRegister,
    startLogin,
    checkToken,
    logout,
  };
};
