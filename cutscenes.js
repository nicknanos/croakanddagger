async function introCutscene(){
	//Spawn Characters
	spawnHero();
	spawnPartner((hero.x+20),hero.y);
	hero.overlaps(partner);

		//Spawn Eniroment 
		floor = new Sprite(canvas.hw,(hero.y+1), canvas.w, 3, 's');
		floor.visible = false;
		waitingRoom = new Sprite(floor.x, floor.y+200, canvas.w, 3, 's');
		floor.color = color(133, 22, 62); 




	spawnwitch((hero.x+30),hero.y+100);
	spawnPortal((hero.x-35),hero.y+100);
	witch.overlaps(portal);
	spawnHex((hero.x-15),hero.y+100);
	witch.overlaps(hex);
	hero.overlaps(hex);
	partner.overlaps(hex);

	spawnFrog(partner.x, partner.y+100);
	frog.overlaps(partner);
	frog.overlaps(portal);
	frog.overlaps(witch);

	spawnLizard(hero.x, hero.y+100);
	lizard.overlaps(hero);
	lizard.overlaps(frog);


	//camera
	//camera.y = hero.y


	////ANIMATION\\\\
	//Hero & Partner running sequence
    await hero.changeAni('run');
	await partner.changeAni('run');
	await hero.move(160, 'right', 1);
	await partner.move(160, 'right', 1);
	hero.speed = 0;
	partner.speed = 0;

	//Talking
	hero.changeAni('stand');
	await partner.changeAni('stand');
	partner.mirror.x = true;

	//Portal Appears
	portal.x = hero.x+120;
	portal.y = hero.y;
	portal.mirror.x =true;
	await portal.changeAni(['open','active'])

	//Witch Appears
	witch.x = portal.x;
	witch.y = hero.y;
	witch.mirror.x  =true
	await witch.move(15, 'left', 0.5)

	//Spell Cast
	await witch.changeAni(['hex','stand']);
	hex.x = witch.x - 15;
	hex.y = witch.y;
	hex.mirror.x = true;
	await hex.move(20,'left', 0.5);
	hex.remove();

	//ADD BLINDING EVENT

	//Form Change
	frog.x = partner.x;
	frog.y = partner.y;
	partner.remove();

	lizard.x = hero.x;
	lizard.y = hero.y;
	hero.remove();
	
	//Steal Frog
	await frog.changeAni('move');
	witch.mirror.x  = false;
	await witch.moveTo(portal.x, portal.y, 0.1)
	frog.remove();
	witch.remove();
	await portal.changeAni('close');
	portal.remove();
	await lizard.changeAni(['death','dead'])
	
	
}


function endCutscene(){
	
}