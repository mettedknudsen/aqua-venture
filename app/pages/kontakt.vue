<template>
  <h1 class="title">Kontakt</h1>
  <p class="mb-2">{{contactInfo.name}}Aqua Venture </p>
  <p class="mb-2">{{contactInfo.address}}Hjorthholmsvej 2A, 8000 Aarhus</p>
  <p class="mb-2">Telefon: <a class="text-ocean-500 hover:underline transition-colors duration-300 ease-in" :href="`tel:${contactInfo.phone}`">{{contactInfo.phone}}</a></p>
  <p>E-mail: <a class="text-ocean-500 hover:underline transition-colors duration-300 ease-in" :href="`mailto:${contactInfo.email}`">{{contactInfo.email}}</a></p>

  <div class="h-100 mt-10 max-w-200">
    <LMap
      ref="map"
      :zoom="zoom"
      :zoom-control="false"
      :options="{ zoomControl: false }"
      :center="[56.163094803035904, 10.218686926326047]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="[56.163094803035904, 10.218686926326047]"/>
    </LMap>
  </div>

</template>
<script setup lang="ts">
import {contactInfo} from '~/data/contact-info'

import { ref } from 'vue'
const zoom = ref(20)
</script>
