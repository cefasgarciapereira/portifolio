import { Translation } from '@/contexts/language';
import useLocale from '@/hooks/useLocale';

interface useTranslationParams {
  content: Translation<object>;
}

export default function useTranslation({ content }: useTranslationParams) {
  const locale = useLocale();
  return content[locale] as typeof content["pt"];
}
