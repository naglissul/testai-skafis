import "./index.css";
const TermsPage: React.FC = () => {
  return (
    <div className="terms-page">
      <h1>Taisyklės</h1>
      <p>
        Registruodamasi į šią platformą, Jūs sutinkate, kad Jūsų el. paštas bus
        saugojamas ir prieinamas platformos administratoriui (Nagliui Šuliokui)
        visą laiką iki išsiregistravimo (išsiregistruoti galima pateikus prašymą
        administratoriui el. paštu{" "}
        <a href="mailto:naglis.suliokas@gmail.com">naglis.suliokas@gmail.com</a>
        ). El. paštas bus naudojamas Jūsų prisijungimui, slaptažodžio atkūrimui
        bei mano, administratoriaus, Naglio Šulioko, susisiekimui su tikslu
        išsiaiškinti platformos naudojimo intensijas ir išspręsti kylančias
        platformos išlaikymo problemas.
      </p>
      <p>
        Taip pat duombazėje saugoma ir prieinama administratoriui visa testų
        informacija (klausimai, surašyti kitų žmonių atsakymai, įvertinimai),
        todėl nesaugokite šioje platformoje jokių asmens duomenų (pvz.: sakykite
        mokiniams nerašyti savo vardų ir pavardžių, naudokitės numeriais klasės
        sąraše). Asmens duomenys nėra tvarkomi, todėl už jų saugumą atsakote
        patys (kaip buvo minėta, ši platforma nėra skirta laikyti asmens
        duomenis).
      </p>
      <p>
        Kadangi platforma yra nepastovioje versijoje, aš, Naglis Šuliokas,
        sistemos administratorius, įsipareigoju platformą naudojančio
        (užsiregistravusio) asmens prašymu eksportuoti visus to asmens sukurtus
        duomenis patogiu formatu (pvz.: Excel failu) ir, asmens prašymu,
        ištrinti visus to asmens sukurtus duomenis iš platformos. Tačiau aš
        neįsipareigoju išlaikyti platformą ir teikti jos atnaujinimus - vis
        dėlto, mielai priimčiau atnaujinimo rekomendacijas ir stengčiausi
        atsižvelgti.
      </p>
      <p>
        Duomenims saugoti yra naudojama Google Firebase Realtime database.
        Susipažinti su duomenų saugojimo ir saugumo sąlygomis galite čia:{" "}
        <a href="https://firebase.google.com/terms/data-processing-terms">
          https://firebase.google.com/terms/data-processing-terms
        </a>
      </p>
      <p>
        Klausimus užduoti, pasiūlymus ar priekaištus reikšti el. paštu{" "}
        <a href="mailto:naglis.suliokas@gmail.com">naglis.suliokas@gmail.com</a>
      </p>
      <p>
        Norėdami sugrįžti prie registracijos tiesiog uždarykite šį skirtuką.
      </p>
    </div>
  );
};

export default TermsPage;
