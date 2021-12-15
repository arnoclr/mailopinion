<template>
    <div class="mo-vote">
        <div class="mo-vote__box" v-if="isSignedIn">
            <!-- thumbs up/down -->
            <div class="mo-voterack" v-if="maxScore == 2">
                <button class="mo-btn mo-btn--icon" @click="vote(0)" :disabled="isVoting"><i class="material-icons">thumb_down</i></button>
                <button class="mo-btn mo-btn--icon" @click="vote(1)" :disabled="isVoting"><i class="material-icons">thumb_up</i></button>
            </div>

            <!-- smileys -->
            <div class="mo-vote-rack" v-if="maxScore == 3">
                <button class="mo-btn mo-btn--icon" @click="vote(0)" :disabled="isVoting"><i class="material-icons">sentiment_dissatisfied</i></button>
                <button class="mo-btn mo-btn--icon" @click="vote(1)" :disabled="isVoting"><i class="material-icons">sentiment_neutral</i></button>
                <button class="mo-btn mo-btn--icon" @click="vote(2)" :disabled="isVoting"><i class="material-icons">sentiment_satisfied</i></button>
            </div>

            <div class="mo-confirmation" v-if="hasVoted">
                <p>{{ $t('intent.thanks') }}</p>
            </div>

            <div class="mo-confirmation mo-confirmation--error" v-if="error">
                <p>{{ $t('intent.error') }}</p>
                <small>{{ error }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
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
            error: null
        }
    },
    methods: {
        async vote(score) {
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
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('userId') || urlParams.get('uid');
        this.campaignId = urlParams.get('campaignName') || urlParams.get('cid');
        this.maxScore = urlParams.get('maxScore') || 3;
        this.score = urlParams.get('score') || null;

        if (this.userId == null && this.campaignId == null) {
            this.error = "Invalid URL";
            return;
        }

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