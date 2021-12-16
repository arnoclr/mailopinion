<template>
  <div>
    <Navbar />

    <main class="mo-container">
      <ClientOnly>
        <Install />
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
    Install: () => import ('~/components/_Install.vue')
  },
  metaInfo: {
    title: 'Get started'
  },
}
</script>
