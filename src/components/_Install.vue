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
                    <div class="mo-textfield">
                        <input class="mo-textfield__input" type="text" id="campaignLabel" placeholder=" "
                            v-model="campaignLabel">
                        <label class="mo-textfield__label" for="campaignLabel">Campaign label</label>
                        <div class="mo-textfield__underline"></div>
                    </div>
                    <div v-if="advancedOptions">
                        <div class="mo-textfield" 
                        :valid="campaignNameAvailable && campaignName.length > 4" :invalid="!campaignNameAvailable">
                            <input class="mo-textfield__input" type="text" id="campaignName" placeholder=" "
                                v-model="campaignName" @keyup="checkTimeOut">
                            <label class="mo-textfield__label" for="campaignName">Campaign id</label>
                            <div class="mo-textfield__underline"></div>
                            <div class="mo-textfield__disclaimer" v-show="!campaignNameAvailable">{{ $t('setup.nameNotAvailable') }}</div>
                        </div>
                    </div>
                    <span @click="advancedOptions = true" v-else>Show advanced options</span>
                    <p>
                        <!-- <button 
                            class="mo-btn mo-btn--small mo-btn--atleft" 
                            @click="step--" :disabled="step != 2">Back</button> -->
                        <button 
                            class="mo-btn mo-btn--small mo-btn--backcolored mo-btn--atleft" 
                            @click="registerCampaign" :disabled="step > 2">{{ $t('setup.steps.next') }}</button>
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
                    <div>
                        <div class="mo-fbselect">
                            <div class="mo-fbselect__item" role="button" tabindex="1"
                            @click="selectEmbed('thumbs')" :active="embedType == 'thumbs'">
                                <i class="material-icons">thumb_up</i>
                                <span class="mo-fbselect__item-label">{{ $t('setup.steps.3.options.thumbs') }}</span>
                            </div>
                            <div class="mo-fbselect__item" role="button" tabindex="1"
                            @click="selectEmbed('smileys')"  :active="embedType == 'smileys'">
                                <i class="material-icons">sentiment_satisfied</i>
                                <span class="mo-fbselect__item-label">{{ $t('setup.steps.3.options.smileys') }}</span>
                            </div>
                            <div class="mo-fbselect__item" role="button" tabindex="1"
                            @click="selectEmbed('question')"  :active="embedType == 'question'">
                                <i class="material-icons">question_answer</i>
                                <span class="mo-fbselect__item-label">{{ $t('setup.steps.3.options.question') }}</span>
                            </div>
                        </div>
                        <div class="mo-textfield" v-if="embedType == 'question'">
                            <input class="mo-textfield__input" type="text" id="embedQuestion"
                            placeholder=" " v-model="embedQuestion">
                            <label class="mo-textfield__label" for="embedQuestion">Question</label>
                            <div class="mo-textfield__underline"></div>
                        </div>
                        <!-- <button 
                            class="mo-btn mo-btn--small mo-btn--atleft" 
                            @click="step--" :disabled="step != 3">Back</button>
                        <button 
                            class="mo-btn mo-btn--small mo-btn--backcolored" 
                            @click="step++" :disabled="step > 3">Next</button> -->
                    </div>
                </div>
            </div>
            <div class="mo-stepper__step" :checked="step > 4" :disabled="step < 4">
                <div class="mo-stepper__step-header">
                    <div class="mo-stepper__step-header-number"><span>4</span></div>
                    <h2 class="mo-stepper__step-header-label">{{ $t('setup.steps.4.title') }}</h2>
                </div>
                <div class="mo-stepper__step-content">
                    <p>{{ $t('setup.steps.4.content') }}</p>
                    <div v-if="isSignedIn">
                        <div class="mo-preview">
                            <textarea ref="embeded" class="mo-textarea mo-textarea--copy" v-model="embedHTML" cols="30" rows="10" @click="copyToClipboard" title="click to copy on clipboard"></textarea>
                            <div class="mo-preview__render">
                                <div class="mo-preview__render-html" v-html="embedHTML"></div>
                            </div>
                        </div>
                    </div>
                    <p>
                        <g-link 
                            class="mo-btn mo-btn--small mo-btn--backcolored mo-btn--atleft" 
                            :to="$tp('/console/?cn=' + campaignName + '&s=' + $btoa('install_flow'))">{{ $t('setup.dashboard') }}</g-link>
                    </p>
                </div>
            </div>
        </div>

        <div class="mo-toast" ref="toast">Copied to clipboard !</div>

        <ClientOnly>
            <CLogEvent name="install" />
        </ClientOnly>
    </div>
