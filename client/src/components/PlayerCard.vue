<template>
  <v-card
    :key="player.id"
    variant="outlined"
  >
    <template #prepend>
      <v-avatar v-if="index == 0" color="yellow-darken-1">
        <v-icon icon="mdi-trophy" />
      </v-avatar>
      <v-avatar v-else-if="index == 1" color="blue-grey-darken-1">
        <v-icon icon="mdi-medal" />
      </v-avatar>
      <v-avatar v-else-if="index == 2" color="orange-darken-4">
        <v-icon icon="mdi-license" />
      </v-avatar>
      <v-avatar v-else class="text-h5 font-weight-black" color="default">
        {{ index + 1 }}
      </v-avatar>
    </template>
    <template #title>
      <div class="d-flex justify-between">
        <div>{{ player.name }}</div>
      </div>
    </template>
    <template #subtitle>13‰</template>
    <template #append> <v-btn color="default" icon="mdi-plus " size="small" variant="outlined" /></template>
  </v-card>
</template>

<script lang="ts" setup>
  import type { Player } from '@/types'
  const { player, index } = defineProps(
    {
      player: {
        type: Object as () => Player,
        required: true,
      },
      index: {
        type: Number,
        required: true,

      },
    },
  )
</script>
