import { Container } from "@mui/material";
import { Navbar } from "../components";

export const LayoutApp = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
