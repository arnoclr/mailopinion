<template>
    <div class="mo-fixedtop">
        <div class="mo-disclaimer" v-if="canChangeLanguage" @click="changeLanguage">
            Show website with your browser language ({{ browserLocale }}).
        </div>
        <nav class="mo-nav">
            <g-link :to="$tp('/?s=' + $btoa('nav_logo'))" class="mo-nav__brand">
                <img src="/img/logo.full.svg" alt="Mailopinion logo">
            </g-link>
            <div class="mo-nav__buttons">
                <div class="mo-btn mo-btn--margoff">{{ $t('landing.adminConsole') }}</div>
                <g-link :to="$tp('/install/?s=' + $btoa('nav_cta'))" class="mo-btn mo-btn--backcolored hidden">{{ $t('landing.getStarted') }}</g-link>
            </div>
        </nav>
    </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
    .hidden {
        display: none;
    }
}
</style>

<script>
export default {
    data: function () {
        return {
            currentLocale: this.$i18n.locale.toString().toLowerCase(),
            browserLocale:  null,
            availableLocales: this.$i18n.availableLocales
        }
    },
    computed: {
        canChangeLanguage: function () {
            return this.currentLocale !== this.browserLocale && this.availableLocales.includes(this.browserLocale);
        }
    },
    methods: {
        changeLanguage() {
            this.currentLocale = this.browserLocale;
            this.$router.push({
                path: this.$tp(this.$route.path, this.browserLocale, true)
            })
        }
    },
    mounted() {
        if (process.isClient) {
            this.browserLocale = navigator.language.toString().toLowerCase();
        }
    }
}
</script>