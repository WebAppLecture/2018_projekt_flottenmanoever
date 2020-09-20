/*
Multiplayer: Noch nicht vorhanden
Munition: Muss noch eingefügt werden ; Buttons vorhanden, aber keine Logik etc
Dokumentation fehlt noch
*/

$(document).ready(function() {
	//Versteckt alle Div's außer das 1
	var divs = $('body > div'),
		isShown = false;
	showDiv(0);//Start-Div anzeigen
	var audioBackground = document.getElementById('audioBackground');
		 
	//Click auf Singleplayerbutton festlegen
	$('#singleplayerbutton').click(function() {
		showDiv(1);
		multi = false;
	});
	
	//Click auf Multiplayerbutton festlegen
	$('#multiplayerbutton').click(function() {
		showDiv(1);
		multi = true;
	});
	
	//Musik automatisch starten
	$('#music').click(function() {
		audioBackground.play();
		audioBackground.loop = true;
	}).click();
	
	//Click auf Optionen festlegen
	$('#optionButton').click(function() {
		if(!isShown) {
			$('#optionMusic').show();
			isShown = true;
		} else {
			$('#optionMusic').hide();
			isShown = false;
		}
	});
	
	//Click auf Ton an/aus festlegen
	$('#volume_shoot').click(function() {
		if (music) {
			$('#sound_on').hide();
			$('#sound_off').show();
		} else {
			$('#sound_off').hide();
			$('#sound_on').show();
		}
		music = !music;
		isShown = false;
		$('#optionMusic').hide();
	});
	
	//Click auf Musik an festlegen
	$('#musicBtn').click(function() {
		if (backgroundMusic) {
			$('#music_on').hide();
			$('#music_off').show();
		} else {
			$('#music_off').hide();
			$('#music_on').show();
		}
		backgroundMusic = !backgroundMusic;
		audioBackground.muted = !backgroundMusic;
		isShown = false;
		$('#optionMusic').hide();
	});
	
	//Click auf Spiel starten festlegen
	$('#startgame').click(function() {
		if(multi) {
			multiplayer();
			schusseventSpielfeld1();
			schusseventSpielfeld2();
		} else {
			placeKI();
			schussevent();
		}
		startGame();
		pulse = setInterval(function() { //Pulse-Setzen mit Methode:
				timeplayed++;
				setTime(timeplayed); //Zeit neu setzen
		}, 1000); //Immer im Sekundentakt pulsen
	});
	
	//Click auf Neues Spiel starten festlegen
	$('#restart').click(function() {
		window.location = "Flottenmanöver.html";
	});
	
	//Click auf Leicht festlegen
	$('#leicht').click(function() {
		setOpportunity();
		if(multi == true) {
			drawFieldMulti(5,1);
		} else {
			drawField(5,1);
		}
		configureWeapons(0);
		setShipAttribute(0, 0, "nichts");
	});
	
	//Click auf Mittel festlegen
	$('#mittel').click(function() {
		setOpportunity();
		if(multi == true) {
			drawFieldMulti(10,2);
		} else {
			drawField(10,2);
		}
		configureWeapons(1);
		setShipAttribute(0, 0, "nichts");
	});
	
	//Click auf Schwer festlegen
	$('#schwer').click(function() {
		setOpportunity();
		if(multi == true) {
			drawFieldMulti(15,5);
		} else {
			drawField(15,5);
		}
		configureWeapons(3);
		setShipAttribute(0, 0, "nichts");
	});
	
	//Click auf Schiff1 festlegen
	$('#schifflänge1').click(function() {
		setShipAttribute(1,1,"Aufklärer");
	});
	
	//Click auf Schiff2 festlegen
	$('#schifflänge2').click(function() {
		setShipAttribute(2,2,"Kreuzer");
	});
	
	//Click auf Schiff3 festlegen
	$('#schifflänge3').click(function() {
		setShipAttribute(3,3,"Fregatte");
	});
	
	//Click auf Schiff4 festlegen
	$('#schifflänge4').click(function() {
		setShipAttribute(4,3,"Zerstörer");
	});
	
	//Click auf Schiff5 festlegen
	$('#schifflänge5').click(function() {
		setShipAttribute(5,5,"Schlachtschiff");
	});
	
	$('#he').click(function() {
		if (multi) {
			if (spielershoot == 1) {
				weaponHe = true;
			} else {
				weaponHe2 = true;
			}
		} else {
			weaponHe = true;
		}
		$('#he').css("background-color", "cadetblue");
		$('#ap').css("background-color", "transparent");
	});
	
	$('#ap').click(function() {
		if (multi) {
			if (spielershoot == 1) {
				weaponHe = false;
			} else {
				weaponHe2 = false;
			}
		} else {
			weaponHe = false;
		}
		$('#ap').css("background-color", "cadetblue");
		$('#he').css("background-color", "transparent");
	}).click();
	
	function configureWeapons(countHe) {
		this.weaponHeCount = countHe;
		this.weaponHe2Count = countHe;
	}
	
	function showDiv(index) {
		divs.each(function(i,v) { //Durch alle divs gehen
			if(i !== index)  //Und wenn i ungleich dem übergebenen Index ist
				$(v).hide();//Verstecken
			else
				$(v).show();//ansonsten zeigen
		});
	}
	
	function startGame() {
		$('#wähleSchwierigkeit').hide();
		$('#placeShipDiv').hide();
		$('#startgame').hide();
		$('#munition').show();
		if(multi) {
			//Spieler 1 beginnt immer
			$('#matchfieldKI').css("border", "5px solid green");
			$('#matchfieldPlayer').css("border", "5px solid black");
			$('#matchfieldPlayer rect').off();
			$('#hinweisSpieler').show();
		} else {
			setTrials(0);
			setDestroyedShips(0);
			setHitCounter(0);
			$('#matchfieldKILI').show();
			$('#scorerboard').show();
		}

		reloadHe();
	}
	
	function reloadHe() {
		if (weaponHeCount == 0) {
			$('#he').hide();
		} else {
			$('#he').show();	
			$('#countHe').html('Anzahl: ' + weaponHeCount); //Ausgeben
		}
	}
	
	function setOpportunity() {
		$('#startgame').show();
		$('#spielfeld').show();
		if(multi == false) {
			$('#startgame').attr("disabled", "disabled");
			$('#placeShipDiv').show();
		} else {
			setLabel();
			$('#matchfieldKILI').show();
		}
	}
	
	function setShipAttribute(numberButton, lengthShip, klasse) {
		if (!cantChangeShip) {
			this.numberButton = numberButton;
			this.lengthShip = lengthShip;
			this.klasse = klasse;
		}
	}
});

