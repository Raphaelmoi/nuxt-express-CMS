<script>
export default {
  methods: {
    timeStampToHuman(timestamp) {
      return new Date(timestamp).toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>