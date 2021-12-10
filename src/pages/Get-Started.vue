<template>
  <div>
    <Navbar />

    <main class="mo-container">
      <div class="mo-stepper">
        <div class="mo-stepper__step">
          <h1>{{ $t('setup.steps.account.title') }}</h1>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import { logEvent } from 'firebase/analytics'
import { analytics } from '~/firebase'

export default {
  components: {
    Navbar,
    Footer
  },
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
