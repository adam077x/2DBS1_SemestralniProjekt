create or replace NONEDITIONABLE PROCEDURE NacistKontakty(
    id_zprava IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS 
BEGIN
    OPEN p_cursor FOR SELECT * FROM kontakt WHERE zprava_id_zprava = id_zprava;
END NacistKontakty;

create or replace NONEDITIONABLE PROCEDURE NacistOpatreni(
    id_zprava IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS 
BEGIN
    OPEN p_cursor FOR SELECT * FROM opatreni WHERE zprava_id_zprava = id_zprava;
END NacistOpatreni;

create or replace NONEDITIONABLE PROCEDURE NacistUzivatele(
    p_id_uzivatele IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS
    v_prava INTEGER;
BEGIN
    SELECT prava_id_prava INTO v_prava FROM uzivatel WHERE uzivatel.id_uzivatel = p_id_uzivatele;
    IF v_prava = 1 THEN
        OPEN p_cursor FOR
            SELECT u.id_uzivatel, u.jmeno, u.email, p.nazev AS prava
            FROM uzivatel u
            JOIN prava p ON u.prava_id_prava = p.id_prava;
    ELSE
        OPEN p_cursor FOR SELECT 'Access Denied' AS message FROM DUAL;
    END IF;
END NacistUzivatele;

create or replace NONEDITIONABLE PROCEDURE NacistZpetneVazby(
    id_zpravy IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS 
BEGIN
  OPEN p_cursor FOR SELECT * FROM zpetna_vazba INNER JOIN uzivatel ON uzivatel.id_uzivatel = zpetna_vazba.uzivatel_id_uzivatel WHERE zprava_id_zprava = id_zpravy;
END NacistZpetneVazby;

create or replace NONEDITIONABLE PROCEDURE NacistZpravu(
    p_id_zprava IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
        SELECT z.*, t.*, u.*
        FROM zprava z
        INNER JOIN tema t ON z.tema_id_tema = t.id_tema
        INNER JOIN uzivatel u ON z.uzivatel_id_uzivatel = u.id_uzivatel
        WHERE z.id_zprava = p_id_zprava;
END NacistZpravu;

create or replace NONEDITIONABLE PROCEDURE NacistZpravy(
    p_id_tema IN INTEGER,
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    IF p_id_tema IS NULL THEN
        OPEN p_cursor FOR SELECT * FROM zprava;
    ELSE
        OPEN p_cursor FOR SELECT * FROM zprava WHERE tema_id_tema = p_id_tema;
    END IF;
END NacistZpravy;

create or replace NONEDITIONABLE PROCEDURE Prihlasit(
    p_email IN VARCHAR2,
    p_heslo IN VARCHAR2,
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
        SELECT u.id_uzivatel, u.jmeno, u.stredni_jmeno, u.prijmeni, u.email, u.telefonni_cislo, p.id_prava, p.nazev AS prava
        FROM uzivatel u
        JOIN prava p ON u.prava_id_prava = p.id_prava
        WHERE u.email = p_email AND u.heslo = p_heslo;
END Prihlasit;

create or replace NONEDITIONABLE PROCEDURE VytvoritDokument(
    p_nazev IN VARCHAR2,
    p_soubor IN BLOB,
    p_typ_obsahu IN VARCHAR2,
    p_zprava_id IN INTEGER
) AS
BEGIN
    INSERT INTO dokument (nazev, soubor, typ_obsahu, zprava_id_zprava)
    VALUES (p_nazev, p_soubor, p_typ_obsahu, p_zprava_id);
END VytvoritDokument;

create or replace NONEDITIONABLE PROCEDURE VytvoritKontakt(
    p_jmeno IN VARCHAR2,
    p_stredni_jmeno IN VARCHAR2,
    p_prijmeni IN VARCHAR2,
    p_telefonni_cislo IN VARCHAR2,
    p_email IN VARCHAR2,
    p_popis IN VARCHAR2,
    p_zprava_id IN INTEGER
) AS
BEGIN
    INSERT INTO kontakt (id_kontakt, jmeno, stredni_jmeno, prijmeni, telefonni_cislo, email, popis, zprava_id_zprava)
    VALUES (id_kontakt_seq.NEXTVAL, p_jmeno, p_stredni_jmeno, p_prijmeni, p_telefonni_cislo, p_email, p_popis, p_zprava_id);
END VytvoritKontakt;

create or replace NONEDITIONABLE PROCEDURE VytvoritOpatreni(
    popis IN VARCHAR2,
    zprava_id_zprava IN INTEGER,
    naklady IN INTEGER
) AS 
BEGIN
    INSERT INTO opatreni (opatreni_id, popis, zprava_id_zprava, naklady)
    VALUES (id_opatreni_seq.NEXTVAL, popis, zprava_id_zprava, naklady);
END VytvoritOpatreni;

create or replace NONEDITIONABLE PROCEDURE VytvoritZpetnouVazbu(
    zpetna_vazba IN VARCHAR2,
    zprava_id_zprava IN INTEGER,
    uzivatel_id_uzivatel IN INTEGER
) AS
BEGIN
    INSERT INTO zpetna_vazba (id_zpetna_vazba, zpetna_vazba, zprava_id_zprava, uzivatel_id_uzivatel)
    VALUES (id_zpetna_vazba_seq.NEXTVAL, zpetna_vazba, zprava_id_zprava, uzivatel_id_uzivatel);
END VytvoritZpetnouVazbu;

create or replace NONEDITIONABLE PROCEDURE VytvoritZpravu(
    titulek IN VARCHAR2,
    popisek IN VARCHAR2,
    id_uzivatele IN INTEGER,
    id_tema IN INTEGER,
    created_report OUT SYS_REFCURSOR
) AS
    current_time TIMESTAMP;
    created_id INTEGER;
BEGIN
    SELECT current_timestamp INTO current_time FROM dual;

    INSERT INTO zprava (
        id_zprava, titulek, popisek, uzavreno, vytvoreno, upraveno, uzivatel_id_uzivatel, tema_id_tema
    ) 
    VALUES (
        id_zprava_seq.NEXTVAL, titulek, popisek, NULL, current_time, current_time, id_uzivatele, id_tema
    )
    RETURNING id_zprava INTO created_id;

    OPEN created_report FOR
        SELECT *
        FROM zprava
        WHERE id_zprava = created_id;
END VytvoritZpravu;
