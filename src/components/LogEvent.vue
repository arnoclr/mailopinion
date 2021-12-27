<template>
    
</template>

<script>
import { logEvent } from "firebase/analytics";
import { analytics } from "~/firebase";

export default {
    props: ['name'],
    mounted() {
        // analytics
        const urlParams = new URLSearchParams(window.location.search);
        let src = urlParams.get('s') ? atob(decodeURIComponent(urlParams.get('s'))) : null
        logEvent(analytics, this.name, {
            ref: src
        })
        this.$setQueryStringParameter('s', this.$btoa('link_copy'));
    }
}
</script>
