<template>
  <div>
    <Navbar />
    
    <main class="mo-container">
      <div class="mo-hero">
        <div class="mo-hero__img">
          <img src="/img/landing.hero.svg" alt="Email with smiley selector">
        </div>
        <div class="mo-hero__why">
          <span>{{ $t('landing.why.question') }}</span>
          <h1>{{ $t('landing.why.title') }}</h1>
          <p>{{ $t('landing.why.content') }}</p>
          <g-link :to="$tp('/install/?s=' + $btoa('hero_cta'))" class="mo-btn mo-btn--colored">{{ $t('landing.getStarted') }}</g-link>
        </div>
      </div>

      <div class="mo-benefits">
        <h1 class="mo-benefits__title">{{ $t('landing.benefits.title') }}</h1>
        <ul class="mo-benefits__list">
          <li class="mo-benefits__list-item">
            <i class="material-icons">savings</i>
            <div class="mo-benefits__list-item-text">
              <h2>{{ $t('landing.benefits.free.title') }}</h2>
              <p>{{ $t('landing.benefits.free.content') }}</p>
            </div>
          </li>
          <li class="mo-benefits__list-item">
            <i class="material-icons">highlight_alt</i>
            <div class="mo-benefits__list-item-text">
              <h2>{{ $t('landing.benefits.transparent.title') }}</h2>
              <p>{{ $t('landing.benefits.transparent.content') }}</p>
            </div>
          </li>
          <li class="mo-benefits__list-item">
            <i class="material-icons">speed</i>
            <div class="mo-benefits__list-item-text">
              <h2>{{ $t('landing.benefits.fast.title') }}</h2>
              <p>{{ $t('landing.benefits.fast.content') }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="mo-features">
        <h1>{{ $t('landing.features.title') }}</h1>
        <div class="mo-features__list">
          <div class="mo-features__list-card">
            <i class="material-icons">campaign</i>
            <h3>{{ $t('landing.features.campaigns.title') }}</h3>
            <p>{{ $t('landing.features.campaigns.content') }}</p>
          </div>
          <div class="mo-features__list-card">
            <i class="material-icons">comment</i>
            <h3>{{ $t('landing.features.comments.title') }}</h3>
            <p>{{ $t('landing.features.comments.content') }}</p>
          </div>
          <div class="mo-features__list-card">
            <i class="material-icons">analytics</i>
            <h3>{{ $t('landing.features.analytics.title') }}</h3>
            <p>{{ $t('landing.features.analytics.content') }}</p>
          </div>
          <div class="mo-features__list-card">
            <i class="material-icons">adjust</i>
            <h3>{{ $t('landing.features.flexible.title') }}</h3>
            <p>{{ $t('landing.features.flexible.content') }}</p>
          </div>
          <div class="mo-features__list-card">
            <i class="material-icons">attachment</i>
            <h3>{{ $t('landing.features.versatile.title') }}</h3>
            <p>{{ $t('landing.features.versatile.content') }}</p>
          </div>
        </div>
      </div>

      <div class="mo-ctabox">
        <g-link :to="$tp('/install/?s=' + $btoa('bottom_cta'))" class="mo-btn mo-btn--backcolored">{{ $t('landing.getStarted') }}</g-link>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar, Footer
  },
  metaInfo: {
    title: 'Get feedbacks on your emails'
  }
}
</script>
