<template>
  <div class="min-h-screen py-20 section-bg">
    <div class="container mx-auto px-6 max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-bold mb-8 gradient-text">
        Politika kolačića
      </h1>

      <div class="glass-effect p-8 rounded-3xl space-y-6">
        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            1. Šta su kolačići?
          </h2>
          <p class="text-muted leading-relaxed">
            Kolačići su mala tekstualna fajlova koja se čuvaju na vašem uređaju
            kada posetite našu web stranicu. Oni nam pomažu da poboljšamo vaše
            iskustvo korišćenja sajta i razumemo kako posetitelji koriste našu
            stranicu.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            2. Kako koristimo kolačiće
          </h2>
          <p class="text-muted leading-relaxed mb-4">Koristimo kolačiće za:</p>
          <ul class="list-disc list-inside text-muted space-y-2 ml-4">
            <li>Zapamtiti vaše postavke (npr. tema stranice)</li>
            <li>Poboljšati funkcionalnost sajta</li>
            <li>Analizirati korišćenje sajta</li>
            <li>Osigurati sigurnost sajta</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            3. Vrste kolačića
          </h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-xl font-semibold mb-2 text-primary">
                Neophodni kolačići
              </h3>
              <p class="text-muted leading-relaxed">
                Ovi kolačići su neophodni za rad sajta i ne mogu se isključiti.
                Oni se obično postavljaju kao odgovor na vaše akcije kao što su
                postavke privatnosti, prijava ili popunjavanje formulara.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-primary">
                Funkcionalni kolačići
              </h3>
              <p class="text-muted leading-relaxed">
                Ovi kolačići omogućavaju sajtu da zapamti vaše izbore (npr.
                jezik, tema) i pružaju poboljšane, personalizovane funkcije.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-primary">
                Analitički kolačići
              </h3>
              <p class="text-muted leading-relaxed">
                Ovi kolačići nam pomažu da razumemo kako posetitelji koriste
                našu stranicu, tako što prikupljaju i prijavljuju anonimne
                informacije.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            4. Upravljanje kolačićima
          </h2>
          <p class="text-muted leading-relaxed">
            Većina web pregledača automatski prihvata kolačiće, ali možete
            prilagoditi svoje postavke pregledača da odbijete kolačiće ili da
            vas obaveste kada se kolačić šalje. Imajte na umu da odbijanje
            kolačića može uticati na funkcionalnost našeg sajta.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">
            5. Kolačići trećih strana
          </h2>
          <p class="text-muted leading-relaxed">
            Na našem sajtu možemo koristiti servise trećih strana koje takođe
            postavljaju kolačiće na vašem uređaju. Ovi kolačići se koriste za
            analitiku i reklamiranje. Ne kontrolišemo kolačiće trećih strana i
            preporučujemo vam da pročitate politiku privatnosti tih stranica.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-primary">6. Kontakt</h2>
          <p class="text-muted leading-relaxed">
            Ako imate pitanja o našoj politici kolačića, kontaktirajte nas:
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
            7. Promene politike
          </h2>
          <p class="text-muted leading-relaxed">
            Možemo povremeno ažurirati ovu politiku kolačića. Sve promene će
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
