<template>
    <div>
        healdless cms

        <div v-for="i in res" v-html="i .content.rendered">
        </div>

    </div>
</template>

<script>


export default {
    data() {
        return {
            res: []
        };
    },
    mounted() {


        this.$axios.get("http://manager.raphaelmouly.com/wp-json/wp/v2/posts").then(res => {
            console.log(res);
            this.res = res.data
        })
    },
    methods: {}
};
</script>