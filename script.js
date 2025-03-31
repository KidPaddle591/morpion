/*VARIABLES*/
let player=0; /* variable pour savoir si c'est player 1 (=1) ou 2(=2) qui joue*/
let box = document.querySelectorAll(".box"); /*recupère les boxs*/
let reset = document.getElementById("reset"); /*recupère le bouton reset*/
let game = ["","","","","","","","",""]; /*variable pour l'etat du jeu*/
const winning = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; /*Combinaisons gagnantes*/
let P1=[]; /*Jeu de player 1*/
let P2=[];  /*Jeu de player 2*/
let symb="" /* Si c'est un move de player 1, on a une X. Si c'est un move de player 2, on a un 0*/
let symbhtml="" /* Symbhtml est le code html a injecté dans la balise reprenant le symbole*/
let ifXtrue=0;
let ifOtrue=0;
/*FONCTIONS*/
/*Reset du plateau de jeux*/
function resetAll (){
    box.forEach(function(element){
        element.classList.remove("unavailable");
        plist = element.querySelectorAll("p");
        plist.forEach(function(pelement){
            pelement.remove();
        });
    P1=[];
    P2=[];
    player=0;
    });
    alert ("Reset done!");
}
reset.addEventListener("click", function(){
    resetAll();
})

/*fonction pour determiner si il y a une gagnant*/
function readgame(){
    for (i=0; i<game.length; i++){ /*Iteration sur chaque valeur de game*/
        if (game[i]==="X"){ /*Si à l'itération i la case contient un X*/
            P1.push(i); /* Ajouter la case à P1*/
            console.log("P1:"+P1);
        } else if (game[i]==="O"){ /*Si à l'itération i la case contient un O/*/
            P2.push(i); /* Ajouter la case à P2*/
            console.log("P2:"+P2);
        }
    }
}

function checkWin(){
    winning.forEach(function(line){
        if (JSON.stringify(line)===JSON.stringify(P1)){
            ifXtrue=1;
            alert ("Player 1 a gagné");
        }
        if (JSON.stringify(line)===JSON.stringify(P2)){
            ifOtrue=1;
            alert ("Player 2 a gagné");
        }
    })
}

/*SCRIPT*/

/* Boucle sur chaque cases avec ecoute au clic. Si clique processus enclenché*/
box.forEach (function(element){
    element.addEventListener("click", function(){ /*Action qui se déclanche au click sur une case*/
        if(element.classList.contains ("unavailable")){ /* Si la case contient la classe "unavailable"=déjà utilisée*/
            alert ("Click empty boxes only"); /*Message d'alerte pour cliquer sur les cases viders uniquement*/
        }else { /* Sinon*/
            if (player%2===0){; /*Si c'est le joueur 1*/
                symb="X"; /* alors la variable symb prend la valeur X*/
                game[element.id.match(/\d+/g)]="X"; /*le tableau de jeu "game" à la position game[numéro de l'id de box] prend la valeur X*/
                P1.push(Number(element.id.match(/\d+/g)[0]));
                checkWin()
                
            }else { /*Sinon c'est le joueur 2*/
                symb="O"; /* alors la variable symb prend la valeur X*/
                game[element.id.match(/\d+/g)]="O"; /*le tableau de jeu "game" à la position game[numéro de l'id de box] prend la valeur O*/
                P2.push(Number(element.id.match(/\d+/g)[0]));
                checkWin()
            };
            symbhtml="<p>"+symb+"</p>"; /*ensuite on recupere le symbole à inserer dans le plateau de jeu/*/
            element.classList.add("unavailable"); /*on ajoute la classe unavailable pour que cette classe ne soit plus cliquable*/
            element.innerHTML +=symbhtml; /*on insère le symbole*/
            
        }
    player++;
    })  
})



