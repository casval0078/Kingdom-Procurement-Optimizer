// ==========================================
// キングダム覇道 魅力最適化ツール
// app.js①
// 武将管理
// ==========================================

let warriors = [];

// 編集中の武将ID
let editingId = null;

// 特性ボーナス
// 必要に応じて自由に追加・変更してください。
const TRAIT_BONUS = {

"殲滅":3,
"主導":3,
"防御":3,
"支援":3,
"蛇甘平原の戦い":3,
"王弟反乱":3,
"合従軍襲来":3,
"山陽の戦い":3,
"函谷関の戦い":3,
"成蟜一派":5,
"呂氏一派":5,
"麃公軍":5,
"大王一派":5,
"廉頗軍":5,
"桓騎軍":5,
"王翦軍":5,
"暗躍":5,
"経験豊富":5,
"補佐役":5,
"一騎討ち":5,
"慎重":5,
"激情家":5,
"武人":5,
"お調子者":5,
"器用":5,
"教育係":5,
"王の一族":10,
"戦術眼":10,
"弓の名手":10,
"奇策奇計":10,
"平穏を祈る者":10,
"先陣をきる者":10,
"野心家":10,
"政権闘争":10,
"忠誠心":10,
"大将軍への夢":20,
"中華統一":20,

};

//----------------------------------
// 起動
//----------------------------------

window.onload = () => {

    loadWarriors();

    renderWarriors();

};

//----------------------------------
// LocalStorage
//----------------------------------

function saveWarriors(){

    localStorage.setItem(
        "warriors",
        JSON.stringify(warriors)
    );

}

function loadWarriors(){

    const data = localStorage.getItem("warriors");

    if(data){

        warriors = JSON.parse(data);

    }else{

        warriors = [];

    }

}

//----------------------------------
// 武将登録
//----------------------------------

document
.getElementById("saveWarrior")
.addEventListener("click", addWarrior);

function addWarrior(){

    const name =
        document.getElementById("name").value.trim();

    if(name===""){

        alert("武将名を入力してください");

        return;

    }

    const charm =
        Number(document.getElementById("charm").value);

    const traits=[];

    document
    .querySelectorAll(".trait")
    .forEach(t=>{

        traits.push(t.value.trim());

    });

    // 編集モード

    if(editingId!==null){

        const w=warriors.find(x=>x.id===editingId);

        w.name=name;
        w.charm=charm;
        w.traits=traits;

        editingId=null;

        document.getElementById("saveWarrior").textContent="武将登録";

    }

    // 新規登録

    else{

        warriors.push({

            id:Date.now(),

            name,

            charm,

            traits

        });

    }

    saveWarriors();

    renderWarriors();

    clearInput();

}

//----------------------------------
// 入力欄クリア
//----------------------------------

function clearInput(){

    document.getElementById("name").value="";

    document.getElementById("charm").value="";

    document
    .querySelectorAll(".trait")
    .forEach(input=>{

        input.value="";

    });

}

//----------------------------------
// 一覧表示
//----------------------------------

function renderWarriors(){

    const body =
        document.getElementById("warriorBody");

    body.innerHTML="";

    warriors.forEach(w=>{

        body.innerHTML += `

<tr>

<td>

<b>${w.name}</b><br>

<small>

${w.traits.join(" / ")}

</small>

</td>

<td>

<input
type="number"
value="${w.charm}"
onchange="changeCharm(${w.id},this.value)">

</td>

<td>

<button
onclick="editWarrior(${w.id})">

編集

</button>

</td>

<td>

<button
onclick="deleteWarrior(${w.id})">

削除

</button>

</td>

</tr>

`;

    });

}

//----------------------------------
// 魅力変更
//----------------------------------

function changeCharm(id,value){

    const warrior =
        warriors.find(
            w=>w.id===id
        );

    if(!warrior) return;

    warrior.charm =
        Number(value);

    saveWarriors();

}

//----------------------------------
// 武将削除
//----------------------------------

function deleteWarrior(id){

    if(!confirm("削除しますか？")){

        return;

    }

    warriors =
        warriors.filter(
            w=>w.id!==id
        );

    saveWarriors();

    renderWarriors();

}

//----------------------------------
// 編集
//----------------------------------

function editWarrior(id){

    const w=warriors.find(x=>x.id===id);

    if(!w)return;

    editingId=id;

    document.getElementById("name").value=w.name;

    document.getElementById("charm").value=w.charm;

    const inputs=document.querySelectorAll(".trait");

    for(let i=0;i<6;i++){

        inputs[i].value=w.traits[i]||"";

    }

    document.getElementById("saveWarrior").textContent="更新";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function getBonus(center,left,right){

    let bonus=0;

    const detail=[];

    center.traits.forEach(trait=>{

        if(left.traits.includes(trait)){

            const b=TRAIT_BONUS[trait]||0;

            bonus+=b;

            detail.push({

                trait,

                side:"左",

                bonus:b

            });

        }

        if(right.traits.includes(trait)){

            const b=TRAIT_BONUS[trait]||0;

            bonus+=b;

            detail.push({

                trait,

                side:"右",

                bonus:b

            });

        }

    });

    return{

        bonus,

        detail

    };

}

function calcTeam(center,left,right){

    const base=
        center.charm+
        left.charm/2+
        right.charm/2;

    const result=
        getBonus(center,left,right);

    const total=
        Math.round(
            base*(100+result.bonus)/100
        );

    return{

        base,

        bonus:result.bonus,

        final:total,

        detail:result.detail

    };

}
