<template>
  <div class="min-h-screen py-20 section-bg">
    <div class="container mx-auto px-6 max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-bold mb-8 gradient-text">
        Uslovi korišćenja
      </h1>

      <div class="glass-effect p-8 rounded-3xl space-y-6">
        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            1. Prihvatanje uslova
          </h2>
          <p class="text-muted leading-relaxed">
            Koristeći našu web stranicu, prihvatate ove uslove korišćenja. Ako
            se ne slažete sa bilo kojim delom ovih uslova, molimo vas da ne
            koristite našu stranicu.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            2. Korišćenje sajta
          </h2>
          <p class="text-muted leading-relaxed mb-4">
            Sajt možete koristiti za:
          </p>
          <ul class="list-disc list-inside text-muted space-y-2 ml-4">
            <li>Pregled naših proizvoda i usluga</li>
            <li>Kontaktiranje našeg tima</li>
            <li>Informisanje o našoj kompaniji</li>
          </ul>
          <p class="text-muted leading-relaxed mt-4">Zabranjeno je:</p>
          <ul class="list-disc list-inside text-muted space-y-2 ml-4 mt-2">
            <li>Korišćenje sajta u ilegalne svrhe</li>
            <li>Pokretanje virusa ili malicioznog koda</li>
            <li>Narušavanje bezbednosti sajta</li>
            <li>Kopiranje sadržaja bez dozvole</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            3. Intelektualna svojina
          </h2>
          <p class="text-muted leading-relaxed">
            Svi sadržaji na sajtu, uključujući tekstove, slike, logotipe i
            dizajn, su vlasništvo Delta Tools d.o.o. i zaštićeni su autorskim
            pravima. Zabranjeno je reprodukovanje, distribucija ili javno
            prikazivanje bez prethodne pisane dozvole.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            4. Odricanje od odgovornosti
          </h2>
          <p class="text-muted leading-relaxed">
            Pokušavamo da osiguramo da su sve informacije na sajtu tačne i
            ažurne, ali ne garantujemo potpunost ili tačnost informacija. Ne
            snosimo odgovornost za bilo kakve greške ili propuste u
            informacijama.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            5. Ograničenje odgovornosti
          </h2>
          <p class="text-muted leading-relaxed">
            Delta Tools d.o.o. neće biti odgovorna za bilo kakve direktne,
            indirektne, slučajne ili posledične štete koje proističu iz
            korišćenja ili nemogućnosti korišćenja našeg sajta.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            6. Promene uslova
          </h2>
          <p class="text-muted leading-relaxed">
            Zadržavamo pravo da u bilo kom trenutku izmenimo ove uslove
            korišćenja. Sve promene će biti objavljene na ovoj stranici.
            Nastavkom korišćenja sajta posle promena, prihvatate nove uslove.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">7. Kontakt</h2>
          <p class="text-muted leading-relaxed">
            Ako imate pitanja o ovim uslovima korišćenja, kontaktirajte nas:
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
          <p class="text-muted">
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
