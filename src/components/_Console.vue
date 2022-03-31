<template>
    <div class="mo-divided">
        <div class="mo-drawer">
            <ClientOnly>
                <Auth :onSuccess="onSignIn" style="margin-left: 12px" />
            </ClientOnly>

            <div class="mo-textfield" style="margin: 12px">
                <input class="mo-textfield__input" type="text" id="campaignName" placeholder=" "
                    v-model="campaignName" @keyup="drawChart">
                <label class="mo-textfield__label" for="campaignName">Campaign name</label>
                <div class="mo-textfield__underline"></div>
                <div class="mo-textfield__disclaimer"></div>
            </div>

            <ul class="mo-campaignslist" style="margin-top: 36px">
                <li class="mo-campaignslist__item" v-for="campaign in campaigns" :key="campaign.id" @click="setCampaign(campaign.id)" :aria-selected="campaign.id == campaignName">
                    {{ campaign.label }}
                </li>
            </ul>
        </div>
        <div class="">
            <p v-if="campaignData && campaignData.embedQuestion.length > 0">
                {{ campaignData.embedQuestion }}
            </p>

            <div class="mo-empty" v-if="empty">
                <i class="mo-empty__icon material-icons">error</i>
                <p class="mo-empty__text">
                    {{ $t('console.data.dataEmpty') }}
                </p>
            </div>

            <div id="chart1"></div>

            <div class="" v-if="comments.length > 0">
                <p>{{ $t('console.data.comments') }}</p>
                <ul class="mo-comments">
                    <li class="mo-comments__comment" v-for="record in comments" :key="record.id">
                        <p>{{ record.comment }}</p>
                    </li>
                </ul>
            </div>
            <p v-else>{{ $t('console.data.commentsEmpty') }}</p>

            <button class="mo-btn" @click="deleteCampaign">{{ $t('console.actions.delete') }}</button>
        </div>

        <CLogEvent name="console" />
    </div>
</template>

<script>
import { collection, doc, query, orderBy, getDocs, getDoc, where, limit, deleteDoc } from "firebase/firestore"
import { db } from "~/firebase";
import { GoogleCharts } from "google-charts";

export default {
    components: {
        Auth: () => import ('~/components/Auth.vue'),
        CLogEvent: () => import ('~/components/LogEvent.vue'),
    },
    data() {
        return {
            campaignName: '',
            chartLoaded: false,
            isSignedIn: false,
            comments: [],
            campaignData: null,
            campaigns: [],
            empty: false,
        }
    },
    methods: {
        onSignIn(user) {
            this.isSignedIn = true;
            this.step++;
            this.$user = user;
            this.fetchCampaigns();
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
        async fetchComments() {
            const q = query(collection(db, "users", this.$user.uid, "campaigns", this.campaignName, "records"), orderBy('comment', 'asc'), orderBy("createdAt", "desc"), limit(10));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(doc => {
                this.comments.push({...doc.data(), id: doc.id});
            });
        },
        async fetchCampaign() {
            const docRef = await getDoc(doc(db, "users", this.$user.uid, "campaigns", this.campaignName));

            this.campaignData = docRef.data();
        },
        async deleteCampaign() {
            if (confirm(this.$t('console.actions.deleteConfirm'))) {
                await deleteDoc(doc(db, "users", this.$user.uid, "campaigns", this.campaignName));
                this.campaignName = '';
                this.campaignData = null;
                this.comments = [];
                this.empty = false;
                this.fetchCampaigns();
            }
        },
        async fetchCampaigns() {
            const q = query(collection(db, "users", this.$user.uid, "campaigns"), orderBy("createdAt", "desc"), limit(25));

            const querySnapshot = await getDocs(q);

            this.campaigns = [];
            querySnapshot.forEach(doc => {
                this.campaigns.push({...doc.data(), id: doc.id});
            });
        },
        setCampaign(id) {
            this.$setQueryStringParameter("cpid", id);
            this.campaignName = id;
            this.comments = [];
            this.drawChart();
        },
        async drawChart() {
            if (!this.chartLoaded) return;

            const graphData = [
                ['Score', 'Number of votes'],
                ['1', await this.getResultsForScore(1)],
                ['2', await this.getResultsForScore(2)],
                ['3', await this.getResultsForScore(3)]
            ]

            // Standard google charts functionality is available as GoogleCharts.api after load
            const data = GoogleCharts.api.visualization.arrayToDataTable(graphData);
            const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
            pie_1_chart.draw(data);

            let empty = true
            for (let i = 1; i < graphData.length; i++) {
                if (graphData[i][1] > 0) {
                    empty = false
                }
            }

            this.empty = empty
            this.fetchComments();
        }
    },
    mounted() {
        GoogleCharts.load(this.gcReady);

        // read url params
        const urlParams = new URLSearchParams(window.location.search);
        this.campaignName = urlParams.get('campaignName') || urlParams.get('cn') || urlParams.get('cpid') || '';
    }
}
</script>