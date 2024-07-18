<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Tr from "@/i18n/translation.js";

const { t, locale } = useI18n();

const supportedLocales = Tr.supportedLocales;
const router = useRouter();

const switchLanguage = async (event) => {
    const newLocale = event.target.value;
    await Tr.switchLanguage(newLocale);
    try { 
        await router.replace({ params: { locale: newLocale }});
    } catch (error) {
        console.error(error);
        router.push("/");
    }
}

</script>


<template>
    <select @change="switchLanguage">
        <option v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`" :value="sLocale"
            :selected="locale === sLocale">{{ t(`locale.${sLocale}`) }}
        </option>
    </select>
</template>