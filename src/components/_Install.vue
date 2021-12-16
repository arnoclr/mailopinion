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
                    <div class="mo-textfield" 
                        :valid="campaignNameAvailable && campaignName.length > 4" :invalid="!campaignNameAvailable">
                        <input class="mo-textfield__input" type="text" id="campaignName" placeholder=" "
                            v-model="campaignName" @keyup="checkTimeOut">
                        <label class="mo-textfield__label" for="campaignName">Campaign name</label>
                        <div class="mo-textfield__underline"></div>
                        <div class="mo-textfield__disclaimer" v-show="!campaignNameAvailable">{{ $t('setup.nameNotAvailable') }}</div>
                    </div>
                    <p>
                        <!-- <button 
                            class="mo-btn mo-btn--small mo-btn--atleft" 
                            @click="step--" :disabled="step != 2">Back</button> -->
                        <button 
                            class="mo-btn mo-btn--small mo-btn--backcolored mo-btn--atleft" 
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
                    <p v-if="isSignedIn">
                        <textarea ref="embeded" class="mo-textarea mo-textarea--copy" v-model="script3" id="" cols="30" rows="10" @click="copyToClipboard"></textarea>
                    </p>
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
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { analytics, db } from '~/firebase'

export default {
    components: {
        Auth: () => import ('~/components/Auth.vue'),
    },
    data() {
        return {
            step: 1,
            isSignedIn: false,
            campaignName: '',
            campaignNameAvailable: true
        }
    },
    computed: {
        script3() {
            return `<table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <div style="color:#5f6368;font-family:'Roboto', Arial, sans-serif;letter-spacing:0.2px;line-height:20px;margin-top:4px;padding:12px 0 14px">Cet e-mail vous a-t-il été utile&nbsp;?</div>
                        <div style="margin: 0 auto; width: 100%;">
                        <a href="${this.generateUrlForScore(0, 2)}" target="_blank" data-saferedirecturl="${this.generateUrlForScore(0, 2)}"><img src="https://i.imgur.com/BKnzqfd.png" style="height:24px;margin:0 auto;padding:0 6px 34px;width:24px"></a>

                        <a href="${this.generateUrlForScore(1, 2)}" target="_blank" data-saferedirecturl="${this.generateUrlForScore(1, 2)}"><img src="https://i.imgur.com/QH1dou3.png" style="height:24px;margin:0 auto;padding:0 6px 34px;width:24px"></a>

                        <a href="${this.generateUrlForScore(2, 2)}" target="_blank" data-saferedirecturl="${this.generateUrlForScore(2, 2)}"><img src="https://i.imgur.com/3Y1vOtr.png" style="height:24px;margin:0 auto;padding:0 6px 34px;width:24px"></a>
                        </div>
                    </td>
                </tr>
            </table>`.replace(/>\s+</g, '><');
        }
    },
    methods: {
        onSignIn(user) {
            this.isSignedIn = true;
            this.step++;
            this.$user = user;
        },
        async checkNameAvailability() {
            if (this.campaignName.length < 1) {
                return;
            }

            const q = query(collection(db, "users", this.$user.uid, "campaigns", this.campaignName, "records"), orderBy("createdAt", "desc"), limit(1));

            const querySnapshot = await getDocs(q);
            this.campaignNameAvailable = querySnapshot.empty;
        },
        checkTimeOut() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.checkNameAvailability();
            }, 300);
        },
        generateUrlForScore(score, maxScore) {
            return `https://mailopinion.web.app/intent/?score=${score}&campaignName=${encodeURIComponent(this.campaignName)}&uid=${this.$user.uid}&maxScore=${maxScore}`;
        },
        copyToClipboard() {
            this.$refs.embeded.select();
            document.execCommand('copy');
            alert('Copied to clipboard');
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