<template>
  <div>
    <!-- Hero Section -->
    <header
      class="relative min-h-screen flex items-center justify-center overflow-hidden animate-fade-in"
      style="background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));"
    >
      <div class="absolute inset-0">
        <img
          src="https://thumbs.dreamstime.com/b/woodworking-machine-tools-factory-manufacturing-material-lumber-craft-construction-empty-warehouse-small-business-380656861.jpg"
          alt="Pozadina"
          class="w-full h-full object-cover filter blur-sm"
        />
      </div>
      <div class="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 class="text-6xl md:text-7xl font-bold mb-6 animate-slide-up text-white">
          Delta Tools
        </h1>
        <p class="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200 text-white">
          Profesionalni alati za farbanje, dekorativne i građevinske radove, kao i vrhunski premazi za metal i drvo.
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
          <a
            href="#about"
            @click.prevent="scrollToSection('about')"
            class="font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-black text-white hover:bg-gray-800"
          >
            Saznaj više
          </a>
          <a
            href="#contact"
            @click.prevent="scrollToSection('contact')"
            class="font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-white text-black border-2 border-white hover:bg-gray-100"
          >
            Kontaktirajte nas
          </a>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </header>

<!-- About Us -->
<section id="about" class="min-h-screen py-20 animate-on-scroll bg-white">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-4 text-black">
        O Delta Tools-u
      </h2>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        Pružamo vrhunske alate za profesionalce u industriji farbanja, dekoracije i građevinarstva, kao i premium premaze za metal i drvo.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center mb-20">
      <div class="relative">
        <img
          src="/img/slika1.jpg"
          class="w-full h-[500px] object-cover rounded-3xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div class="space-y-6">
        <h3 class="text-3xl font-bold text-black">Naša priča</h3>
        <p class="text-gray-600 leading-relaxed">
          Delta Tools pruža vrhunske alate dizajnirane za profesionalce u industriji farbanja, dekoracije i građevinarstva. Takođe nudimo premium premaze za metal i drvo koji osiguravaju dugotrajnu zaštitu i estetski izgled. Sa fokusom na inovacije i trajnost, naši proizvodi osiguravaju superiorne performanse i pouzdanost.
        </p>
        <div class="grid grid-cols-2 gap-6 mt-8">
          <div class="bg-black p-6 rounded-2xl hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <h4 class="text-xl font-semibold mb-2 text-white">Kvalitet</h4>
            <p class="text-gray-300">Vrhunski materijali i izrada</p>
          </div>
          <div class="bg-black p-6 rounded-2xl hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <h4 class="text-xl font-semibold mb-2 text-white">Inovacije</h4>
            <p class="text-gray-300">Savremeni dizajn i tehnologija</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="space-y-6 order-2 md:order-1">
        <h3 class="text-3xl font-bold text-black">Naša posvećenost</h3>
        <p class="text-gray-600 leading-relaxed">
          U Delta Tools-u smo posvećeni izvrsnosti. Naši alati i premazi su izrađeni da zadovolje najviše industrijske standarde, pomažući profesionalcima da postignu preciznost i efikasnost u svakom projektu.
        </p>
        <div class="grid grid-cols-2 gap-6 mt-8">
          <div class="bg-black p-6 rounded-2xl hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <h4 class="text-xl font-semibold mb-2 text-white">Trajnost</h4>
            <p class="text-gray-300">Izrađeno da traje i radi</p>
          </div>
          <div class="bg-black p-6 rounded-2xl hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <h4 class="text-xl font-semibold mb-2 text-white">Podrška</h4>
            <p class="text-gray-300">24/7 korisnička podrška</p>
          </div>
        </div>
      </div>
      <div class="relative order-1 md:order-2">
        <img
          src="/img/workers-6762542_1280.jpg"
          class="w-full h-[500px] object-cover rounded-3xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  </div>
</section>

<!-- Ponosni Partneri -->
<section id="partners" class="py-16 bg-black">
  <h3 class="text-2xl font-semibold text-white text-center mb-12">
    Ponosni partneri
  </h3>
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row items-center justify-center gap-12 partner-logos">
      <img
        src="/img/MIMONT-logo-color.png"
        alt="MIMONT Logo"
        class="w-60 h-auto transform hover:scale-110 transition-transform duration-300"
      />
      <img
        src="/img/IRKOM-LOGO.png"
        alt="IRKOM Logo"
        class="w-60 h-auto transform hover:scale-110 transition-transform duration-300"
      />
    </div>
  </div>
