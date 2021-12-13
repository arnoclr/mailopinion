<template>
    <div>
        <div class="mo-stepper">
            <div class="mo-stepper__step">
                <h1>{{ $t('setup.steps.account.title') }}</h1>
            </div>
        </div>
    </div>
</template>

<script>
import { logEvent } from 'firebase/analytics'
import { analytics } from '~/firebase'

export default {
    mounted() {
        const urlParams = new URLSearchParams(window.location.search)
        let src = urlParams.get('s') ? atob(decodeURIComponent(urlParams.get('s'))) : null
        console.log(src)
        logEvent(analytics, 'page_view', {
            page_name: 'Get started',
            ref: src
        })
    }
}
</script>