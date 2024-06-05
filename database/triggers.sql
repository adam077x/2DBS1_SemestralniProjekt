CREATE OR REPLACE TRIGGER check_dokument_nazev
BEFORE INSERT OR UPDATE ON dokument
FOR EACH ROW
DECLARE
    v_pattern VARCHAR2(100) := '^[0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+$';
BEGIN
    IF NOT REGEXP_LIKE(:NEW.nazev, v_pattern) THEN
        RAISE_APPLICATION_ERROR(-20001, 'Název dokumentu musí dodržovat strukturu cislopracovnika_nazev_koncovka.');
    END IF;
END;


CREATE OR REPLACE TRIGGER check_email_format
BEFORE INSERT OR UPDATE ON uzivatel
FOR EACH ROW
DECLARE
    v_pattern VARCHAR2(100) := '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
BEGIN
    IF NOT REGEXP_LIKE(:NEW.email, v_pattern) THEN
        RAISE_APPLICATION_ERROR(-20002, 'Email musí obsahovat platný formát jmeno@domena.xx.');
    END IF;
END;


CREATE OR REPLACE TRIGGER update_zprava_upraveno
BEFORE UPDATE ON zprava
FOR EACH ROW
BEGIN
    :NEW.upraveno := SYSTIMESTAMP;
END;
