<template>
    <div>
        <div class="mo-stepper">
            <div class="mo-stepper__header">
                <div class="mo-stepper__header-title">
                    <h1>{{ $t('setup.steps.title') }}</h1>
                    <p>{{ $t('setup.steps.content') }}</p>
                </div>
            </div>
            <div class="mo-stepper__step" :checked="step > 1">
                <div class="mo-stepper__step-header">
                    <div class="mo-stepper__step-header-number"><span>1</span></div>
                    <h2 class="mo-stepper__step-header-label">{{ $t('setup.steps.1.title') }}</h2>
                </div>
                <div class="mo-stepper__step-content">
                    <p>{{ $t('setup.steps.1.content') }}</p>
                    <ClientOnly>
                        <Auth :onSuccess="onSignIn" />
                    </ClientOnly>
                    <p>
                        <!-- <button 
                            class="mo-btn mo-btn--small mo-btn--backcolored mo-btn--atleft" 
                            @click="step++" :disabled="step > 1 || !signedIn">Next</button> -->
                    </p>
                </div>
            </div>
            <div class="mo-stepper__step" :checked="step > 2" :disabled="step < 2">
                <div class="mo-stepper__step-header">
                    <div class="mo-stepper__step-header-number"><span>2</span></div>
                    <h2 class="mo-stepper__step-header-label">{{ $t('setup.steps.2.title') }}</h2>
                </div>
                <div class="mo-stepper__step-content">
                    <p>{{ $t('setup.steps.2.content') }}</p>
                    <p>
                        <button 
                            class="mo-btn mo-btn--small mo-btn--atleft" 
                            @click="step--" :disabled="step != 2">Back</button>
                        <button 
                            class="mo-btn mo-btn--small mo-btn--backcolored" 
                            @click="step++" :disabled="step > 2">Next</button>
                    </p>
                </div>
            </div>
            <div class="mo-stepper__step" :checked="step >= 3" :disabled="step < 3">
                <div class="mo-stepper__step-header">
                    <div class="mo-stepper__step-header-number"><span>3</span></div>
                    <h2 class="mo-stepper__step-header-label">{{ $t('setup.steps.3.title') }}</h2>
                </div>
                <div class="mo-stepper__step-content">
                    <p>{{ $t('setup.steps.3.content') }}</p>
                    <p>
                        <button 
                            class="mo-btn mo-btn--small mo-btn--atleft" 
                            @click="step--" :disabled="step != 3">Back</button>
                        <button 
                            class="mo-btn mo-btn--small mo-btn--backcolored" 
                            @click="step++" :disabled="step > 3">Next</button>
                    </p>
                </div>
            </div>
            <div class="mo-stepper__step" :checked="step > 4" :disabled="step < 4">
                <div class="mo-stepper__step-header">
                    <div class="mo-stepper__step-header-number"><span>4</span></div>
                    <h2 class="mo-stepper__step-header-label">{{ $t('setup.steps.4.title') }}</h2>
                </div>
                <div class="mo-stepper__step-content">
                    <p>{{ $t('setup.steps.4.content') }}</p>
                    <p>
                        <g-link 
                            class="mo-btn mo-btn--small mo-btn--backcolored mo-btn--atleft" 
                            :to="$tp('/dashboard')">{{ $t('setup.dashboard') }}</g-link>
                    </p>
                </div>
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
    data() {
        return {
            step: 1,
            signedIn: false,
        }
    },
    methods: {
        onSignIn() {
            this.signedIn = true;
            this.step++;
        }
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