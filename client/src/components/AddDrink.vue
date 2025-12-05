<template>
  <v-bottom-sheet>
    <template #activator="{props}">
      <v-btn v-bind="props" block>Add drink</v-btn>
    </template>
    <v-card block prepend-icon="mdi-liquor" title="Add drink">
      <v-card-text>
        <v-form ref="form" v-model="validForm" @submit.prevent="submit">
          <v-autocomplete
            v-model="participatingPlayers"
            chips
            closable-chips
            density="default"
            item-title="name"
            item-value="id"
            :items="players"
            label="Participating players"
            multiple
          />
          <DrinkForm v-model="drink" />

          <v-btn block type="submit">Save drinks</v-btn>
        </v-form>

      </v-card-text>
    </v-card>
  </v-bottom-sheet>

</template>

<script setup lang="ts">
  import type { DrinkEntity, Player } from '@/types'
  import { appFetch } from '@/stores/app'
  const validForm = ref(false)
  const drink = ref<Partial<DrinkEntity>>({})
  const participatingPlayers = ref<Player['id'][]>([])

  const _props = defineProps(
    { players: {
      type: Array<Player>,
    } })

  const formRef = useTemplateRef('form')

  async function submit () {
    await formRef.value?.validate()
    if (!validForm.value) return
    console.log('Form is valid!')
    sendFormRequest()
  }

  const { execute: sendFormRequest } = appFetch('/addDrinks', { immediate: false }).post({ drink: drink.value, players: participatingPlayers.value })
</script>
