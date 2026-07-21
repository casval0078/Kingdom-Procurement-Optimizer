// ==========================================
// キングダム覇道 魅力最適化ツール
// app.js①
// 武将管理
// ==========================================

let warriors = [];

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

    const charm =
        Number(document.getElementById("charm").value);

    if(name === ""){

        alert("武将名を入力してください");

        return;

    }

    const traits = [];

    document
        .querySelectorAll(".trait")
        .forEach(input=>{

            traits.push(
                input.value.trim()
            );

        });

    warriors.push({

        id:Date.now(),

        name:name,

        charm:charm,

        traits:traits

    });

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

<td>${w.name}</td>

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

    alert("app.js②で実装します");

}
