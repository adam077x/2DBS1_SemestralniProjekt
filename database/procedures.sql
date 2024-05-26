CREATE OR REPLACE PROCEDURE Prihlasit(
    p_email IN VARCHAR2,
    p_heslo IN VARCHAR2,
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
        SELECT u.id_uzivatele, u.jmeno, u.email, p.nazev AS prava
        FROM uzivatel u
        JOIN prava p ON u.prava_id = p.id_prava
        WHERE u.email = p_email AND u.heslo = p_heslo;
END Prihlasit;
/

CREATE OR REPLACE PROCEDURE NacistUzivatele(
    p_id_uzivatele IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS
    v_prava INTEGER;
BEGIN
    SELECT prava_id INTO v_prava FROM uzivatel WHERE id_uzivatele = p_id_uzivatele;
    IF v_prava = 1 THEN
        OPEN p_cursor FOR
            SELECT u.id_uzivatele, u.jmeno, u.email, p.nazev AS prava
            FROM uzivatel u
            JOIN prava p ON u.prava_id = p.id_prava;
    ELSE
        OPEN p_cursor FOR SELECT 'Access Denied' AS message FROM DUAL;
    END IF;
END NacistUzivatele;
/

CREATE OR REPLACE PROCEDURE VytvoritUzivatele(
    p_jmeno IN VARCHAR2,
    p_email IN VARCHAR2,
    p_heslo IN VARCHAR2,
    p_prava_id IN INTEGER,
    p_id_uzivatele IN INTEGER
) AS
    v_prava INTEGER;
BEGIN
    SELECT prava_id INTO v_prava FROM uzivatel WHERE id_uzivatele = p_id_uzivatele;
    IF v_prava = 1 THEN
        INSERT INTO uzivatel (jmeno, email, heslo, prava_id)
        VALUES (p_jmeno, p_email, p_heslo, p_prava_id);
    ELSE
        RAISE_APPLICATION_ERROR(-20001, 'Access Denied');
    END IF;
END VytvoritUzivatele;
/

CREATE OR REPLACE PROCEDURE NacistZpravy(
    p_id_tema IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    IF p_id_tema IS NULL THEN
        OPEN p_cursor FOR SELECT * FROM zprava;
    ELSE
        OPEN p_cursor FOR SELECT * FROM zprava WHERE id_tema = p_id_tema;
    END IF;
END NacistZpravy;
/

CREATE OR REPLACE PROCEDURE NacistZpravu(
    p_id_zprava IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
        SELECT z.*, zv.*, d.*, o.*, t.*, k.*, u.*
        FROM zprava z
        LEFT JOIN zpetna_vazba zv ON z.id_zprava = zv.zprava_id_zprava
        LEFT JOIN dokument d ON z.id_zprava = d.zprava_id_zprava
        LEFT JOIN opatreni o ON z.id_zprava = o.zprava_id_zprava
        LEFT JOIN tema t ON z.id_tema = t.id_tema
        LEFT JOIN kontakt k ON z.id_zprava = k.zprava_id_zprava
        LEFT JOIN uzivatel u ON z.id_uzivatele = u.id_uzivatele
        WHERE z.id_zprava = p_id_zprava;
END NacistZpravu;
/

CREATE OR REPLACE PROCEDURE VytvoritZpravu(
    p_tema_id IN INTEGER,
    p_nazev IN VARCHAR2,
    p_popis IN VARCHAR2,
    p_datum IN DATE,
    p_id_uzivatele IN INTEGER
) AS
BEGIN
    INSERT INTO zprava (id_tema, nazev, popis, datum, id_uzivatele)
    VALUES (p_tema_id, p_nazev, p_popis, p_datum, p_id_uzivatele);
END VytvoritZpravu;
/

CREATE OR REPLACE PROCEDURE VytvoritZpetnouVazbu(
    p_zprava_id IN INTEGER,
    p_uzivatel_id IN INTEGER,
    p_komentar IN VARCHAR2,
    p_hodnoceni IN INTEGER
) AS
BEGIN
    INSERT INTO zpetna_vazba (zprava_id_zprava, uzivatel_id_uzivatel, komentar, hodnoceni)
    VALUES (p_zprava_id, p_uzivatel_id, p_komentar, p_hodnoceni);
END VytvoritZpetnouVazbu;
/

CREATE OR REPLACE PROCEDURE VytvoritKontakt(
    p_jmeno IN VARCHAR2,
    p_stredni_jmeno IN VARCHAR2,
    p_prijmeni IN VARCHAR2,
    p_telefonni_cislo IN VARCHAR2,
    p_email IN VARCHAR2,
    p_popis IN VARCHAR2,
    p_zprava_id IN INTEGER
) AS
BEGIN
    INSERT INTO kontakt (jmeno, stredni_jmeno, prijmeni, telefonni_cislo, email, popis, zprava_id_zprava)
    VALUES (p_jmeno, p_stredni_jmeno, p_prijmeni, p_telefonni_cislo, p_email, p_popis, p_zprava_id);
END VytvoritKontakt;
/

CREATE OR REPLACE PROCEDURE VytvoritDokument(
    p_nazev IN VARCHAR2,
    p_soubor IN BLOB,
    p_typ_obsahu IN VARCHAR2,
    p_zprava_id IN INTEGER
) AS
BEGIN
    INSERT INTO dokument (nazev, soubor, typ_obsahu, zprava_id_zprava)
    VALUES (p_nazev, p_soubor, p_typ_obsahu, p_zprava_id);
END VytvoritDokument;
/

CREATE OR REPLACE PROCEDURE UzavritZpravu(
    p_id_zprava IN INTEGER
) AS
BEGIN
    UPDATE zprava
    SET uzavreno = 1
    WHERE id_zprava = p_id_zprava;
END UzavritZpravu;
/

CREATE OR REPLACE PROCEDURE VytvoritSchuzku(
    p_typ_schuzky IN VARCHAR2,
    p_umisteni_odkaz IN VARCHAR2,
    p_datum IN DATE,
    p_cas IN TIMESTAMP
) AS
BEGIN
    IF p_typ_schuzky = 'fyzicka' THEN
        INSERT INTO fyzicka_schuzka (umisteni, datum, cas)
        VALUES (p_umisteni_odkaz, p_datum, p_cas);
    ELSIF p_typ_schuzky = 'online' THEN
        INSERT INTO online_schuzka (odkaz, datum, cas)
        VALUES (p_umisteni_odkaz, p_datum, p_cas);
    ELSE
        RAISE_APPLICATION_ERROR(-20002, 'Invalid meeting type');
    END IF;
END VytvoritSchuzku;
/
