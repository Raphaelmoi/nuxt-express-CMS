<template>
	<!-- COMPOSANT MESSAGE GLOBAUX VIA LE STORE -->
	<section id="MessageToUser" v-if="$store.state.message_to_user.length">
		<div class="flex">
			<span class="autoML pointer me" @click="$store.commit('cleanGlobalMessage')">Tout fermer X</span>
		</div>
		<div
			v-for="(item, index) in $store.state.message_to_user"
			:key="index"
			class="itemMsg"
			:class="[item.type, removeAtEndDuration(item)]"
		>
			<div v-html="item.val"></div>
			<span class="delMsg" @click="$store.commit('addMessage_to_user', item)">X</span>
		</div>
	</section>
</template>

<script>
export default {
	name: "MessageToUser",
	methods: {
		removeAtEndDuration(item) {
			setTimeout(() => {
				if (this.$store.state.message_to_user.findIndex((el) => el.val === item.val) != -1) {
					this.$store.commit("addMessage_to_user", item);
				}
			}, item.duration);
			return "";
		},
	},
};
</script>

<style>
#MessageToUser {
	position: fixed;
	bottom: 0;
	/* border-radius: 4px; */
	width: 100%;
	/* margin-left: 20%; */
	display: flex;
	flex-direction: column;
	z-index: 100;
	box-shadow: 0 0 16px #4444;
	overflow: hidden;
	display: flex;
}
#MessageToUser .itemMsg {
	padding: 2px 1em;
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;
	width: calc(100% - 2em);
	background: white;
}
#MessageToUser .itemMsg > div {
	flex: 1;
}
#MessageToUser .delMsg {
	/* min-width: 50px; */
	height: 40px;
	align-self: flex-start;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 1.5rem;
	cursor: pointer;
	margin-left: auto;
}
.itemMsg {
	transition: 0.5s ease;
}
.itemMsg:hover {
	background: #ccc;
}
.error {
}
.itemMsg.error {
	animation: errorAnim 1s linear;
}
.itemMsg.success {
	animation: successAnim 1s linear;
}
@keyframes hideglobalmsg {
	to {
		opacity: 0;
	}
}
@keyframes errorAnim {
	from {
		background: rgb(201, 102, 118);
	}
}
@keyframes successAnim {
	from {
		background: rgb(61, 160, 61);
	}
}
</style>
