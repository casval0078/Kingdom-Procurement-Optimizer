/*
==========================================================
 calc.js
 Kingdom Procurement Optimizer
 Version 0.2.0
==========================================================
*/

class TeamCalculator {

    //----------------------------------------
    // 基礎魅力
    //----------------------------------------

    static calcBaseCharm(leader, sub1, sub2) {

        return (
            leader.charm +
            sub1.charm / 2 +
            sub2.charm / 2
        );

    }

    //----------------------------------------
    // 一致特性
    //----------------------------------------

    static calcTraitBonus(leader, sub1, sub2) {

        const matchedTraits = [];
        let totalBonus = 0;

        const subs = [sub1, sub2];

        leader.traits.forEach(leaderTrait => {

            subs.forEach(sub => {

                const found = sub.traits.find(t =>
                    t.name === leaderTrait.name
                );

                if (!found)
                    return;

                totalBonus += leaderTrait.bonus;

                matchedTraits.push({
                    name: leaderTrait.name,
                    color: leaderTrait.color,
                    bonus: leaderTrait.bonus,
                    sub: sub.name
                });

            });

        });

        return {
            totalBonus,
            matchedTraits
        };

    }

    //----------------------------------------
    // 最終魅力
    //----------------------------------------

    static calcFinalCharm(baseCharm, bonus) {

        return baseCharm * (1 + bonus / 100);

    }

    //----------------------------------------
    // チーム計算
    //----------------------------------------

    static evaluate(leader, sub1, sub2) {

        const baseCharm =
            this.calcBaseCharm(
                leader,
                sub1,
                sub2
            );

        const traitResult =
            this.calcTraitBonus(
                leader,
                sub1,
                sub2
            );

        const finalCharm =
            this.calcFinalCharm(
                baseCharm,
                traitResult.totalBonus
            );

        return {

            leader,
            sub1,
            sub2,

            baseCharm,

            bonus:
                traitResult.totalBonus,

            finalCharm,

            matchedTraits:
                traitResult.matchedTraits

        };

    }

}