/* Schiffseingenschaften */
var lengthShip = 0;
var	klasse;
var	numberButton = 0;
/* Matrix für die Überprüfung ob Treffer oder nicht */
var zeroes;
var zeroesKlasse = [];
var zeroesKlasseKI = [];
/*Scorerboard */
var trials = 0;
var shipsDestroyed = 0;
var shipsDestroyedKI = 0;
var shootHuman = false;
var anzahlTreffer = 0;
var timeplayed = 0;
/* Endgamevariable zur Textsetzung */
var numberOfShip = 0;
/* Spielfeldeigenschaften */
var fieldLength;
/* Setze Grau*/
var allShipPoints = [];
var cantChangeShip = false;
var	shipArray = [];
/* Schusskoordinaten */
var hitCoord = "";
var fieldDirection = "";
var tempCoord = "";
var lastShotKIX;
var lastShotKIY;
var directionReversed = false;
var lastCoordsArray = [];
/* Musikoption */
var music = true;
var backgroundMusic = true;
/* Munition*/
var weaponHe = false;
var weaponHeCount = 0;
var weaponHe2 = false;
var weaponHe2Count = 0;
/* Multiplayer */
var multi = false;
var zeroesSpieler1;
var zeroesSpieler2;
var spielfeldSpieler1 = [];
var spielfeldSpieler2 = [];
var spieler1versenkt = 0;
var spieler2versenkt = 0;
var spielershoot = 1;

function Ship(numberShip) {
	this.numberShip = numberShip;
	this.points = [];
	this.ready = false;
}

function initMatrix() {
	zeroes = matrix(fieldLength, 0);
	zeroesKlasse = matrix(fieldLength, 'nichts');
	zeroesKlasseKI = matrix(fieldLength, 'nichts');
	// Multiplayer
	zeroesSpieler1 = matrix(fieldLength, 0);
	zeroesSpieler2 = matrix(fieldLength, 0);
	spielfeldSpieler1 = matrix(fieldLength, 'nichts');
	spielfeldSpieler2 = matrix(fieldLength, 'nichts');
}

/* Zeichne das SVG (Spielfeld) + Buttons der Schiffe */
function drawField(length, numberShipLength) {
	numberOfShip = numberShipLength;
	this.fieldLength = length;
	show(numberOfShip);
	initMatrix();
	let recs = '<svg viewBox="0 0 ' + (length*10+2)  + ' ' + (length*10+2) + '">';
	let recKI = '<svg viewBox="0 0 ' + (length*10+2) + ' ' + (length*10+2) + '">';
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < length; j++) {
			recs = recs + '<rect id="' + i + '-' + j + '" class="nichts" width="10" height="10" x="' + (i * 10 + 1) + '" y="' + (j * 10 + 1) + '" onClick="clickField(' + i + ', ' + j + ')"/>';
		}
	}
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < length; j++) {
			recKI = recKI + '<rect id="' + i + '|' + j + '" class="nichts" width="10" height="10" x="' + (i * 10 + 1) + '" y="' + (j * 10 + 1) + '"/>';
		}
	}
	recs = recs + '</svg>';
	document.getElementById('matchfieldPlayer').innerHTML = recs;
	document.getElementById('matchfieldKI').innerHTML = recKI;
}
function show(number) {
	$('#placeShip').show();
	shipArray = [];
	allShipPoints = [];
	for(let o = 1; o <= number; o++) {
		document.getElementById('schifflänge' + o).style.display = "block";
		document.getElementById('schifflänge' + o).disabled = false;
		let ship = new Ship(o);
		shipArray.push(ship);
	}
	for(let j = 5; j > number; j--) {
		document.getElementById('schifflänge' + j).style.display = "none";
	}
}
function clickField(xField, yField) {
	let myPoint = xField + '-' + yField;
	let ship;
	for (let i = 0; i < shipArray.length; i++) {
		if (shipArray[i].numberShip === numberButton) {
			ship = shipArray[i];
		}
	}
	if (document.getElementById(myPoint).classList.contains('nichts') && numberButton !== 0 && ship.points.length === 0) {		
		let shipSetPossible = setGrey(xField, yField, ship);
		
		if (shipSetPossible) {
			document.getElementById(myPoint).classList.remove('nichts');
			document.getElementById(myPoint).classList.add(klasse);
			zeroesKlasseKI[xField][yField] = klasse;
			cantChangeShip = true;
			ship.points.push(myPoint);
			allShipPoints.push(myPoint);
		
			if (lengthShip == 1) {
				disableShipButton(ship);
			}
		} else {
			alert('Das Schiff kann hier nicht gesetzt werden. Wählen Sie bitte einen anderen Punkt aus!');
		}
	}
}
function setGrey(xField, yField, ship) {
	let rightPossible = xField + lengthShip <= fieldLength;
	let leftPossible = xField - lengthShip  >= -1;
	let upPossible = yField - lengthShip >= -1;
	let downPossible = yField + lengthShip <= fieldLength;
	
	if (rightPossible) {
		for (let i = xField; i < xField + lengthShip; i++) {
			if (allShipPoints.indexOf(i + '-' + yField) > -1) {
				rightPossible = false;
				break;
			}
		}
	}
	if (leftPossible) {
		for (let i = xField; i > xField - lengthShip; i--) {
			if (allShipPoints.indexOf(i + '-' + yField) > -1) {
				leftPossible = false;
				break;
			}
		}
	}
	if (downPossible) {
		for (let i = yField; i < yField + lengthShip; i++) {
			if (allShipPoints.indexOf(xField + '-' + i) > -1) {
				downPossible = false;
				break;
			}
		}
	}
	if (upPossible) {
		for (let i = yField; i > yField - lengthShip; i--) {
			if (allShipPoints.indexOf(xField + '-' + i) > -1) {
				upPossible = false;
				break;
			}
		}
	}
	if (rightPossible) {
		for (let i = xField + 1; i < xField + lengthShip; i++) {
			let coord = i + "-" + yField;
			setShip(ship, xField, yField, "right", coord);
		}
	}
	if (downPossible) {
		for (let i = yField + 1; i < yField + lengthShip; i++) {
			let coord = xField + "-" + i;
			setShip(ship, xField, yField, "down", coord);
		}
	}
	if (leftPossible) {
		for (let i = xField - 1; i > xField - lengthShip; i--) {
			let coord = i + "-" + yField;
			setShip(ship, xField, yField, "left", coord);
		}
	}
	if (upPossible) {
		for (let i = yField - 1; i > yField - lengthShip; i--) {
			let coord = xField + "-" + i;
			setShip(ship, xField, yField, "up", coord);
		}
	}
	return rightPossible || leftPossible || upPossible || downPossible;
}
function setShip(ship, xField, yField, direction, coord) {
	
	document.getElementById(coord).classList.remove('nichts');
	document.getElementById(coord).classList.add('schiffSetzen');

	document.getElementById(coord).addEventListener('click', function() {
		if (!ship.ready && document.getElementById(coord).classList.contains('schiffSetzen')) {
			let shipSet = false;
			for (let i = 1; i < lengthShip; i++) {
				let greyCoord;
				if (direction === "right") {
					greyCoord = (xField + i) + "-" + yField;
					zeroesKlasseKI[xField + i][yField] = klasse;
				}
				if (direction === "left") {
					greyCoord = (xField - i) + "-" + yField;
					zeroesKlasseKI[xField - i][yField] = klasse;
				}
				if (direction === "up") {
					greyCoord = xField + "-" + (yField - i);
					zeroesKlasseKI[xField][yField - i] = klasse;
				}
				if (direction === "down") {
					greyCoord = xField + "-" + (yField + i);
					zeroesKlasseKI[xField][yField + i] = klasse;
				}
				if (document.getElementById(greyCoord).classList.contains('schiffSetzen')) {
					document.getElementById(greyCoord).classList.remove('nichts');
					document.getElementById(greyCoord).classList.remove('schiffSetzen');
					document.getElementById(greyCoord).classList.add(klasse);
					ship.points.push(greyCoord);
					allShipPoints.push(greyCoord);
					shipSet = true;
				}
			}
			if (shipSet) {
				removeGreyFields();
				disableShipButton(ship);
			}
		}
	});
}
function removeGreyFields() {
	let elements = document.getElementsByClassName('schiffSetzen');
		while (elements.length !== 0) {
			elements[0].classList.add('nichts');
			elements[0].classList.remove('schiffSetzen');
		}
}
function disableShipButton(ship) {
	cantChangeShip = false;
	document.getElementById('schifflänge' + numberButton).disabled = true;
	ship.ready = true;
	let allReady = true;
	for (let i = 0; i < shipArray.length; i++) {
		if (!shipArray[i].ready) {
			allReady = false;
			break;
		}
	}
	if (allReady) {
		document.getElementById('startgame').disabled = false;
	}
}
/* __________________________________________________________________________ */

