<template>
    <div class="mo-fixedtop">
        <div class="mo-disclaimer" v-if="canChangeLanguage" @click="changeLanguage">
            Show website with your browser language ({{ browserLocale }}).
        </div>
        <nav class="mo-nav">
            <g-link :to="$tp('/?s=nav_logo')" class="mo-nav__brand">
                <img src="/img/logo.full.svg" alt="Mailopinion logo">
            </g-link>
            <div class="mo-nav__buttons">
                <div class="mo-btn mo-btn--margoff">{{ $t('landing.adminConsole') }}</div>
                <g-link :to="$tp('/get-started/?s=nav_cta')" class="mo-btn mo-btn--backcolored">{{ $t('landing.getStarted') }}</g-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            currentLocale: this.$i18n.locale.toString().toLowerCase(),
            browserLocale: navigator.language.toString().toLowerCase(),
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
    }
}
</script>