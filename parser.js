/*
==========================================================
 parser.js
 Kingdom Procurement Optimizer
 Version 0.1.0
==========================================================
*/

const BONUS_MAP = Object.freeze({
    "無": 3,
    "銅": 5,
    "銀": 10,
    "金": 20
});

class Trait {

    constructor(name, color) {

        this.name = name;
        this.color = color;
        this.bonus = BONUS_MAP[color] ?? 0;

    }

}

class General {

    constructor(name, charm) {

        this.name = name;
        this.charm = Number(charm);
        this.traits = [];

    }

}

class Parser {

    constructor() {

        this.generals = [];

    }

    //----------------------------------------
    // Excel読込
    //----------------------------------------

    load(file) {

        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = e => {

                try {

                    const data = new Uint8Array(e.target.result);

                    const workbook = XLSX.read(data, {
                        type: "array"
                    });

                    const sheet =
                        workbook.Sheets[workbook.SheetNames[0]];

                    const rows =
                        XLSX.utils.sheet_to_json(sheet, {
                            defval: ""
                        });

                    this.generals =
                        this.parseRows(rows);

                    resolve(this.generals);

                }

                catch (err) {

                    reject(err);

                }

            };

            reader.onerror = reject;

            reader.readAsArrayBuffer(file);

        });

    }

    //----------------------------------------
    // 行解析
    //----------------------------------------

    parseRows(rows) {

        const generals = [];

        rows.forEach((row, index) => {

            if (!row["武将"])
                return;

            const general =
                new General(
                    row["武将"],
                    row["魅力"]
                );

            for (let i = 1; i <= 6; i++) {

                const traitText =
                    row[`特性${i}`];

                if (!traitText)
                    continue;

                const trait =
                    this.parseTrait(traitText);

                if (trait)
                    general.traits.push(trait);

            }

            generals.push(general);

        });

        return generals;

    }

    //----------------------------------------
    // 特性解析
    //----------------------------------------

    parseTrait(text) {

        const match =
            text.match(/^(.+)\((無|銅|銀|金)\)$/);

        if (!match)
            return null;

        return new Trait(
            match[1],
            match[2]
        );

    }

    //----------------------------------------
    // 人数
    //----------------------------------------

    getGeneralCount() {

        return this.generals.length;

    }

    getUseCount() {

        return Math.min(
            this.generals.length,
            9
        );

    }

    getRemoveCount() {

        return Math.max(
            this.generals.length - 9,
            0
        );

    }

}

const parser = new Parser();
