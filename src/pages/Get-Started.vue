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
  metaInfo: {
    title: 'Get started'
  },
  mounted() {
    urlParams = new URLSearchParams(window.location.search)
    logEvent(analytics, 'page_view', {
      page_name: 'Get started',
      ref: urlParams.get('s')
    })
  }
}
</script>
