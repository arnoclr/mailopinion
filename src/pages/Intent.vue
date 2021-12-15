<template>
    <div>
        <ClientOnly>
            <Intent />
        </ClientOnly>
    </div>
</template>

<script>
export default {
    components: {
        Intent: () => import ('~/components/_Intent.vue')
    },
    metaInfo: {
        title: 'Leave a feedback'
    }
}
</script>