/* Setze die Schiffe der KI */
function matrix (rows, defaultValue) {
	var matrix = [];
	
	for(let i = 0; i < rows; i++) {
		matrix.push([]);
		matrix[i].push(new Array(rows));
		
		for(let j = 0; j < rows; j++) {
			matrix[i][j] = defaultValue;
		}
	}
	return matrix;
}
function placeKI() {
	let hilfsarray = [1,2,3,3,5];
	let hilfsarrayKlasse = ["Aufklärer", "Kreuzer", "Fregatte", "Zerstörer", "Schlachtschiff"];
	let xKI, yKI;
	for(let i = 0; i < numberOfShip; i++) {
		xKI = Math.round((Math.random() * (((fieldLength - 1) + 1)-1)));
		yKI = Math.round((Math.random() * (((fieldLength - 1) + 1)-1)));			
		// Im Point muss die ID übergeben werden - für beide Spielfelder
		let point = xKI + "|" + yKI;
		
		if(document.getElementById(point).classList.contains('nichts')) {
			clickFieldKI(xKI, yKI, hilfsarrayKlasse[i], hilfsarray[i]);
		}
	}	
}
function clickFieldKI(xField, yField, klasse, schiffslänge) {
	// Im Point muss die ID übergeben werden - für beide Spielfelder
	let myPoint = xField + '|' + yField;
	if (document.getElementById(myPoint).classList.contains('nichts')) {
			setGreyKI(xField, yField, schiffslänge, klasse);			
			// Array muss übernommen werden - für beide Spielfelder
			if(zeroes[xField][yField] === 0) {
				zeroes[xField][yField] = 1;
				zeroesKlasse[xField][yField] = klasse;
			}
	}
}
function setGreyKI(xField, yField, schiffslänge, klasse) {
	let direction = "";
	let rightPossible = xField + schiffslänge <= fieldLength;
	let leftPossible = xField - schiffslänge  >= -1;
	let upPossible = yField - schiffslänge >= -1;
	let downPossible = yField + schiffslänge <= fieldLength;
	
	if(rightPossible) {
		for (let i = xField; i < xField + schiffslänge; i++) {
			if (zeroes[i][yField] === 1) {
				rightPossible = false;
			}
		}
	}
	if(leftPossible) {
		for (let i = xField; i > xField - schiffslänge; i--) {
			if (zeroes[i][yField] === 1) {
				leftPossible = false;
			}
		}
	}
	if(downPossible) {
		for (let i = yField; i < yField + schiffslänge; i++) {
			if (zeroes[xField][i] === 1) {
				downPossible = false;
			}
		}
	}
	if(upPossible) {
		for (let i = yField; i > yField - schiffslänge; i--) {
			if (zeroes[xField][i] === 1) {
				upPossible = false;
			}
		}
	}
	
	if(!leftPossible && !upPossible && !rightPossible && !downPossible) {
		placeKI();
	} else {
		while(direction == "") {
			let richtung = Math.floor(Math.random() * 4);
			switch(richtung) {
				case 0:
					if(leftPossible) direction = "left";
				case 1:
					if(upPossible) direction = "up";
				case 2:
					if(rightPossible) direction = "right";
				case 3:
					if(downPossible) direction = "down";
				default:
					break;
			}
		}	
		if (direction === 'right') {
			for (let i = 1; i < schiffslänge; i++) {
				let coord = (xField + i) + '|' + yField;
				zeroes[xField + i][yField] = 1;
				zeroesKlasse [xField + i][yField] = klasse;
			}
		}
		if (direction === 'down') {
			for (let i = 1; i < schiffslänge; i++) {
				let coord = xField + '|' + (yField + i);
				zeroes[xField][yField + i] = 1;
				zeroesKlasse [xField][yField + i] = klasse;
			}
		}
		if (direction === 'left') {
			for (let i = 1; i < schiffslänge; i++) {
				let coord = (xField - i) + '|' + yField;
				zeroes[xField - i][yField] = 1;
				zeroesKlasse [xField - i][yField] = klasse;
			}
		}
		if (direction === 'up') {
			for (let i = 1; i < schiffslänge; i++) {
				let coord = xField + '|' + (yField - i);
				zeroes[xField][yField - i] = 1;
				zeroesKlasse[xField][yField - i] = klasse;
			}
		}
	}
}
/* __________________________________________________________________________ */

