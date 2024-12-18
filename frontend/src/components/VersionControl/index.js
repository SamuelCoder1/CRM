import React, { useState, useEffect } from "react";
import api from "../../services/api";

const packageVersion = require("../../../package.json").version;

const VersionControl = () => {
  const [storedVersion] = useState(window.localStorage.getItem("version") || "0.0.0");

  const handleUpdateVersion = async () => {
    window.localStorage.setItem("version", packageVersion);

    // Mantener solo para guardar en la base de datos la versión actual
    await api.post("/version", {
      version: packageVersion,
    });

    // Limpiar el caché del navegador
    caches.keys().then((names) => {
      for (let name of names) caches.delete(name);
    });

    // Retraso para garantizar que el caché ha sido limpiado
    setTimeout(() => {
      window.location.reload(true); // Recargar la página
    }, 1000);
  };

  // El botón de actualización ya no se muestra
  /*
  return (
    <div>
      {storedVersion !== packageVersion && (
        <Button
          variant="contained"
          size="small"
          style={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            right: "15px",
          }}
          onClick={handleUpdateVersion}
        >
          Nueva versión disponible! Haz clic aquí para actualizar 🔄
        </Button>
      )}
    </div>
  );
  */

  return null; // No se muestra nada en pantalla
};

export default VersionControl;
