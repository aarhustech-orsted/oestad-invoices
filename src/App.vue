<template>
  <main class="page">
    <div class="flex flex-col p-16">
      <div class="flex justify-between">
        <div class="pt-16">
          <p class="font-bold">{{ data.person.name }}</p>
          <p>
            {{
              data.person.primary_address.address
                .split("|")
                .filter((i) => i !== "")
                .join(", ")
            }}
          </p>
          <p>+45 {{ data.person.phone }}</p>
          <p>{{ data.person.email }}</p>
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
        <p>{{ data.person.id }}</p>
      </div>

      <div
        class="flex self-end justify-between w-1/2 px-2 mt-1 bg-blue-200 rounded"
      >
        <p>Fakturanummer</p>
        <p>{{ data.invoice.id }}</p>
      </div>

      <div
        class="flex self-end justify-between w-1/2 px-2 mt-1 bg-blue-200 rounded"
      >
        <p>Fakturadato</p>
        <p>
          {{
            `${data.invoice.date.day}.${data.invoice.date.month}.${data.invoice.date.year}`
          }}
        </p>
      </div>

      <div class="mt-8">
        <p>
          <b>Afregningsperiode</b>:
          {{ `1.${data.invoice.date.month}.${data.invoice.date.year}` }}-
          {{ `31.${data.invoice.date.month}.${data.invoice.date.year}` }}
        </p>
        <p>Forbrug til fakturering:* {{ data.invoice.usage.kwh }} kWh</p>

        <p class="w-full px-2 mt-8 font-bold bg-blue-200 rounded">
          EL til adresse
        </p>
        <div class="flex justify-between px-2">
          <p>Ørsted Abonement</p>
          <p>10,00</p>
        </div>
        <div class="flex justify-between px-2">
          <p>EL Forbrug</p>
          <p>
            {{
              new Intl.NumberFormat("da-DK", {
                minimumFractionDigits: 2,
              }).format(data.invoice.usage.kwh * data.invoice.usage.price)
            }}
          </p>
        </div>
        <div class="flex justify-between px-2">
          <p>Klima tillæg (1%)</p>
          <p>4,00</p>
        </div>
        <div class="flex justify-between px-2">
          <p>Moms (25%)</p>
          <p>
            {{
              new Intl.NumberFormat("da-DK", {
                minimumFractionDigits: 2,
              }).format(
                (data.invoice.usage.kwh * data.invoice.usage.price + 10 + 4) *
                  0.25
              )
            }}
          </p>
        </div>
        <div class="flex justify-between px-2 mb-px border-t border-b">
          <p>I alt inkl. moms</p>
          <p>
            {{
              new Intl.NumberFormat("da-DK", {
                minimumFractionDigits: 2,
              }).format(
                (data.invoice.usage.kwh * data.invoice.usage.price + 10 + 4) *
                  1.25
              )
            }}
          </p>
        </div>
        <div class="flex justify-between px-2 border-t border-b">
          <p>
            Beløb til betalling via Betalingservice d.
            {{ `31.${data.invoice.date.month}.${data.invoice.date.year}` }}
          </p>
          <p>
            {{
              new Intl.NumberFormat("da-DK", {
                minimumFractionDigits: 2,
              }).format(
                (data.invoice.usage.kwh * data.invoice.usage.price + 10 + 4) *
                  1.25
              )
            }}
          </p>
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
        Seneste aflæsning fra måler nr.: {{ data.address.measure_device }} var
        {{ `1.${data.invoice.date.month}.${data.invoice.date.year}` }},:
        {{ data.invoice.measure }} kWh
      </p>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const data = ref({
      person: {
        id: "00000000",
        name: "Firstname Lastname",
        email: "example@example.com",
        phone: "00000000",
        primary_address: {
          id: "RWtzZW1wbGV2ZWogMXx8MDAwMCBCeW5hdm4=",
          address: "Eksemplevej 1||0000 Bynavn",
        },
      },
      address: {
        id: "RWtzZW1wbGV2ZWogMXx8MDAwMCBCeW5hdm4=",
        address: "Eksemplevej 1||0000 Bynavn",
        measure_device: "00000000",
      },
      invoice: {
        id: "000000000000000",
        date: { day: 1, month: 1, year: 2020 },
        usage: { price: 0.5, kwh: 100 },
        measure: 999999,
      },
    });

    onMounted(() => {
      window.data = data;
    });

    return { data };
  },
};
</script>

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
