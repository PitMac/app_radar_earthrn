import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./en";
import es from "./es";

const i18n = new I18n({ en, es });

const locales = getLocales();

const deviceLocale =
  locales && locales.length > 0 && locales[0].languageTag
    ? locales[0].languageTag.split("-")[0]
    : "en";

i18n.locale = deviceLocale;
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export default i18n;
