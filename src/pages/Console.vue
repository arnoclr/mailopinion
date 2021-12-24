<template>
  <div>
    <Navbar />

    <main class="mo-container">
      <ClientOnly>
        <Console />
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
    Console: () => import ('~/components/_Console.vue')
  },
  metaInfo: {
    title: 'Console'
  },
}
</script>
