<template>
    <div class="mo-vote">
        <div class="mo-vote__box" v-if="isSignedIn">
            <!-- thumbs up/down -->
            <div class="mo-vote-rack" v-if="maxScore == 1">
                <button class="mo-btn mo-btn--icon" @click="vote(0)" :disabled="isVoting"><i class="material-icons">thumb_down</i></button>
                <button class="mo-btn mo-btn--icon" @click="vote(1)" :disabled="isVoting"><i class="material-icons">thumb_up</i></button>
            </div>

            <!-- smileys -->
            <div class="mo-vote-rack" v-if="maxScore == 2">
                <button class="mo-btn mo-btn--icon" @click="vote(0)" :disabled="isVoting"><i class="material-icons">sentiment_dissatisfied</i></button>
                <button class="mo-btn mo-btn--icon" @click="vote(1)" :disabled="isVoting"><i class="material-icons">sentiment_neutral</i></button>
                <button class="mo-btn mo-btn--icon" @click="vote(2)" :disabled="isVoting"><i class="material-icons">sentiment_satisfied</i></button>
            </div>

            <div class="mo-confirmation" v-if="hasVoted">
                <p>{{ $t('intent.thanks') }}</p>
                <div class="mo-vote-addtext" v-if="!textFeedbackSent">
                    <div class="mo-textfield">
                        <input class="mo-textfield__input" type="text" id="textFeedback" placeholder=" "
                            v-model="textFeedback">
                        <label class="mo-textfield__label" for="textFeedback">Add something ?</label>
                        <div class="mo-textfield__underline"></div>
                    </div>
                    <p></p>
                    <button class="mo-btn mo-btn--backcolored mo-btn--atleft" @click="sendText" :disabled="textFeedbackSending">Send</button>
                </div>
            </div>

            <div class="mo-confirmation mo-confirmation--error" v-if="error">
                <p>{{ $t('intent.error') }}</p>
                <small class="mo-confirmation__details">{{ error }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"; 
import { auth, db } from "~/firebase.js";

export default {
    data() {
        return {
            userId: null,
            campaignId: null,
            score: null,
            maxScore: null,
            isSignedIn: false,
            isVoting: false,
            hasVoted: false,
            error: null,
            textFeedback: '',
            textFeedbackSending: false,
            textFeedbackSent: false
        }
    },
    methods: {
        async vote(score) {
            if (this.error) return;
            this.isVoting = true;
            try {
                await setDoc(doc(db, "users", this.userId, "campaigns", this.campaignId, "records", this.$user.uid), {
                    score,
                    createdAt: serverTimestamp()
                });
                this.hasVoted = true;
            } catch (error) {
                this.error = error;
                this.isVoting = false;
            }
        },
        async sendText() {
            this.textFeedbackSending = true;

            await updateDoc(doc(db, "users", this.userId, "campaigns", this.campaignId, "records", this.$user.uid), {
                comment: this.textFeedback,
            });

            this.textFeedbackSending = false;
            this.textFeedbackSent = true;
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('userId') || urlParams.get('uid');
        this.campaignId = urlParams.get('campaignName') || urlParams.get('cpid');
        this.maxScore = urlParams.get('maxScore') || 2;
        this.score = parseInt(urlParams.get('score')) || null;

        if (this.userId == null || this.campaignId == null) {
            this.error = "Invalid URL";
            this.isVoting = true;
        }

        // wait to check if user is already signed in
        setTimeout(() => {
            if (!this.$user?.uid) {
                // no user logged in, we sign in anonymously
                signInAnonymously(auth)
                .then(() => {
                    // Signed in..
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                });
            }
        }, 1000);

        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            this.$user = user;
            this.isSignedIn = true;
            console.log(this.$user.uid)

            // get user's score
            if (this.score) {
                this.vote(this.score);
            }

        } else {
            // User is signed out
            // ...
        }
        });
    }
}
</script>