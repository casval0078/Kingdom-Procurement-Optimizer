/*
==========================================================
 teamGroup.js
 Kingdom Procurement Optimizer
 Version 0.3.1
==========================================================
*/

class TeamGroup {

    constructor() {

        /** @type {Team[]} */
        this.teams = [];

        // 評価値
        this.minCharm = 0;
        this.maxCharm = 0;
        this.averageCharm = 0;

        // 全部隊魅力
        this.totalCharm = 0;

    }

    //----------------------------------------
    // 部隊追加
    //----------------------------------------

    addTeam(team) {

        this.teams.push(team);

        this.calculate();

        return this;

    }

    //----------------------------------------
    // 武将重複チェック
    //----------------------------------------

    canAdd(team) {

        for (const t of this.teams) {

            if (t.overlap(team)) {

                return false;

            }

        }

        return true;

    }

    //----------------------------------------
    // 評価値更新
    //----------------------------------------

    calculate() {

        if (this.teams.length === 0) {

            this.minCharm = 0;
            this.maxCharm = 0;
            this.averageCharm = 0;
            this.totalCharm = 0;

            return;

        }

        const values =
            this.teams.map(t => t.finalCharm);

        this.minCharm =
            Math.min(...values);

        this.maxCharm =
            Math.max(...values);

        this.totalCharm =
            values.reduce(
                (a, b) => a + b,
                0
            );

        this.averageCharm =
            this.totalCharm /
            values.length;

    }

    //----------------------------------------
    // 評価値
    //----------------------------------------

    get score() {

        return this.minCharm;

    }

    //----------------------------------------
    // 完成判定
    //----------------------------------------

    isComplete() {

        return this.teams.length === 3;

    }

    //----------------------------------------
    // 使用武将ID
    //----------------------------------------

    getMemberIds() {

        const ids = new Set();

        this.teams.forEach(team => {

            team.memberIds.forEach(id => {

                ids.add(id);

            });

        });

        return ids;

    }

    //----------------------------------------
    // コピー
    //----------------------------------------

    clone() {

        const copy = new TeamGroup();

        copy.teams = [...this.teams];

        copy.calculate();

        return copy;

    }

    //----------------------------------------
    // ソート
    //----------------------------------------

    sortTeams() {

        this.teams.sort((a, b) =>

            b.finalCharm - a.finalCharm

        );

        this.calculate();

        return this;

    }

    //----------------------------------------
    // JSON
    //----------------------------------------

    toJSON() {

        return {

            score: this.score,

            minCharm: this.minCharm,

            maxCharm: this.maxCharm,

            averageCharm: this.averageCharm,

            totalCharm: this.totalCharm,

            teams:

                this.teams.map(t => t.toJSON())

        };

    }

}
