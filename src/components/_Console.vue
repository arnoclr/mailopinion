<template>
    <div class="mo-container mo-container--padding">
        <ClientOnly>
            <Auth v-if="!isSignedIn" :onSuccess="onSignIn" />
        </ClientOnly>

        <div class="mo-textfield">
            <input class="mo-textfield__input" type="text" id="campaignName" placeholder=" "
                v-model="campaignName" @keyup="drawChart">
            <label class="mo-textfield__label" for="campaignName">Campaign name</label>
            <div class="mo-textfield__underline"></div>
            <div class="mo-textfield__disclaimer"></div>
        </div>

        <div id="chart1"></div>

    </div>
</template>

<script>
import { collection, query, orderBy, getDocs, where, limit } from "firebase/firestore"
import { db } from "~/firebase";
import { GoogleCharts } from "google-charts";

export default {
    components: {
        Auth: () => import ('~/components/Auth.vue'),
    },
    data() {
        return {
            campaignName: '',
            chartLoaded: false,
            isSignedIn: false,
        }
    },
    methods: {
        onSignIn(user) {
            this.isSignedIn = true;
            this.step++;
            this.$user = user;
            this.drawChart();
        },
        gcReady() {
            this.chartLoaded = true;
        },
        async getResultsForScore(score) {
            const q = query(collection(db, "users", this.$user.uid, "campaigns", this.campaignName, "records"), where("score", "==", score), orderBy("createdAt", "desc"), limit(100));

            const querySnapshot = await getDocs(q);

            return querySnapshot.size;
        },
        async drawChart() {
            if (!this.chartLoaded) return;

            // Standard google charts functionality is available as GoogleCharts.api after load
            const data = GoogleCharts.api.visualization.arrayToDataTable([
                ['Score', 'Number of votes'],
                ['1', await this.getResultsForScore(1)],
                ['2', await this.getResultsForScore(2)],
                ['3', await this.getResultsForScore(3)]
            ]);
            const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
            pie_1_chart.draw(data);
        }
    },
    mounted() {
        GoogleCharts.load(this.gcReady);

        // read url params
        const urlParams = new URLSearchParams(window.location.search);
        this.campaignName = urlParams.get('campaignName') || urlParams.get('cn') || '';
    }
}
</script>