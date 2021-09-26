"use strict";

let activeClass = 'krot';
let greenClass = 'green';
let redClass = 'red';


$(document).ready(()=>{
	let $cells = $('td');
	let $totalUser = $('.total-user');
	let $totalComputer = $('.total-comp');
	let $winner =$('.winner');

	let usedCell = 0;
	let userTotal = 0;
	let computerTotal = -1;
	let interval;

	function clear(){
		usedCell = 0;
		userTotal = 0;
		computerTotal = -1;

		$cells.removeClass(activeClass).removeClass(greenClass).removeClass(redClass);
		$totalUser.text(0);
		$totalComputer.text(0);
		$winner.hide().text('');
	}

	function startGame(){
		jump();
		start();
	}

	function start(){
		interval = setInterval(jump, $('.level').val());
	}

	function stop(){
		clearInterval(interval);
	}
	

	function jump() {
		if(!isContinueGame()){
			stop();
			let winner = userTotal > computerTotal ? 'user' : 'computer';
			$winner.text(`The winner is ${winner}`).show();
			return;
		}

		let index = getRandomInt($cells.length);
		let $cell = $cells.eq(index);

		if(!$cell.hasClass(activeClass) && !$cell.hasClass(greenClass) && !$cell.hasClass(redClass)){
			let $activeCell = $('.'+ activeClass);
			if(!$activeCell.hasClass(greenClass)){
				$activeCell.addClass(redClass);
				computerTotal++;
				$totalComputer.text(computerTotal);
				usedCell++;
			}
			$activeCell.removeClass(activeClass);

			$cell.addClass(activeClass);
		} else {
			jump();
		}
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function isContinueGame(){
		return usedCell <= $cells.length / 2;
	}

	$('table').on('click', 'td', (e) => {
		e.preventDefault();
		if(!isContinueGame()) return;

		let $this = $(e.target);
		if($this.hasClass(greenClass) || $this.hasClass(redClass)){
			return;
		}

		if($this.hasClass(activeClass)){
			$this.addClass(greenClass);
			userTotal++;
			$totalUser.text(userTotal);
			usedCell++;
		}

		if(!isContinueGame()){
			stop();
		}
	});

	$('.start').on('click', (e) => {
		e.preventDefault();
		startGame();
	});

	$('.stop').on('click', (e) => {
		e.preventDefault();
		clear();
		stop();
	});

	$('.restart').on('click', (e) => {
		e.preventDefault();
		clear();
		stop();
		startGame();
	});


});