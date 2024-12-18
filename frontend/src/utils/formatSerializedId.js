import { FormatMask } from './FormatMask';

// Mapa de códigos de país a emojis de bandera para América Latina
const countryFlagMap = {
  '+54': '🇦🇷', // Argentina
  '+591': '🇧🇴', // Bolivia
  '+55': '🇧🇷', // Brasil
  '+56': '🇨🇱', // Chile
  '+57': '🇨🇴', // Colombia
  '+506': '🇨🇷', // Costa Rica
  '+53': '🇨🇺', // Cuba
  '+593': '🇪🇨', // Ecuador
  '+503': '🇸🇻', // El Salvador
  '+502': '🇬🇹', // Guatemala
  '+592': '🇬🇾', // Guyana
  '+504': '🇭🇳', // Honduras
  '+52': '🇲🇽', // México
  '+505': '🇳🇮', // Nicaragua
  '+507': '🇵🇦', // Panamá
  '+595': '🇵🇾', // Paraguay
  '+51': '🇵🇪', // Perú
  '+593': '🇬🇫', // Guayana Francesa
  '+597': '🇸🇷', // Surinam
  '+598': '🇺🇾', // Uruguay
  '+58': '🇻🇪', // Venezuela
  '+590': '🇬🇵', // Guadalupe
  '+596': '🇲🇶', // Martinica
  '+501': '🇧🇿', // Belice
};

/**
 * Formatea un identificador serializado.
 * @param {string} serializedId - El identificador serializado a formatear.
 * @returns {string} - El identificador formateado.
 */
const formatSerializedId = (serializedId) => {
  const formatMask = new FormatMask();
  const number = serializedId?.replace('@c.us', '');
  
  // Encontrar el código de país y su bandera correspondiente
  let formattedId = formatMask.setPhoneFormatMask(number);

  for (const [code, flag] of Object.entries(countryFlagMap)) {
    if (formattedId.includes(code)) {
      formattedId = formattedId.replace(code, flag);
      break; // Opcional, para reemplazar solo el primer código encontrado
    }
  }

  return formattedId;
};

export default formatSerializedId;
