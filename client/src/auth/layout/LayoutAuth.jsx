import { Container } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { useAuthenticate } from "../../hooks/UseAuthenticate";
import { Navbar } from "../components";

export const LayoutAuth = ({ children }) => {
  const { errorMessage } = useAuthenticate();

  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [errorMessage]);

  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
