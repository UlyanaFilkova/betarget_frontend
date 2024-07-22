import { createI18n } from "vue-i18n";
import pluralRules from "@/i18n/rules/pluralization"
import ru from "@/i18n/locales/ru.json"

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    messages: { ru },
    globalInjection: true,
    pluralRules
});