</template>

<script>
import { logEvent } from 'firebase/analytics'
import { getDocs, collection, doc, setDoc, addDoc, updateDoc, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { analytics, db } from '~/firebase'

const scoresTable = {
    "thumbs": 1,
    "smileys": 2,
    "question": 1
}

export default {
    components: {
        Auth: () => import ('~/components/Auth.vue'),
        CLogEvent: () => import ('~/components/LogEvent.vue'),
    },
    data() {
        return {
            step: 1,
            isSignedIn: false,
            campaignName: '',
            campaignLabel: '',
            campaignNameAvailable: true,
            embedType: null,
            embedQuestion: '',
            advancedOptions: false
        }
    },
    computed: {
        embedHTML() {
            switch (this.embedType) {
            case 'thumbs':
                return `<table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            <div style="color:#5f6368;font-family:'Roboto', Arial, sans-serif;letter-spacing:0.2px;line-height:20px;margin-top:4px;padding:12px 0 14px">${ this.$t('embed.title') }</div>
                            <div style="margin: 0 auto; width: 100%;">
                            <a href="${this.generateUrlForScore(0, 2)}" target="_blank" data-saferedirecturl="${this.generateUrlForScore(0, 2)}"><img src="https://i.imgur.com/CMvTYvd.png" style="height:24px;margin:0 auto;padding:0 10px 34px;width:24px"></a>

                            <a href="${this.generateUrlForScore(1, 2)}" target="_blank" data-saferedirecturl="${this.generateUrlForScore(1, 2)}"><img src="https://i.imgur.com/CCm96p8.png" style="height:24px;margin:0 auto;padding:0 10px 34px;width:24px"></a>
                            </div>
                        </td>
                    </tr>
                </table>`.replace(/>\s+</g, '><');
            case 'smileys':
                return `<table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            <div style="color:#5f6368;font-family:'Roboto', Arial, sans-serif;letter-spacing:0.2px;line-height:20px;margin-top:4px;padding:12px 0 14px">${ this.$t('embed.title') }</div>
                            <div style="margin: 0 auto; width: 100%;">
                            <a href="${this.generateUrlForScore(0, 2)}" target="_blank" data-saferedirecturl="${this.generateUrlForScore(0, 2)}"><img src="https://i.imgur.com/BKnzqfd.png" style="height:24px;margin:0 auto;padding:0 6px 34px;width:24px"></a>

                            <a href="${this.generateUrlForScore(1, 2)}" target="_blank" data-saferedirecturl="${this.generateUrlForScore(1, 2)}"><img src="https://i.imgur.com/QH1dou3.png" style="height:24px;margin:0 auto;padding:0 6px 34px;width:24px"></a>

                            <a href="${this.generateUrlForScore(2, 2)}" target="_blank" data-saferedirecturl="${this.generateUrlForScore(2, 2)}"><img src="https://i.imgur.com/3Y1vOtr.png" style="height:24px;margin:0 auto;padding:0 6px 34px;width:24px"></a>
                            </div>
                        </td>
                    </tr>
                </table>`.replace(/>\s+</g, '><');
            case 'question':
                return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="88%" align="center" style="margin:0 auto;text-align:center">
                <tbody><tr>
                <td align="left" valign="top" style="border:1px solid #a3a6a3;border-radius:3px">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tbody><tr>
                <td align="left" valign="top" style="padding:15px 17px">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tbody><tr>
                <td align="left" valign="top" width="310" style="display:inline-block">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tbody><tr>
                <td align="left" valign="middle" width="35">
                <img src="https://i.imgur.com/qPd1TP2.png" width="35">
                </td>
                <td align="left" valign="middle" style="padding-left:7px">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tbody><tr>
                <td width="233" height="45" align="left" valign="middle" background="https://i.imgur.com/buyM6GU.png" style="background-image:url(https://i.imgur.com/buyM6GU.png);background-repeat:no-repeat;background-size:100% 100%">

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="left" width="215">
                <tbody><tr>
                <td align="center" valign="middle" style="font-family:Google Sans,Roboto,Arial,Open Sans,Helvetica,sans-serif;font-size:15px;line-height:23px;color:#444444;font-weight:500;padding-left:20px">
                ${ this.embedQuestion }</td>
                </tr>
                </tbody></table>

                </td>
                </tr>
                </tbody></table>
                </td>
                </tr>
                </tbody></table>
                </td>
                <td align="right" valign="top" width="300" style="display:inline-block">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tbody><tr>
                <td align="center" valign="top">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tbody><tr>
                <td align="center" valign="top" width="90" style="background-color:#f1f3f4;font-family:Google Sans,Roboto,Arial,Open Sans,Helvetica,sans-serif;font-size:14px;border-radius:3px;line-height:21px;color:#202124;font-weight:500;letter-spacing:0.5px">
                <a style="color:#202124;text-decoration:none;display:block;border-top:12px solid #f1f3f4;border-bottom:12px solid #f1f3f4;border-radius:3px" href="${this.generateUrlForScore(1, 1)}" target="_blank">${ this.$t('embed.yes') }</a>
                </td>
                </tr>
                </tbody></table>
                </td>
                <td align="center" valign="top" width="20"></td>
                <td align="center" valign="top">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="90">
                <tbody><tr>
                <td align="center" valign="top" style="background-color:#f1f3f4;font-family:Google Sans,Roboto,Arial,Open Sans,Helvetica,sans-serif;font-size:14px;border-radius:3px;line-height:21px;color:#202124;font-weight:500;letter-spacing:0.5px">
                <a style="color:#202124;text-decoration:none;display:block;border-top:12px solid #f1f3f4;border-bottom:12px solid #f1f3f4;border-radius:3px" href="${this.generateUrlForScore(0, 1)}" target="_blank">${ this.$t('embed.no') }</a>
                </td>
                </tr>
                </tbody></table>
                </td>
                </tr>
                </tbody></table>
                </td>
                </tr>
                </tbody></table>
                </td>
                </tr>
                </tbody></table>
                </td>
                </tr>
                </tbody></table>`.replace(/>\s+</g, '><');
            }
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
        async registerCampaign() {
            try {
                const data = {
                    label: this.campaignLabel,
                    createdAt: serverTimestamp(),
                    averageScore: 0,
                    total: 0,
                    isActive: true
                }

                const col = collection(db, "users", this.$user.uid, "campaigns")
                
                if (this.campaignName != '') {
                    await setDoc(doc(col, this.campaignName), data);
                } else {
                    const docRef = await addDoc(col, data);
                    this.campaignName = docRef.id;
                }

                this.step = 3;
            } catch (e) {
                console.error(e);
            }
        },
        async updateCampaign() {
            await updateDoc(doc(db, "users", this.$user.uid, "campaigns", this.campaignName), {
                maxScore: scoresTable[this.embedType],
                embedQuestion: this.embedQuestion
            });
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
            return `https://mailopinion.web.app${this.$tp('/intent/')}?score=${score}&cpid=${encodeURIComponent(this.campaignName)}&uid=${this.$user.uid}&maxScore=${maxScore}`;
        },
        copyToClipboard() {
            this.$refs.embeded.select();
            document.execCommand('copy');
            this.showToast('Copied to clipboard');
        },
        showToast(message) {
            this.$refs.toast.classList.add('js-active');
            this.$refs.toast.innerText = message;

            setTimeout(() => {
                this.$refs.toast.classList.remove('js-active');
            }, 5000);
        },
        selectEmbed(type) {
            this.embedType = type;
            this.step = 4;
            this.updateCampaign();
        }
    }
}
</script>