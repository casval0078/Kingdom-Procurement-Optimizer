/*
==========================================================
 team.js
 Kingdom Procurement Optimizer
 Version 0.3.0
==========================================================
*/

class Team {

    constructor(leader, sub1, sub2) {

        // 武将
        this.leader = leader;
        this.sub1 = sub1;
        this.sub2 = sub2;

        // 武将一覧
        this.members = [
            leader,
            sub1,
            sub2
        ];

        // 重複判定用
        this.memberIds = new Set(
            this.members.map(g => g.id)
        );

        // 並び順に依存しないハッシュ
        this.hash = this.members
            .map(g => g.id)
            .sort((a, b) => a - b)
            .join("-");

        // 計算結果
        this.baseCharm = 0;
        this.bonus = 0;
        this.finalCharm = 0;

        // 一致特性
        this.matchedTraits = [];

    }

    //----------------------------------------
    // 計算
    //----------------------------------------

    calculate() {

        const result =
            TeamCalculator.evaluate(
                this.leader,
                this.sub1,
                this.sub2
            );

        this.baseCharm =
            result.baseCharm;

        this.bonus =
            result.bonus;

        this.finalCharm =
            result.finalCharm;

        this.matchedTraits =
            result.matchedTraits;

        return this;

    }

    //----------------------------------------
    // 武将重複判定
    //----------------------------------------

    overlap(otherTeam) {

        for (const id of this.memberIds) {

            if (otherTeam.memberIds.has(id))
                return true;

        }

        return false;

    }

    //----------------------------------------
    // メンバー名
    //----------------------------------------

    getMemberNames() {

        return this.members
            .map(g => g.name);

    }

    //----------------------------------------
    // チーム表示
    //----------------------------------------

    toString() {

        return [
            this.leader.name,
            this.sub1.name,
            this.sub2.name
        ].join(" / ");

    }

    //----------------------------------------
    // JSON出力
    //----------------------------------------

    toJSON() {

        return {

            leader: this.leader.name,
            sub1: this.sub1.name,
            sub2: this.sub2.name,

            baseCharm: this.baseCharm,
            bonus: this.bonus,
            finalCharm: this.finalCharm,

            matchedTraits: this.matchedTraits

        };

    }

}
