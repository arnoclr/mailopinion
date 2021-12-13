<template>
  <div>
    <Navbar />

    <main class="mo-container">
      <ClientOnly>
        <GetStarted />
      </ClientOnly>
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

export default {
  components: {
    Navbar,
    Footer,
    GetStarted: () => import ('~/components/_Get-Started.vue')
  },
  metaInfo: {
    title: 'Get started'
  },
}
</script>
