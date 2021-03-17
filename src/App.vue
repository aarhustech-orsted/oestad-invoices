<script setup>
import { reactive, onMounted } from "vue";

const data = reactive({
  id: "U3RyYW5kdmFuZ3N2ZWogMzd8fDgyNTAgRWeM",
  firstName: "Christian",
  lastName: "Hansen",
  email: "christian-w-h@outlook.com".toLowerCase(),
  phone: "31639993".split("-").join(""),
  address: "Strandvangsvej 55||8250 Egå",

  subject: {
    address: "Strandvangsvej 37||8250 Egå",
    usage: {
      kwh: 517,
      price: 0.2376,
    },
  },
});

onMounted(() => {
  setTimeout(() => {
    if (window.data) data.value = window.data;
  }, 25);
});
</script>

<template>
  <main class="page">
    <div class="flex flex-col p-16">
      <div class="flex justify-between">
        <div class="pt-16">
          <p class="font-bold">{{ data.firstName }} {{ data.lastName }}</p>
          <p>
            {{
              data.address
                .split("|")
                .filter((i) => i !== "")
                .join(", ")
            }}
          </p>
          <p>+45 {{ data.phone }}</p>
          <p>{{ data.email }}</p>
        </div>
        <div class="self-end">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/%C3%98rsted_logo.svg"
            class="mb-4"
          />
          <p>Ørsted A/S</p>
          <p>Kraftværksvej 53, <br />7000 Fredericia</p>
          <p>+45 99 55 11 11</p>
          <p>info@orsted.com</p>
        </div>
      </div>

      <div
        class="flex self-end justify-between w-1/2 px-2 mt-4 bg-blue-200 rounded"
      >
        <p>Ørsted Kontonummer</p>
        <p>1234567890</p>
      </div>

      <div
        class="flex self-end justify-between w-1/2 px-2 mt-1 bg-blue-200 rounded"
      >
        <p>Fakturanummer</p>
        <p>12345678901231</p>
      </div>

      <div
        class="flex self-end justify-between w-1/2 px-2 mt-1 bg-blue-200 rounded"
      >
        <p>Fakturadato</p>
        <p>17.04.2020</p>
      </div>

      <div class="mt-8">
        <p><b>Afregningsperiode</b>: 0.1.04.2020-31.04.2020</p>
        <p>Forbrug til fakturering:* {{ data.subject.usage.kwh }} kWh</p>

        <p class="w-full px-2 mt-8 font-bold bg-blue-200 rounded">
          EL til adresse
        </p>
        <div class="flex justify-between px-2">
          <p>Ørsted Abonement</p>
          <p>10,00</p>
        </div>
        <div class="flex justify-between px-2">
          <p>EL Forbrug</p>
          <p>123,00</p>
        </div>
        <div class="flex justify-between px-2">
          <p>Klima tillæg (1%)</p>
          <p>4,00</p>
        </div>
        <div class="flex justify-between px-2">
          <p>Moms (25%)</p>
          <p>250,00</p>
        </div>
        <div class="flex justify-between px-2 mb-px border-t border-b">
          <p>I alt inkl. moms</p>
          <p>538,00</p>
        </div>
        <div class="flex justify-between px-2 border-t border-b">
          <p>Beløb til betalling via Betalingservice d. 10.05.2020</p>
          <p>538,00</p>
        </div>
      </div>

      <p class="mt-4">Du skal bruge følgende oplysninger ved</p>
      <p class="font-medium">Betaling +71 &lt;123456789012345 + 12345678&gt;</p>
      <p>
        Vær venligst opmærksom på, at der kan forekomme mindre differencer i
        totalerne, da der beregnes på flere decimaler end der vises på
        fakturaren.
      </p>
      <p class="mt-4 font-bold">Måleraflæsning</p>
      <p>
        Seneste aflæsning fra måler nr.: 12345678 var 01.04.2020,: 13709 kWh
      </p>
    </div>
  </main>
</template>

<style>
@page {
  format: A4;
  size: 210mm 297mm;
  margin: 0mm 0mm;
}

@media print {
  .page {
    width: 210mm !important;
    height: 296.75mm !important;
  }
}

@media print {
  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
    visibility: hidden;
  }

  .page {
    position: relative;
    overflow: hidden;

    visibility: visible;

    padding: 0 !important;
    margin: 0 !important;

    page-break-after: auto;
    page-break-inside: avoid !important;

    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}
</style>
