import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText, translateObject } from '../utils/translator';

/**
 * Custom hook for automatic text translation
 */
export const useAutoTranslation = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Translates a single text string
   */
  const translate = useCallback(async (text: string): Promise<string> => {
    if (!text || i18n.language === 'en') {
      return text;
    }

    setIsLoading(true);
    setError(null);

    try {
      const translated = await translateText(text, i18n.language);
      setIsLoading(false);
      return translated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
      setIsLoading(false);
      return text; // Return original text on error
    }
  }, [i18n.language]);

  /**
   * Translates an object with nested strings
   */
  const translateObj = useCallback(async (obj: any): Promise<any> => {
    if (!obj || i18n.language === 'en') {
      return obj;
    }

    setIsLoading(true);
    setError(null);

    try {
      const translated = await translateObject(obj, i18n.language);
      setIsLoading(false);
      return translated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
      setIsLoading(false);
      return obj; // Return original object on error
    }
  }, [i18n.language]);

  return {
    translate,
    translateObj,
    isLoading,
    error,
    currentLanguage: i18n.language
  };
};

/**
 * Hook that automatically translates text when language changes
 */
export const useTranslatedText = (originalText: string) => {
  const [translatedText, setTranslatedText] = useState(originalText);
  const { translate, isLoading, error } = useAutoTranslation();

  useEffect(() => {
    const doTranslation = async () => {
      const result = await translate(originalText);
      setTranslatedText(result);
    };

    doTranslation();
  }, [originalText, translate]);

  return {
    text: translatedText,
    isLoading,
    error
  };
};

/**
 * Hook that automatically translates an object when language changes
 */
export const useTranslatedObject = <T = any>(originalObject: T) => {
  const [translatedObject, setTranslatedObject] = useState<T>(originalObject);
  const { translateObj, isLoading, error } = useAutoTranslation();

  useEffect(() => {
    const doTranslation = async () => {
      const result = await translateObj(originalObject);
      setTranslatedObject(result);
    };

    doTranslation();
  }, [originalObject, translateObj]);

  return {
    object: translatedObject,
    isLoading,
    error
  };
};