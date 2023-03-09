function czyPasuje(tekst, wzorzec, pozycja) {
  for (let i = 0; i < wzorzec.length; i++)
    if (wzorzec[i] !== tekst[pozycja + i]) return false;
  return true;
}

function naiwny() {
  const czyZamianaNaWielkieLitery =
    document.getElementById("wielkieLitery").checked;

  const tekst = czyZamianaNaWielkieLitery
    ? document.getElementById("tekst").value.toUpperCase()
    : document.getElementById("tekst").value;

  const wzorzec = czyZamianaNaWielkieLitery
    ? document.getElementById("wzorzec").value.toUpperCase()
    : document.getElementById("wzorzec").value;

  let wynik = [];

  if (wzorzec.length) {
    const dlugoscPetli = tekst.length - wzorzec.length + 1;
    for (let pozycja = 0; pozycja < dlugoscPetli; pozycja++) {
      if (czyPasuje(tekst, wzorzec, pozycja)) wynik.push(pozycja);
    }
  }

  podajWynik(wynik, tekst, wzorzec);
}

function sunday() {
  const czyZamianaNaWielkieLitery =
    document.getElementById("wielkieLitery").checked;

  const tekst = czyZamianaNaWielkieLitery
    ? document.getElementById("tekst").value.toUpperCase()
    : document.getElementById("tekst").value;

  const wzorzec = czyZamianaNaWielkieLitery
    ? document.getElementById("wzorzec").value.toUpperCase()
    : document.getElementById("wzorzec").value;

  let wynik = [];

  if (wzorzec.length) {
    const tablicaAsocjacyjna = {};
    for (let i = 0; i < wzorzec.length; i++) tablicaAsocjacyjna[wzorzec[i]] = i;

    const dlugoscPetli = tekst.length - wzorzec.length + 1;
    for (let pozycja = 0; pozycja < dlugoscPetli; ) {
      if (czyPasuje(tekst, wzorzec, pozycja)) wynik.push(pozycja);

      if (tekst[pozycja + wzorzec.length] in tablicaAsocjacyjna)
        pozycja +=
          wzorzec.length - tablicaAsocjacyjna[tekst[pozycja + wzorzec.length]];
      else pozycja += wzorzec.length + 1;
    }
  }

  podajWynik(wynik, tekst, wzorzec);
}

function karpRabin() {
  const czyZamianaNaWielkieLitery =
    document.getElementById("wielkieLitery").checked;

  const tekst = czyZamianaNaWielkieLitery
    ? document.getElementById("tekst").value.toUpperCase()
    : document.getElementById("tekst").value;

  const wzorzec = czyZamianaNaWielkieLitery
    ? document.getElementById("wzorzec").value.toUpperCase()
    : document.getElementById("wzorzec").value;

  let wynik = [];

  if (wzorzec.length) {
    const liczbaPiersza = 2137;
    const potegaLPprzezDW =
      Math.pow(liczbaPiersza, wzorzec.length - 1) % liczbaPiersza;

    const haszWzorca = wyliczHasz(wzorzec, liczbaPiersza);
    let haszSkrawka = wyliczHasz(
      tekst.substring(0, wzorzec.length),
      liczbaPiersza
    );

    const dlugoscPetli = tekst.length - wzorzec.length + 1;
    for (let pozycja = 0; pozycja < dlugoscPetli; pozycja++) {
      if (haszSkrawka === haszWzorca)
        if (czyPasuje(tekst, wzorzec, pozycja)) wynik.push(pozycja);

      haszSkrawka =
        (liczbaPiersza *
          (haszSkrawka - tekst.charCodeAt(pozycja + 1) * potegaLPprzezDW) +
          tekst.charCodeAt(pozycja + wzorzec.length)) % liczbaPiersza;

      if (haszSkrawka < 0) haszSkrawka += liczbaPiersza;
    }
  }

  podajWynik(wynik, tekst, wzorzec);
}

function wyliczHasz(wartosc, liczbaPiersza) {
  for (let i = (hasz = 0); i < wartosc.length; i++)
    hasz = (liczbaPiersza * hasz + wartosc.charCodeAt(i)) % liczbaPiersza;

  return hasz;
}

function podajWynik(wynik, tekst, wzorzec) {
  const odpowiedz = document.getElementById("odpowiedz");
  const rysowanie = document.getElementById("wizualizacja");
  rysowanie.innerHTML = "";

  if (wynik.length) {
    odpowiedz.innerHTML = `Znaleziono wzór na pozycjach: ${wynik.map(
      (element) => {
        return element;
      }
    )}.`;

    let tabela = "<table>";
    tabela += "<tr class='innyKolor'>"; // numerowanie znaków w tekście
    for (let i = 0; i < tekst.length; i++) tabela += `<td>${i}</td>`;
    tabela += "</tr><tr class='innyKolor'>"; // tekst
    for (let i = 0; i < tekst.length; i++) tabela += `<td>${tekst[i]}</td>`;
    for (let i = 0; i < wynik.length; i++) {
      tabela += "</tr><tr>"; // położenia wzorów
      for (let j = 0; j < tekst.length + 1; j++) {
        if (j === wynik[i]) {
          for (let k = 0; k < wzorzec.length; k++)
            tabela += `<td>${wzorzec[k]}</td>`;
          j += wzorzec.length;
        } else tabela += "<td></td>";
      }
    }
    tabela += "</tr></table";
    rysowanie.innerHTML = tabela;
  } else odpowiedz.innerHTML = "Nie znaleziono wzoru w tekście.";
}
