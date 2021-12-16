<template>
    <div>
        <div tabindex="1" role="button" @click="signInWithGoogle" :disabled="isSignedIn" class='g-sign-in-button'>
            <div class=content-wrapper>
                <div class="logo-wrapper">
                    <img src='https://developers.google.com/identity/images/g-logo.png'>
                </div>
                <span class="text-container" v-if="isSignedIn">
                    <span>You're logged in</span>
                </span>
                <span class="text-container" v-else>
                    <span>Sign in with Google</span>
                </span>
            </div>
        </div>
        <small class="g-sign-out" :disabled="!isSignedIn" @click="signOut">Sign out</small>
    </div>
</template>

<style scoped>
    *, *:before, *:after {
        box-sizing: border-box;
    }

    .g-sign-in-button {
        margin: 10px;
        display: inline-block;
        width: 240px;
        height: 50px;
        background-color: #4285f4;
        color: #fff;
        border-radius: 1px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
        transition: background-color .218s, border-color .218s, box-shadow .218s;
    }

    .g-sign-in-button[disabled] {
        pointer-events: none;
        background-color: #dedede;
        box-shadow: none;
    }

    .g-sign-in-button:hover {
        cursor: pointer;
        -webkit-box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
        box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
    }

    .g-sign-in-button:active {
        background-color: #3367D6;
        transition: background-color 0.2s;
    }

    .g-sign-in-button .content-wrapper {
        height: 100%;
        width: 100%;
        border: 1px solid transparent;
    }

    .g-sign-in-button img {
        width: 18px;
        height: 18px;
    }

    .g-sign-in-button .logo-wrapper {
        padding: 15px;
        background: #fff;
        width: 48px;
        height: 100%;
        border-radius: 1px;
        display: inline-block;
    }

    .g-sign-in-button .text-container {
        font-family: Roboto,arial,sans-serif;
        font-weight: 500;
        letter-spacing: .21px;
        font-size: 16px;
        line-height: 48px;
        vertical-align: top;
        border: none;
        display: inline-block;
        text-align: center;
        width: 180px;
    }

    .g-sign-out {
        margin: 0px 12px;
        display: block;
        font-family: Arial, sans-serif;
        cursor: pointer;
    }

    .g-sign-out:hover {
        color: #545454;
    }

    .g-sign-out[disabled] {
        pointer-events: none;
        opacity: 0.3;
    }
</style>

<script>
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebase.js";

export default {
    data() {
        return {
            isSignedIn: false,
        }
    },
    methods: {
        async signInWithGoogle() {
            const provider = new GoogleAuthProvider();

            try {
                const result = await signInWithPopup(auth, provider)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // The signed-in user info.
                this.$user = result.user;
                this.isSignedIn = true;
            } catch(error)  {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            };
        },
        async signOut() {
            await signOut(auth);
        }
    },
    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if(user.email) {
                    this.$user = user;
                    this.isSignedIn = true;
                }
            } else {
                this.$user = null;
                this.isSignedIn = false;
            }
        })
    }
}
</script>