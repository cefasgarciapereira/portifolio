import { useContext } from 'react';
import LanguageContext, { Translation } from '@/app/contexts/language';
interface useTranslationParams {
  content: Translation<object>
}

export default function useTranslation({ content }: useTranslationParams) {
  const { language } = useContext(LanguageContext);
  return content[language] as typeof content["pt"];
}