<template>
  <div class="flex flex-col">
    <div class="flex-1 min-h-0">
      <div :class="$options.cmdAreaClasses">
        <div v-for="(log, i) in logs_" :key="i" class="break-words">{{log}}</div>
      </div>
    </div>
    <div class="py-2 bg-gray-700 flex">
      <div class="px-2 flex items-center">
        <v-icon :icon="'search'" size="sm"></v-icon>
      </div>
      <v-input @input="search" v-model="searchTerm"></v-input>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { store } from '../../store';
import { Container } from '../../@types';
import { COLOR } from "@/utils/colors";

export default Vue.extend({
  data: () => ({
    searchTerm: '',
    logs: [] as Array<string>,
    logs_: [] as Array<string>,
  }),
  methods: {
    search() {
      if(!this.searchTerm) {
        this.logs_ = this.logs
        return
      }

      this.logs_ = this.logs.filter(line => line.indexOf(this.searchTerm) > 0)
    },
    setOptions() {
      this.$options['cmdAreaClasses'] = {
        'pl-2 text-sm': true,
        [COLOR.BG_CMD]: true,
        [COLOR.T_CMD]: true,
        'font-family-source-code': true,
        'h-full overflow-auto': true
      }
    }
  },
  computed: {
    container(): Container {
      return store.containers[this.$route.params.id]
    },
  },
  async created() {
    let data = await window.api.Container.Logs(this.container.Id)
    this.setOptions()
    this.logs = this.logs_ = data.split('\n');
  },
})
</script>

<style lang="scss">
.font-family-source-code {
  font-family: 'Source Code Pro';
  font-size: 0.875rem;
}
</style>