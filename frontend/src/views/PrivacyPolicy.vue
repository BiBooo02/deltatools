<template>
  <div class="min-h-screen py-20 section-bg">
    <div class="container mx-auto px-6 max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-bold mb-8 gradient-text">
        Politika privatnosti
      </h1>

      <div class="glass-effect p-8 rounded-3xl space-y-6">
        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">1. Uvod</h2>
          <p class="text-muted leading-relaxed">
            Delta Tools d.o.o. ("mi", "nas", "naš") poštuje vašu privatnost i
            obaveštava vas o načinu na koji prikupljamo, koristimo i štitimo
            vaše lične podatke kada koristite našu web stranicu.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            2. Podaci koje prikupljamo
          </h2>
          <p class="text-muted leading-relaxed mb-4">
            Prikupljamo sledeće vrste podataka:
          </p>
          <ul class="list-disc list-inside text-muted space-y-2 ml-4">
            <li>Kontakt podaci (ime, email, telefon)</li>
            <li>Informacije o korišćenju sajta</li>
            <li>Tehnički podaci (IP adresa, tip pregledača)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            3. Kako koristimo vaše podatke
          </h2>
          <p class="text-muted leading-relaxed">
            Vaše lične podatke koristimo isključivo za:
          </p>
          <ul class="list-disc list-inside text-muted space-y-2 ml-4 mt-4">
            <li>Obradu vaših upita i zahteva</li>
            <li>Poboljšanje naših usluga</li>
            <li>Komunikaciju sa vama</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            4. Podela podataka
          </h2>
          <p class="text-muted leading-relaxed">
            Ne prodajemo, ne iznajmljujemo niti na bilo koji način delimo vaše
            lične podatke sa trećim stranama, osim kada je to neophodno za
            pružanje naših usluga ili kada to zahteva zakon.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">5. Bezbednost</h2>
          <p class="text-muted leading-relaxed">
            Primenjujemo odgovarajuće tehničke i organizacione mere zaštite da
            bismo zaštitili vaše lične podatke od neovlašćenog pristupa, gubitka
            ili uništenja.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">6. Vaša prava</h2>
          <p class="text-muted leading-relaxed">Imate pravo da:</p>
          <ul class="list-disc list-inside text-muted space-y-2 ml-4 mt-4">
            <li>Zatražite pristup vašim ličnim podacima</li>
            <li>Zatražite ispravku neispravnih podataka</li>
            <li>Zatražite brisanje vaših podataka</li>
            <li>Usprotivite se obradi podataka</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">7. Kontakt</h2>
          <p class="text-muted leading-relaxed">
            Za pitanja u vezi sa ovom politikom privatnosti, kontaktirajte nas
            na:
          </p>
          <p class="text-muted mt-4">
            Email:
            <a
              href="mailto:info@deltatools.rs"
              class="text-yellow-500 hover:underline"
              >info@deltatools.rs</a
            ><br />
            Telefon:
            <a href="tel:+381111234567" class="text-yellow-500 hover:underline"
              >+381 11 123 4567</a
            >
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            8. Promene politike
          </h2>
          <p class="text-muted leading-relaxed">
            Zadržavamo pravo da menjamo ovu politiku privatnosti. Sve promene će
            biti objavljene na ovoj stranici.
          </p>
          <p class="text-muted mt-4">
            Poslednja izmena: {{ new Date().toLocaleDateString("sr-RS") }}
          </p>
        </section>

        <div class="pt-6">
          <router-link
            to="/"
            class="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Nazad na početnu
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #fbbf24 0%, #ffa500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-bg {
  background: var(--bg-primary);
  transition: background-color 0.3s ease;
}

.text-muted {
  color: var(--text-muted);
}

.text-primary {
  color: var(--text-primary);
}

.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
}
</style>