</section>

    <!-- Features -->
    <section id="features" class="min-h-screen py-20 animate-on-scroll bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-black">
            Naše prednosti
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Otkrijte zašto su naši alati izbor profesionalaca u industriji
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white border border-gray-200 p-8 rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div class="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-black">Vrhunski kvalitet</h3>
            <p class="text-gray-600">
              Naši alati su izrađeni od najkvalitetnijih materijala, osiguravajući dugotrajnost i pouzdanost u svakom projektu.
            </p>
          </div>

          <div class="bg-white border border-gray-200 p-8 rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div class="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-black">Brza isporuka</h3>
            <p class="text-gray-600">
              Pružamo brzu i pouzdanu isporuku na teritoriji cele zemlje, osiguravajući da vaši projekti ne čekaju.
            </p>
          </div>

          <div class="bg-white border border-gray-200 p-8 rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div class="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-black">24/7 podrška</h3>
            <p class="text-gray-600">
              Naš tim stručnjaka je uvek tu da vam pomogne sa savetima i rešenjima za vaše projekte.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="min-h-screen py-20 animate-on-scroll bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-black">
            Šta kažu naši klijenti
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Profesionalci iz industrije nam veruju svojim projektima
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gray-50 border border-gray-200 p-8 rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h4 class="font-semibold text-black">Marko Petrović</h4>
                <p class="text-gray-600 text-sm">Građevinski majstor</p>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed">
              "Delta Tools alati su neophodni u mom poslu. Kvalitet je izvanredan, a trajnost je impresivna. Preporučujem svim profesionalcima."
            </p>
          </div>

          <div class="bg-gray-50 border border-gray-200 p-8 rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h4 class="font-semibold text-black">Ana Jovanović</h4>
                <p class="text-gray-600 text-sm">Dekorativni majstor</p>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed">
              "Koristim Delta Tools premaze već 5 godina. Rezultati su uvek odlični, a klijenti su zadovoljni kvalitetom završnih radova."
            </p>
          </div>

          <div class="bg-gray-50 border border-gray-200 p-8 rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h4 class="font-semibold text-black">Stefan Nikolić</h4>
                <p class="text-gray-600 text-sm">Farbar</p>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed">
              "Profesionalni alati koji uvek ispunjavaju očekivanja. Delta Tools je moj izbor za sve projekte - od malih popravki do velikih objekata."
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="min-h-screen py-20 animate-on-scroll bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-black">
            Često postavljena pitanja
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Odgovori na najčešća pitanja o našim proizvodima
          </p>
        </div>

        <div class="max-w-4xl mx-auto space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white border border-gray-200 p-6 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl"
            @click="toggleFaq(index)"
          >
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-black">
                {{ faq.question }}
              </h3>
              <svg
                class="w-6 h-6 transition-transform duration-300 text-gray-600"
                :class="{ 'rotate-180': faq.isOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
              v-show="faq.isOpen"
              class="mt-4 text-gray-600 leading-relaxed transition-all duration-300"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="min-h-screen py-20 animate-on-scroll bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-black">
            Kontaktirajte nas
          </h2>
        </div>

        <div class="bg-black p-8 rounded-3xl text-center max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold mb-6 text-white">
            Zainteresovani za saradnju?
          </h3>
          <p class="text-white mb-6">
            Ako ste zainteresovani za naše usluge ili proizvode, slobodno nam pošaljite email. Radujemo se vašem javljanju!
          </p>
          <a
            href="mailto:office.deltatools@gmail.com"
            class="inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Pošaljite nam email
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-20 bg-black text-white">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="space-y-6">
            <img
              src="/img/deltatoolslogo.png"
              alt="Delta Tools Logo"
              class="w-32 h-auto filter brightness-0 invert"
            />
            <p class="text-gray-400">
              Profesionalni alati za farbanje, dekorativne i građevinske radove, kao i premium premaze za metal i drvo. Kvalitet kojem možete verovati.
            </p>
          </div>

          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-white">Kontakt</h3>
            <div class="space-y-4">
              <p class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dunavska 1C, Banja Luka, Bosna i Hercegovina
              </p>
              <p class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:office.deltatools@gmail.com" class="hover:text-white transition-colors">
                  office.deltatools@gmail.com
                </a>
              </p>
              <p class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+38765515155" class="hover:text-white transition-colors">
                  +387 65 515 155
                </a>
              </p>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-white">Lokacija</h3>
            <div class="relative h-64 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2721.1131134622647!2d17.213679176103714!3d44.78636117107093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475e03a21e4adcd7%3A0x7c915d41037d0a4f!2z0JTRg9C90LDQstGB0LrQsCAxYywg0JHQsNGa0LAg0JvRg9C60LAgNzgwMDAsINCR0L7RgdC90LAg0Lgg0KXQtdGA0YbQtdCz0L7QstC40L3QsA!5e1!3m2!1ssr!2ssi!4v1742455014690!5m2!1ssr!2ssi"
                class="absolute inset-0 w-full h-full"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div class="mt-16 pt-8 border-t border-gray-700">
          <div>
            <p class="text-gray-400 text-sm text-center">
              &copy; {{ new Date().getFullYear() }} Delta Tools d.o.o. Sva prava zadržana.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const faqs = ref([
  {
    question: "Kako odabrati pravi alat za moj projekat?",
    answer: "Naši stručnjaci će vam pomoći da odaberete najbolji alat za vaš specifičan projekat. Kontaktirajte nas za besplatnu konsultaciju.",
    isOpen: false,
  },
  {
    question: "Da li premazi sadrže štetne hemikalije?",
    answer: "Svi naši premazi su testirani i odobreni za upotrebu u unutrašnjim prostorima. Koristimo samo visokokvalitetne materijale.",
    isOpen: false,
  },
  {
    question: "Kako mogu da naručim proizvode?",
    answer: "Možete nas kontaktirati putem telefona, email-a ili lično u našoj poslovnici. Pružamo brzu dostavu na teritoriji cele zemlje.",
    isOpen: false,
  },
  {
    question: "Da li nudite garanciju na proizvode?",
    answer: "Da, svi naši proizvodi dolaze sa garancijom. Kvalitet nam je prioritet, a mi stojimo iza svog proizvoda.",
    isOpen: false,
  },
  {
    question: "Da li organizujete obuke za korišćenje alata?",
    answer: "Da, redovno organizujemo obuke i demonstracije za profesionalce. Pratite naše događaje ili nas kontaktirajte za više informacija.",
    isOpen: false,
  },
]);

function toggleFaq(index) {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

.partner-logos img {
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.partner-logos img:hover {
  opacity: 1;
  transform: scale(1.05);
}
</style>