/* Der Spielfeld KI das Event für die Schusslogik hinzufügen */
function schussevent() { //Schuss vom Spieler
	$('#matchfieldKI rect').click(function(event) {
		if(!this.classList.contains('keinTreffer') && !this.classList.contains('treffer') && !this.classList.contains('trefferVersenkt')) {
			setTrials(trials + 1); //Anzahl der Versuche erhöhen
			let coords = event.target.id.split("|"),
				x = parseInt(coords[0]),
				y = parseInt(coords[1]);
			let audioFlug = document.getElementById('audioFlug');
			let audioKeinTreffer = document.getElementById('audioKeinTreffer');
			let audioTreffer = document.getElementById('audioTreffer');
			audioFlug.currentTime = 0;
			
			if (weaponHe && weaponHeCount == 0) {
				alert('Munition aufgebraucht');
				return;
			}
			if(music) {
				audioFlug.play();				
				audioKeinTreffer.muted = true;
				audioTreffer.muted = true;
			}
			let trefferDabei = false;
			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {
					if (x + i >= 0 && y + j >= 0 && x + i < fieldLength && y + j < fieldLength) {
						let rect = document.getElementById((x + i) + "|" + (y + j)); 
						if ((weaponHe && weaponHeCount > 0) || (i == 0 && j == 0)) {
							let shipType = zeroesKlasse[x + i][y + j];
							if (rect.classList.contains('nichts')) {
								if(shipType == 'nichts') {
									keinTreffer(rect);
								} else {
									shootHuman = true;
									if(checkIfRemains(x + i, y + j, shipType)) {
										treffer(rect);
									} else {
										trefferVersenkt(rect);
									}
									trefferDabei = true;
									
									zeroesKlasse[x + i][y + j] = 'nichts';
								}
							}
						}
					}
				}
			}
			if (weaponHe) {
				weaponHeCount--;
				$('#countHe').html('Anzahl: ' + weaponHeCount);
				
				weaponHe = false;
				$('#ap').css("background-color", "cadetblue");
				$('#he').css("background-color", "transparent");
			}
			document.getElementById('audioFlug').addEventListener('ended', function() {
				if(music) {
					audioKeinTreffer.play();
					audioTreffer.play();
				}	
			});
			if (music) {
				if(trefferDabei) {
					audioTreffer.muted = false;
				} else {
					audioKeinTreffer.muted = false;
				}
			}
			if(shipsDestroyed === numberOfShip) {
				endgame("gewonnen");
			} else {
				shootKI();	//Schuss KI
				if(shipsDestroyedKI === numberOfShip) {
					endgame("verloren");
				}			
			}
		}
	});
}
	
function shootKI() {
	let direction;

	if (hitCoord !== "") {
		lastShotKIX = parseInt(tempCoord.split(",")[0]);
		lastShotKIY = parseInt(tempCoord.split(",")[1]);
		
		direction = checkPosition(lastShotKIX, lastShotKIY);
		if (direction == "") {
			hitCoord = "";
			shootKI();
			return;
		}
	} else {
		lastShotKIX = Math.round(Math.random() * (fieldLength - 1));
		lastShotKIY = Math.round(Math.random() * (fieldLength - 1));
	}

	let shootID = lastShotKIX + "-" + lastShotKIY;
	if(document.getElementById(shootID).classList.contains('keinTreffer') || document.getElementById(shootID).classList.contains('treffer') || document.getElementById(shootID).classList.contains('trefferVersenkt')) {
		shootKI();
	} else {
		let weapon = 0;
		if (weaponHe2Count > 0) {
			weapon = Math.round(Math.random());
		}
		weaponHe2 = weapon !== 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (lastShotKIX + i >= 0 && lastShotKIY + j >= 0 && lastShotKIX + i < fieldLength && lastShotKIY + j < fieldLength) {
					let rect = document.getElementById((lastShotKIX + i) + "-" + (lastShotKIY + j)); 
					if (weaponHe2 || (i == 0 && j == 0)) {
						let shipType = zeroesKlasseKI[lastShotKIX + i][lastShotKIY + j];
						if(shipType == 'nichts') {
							keinTreffer(rect);
							zeroesKlasseKI[lastShotKIX + i][lastShotKIY + j] = 'keinTreffer';
						} else {
							shootHuman = false;
							if(checkIfRemains(lastShotKIX + i, lastShotKIY + j, shipType)) {
								treffer(rect);
								if (hitCoord === "") {
									hitCoord = (lastShotKIX + i) + "," + (lastShotKIY + j);
								} else {
									fieldDirection = direction;
								}
								tempCoord = (lastShotKIX + i) + "," + (lastShotKIY + j);
							} else {
								trefferVersenkt(rect);
								hitCoord = "";
								tempCoord = "";
								fieldDirection = "";
								directionReversed = false;
							}
							zeroesKlasseKI[lastShotKIX + i][lastShotKIY + j] = 'treffer';
						}
					}
				}
			}
		}
		if (weaponHe2) {
			weaponHe2Count--;
		}
	}	
}

