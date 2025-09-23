// Translation cache to avoid repeated API calls
const translationCache = new Map<string, string>();

// Mock translation dictionary for demo purposes
const translations: Record<string, Record<string, string>> = {
  pt: {
    // Hero Section
    "Professional Signs That Make Your Business Stand Out": "Placas Profissionais Que Fazem Seu Negócio Se Destacar",
    "From digital displays to custom fabrication, we create eye-catching signage solutions that drive results": "De displays digitais à fabricação personalizada, criamos soluções de sinalização atrativas que geram resultados",
    "Get Your Free Quote Today": "Obtenha Seu Orçamento Gratuito Hoje",
    
    // Services
    "Our Services": "Nossos Serviços",
    "Comprehensive signage solutions for every business need": "Soluções completas de sinalização para todas as necessidades empresariais",
    "Digital LED Signs": "Placas LED Digitais",
    "Eye-catching digital displays that capture attention and drive foot traffic": "Displays digitais atraentes que capturam atenção e aumentam o fluxo de clientes",
    "Illuminated Signs": "Placas Iluminadas",
    "Bright, professional lighting solutions that make your business visible 24/7": "Soluções de iluminação brilhantes e profissionais que tornam seu negócio visível 24/7",
    "Vehicle Wraps": "Adesivação de Veículos",
    "Mobile advertising that turns your vehicles into powerful marketing tools": "Publicidade móvel que transforma seus veículos em poderosas ferramentas de marketing",
    "Storefront Signs": "Placas de Fachada",
    "Professional facade signage that establishes your brand presence": "Sinalização profissional de fachada que estabelece a presença da sua marca",
    "Trade Show Displays": "Displays para Feiras",
    "Portable, impactful displays that make your booth stand out at events": "Displays portáteis e impactantes que fazem seu estande se destacar em eventos"
  },
  es: {
    // Hero Section
    "Professional Signs That Make Your Business Stand Out": "Letreros Profesionales Que Hacen Destacar Tu Negocio",
    "From digital displays to custom fabrication, we create eye-catching signage solutions that drive results": "Desde pantallas digitales hasta fabricación personalizada, creamos soluciones de señalización llamativas que generan resultados",
    "Get Your Free Quote Today": "Obtén Tu Cotización Gratuita Hoy",
    
    // Services
    "Our Services": "Nuestros Servicios",
    "Comprehensive signage solutions for every business need": "Soluciones integrales de señalización para todas las necesidades empresariales",
    "Digital LED Signs": "Letreros LED Digitales",
    "Eye-catching digital displays that capture attention and drive foot traffic": "Pantallas digitales llamativas que capturan la atención y aumentan el tráfico peatonal",
    "Illuminated Signs": "Letreros Iluminados",
    "Bright, professional lighting solutions that make your business visible 24/7": "Soluciones de iluminación brillantes y profesionales que hacen tu negocio visible las 24 horas",
    "Vehicle Wraps": "Vinilado de Vehículos",
    "Mobile advertising that turns your vehicles into powerful marketing tools": "Publicidad móvil que convierte tus vehículos en poderosas herramientas de marketing",
    "Storefront Signs": "Letreros de Fachada",
    "Professional facade signage that establishes your brand presence": "Señalización profesional de fachada que establece la presencia de tu marca",
    "Trade Show Displays": "Displays para Ferias",
    "Portable, impactful displays that make your booth stand out at events": "Displays portátiles e impactantes que hacen destacar tu stand en eventos"
  }
};

/**
 * Translates text to the specified language
 * @param text - Text to translate
 * @param targetLanguage - Target language code (pt, es)
 * @returns Promise with translated text
 */
export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  // Skip translation for English or empty text
  if (targetLanguage === 'en' || !text) {
    return text;
  }

  // Check cache first
  const cacheKey = `${text}-${targetLanguage}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // Use mock translation dictionary
  const translation = translations[targetLanguage]?.[text] || text;
  
  // Cache the result
  translationCache.set(cacheKey, translation);
  
  return translation;
};

/**
 * Translates all string values in an object recursively
 * @param obj - Object to translate
 * @param targetLanguage - Target language code
 * @returns Promise with translated object
 */
export const translateObject = async (obj: any, targetLanguage: string): Promise<any> => {
  if (targetLanguage === 'en') {
    return obj;
  }

  if (typeof obj === 'string') {
    return await translateText(obj, targetLanguage);
  }

  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, targetLanguage)));
  }

  if (obj && typeof obj === 'object') {
    const translatedObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      translatedObj[key] = await translateObject(value, targetLanguage);
    }
    return translatedObj;
  }

  return obj;
};

/**
 * Clears the translation cache
 */
export const clearTranslationCache = () => {
  translationCache.clear();
};