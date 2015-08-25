(function (global) {
	var sprites = {
		'skier' : {
			$imageFile : 'sprite-characters.png',
			parts : {
				/*blank : [ 0, 0, 0, 0 ],
				east : [ 0, 0, 24, 34 ],
				esEast : [ 24, 0, 24, 34 ],
				sEast : [ 49, 0, 17, 34 ],
				south : [ 65, 0, 17, 34 ],
				sWest : [ 49, 37, 17, 34 ],
				wsWest : [ 24, 37, 24, 34 ],
				west : [ 0, 37, 24, 34 ],
				hit : [ 0, 78, 31, 31 ],
				jumping : [ 84, 0, 32, 34 ],
				somersault1 : [ 116, 0, 32, 34 ],
				somersault2 : [ 148, 0, 32, 34 ]


				sEast1 : [ 64, 112, 26, 43 ],
				sEast2 : [ 90, 112, 32, 43 ],
				sWest1 : [ 64, 158, 26, 43 ],
				sWest2 : [ 90, 158, 32, 43 ],
				eating1 : [ 122, 112, 34, 43 ],
				eating2 : [ 156, 112, 31, 43 ],
				eating3 : [ 187, 112, 31, 43 ],
				eating4 : [ 219, 112, 25, 43 ],
				eating5 : [ 243, 112, 26, 43 ]
*/
				blank : [ 0, 0, 0, 0 ],
				east : [ 90, 112, 32, 43 ],
				esEast : [ 64, 112, 26, 43 ],
				sEast : [ 64, 112, 26, 43 ],
				south : [ 0, 112, 32, 43 ],
				sWest : [ 65, 158, 25, 43 ],
				wsWest : [ 65, 158, 25, 43 ],
				west : [ 91, 158, 30, 43 ],
				hit : [ 0, 78, 31, 31 ],
				jumping : [ 84, 0, 32, 34 ],
				somersault1 : [ 116, 0, 32, 34 ],
				somersault2 : [ 148, 0, 32, 34 ]

			},
			hitBoxes: {
				0: [ 7, 20, 27, 34 ]
			},
			id : 'player',
			hitBehaviour: {}
		},
		'smallTree' : {
			$imageFile : 'skifree-objects.png',
			parts : {
				main : [ 0, 28, 30, 34 ]
			},
			hitBoxes: {
				0: [ 0, 18, 30, 34 ]
			},
			hitBehaviour: {}
		},
		'tallTree' : {
			$imageFile : 'skifree-objects.png',
			parts : {
				main : [ 95, 66, 32, 64 ]
			},
			zIndexesOccupied : [0, 1],
			hitBoxes: {
				0: [0, 54, 32, 64],
				1: [0, 10, 32, 54]
			},
			hitBehaviour: {}
		},
		'thickSnow' : {
			$imageFile : 'skifree-objects.png',
			parts : {
				main : [ 143, 53, 43, 10 ]
			},
			hitBehaviour: {}
		},
		'rock' : {
			$imageFile : 'skifree-objects.png',
			parts : {
				main : [ 30, 52, 23, 11 ]
			},
			hitBehaviour: {}
		},
		'monster' : {
			$imageFile : 'sprite-characters.png',
			parts : {
				sEast1 : [ 49, 0, 17, 34 ],
				sEast2 : [ 49, 0, 17, 34 ],
				sWest1 : [ 49, 37, 17, 34 ],
				sWest2 : [ 49, 37, 17, 34 ],
				eating1 : [ 30, 408, 44, 41 ],
				eating2 : [ 30, 408, 44, 41 ],
				eating3 : [ 30, 408, 44, 41 ],
				eating4 : [ 30, 408, 44, 41 ],
				eating5 : [ 30, 408, 44, 41 ]

			},
			hitBehaviour: {}
		},
		'jump' : {
			$imageFile : 'skifree-objects.png',
			parts : {
				main : [ 109, 55, 32, 8 ]
			},
			hitBehaviour: {}
		},
		'signStart' : {
			$imageFile : 'skifree-objects.png',
			parts : {
				main : [ 260, 103, 42, 27 ]
			},
			hitBehaviour: {}
		},
		'snowboarder' : {
			$imageFile : 'sprite-characters.png',
			parts : {
				sEast : [ 73, 229, 20, 29 ],
				sWest : [ 95, 228, 26, 30 ]
			},
			hitBehaviour: {}
		},
		'emptyChairLift': {
			$imageFile : 'skifree-objects.png',
			parts: {
				main : [ 92, 136, 26, 30 ]
			},
			zIndexesOccupied : [1],
		}
	};

	function monsterHitsTreeBehaviour(monster) {
		monster.deleteOnNextCycle();
	}

	sprites.monster.hitBehaviour.tree = monsterHitsTreeBehaviour;

	function treeHitsMonsterBehaviour(tree, monster) {
		monster.deleteOnNextCycle();
	}

	sprites.smallTree.hitBehaviour.monster = treeHitsMonsterBehaviour;
	sprites.tallTree.hitBehaviour.monster = treeHitsMonsterBehaviour;

	function skierHitsTreeBehaviour(skier, tree) {
		skier.hasHitObstacle(tree);
	}

	function treeHitsSkierBehaviour(tree, skier) {
		skier.hasHitObstacle(tree);
	}

	sprites.smallTree.hitBehaviour.skier = treeHitsSkierBehaviour;
	sprites.tallTree.hitBehaviour.skier = treeHitsSkierBehaviour;

	function rockHitsSkierBehaviour(rock, skier) {
		skier.hasHitObstacle(rock);
	}

	sprites.rock.hitBehaviour.skier = rockHitsSkierBehaviour;

	function skierHitsJumpBehaviour(skier, jump) {
		skier.hasHitJump(jump);
	}

	function jumpHitsSkierBehaviour(jump, skier) {
		skier.hasHitJump(jump);
	}

	sprites.jump.hitBehaviour.skier = jumpHitsSkierBehaviour;

// Really not a fan of this behaviour.
/*	function skierHitsThickSnowBehaviour(skier, thickSnow) {
		// Need to implement this properly
		skier.setSpeed(2);
		setTimeout(function() {
			skier.resetSpeed();
		}, 700);
	}

	function thickSnowHitsSkierBehaviour(thickSnow, skier) {
		// Need to implement this properly
		skier.setSpeed(2);
		setTimeout(function() {
			skier.resetSpeed();
		}, 300);
	}*/

	// sprites.thickSnow.hitBehaviour.skier = thickSnowHitsSkierBehaviour;

	function snowboarderHitsSkierBehaviour(snowboarder, skier) {
		skier.hasHitObstacle(snowboarder);
	}

	sprites.snowboarder.hitBehaviour.skier = snowboarderHitsSkierBehaviour;

	global.spriteInfo = sprites;
})( this );


if (typeof module !== 'undefined') {
	module.exports = this.spriteInfo;
}