function checkPosition(xField, yField) {
	let rightPossible = xField + 1 < fieldLength;
	let leftPossible = xField > 0;
	let upPossible = yField > 0;
	let downPossible = yField + 1 < fieldLength;
	
	let hitX = parseInt(hitCoord.split(",")[0]);	
	let hitY = parseInt(hitCoord.split(",")[1]);
	
	if(rightPossible) {
		if (fieldDirection === "right") {
			if (zeroesKlasseKI[xField][yField] === "keinTreffer") {
				reverseFieldDirection("left", hitX, hitY);
				return checkPosition(hitX, hitY);
			}
			if (zeroesKlasseKI[xField + 1][yField] === 'treffer' || zeroesKlasseKI[xField + 1][yField] === 'keinTreffer') {
				reverseFieldDirection("left", hitX, hitY);
				return checkPosition(hitX, hitY);
			}
			lastShotKIX++;
			return fieldDirection;
		}
		if (zeroesKlasseKI[xField + 1][yField] === 'keinTreffer' || zeroesKlasseKI[xField + 1][yField] === 'treffer') {
			rightPossible = false;
		}
	} else {
		if (fieldDirection === "right") {
			reverseFieldDirection("left", hitX, hitY);
			return checkPosition(hitX, hitY);
		}
	}
	if(leftPossible) {
		if (fieldDirection === "left") {
			if (zeroesKlasseKI[xField][yField] === "keinTreffer") {
				reverseFieldDirection("right", hitX, hitY);
				return checkPosition(hitX, hitY);
			}
			if (zeroesKlasseKI[xField - 1][yField] === 'treffer' || zeroesKlasseKI[xField - 1][yField] === 'keinTreffer') {
				reverseFieldDirection("right", hitX, hitY);
				return checkPosition(hitX, hitY);
			}
			lastShotKIX--;
			return fieldDirection;
		}
		if (zeroesKlasseKI[xField - 1][yField] === 'keinTreffer' || zeroesKlasseKI[xField - 1][yField] === 'treffer') {
			leftPossible = false;
		}
	} else {
		if (fieldDirection === "left") {
			reverseFieldDirection("right", hitX, hitY);
			return checkPosition(hitX, hitY);
		}
	}
	if(downPossible) {
		if (fieldDirection === "down") {
			if (zeroesKlasseKI[xField][yField] === "keinTreffer") {
				reverseFieldDirection("up", hitX, hitY);
				return checkPosition(hitX, hitY);
			}
			if (zeroesKlasseKI[xField][yField + 1] === 'treffer' || zeroesKlasseKI[xField][yField + 1] === 'keinTreffer') {
				reverseFieldDirection("up", hitX, hitY);
				return checkPosition(hitX, hitY);
			}
			lastShotKIY++;
			return fieldDirection;
		}
		if (zeroesKlasseKI[xField][yField + 1] === 'treffer' || zeroesKlasseKI[xField][yField + 1] === 'keinTreffer') {
			downPossible = false;
		}
	} else {
		if (fieldDirection === "down") {
			reverseFieldDirection("up", hitX, hitY);
			return checkPosition(hitX, hitY);
		}
	}
	if(upPossible) {
		if (fieldDirection === "up") {
			if (zeroesKlasseKI[xField][yField] === "keinTreffer") {
				reverseFieldDirection("down", hitX, hitY);
				return checkPosition(hitX, hitY);
			}
			if (zeroesKlasseKI[xField][yField - 1] === 'treffer' || zeroesKlasseKI[xField][yField - 1] === 'keinTreffer') {
				reverseFieldDirection("down", hitX, hitY);
				return checkPosition(hitX, hitY);
			}
			lastShotKIY--;
			return fieldDirection;
		}
		if (zeroesKlasseKI[xField][yField - 1] === 'treffer' || zeroesKlasseKI[xField][yField - 1] === 'keinTreffer') {
			upPossible = false;
		}
	} else {
		if (fieldDirection === "up") {
			reverseFieldDirection("down", hitX, hitY);
			return checkPosition(hitX, hitY);
		}
	}
	
	if (!rightPossible && !leftPossible && !upPossible && !downPossible) {
		return "";
	}
	
	while(true) {
		let richtung = Math.floor(Math.random() * 4);
		switch(richtung) {
			case 0:
				if(leftPossible) {
					lastShotKIX--;
					return "left";
				}
				break;
			case 1:
				if(upPossible) {
					lastShotKIY--;
					return "up";
				}
				break;
			case 2:
				if(rightPossible) {
					lastShotKIX++;
					return "right";
				}
				break;
			case 3:
				if(downPossible) {
					lastShotKIY++;
					return "down";
				}
				break;
			default:
				break;
		}
	}
}

function reverseFieldDirection(direction, xCoord, yCoord) {
	if (directionReversed) {
		//wir wissen jetzt, dass es zwei Schiffe sein müssen
		fieldDirection = "";
	} else {
		fieldDirection = direction;
		directionReversed = true;
	}
	lastShotKIX = xCoord;
	lastShotKIY = yCoord;
}

