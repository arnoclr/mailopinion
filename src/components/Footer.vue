<template>
    <footer class="mo-footer">
        <div class="mo-footer__brand">
            <img height="28" src="/img/logo.full.svg" alt="Mailopinion logo">
        </div>
        <div class="mo-footer__links">
            <a class="mo-footer__links-link" target="_blank" href="//github.com/arnoclr/mailopinion">Github</a>
            <select class="mo-footer__links-link" v-model="currentLocale" @change="localeChanged">
                <option v-for="locale in availableLocales" :key="locale" :value="locale">{{ localesLabels[locale] }}</option>
            </select>
        </div>
    </footer>
</template>

<script>
export default {
    name: "LocaleSwitcher",
    data: function () {
        return {
            currentLocale: this.$i18n.locale.toString(),
            availableLocales: this.$i18n.availableLocales,
            localesLabels: {
                'en-us': 'English',
                'fr-fr': 'Français'
            }
        }
    },
    methods: {
        localeChanged () {
            this.$router.push({
                path: this.$tp(this.$route.path, this.currentLocale, true)
            })
        }
    }
}
</script>