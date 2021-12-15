<template>
    <div>
        <div v-if="isSignedIn">
            Signed in

            {{ $user.uid }}

            <!-- thumbs up/down -->
            <div class="mo-vote-rack" v-if="maxScore == 2">
                <button class="mo-btn mo-btn--icon" @click="vote(0)" :disabled="isVoting"><i class="material-icons">thumb_down</i></button>
                <button class="mo-btn mo-btn--icon" @click="vote(1)" :disabled="isVoting"><i class="material-icons">thumb_up</i></button>
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
            maxScore: null,
            isSignedIn: false,
            isVoting: false,
        }
    },
    methods: {
        async vote(score) {
            await setDoc(doc(db, "users", this.userId, "campaigns", this.campaignId, "records", this.$user.uid), {
                score,
                createdAt: serverTimestamp()
            });
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('userId') || urlParams.get('uid');
        this.campaignId = urlParams.get('campaignName') || urlParams.get('cid');
        this.maxScore = urlParams.get('maxScore') || 3;

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
        } else {
            // User is signed out
            // ...
        }
        });
    }
}
</script>