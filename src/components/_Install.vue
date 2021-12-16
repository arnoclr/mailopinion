<template>
    <div>
        <div class="mo-stepper">
            <div class="mo-stepper__step">
                <h1>{{ $t('setup.steps.account.title') }}</h1>
                <ClientOnly>
                    <Auth />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script>
import { logEvent } from 'firebase/analytics'
import { analytics } from '~/firebase'

export default {
    components: {
        Auth: () => import ('~/components/Auth.vue'),
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search)
        let src = urlParams.get('s') ? atob(decodeURIComponent(urlParams.get('s'))) : null
        console.log(src)
        logEvent(analytics, 'install', {
            ref: src
        })
    }
}
</script>