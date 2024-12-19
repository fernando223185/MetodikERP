import React, { useState, useEffect } from "react";
import ProfileDropdown from "components/navbar/top/ProfileDropdown";
import { Nav } from "react-bootstrap";
import NineDotMenu from "./NineDotMenu";
import ThemeControlDropdown from "./ThemeControlDropdown";
import EmpresaDropdown from "./EmpresaDropdown";
import { useGetEmpresasUsuario } from "../../../hooks/Navbar/useNavbar";

const TopNavRightSideNavItem = () => {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const { getEmpresasUsuario, empresas, isLoading } = useGetEmpresasUsuario();

  useEffect(() => {
    const fetchEmpresas = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const PersonaID = user && user.ID ? user.ID : null;
      await getEmpresasUsuario(PersonaID);
    };
    console.log(empresas);
    fetchEmpresas();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const EmpresaID = user && user.EmpresaID ? user.EmpresaID : null;
    const EmpresaNombre =
      user && user.EmpresaNombre ? user.EmpresaNombre : null;

    const data = {
      id: EmpresaID,
      nombre: EmpresaNombre,
    };
    setEmpresaSeleccionada(data);
  }, []);

  const handleSelectEmpresa = (id) => {
    const empresa = empresas.find((e) => e?.id?.toString() === id);

    if (!empresa) {
      console.warn("No se encontró una empresa con el ID proporcionado:", id);
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user")
    );

    if (!user) {
      console.error("No se encontró un usuario en el almacenamiento local.");
      return;
    }

    user.EmpresaID = empresa.id;
    user.EmpresaNombre = empresa.nombre;

    localStorage.setItem("user", JSON.stringify(user)); 

    setEmpresaSeleccionada(empresa);

    console.log("Empresa seleccionada:", empresa);
    console.log("Usuario actualizado en localStorage:", user);

    window.location.reload();

  };

  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center"
      as="ul"
    >
      <ThemeControlDropdown />
      <EmpresaDropdown
        empresas={empresas}
        selectedEmpresa={empresaSeleccionada}
        onSelectEmpresa={handleSelectEmpresa}
      />
      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
