class FormatMask {
  setPhoneFormatMask(phoneToFormat) {
    if (!phoneToFormat || phoneToFormat.length < 12) {
      return phoneToFormat;
    }

    // Eliminamos cualquier carácter que no sea numérico
    const number = ("" + phoneToFormat).replace(/\D/g, "");

    if (number.length === 12) {
      // Formato para números de 12 dígitos
      const phoneNumberFormatted = number.match(/^(\d{3})(\d{3})(\d{3})(\d{3})$/);
      if (phoneNumberFormatted) {
        return (
          "+(" +
          phoneNumberFormatted[1] +
          ") " +
          phoneNumberFormatted[2] +
          phoneNumberFormatted[3] +
          "-" +
          phoneNumberFormatted[4]
        );
      }
    } else if (number.length === 13) {
      // Formato para números de 13 dígitos
      const phoneNumberFormatted = number.match(/^(\d{3})(\d{3})(\d{5})(\d{3})$/);
      if (phoneNumberFormatted) {
        return (
          "+(" +
          phoneNumberFormatted[1] +
          ") " +
          phoneNumberFormatted[2] +
          phoneNumberFormatted[3] +
          "-" +
          phoneNumberFormatted[4]
        );
      }
    }

    // Si no cumple con el formato esperado, retornar sin cambios
    return phoneToFormat;
  }

  removeMask(number) {
    // Elimina todos los caracteres no numéricos
    const filterNumber = number.replace(/\D/g, "");
    return filterNumber;
  }

  maskPhonePattern(phoneNumber) {
    // Retorna el patrón de máscara según la longitud
    if (phoneNumber.length <= 12) {
      return "(+999) 9999-9999";
    } else {
      return "(+999) 99999-9999";
    }
  }
}

export { FormatMask };