function keinTreffer(selectedRec) {
	selectedRec.classList = 'keinTreffer';
}
function treffer(selectedRec) {
	selectedRec.classList = 'treffer';
	if(shootHuman) {
		setHitCounter(anzahlTreffer + 1);
	}
}
function trefferVersenkt(selectedRec) {
	selectedRec.classList = 'trefferVersenkt';
	if(multi) {
		if(spielershoot == 1) {
			spieler1versenkt += 1;
		} else {
			spieler2versenkt += 1;
		}
	} else {
		if(shootHuman) {
			setDestroyedShips(shipsDestroyed + 1);
			setHitCounter(anzahlTreffer + 1);
		} else {
			shipsDestroyedKI += 1;
		}
	}		
}
function endgame(zustand) {
	$('#scorerboard').hide();
	$('#result').show();
	$('#munition').hide();
	$('#matchfieldKI rect').off();
	$('#matchfieldPlayer rect').off();
	
	if(multi) {
		$('#hinweisSpieler').hide();
		$('#Spielausgang').html('<strong>***** Die Schlacht ist beendet *****</strong>');
		if(zustand === "spieler1") {
			$('#Spieltext').html('<strong>Herzlichen Glückwunsch Spieler 1. Alle feindlichen Schiffe wurden zerstört.</strong>');
			$('#matchfieldKI').css("border", "5px solid black");
		} else {
			$('#Spieltext').html('<strong>Herzlichen Glückwunsch Spieler 2. Alle feindlichen Schiffe wurden zerstört.</strong>');
			$('#matchfieldPlayer').css("border", "5px solid black");			
		}
	} else {	
		let schiffstreffer;

		if(numberOfShip == 1) {
			schiffstreffer = 1;
		}
		if(numberOfShip == 2) {
			schiffstreffer = 3;
		}
		if(numberOfShip == 5) {
			schiffstreffer = 14;
		}
		if(zustand === "gewonnen") {
			$('#Spielausgang').html('<strong>***** Die Schlacht ist gewonnen *****</strong>');
			$('#Spieltext').html('<strong>Herzlichen Glückwunsch Commander. Alle feindlichen Schiffe wurden zerstört.</strong>');
			$('#Trefferquote').html('Das ergibt eine Trefferquote von <strong>' + ((anzahlTreffer/trials)*100).toFixed(2) + ' Prozent.</strong>');
			if(numberOfShip - shipsDestroyedKI == 1) {
				$('#ÜbrigeSchiffe').html('Wir haben noch <strong> 1 </strong> manövrierfähiges Schiff.');
			} else {
				$('#ÜbrigeSchiffe').html('Wir haben noch <strong>' + (numberOfShip - shipsDestroyedKI) + '</strong> manövrierfähige Schiffe.');
			}
			$('#Ergebnistext').html('Wir haben in <strong>' + timeplayed + '</strong> Sekunden <strong>' + trials + '</strong> Schüsse abgegeben und <strong>' + shipsDestroyed + '</strong> Schiffe zerstört.');
			
		} else {
			$('#Spielausgang').html('<strong>***** Die Schlacht ist verloren *****</strong>');
			$('#Spieltext').html('Mein Beileid Commander. Alle unsere Schiffe wurden zerstört.');
			$('#Trefferquote').html('Das ergibt eine Trefferquote von <strong>' + ((anzahlTreffer/trials)*100).toFixed(2) + ' Prozent.</strong>');
			if(numberOfShip - shipsDestroyed == 1) {
				$('#ÜbrigeSchiffe').html('Der Feind hat noch <strong> 1 </strong> manövrierfähiges Schiff.');
			} else {
				$('#ÜbrigeSchiffe').html('Der Feind hat noch <strong>' + (numberOfShip - shipsDestroyed) + '</strong> manövrierfähige Schiffe.');
			}
			$('#Ergebnistext').html('Wir haben in <strong>' + timeplayed + '</strong> Sekunden <strong>' + trials + '</strong> Schüsse abgegeben und <strong>' + shipsDestroyed + '</strong> Schiffe zerstört.');				
		}
	}
}
function checkIfRemains(x,y, shipType) {
	for(let i = -4; i<=5; i++) {
		if(x+i > fieldLength - 1 || x+i < 0 || i == 0) {
			continue;
		}
		if(shootHuman) {
			if(zeroesKlasse[x+i][y] === shipType) {
				return true;
			}
		} else {
			if(zeroesKlasseKI[x+i][y] === shipType) {
				return true;
			}
		}
		
	}
	for(let j =-4; j<=5; j++) {
		if(y+j > fieldLength - 1 || y+j < 0 || j == 0) {
			continue;
		}
		if(shootHuman) {
			if(zeroesKlasse[x][y+j] === shipType) {
				return true;
			}
		} else {
			if(zeroesKlasseKI[x][y+j] === shipType) {
				return true;
			}
		}
	}
	return false;
}	
/* __________________________________________________________________________ */

/* Scorerboard-Angaben dynamisch anzeigen lassen - Funktionen */
function setTrials(n) {
	trials = n; //Neu setzen
	if (trials == 1) {
		$('#AnzahlSchüsse').html('Sie haben bereits <strong>einen</strong> Schuss abgefeuert'); //Ausgeben
	} else {
		if (trials == 0) {
			$('#AnzahlSchüsse').html('Sie haben noch <strong>keinen</strong> Schuss abgefeuert'); //Ausgeben
		} else {
			$('#AnzahlSchüsse').html('Sie haben bereits <strong>' + trials + '</strong> Schüsse abgefeuert'); //Ausgeben
		}
	}
}
function setDestroyedShips(n) {
	shipsDestroyed = n; //Neu setzen
	if(shipsDestroyed == 0) {
		$('#AnzahlZerstörteSchiffe').html('Sie haben noch <strong>kein</strong> Schiff zerstört'); //Ausgeben
	} else {
		if(shipsDestroyed == 1) {
			$('#AnzahlZerstörteSchiffe').html('Sie haben bereits <strong>ein</strong> Schiff zerstört'); //Ausgeben
		} else { 
			$('#AnzahlZerstörteSchiffe').html('Sie haben bereits <strong>' + shipsDestroyed +'</strong> Schiffe zerstört'); //Ausgeben
		}
	}
}
function setHitCounter(n) {
	anzahlTreffer = n; //Neu setzen
	if(anzahlTreffer == 0) {
		$('#AnzahlTreffer').html('Sie haben noch <strong>keinen</strong> Treffer gelandet'); //Ausgeben
	} else {
		if (anzahlTreffer == 1) {
			$('#AnzahlTreffer').html('Sie haben bereits <strong>einen</strong> Treffer gelandet'); //Ausgeben
		} else {
			$('#AnzahlTreffer').html('Sie haben bereits <strong>' + anzahlTreffer +'</strong> Treffer gelandet'); //Ausgeben
		}
	}
}
function setTime(n) {
	timeplayed = n; //Neu setzen
	if(timeplayed == 1) {
		$('#Spieldauer').html('Spieldauer: <strong>eine</strong> Sekunde');	//Ausgeben
	} else {
		$('#Spieldauer').html('Spieldauer: <strong>' + timeplayed + '</strong> Sekunden');	//Ausgeben
	}
}
function setLabel() {
	if(multi == true) {
		$('#Label1').html('Spieler 1');	//Ausgeben
		$('#Label2').html('Spieler 2');	//Ausgeben
	}
}
/* __________________________________________________________________________ */

