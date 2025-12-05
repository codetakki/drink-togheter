<template>
  <div class="d-flex flex-column" style="overflow-y: hidden; height: 100vh;">

    <v-toolbar density="compact">
      <v-toolbar-title :text="roomData?.name" />
      <AddPlayer :room-code="roomCode" @done="fetchRoom()" />
    </v-toolbar>
    <div class="overflow-auto pa-4 h-100">
      <div class="d-flex flex-column ga-4">
        <PlayerCard v-for="player, i in roomData?.users" :key="player.id" :index="i" :player="player" />
      </div>
    </div>
    <v-card>
      <v-card-text>
        <AddDrink :players="roomData?.users || []" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import type { Room } from '@/types'
  import { appFetch } from '@/stores/app'
  const route = useRoute()
  const roomCode = computed(() => {
    if (!route || !route.params) return null
    if ('roomId' in route.params) return route.params.roomId
    return null
  })

  const { data: roomData, execute: fetchRoom } = appFetch<Room>(
    'room/' + roomCode.value,
  ).get().json<Room>()
</script>

<style></style>
