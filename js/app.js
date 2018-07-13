/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- If the player throws two 6's in a row, then the player's both score, GLOBAL as well as ROUND score gets deleted
*/

var scores, roundScore, activePlayer, gamePlaying,target;
target = 20;

 init();

['.dice','.btn-roll'].forEach(e => {
	let dicePrev;
	document.querySelector(e).addEventListener('click', function(){
	if(gamePlaying){


	var dice = Math.floor(Math.random()*6)+1;

	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'img/dice-'+dice+'.png';

	if(dicePrev===6 && dice===6)  {
		setTimeout(nextPlayer,300); 
		scores[activePlayer]=0;
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 
		alert("two 6s in a row, entire score deleted");
	}

	else if(dice !== 1){
	 		dicePrev = dice;
			roundScore += dice;
			 document.querySelector('#current-' + activePlayer).textContent = roundScore;
	   		 } 

    else {
       setTimeout(function() {
       nextPlayer(); 
       alert('1 thrown , current score deleted'); 
       dicePrev=undefined; 
       },200); // to show the dice when one is thrown	        
    }
   }

});  // addEventListener closes
});  // forEach closes


document.querySelector('.pulse').addEventListener('click',function(){
	alert(`GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach ${target} points on GLOBAL score wins the game
- If the player throws two 6's in a row, then the player's both score, GLOBAL as well as ROUND score gets deleted 
- The players can change the target score other than ${target}`);
});

 document.querySelector('.btn-check').addEventListener('click', function(){
 	 const x =  document.querySelector('.setScore').value;
 	 if(x) {
 	 target = x;
 	 init();
 	 alert(`New Target for Winning set to ${target}`);
 	   }
 })


    document.querySelector('.btn-hold').addEventListener('click', function(){
    		
    	if(gamePlaying){

    		scores[activePlayer] += roundScore;

    		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    		if(scores[activePlayer] >=target ){
    			document.getElementById('name-'+ activePlayer).textContent = 'Winner';
    			document.querySelector('.dice').style.display = 'none';    //Not a good way to mix CSS with JS
    			document.getElementsByClassName('player-'+activePlayer+ '-panel')[0].classList.add('winner');
   				document.getElementsByClassName('player-'+activePlayer+ '-panel')[0].classList.remove('active');
   				gamePlaying = false;
    		} else{
    	 		nextPlayer();			
    		}

    	}
    	
    });

function nextPlayer(){
		 // activePlayer === 0 ? activePlayer=1 : activePlayer=0;

	activePlayer = (activePlayer === 0) ? 1 : 0;
		 roundScore = 0;

		 document.getElementById('current-0').textContent = roundScore;
		 document.getElementById('current-1').textContent = roundScore;

		 document.getElementsByClassName('player-0-panel')[0].classList.toggle('active');
		 document.getElementsByClassName('player-1-panel')[0].classList.toggle('active');
	     
	      document.getElementsByClassName('dice')[0].style.display='none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;

	gamePlaying = true;

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
    document.getElementsByClassName('player-0-panel')[0].classList.remove('winner');	
    document.getElementsByClassName('player-1-panel')[0].classList.remove('winner');	
    document.getElementsByClassName('player-0-panel')[0].classList.remove('active');	
    document.getElementsByClassName('player-1-panel')[0].classList.remove('active');	
    document.getElementsByClassName('player-0-panel')[0].classList.add('active');

}

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em';

//	 document.getElementsByClassName('player-0-panel')[0].classList.remove('active');
	//	 document.getElementsByClassName('player-1-panel')[0].classList.add('active');