/* Multiplayer Funktionen */
/* Musik wieder einbinden beim Schuss!*/
function drawFieldMulti(length, numberShipLength) {
	numberOfShip = numberShipLength;
	this.fieldLength = length;
	show(numberOfShip); 
	initMatrix();
	let recs = '<svg viewBox="0 0 ' + (length*10+2)  + ' ' + (length*10+2) + '">';
	let recKI = '<svg viewBox="0 0 ' + (length*10+2) + ' ' + (length*10+2) + '">';
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < length; j++) {
			recs = recs + '<rect id="' + i + '-' + j + '" class="nichts" width="10" height="10" x="' + (i * 10 + 1) + '" y="' + (j * 10 + 1) + '"/>';
		}
	}
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < length; j++) {
			recKI = recKI + '<rect id="' + i + '|' + j + '" class="nichts" width="10" height="10" x="' + (i * 10 + 1) + '" y="' + (j * 10 + 1) + '"/>';
		}
	}
	recs = recs + '</svg>';
	document.getElementById('matchfieldPlayer').innerHTML = recs;
	document.getElementById('matchfieldKI').innerHTML = recKI;
}

function multiplayer() {
	placeKIMulti();
}

function placeKIMulti() {
	let koord;
	let hilfsarray = [1,2,3,3,5];
	let hilfsarrayKlasse = ["Aufklärer", "Kreuzer", "Fregatte", "Zerstörer", "Schlachtschiff"];
	let xKI, yKI;
	// For-Schleife für beide Spielfelder
	for(let j = 0; j < 2; j++) {
		if(j == 0) {
			koord = "-";
		} else {
			koord = "|";
		}
		for(let i = 0; i < numberOfShip; i++) {
			xKI = Math.round(Math.random() * (fieldLength - 1));
			yKI = Math.round(Math.random() * (fieldLength - 1));			
			// Im Point muss die ID übergeben werden - für beide Spielfelder
			let point = xKI + koord + yKI;
			
			if(document.getElementById(point).classList.contains('nichts')) {
				clickFieldKIMulti(xKI, yKI, hilfsarrayKlasse[i], hilfsarray[i], koord);
			}
		}
	}	
}
function clickFieldKIMulti(xField, yField, klasse, schiffslänge, koord) {
	// Im Point muss die ID übergeben werden - für beide Spielfelder
	let myPoint = xField + koord + yField;
	let array;
	let array2;
	if(koord == "-") {
		array = zeroesSpieler1;
		array2 = spielfeldSpieler1;
	} else {
		array = zeroesSpieler2;
		array2 = spielfeldSpieler2;
	}
	if (document.getElementById(myPoint).classList.contains('nichts')) {
			setGreyKIMulti(xField, yField, schiffslänge, klasse, koord, array, array2);			
			// Array muss übernommen werden - für beide Spielfelder
			if(array[xField][yField] === 0) {
				array[xField][yField] = 1;
				array2[xField][yField] = klasse;
			}
	}
}
function setGreyKIMulti(xField, yField, schiffslänge, klasse, koord, array, array2) {
	let direction = "";
	let rightPossible = xField + schiffslänge <= fieldLength;
	let leftPossible = xField - schiffslänge  >= -1;
	let upPossible = yField - schiffslänge >= -1;
	let downPossible = yField + schiffslänge <= fieldLength;
	
	if(rightPossible) {
		for (let i = xField; i < xField + schiffslänge; i++) {
			if (array[i][yField] === 1) {
				rightPossible = false;
			}
		}
	}
	if(leftPossible) {
		for (let i = xField; i > xField - schiffslänge; i--) {
			if (array[i][yField] === 1) {
				leftPossible = false;
			}
		}
	}
	if(downPossible) {
		for (let i = yField; i < yField + schiffslänge; i++) {
			if (array[xField][i] === 1) {
				downPossible = false;
			}
		}
	}
	if(upPossible) {
		for (let i = yField; i > yField - schiffslänge; i--) {
			if (array[xField][i] === 1) {
				upPossible = false;
			}
		}
	}
	
	if(!leftPossible && !upPossible && !rightPossible && !downPossible) {
		placeKIMulti();
	} else {
		while(direction == "") {
			let richtung = Math.floor(Math.random() * 4);
			switch(richtung) {
				case 0:
					if(leftPossible) direction = "left";
				case 1:
					if(upPossible) direction = "up";
				case 2:
					if(rightPossible) direction = "right";
				case 3:
					if(downPossible) direction = "down";
				default:
					break;
			}
		}	
		if (direction === 'right') {
			for (let i = 1; i < schiffslänge; i++) {
				let coord = (xField + i) + koord + yField;
				array[xField + i][yField] = 1;
				array2[xField + i][yField] = klasse;
			}
		}
		if (direction === 'down') {
			for (let i = 1; i < schiffslänge; i++) {
				let coord = xField + koord + (yField + i);
				array[xField][yField + i] = 1;
				array2[xField][yField + i] = klasse;
			}
		}
		if (direction === 'left') {
			for (let i = 1; i < schiffslänge; i++) {
				let coord = (xField - i) + koord + yField;
				array[xField - i][yField] = 1;
				array2[xField - i][yField] = klasse;
			}
		}
		if (direction === 'up') {
			for (let i = 1; i < schiffslänge; i++) {
				let coord = xField + koord + (yField - i);
				array[xField][yField - i] = 1;
				array2[xField][yField - i] = klasse;
			}
		}
	}
}
function schusseventSpielfeld2() { //Schuss von Spieler1
	$('#matchfieldPlayer rect').click(schussSpieler1);
}
function schusseventSpielfeld1() { //Schuss von Spieler2
	$('#matchfieldKI rect').click(schussSpieler2);
}
function schussSpieler1(event) {
	if(!this.classList.contains('keinTreffer') && !this.classList.contains('treffer') && !this.classList.contains('trefferVersenkt')) {
		let coords = event.target.id.split("-"),
			x = parseInt(coords[0]),
			y = parseInt(coords[1]);
		let audioFlug = document.getElementById('audioFlug');
		let audioKeinTreffer = document.getElementById('audioKeinTreffer');
		let audioTreffer = document.getElementById('audioTreffer');
		audioFlug.currentTime = 0;
		
		if (weaponHe2 && weaponHe2Count == 0) {
			alert('Munition aufgebraucht');
			weaponHe2 = false;
			$('#ap').css("background-color", "cadetblue");
			$('#he').css("background-color", "transparent");
			return;
		}
		if(music) {
			audioFlug.play();				
			audioKeinTreffer.muted = true;
			audioTreffer.muted = true;
		}
		spielershoot = 1;
		let trefferDabei = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (x + i >= 0 && y + j >= 0 && x + i < fieldLength && y + j < fieldLength) {
					let rect = document.getElementById((x + i) + "-" + (y + j)); 
					if ((weaponHe2 && weaponHe2Count > 0) || (i == 0 && j == 0)) {
						let shipType = spielfeldSpieler1[x + i][y + j];
		
						if(shipType == 'nichts') {
							keinTreffer(rect);
							trefferDabei = false;
						} else {
							trefferDabei = true;
							if(checkIfRemainsMulti(x + i, y + j, shipType, spielfeldSpieler1)) {
								treffer(rect);
							} else {
								trefferVersenkt(rect);
							}
							spielfeldSpieler1[x + i][y + j] = 'nichts';
						}
					}
				}
			}
		}
		if (weaponHe2) {
			weaponHe2Count--;
				
			weaponHe2 = false;
			$('#ap').css("background-color", "cadetblue");
			$('#he').css("background-color", "transparent");
		}
		document.getElementById('audioFlug').addEventListener('ended', function() {
			if(music) {
				audioKeinTreffer.play();
				audioTreffer.play();
			}	
		});
		if(music) {
			if (trefferDabei) {
				audioTreffer.muted = false;
			} else {
				audioKeinTreffer.muted = false;
			}
		}
		
		if(numberOfShip === spieler1versenkt) {
			endgame("spieler2");
			return;
		}
		
		$('#countHe').html('Anzahl: ' + weaponHeCount);
		$('#matchfieldPlayer rect').off();
		$('#matchfieldPlayer').css("border", "5px solid black");
		$('#matchfieldKI rect').on("click", schussSpieler2);
		$('#matchfieldKI').css("border", "5px solid green");
		$('#anderReihe').html("Spieler 1: Sie sind dran!");
	}
}
function schussSpieler2(event) {
	if(!this.classList.contains('keinTreffer') && !this.classList.contains('treffer') && !this.classList.contains('trefferVersenkt')) {
		let coords = event.target.id.split("|"),
			x = parseInt(coords[0]),
			y = parseInt(coords[1]);
		let audioFlug = document.getElementById('audioFlug');
		let audioKeinTreffer = document.getElementById('audioKeinTreffer');
		let audioTreffer = document.getElementById('audioTreffer');
		audioFlug.currentTime = 0;
		if(music) {
			audioFlug.play();
			audioKeinTreffer.muted = true;
			audioTreffer.muted = true;
		}
		spielershoot = 2;
		
		if (weaponHe && weaponHeCount == 0) {
			alert('Munition aufgebraucht');
			weaponHe = false;
			$('#ap').css("background-color", "cadetblue");
			$('#he').css("background-color", "transparent");
			return;
		}
		
		let trefferDabei = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (x + i >= 0 && y + j >= 0 && x + i < fieldLength && y + j < fieldLength) {
					let rect = document.getElementById((x + i) + "|" + (y + j)); 
					if ((weaponHe && weaponHeCount > 0) || (i == 0 && j == 0)) {
						let shipType = spielfeldSpieler2[x + i][y + j];
						if(shipType == 'nichts') {
							keinTreffer(rect);
						} else {
							trefferDabei = true;
							if(checkIfRemainsMulti(x, y, shipType, spielfeldSpieler2)) {
								treffer(rect);
							} else {
								trefferVersenkt(rect);
							}
							spielfeldSpieler2[x + i][y + j] = 'nichts';
						}
					}
				}
			}
		}
		document.getElementById('audioFlug').addEventListener('ended', function() {
			if(music) {
				audioKeinTreffer.play();
				audioTreffer.play();
			}	
		});
		if (music) {
			if (trefferDabei) {
				audioTreffer.muted = false;
			} else {
				audioKeinTreffer.muted = false;
			}
		}
		if(numberOfShip === spieler2versenkt) {
			endgame("spieler1");
			return;
		}
		if (weaponHe) {
			weaponHeCount--;
				
			weaponHe = false;
			$('#ap').css("background-color", "cadetblue");
			$('#he').css("background-color", "transparent");
			
		}
		
		$('#countHe').html('Anzahl: ' + weaponHe2Count);
		$('#matchfieldPlayer rect').on("click", schussSpieler1);
		$('#matchfieldPlayer').css("border", "5px solid green");
		$('#matchfieldKI rect').off();
		$('#matchfieldKI').css("border", "5px solid black");
		$('#anderReihe').html("Spieler 2: Sie sind dran!");
	}
}
function checkIfRemainsMulti(x,y, shipType, array) {
	for(let i = -4; i<=5; i++) {
		if(x+i > fieldLength - 1 || x+i < 0 || i == 0) {
			continue;
		}
		if(array[x+i][y] === shipType) {
			return true;		
		}
	}
	for(let j =-4; j<=5; j++) {
		if(y+j > fieldLength - 1 || y+j < 0 || j == 0) {
			continue;
		}
		if(array[x][y+j] === shipType) {
			return true;
		}
	}
	return false;
}