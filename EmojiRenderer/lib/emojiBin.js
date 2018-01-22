$("document").ready(function() {

  var sounds = [
    // new Howl({src: ["sounds/boing.mp3"]}),
    // new Howl({src: ["sounds/boing2.mp3"]}),
    new Howl({src: ["sounds/boing3.mp3"]}),
    new Howl({src: ["sounds/boing4.mp3"]}),
    new Howl({src: ["sounds/boing5.mp3"]}),
    // new Howl({src: ["sounds/boing6.mp3"]}),
    new Howl({src: ["sounds/boing7.mp3"]}),
    new Howl({src: ["sounds/boing8.mp3"]})
  ];

  var pop = new Howl({src: ["sounds/pop.mp3"]});

  var speedSound = 10;

  var ratio = 5.79;
  var boundariesXrel = [0.6622,4885/8000];

  var maxEmojis = 30;
  var decreaseFactorMax = 8000;
  var decreaseFactorMin = 1000;
  var decreaseFactor = 2000;

  var minSizeBeforeDispose = 1500;

  var minSizeMult10 = 30;
  var maxSizeMult10 = 40;

  var baseSize = 24;
  var textureSize = 160;

  var autoEmojiTimeout = 1;
  var autoEmojiInterval = 5000;
  var cleanupInterval = 60;

  var speedScale = 1;
  var spinScale = 1;
  
  var floodDelay = 300;
  var lastInteraction = new Date();

  var lastAdd = {};
  var floodTimeoutAdd = 1000;

  var sizeRatio = 1127 /  839;

  var sizeX = $(window).width();
  var sizeY = sizeX / sizeRatio;

  var boundariesWidth = 20;

  console.log("Creating a "+sizeX+" x "+sizeY+" simulation");

  var $worldSelector = $("#world");

  var SOUND_INTERVAL = 50;
  var lastSound = new Date().getTime();

  $worldSelector.css({
    width:sizeX,
    height:sizeY
  });

  $("body").css({
    height:sizeY+"px"
  });

  var World = Matter.World;
  var Bodies = Matter.Bodies;
  var Engine = Matter.Engine;
  var Composites = Matter.Composites;
  var Composite = Matter.Composite;  
  var Common = Matter.Common;
  var Render = Matter.Render;
  var MouseConstraint = Matter.MouseConstraint;
  
  var engine = Engine.create($worldSelector[0],
  {
    render: {
      options: {
        width:sizeX,
        height:sizeY,
        wireframes: false,
        showAngleIndicator: false,
        background:'transparent'
      }
    }
  });

  var world = engine.world;

  var offset = 15; 
  world.gravity['y'] = -0.1;

  var mouseConstraint = MouseConstraint.create(engine);
  World.add(world, mouseConstraint);    
 
  var boundaries = Matter.Composite.create(); 
  var entry = Matter.Composite.create();  
  var emojis = Matter.Composite.create();
  var fragments = Matter.Composite.create();

  World.add(world, boundaries);
  World.add(world, entry);  
  World.add(world, emojis);
  World.add(world, fragments);

  var renderStuff = false;
  var roofColor = "#000000";

  var bodies = [
    Bodies.rectangle(sizeX/2,         -offset,          sizeX + 2 * offset,   50, { render:{visible:false}, isStatic: true,restitution: 0.3 }),
    // 
    Bodies.rectangle(sizeX + offset,  sizeY/2,          50,                   sizeY + 2 * offset, { render:{visible:false}, isStatic: true,restitution: 0.3 }),
    Bodies.rectangle(-offset,         sizeY/2,          50,                   sizeY + 2 * offset, { render:{visible:false}, isStatic: true,restitution: 0.3 }),
    
    // roof
    Bodies.rectangle(0.04 * sizeX, 0.073 * sizeY, 0.16 * sizeX, 0.7 * sizeY, {angle: 0.97, render: {fillStyle: roofColor, lineWidth: 0, strokeStyle: "#000000", opacity: 1, visible: true}, isStatic: true, restitution: 0.3}),
    Bodies.rectangle((1 - 0.04) * sizeX, 0.05 * sizeY, 0.16 * sizeX, 0.7 * sizeY, {angle: 3.14 - 0.94, render: {fillStyle: roofColor, lineWidth: 0, strokeStyle: "#000000", opacity: 1, visible: true}, isStatic: true, restitution: 0.3}),

    // windows
    Bodies.rectangle(0.485 * sizeX, 0.15 * sizeY, 0.03 * sizeX, 0.12 * sizeY, {render: {visible: renderStuff}, isStatic: true, restitution: 0.3}),

    Bodies.rectangle(0.34 * sizeX, 0.48 * sizeY, 0.03 * sizeX, 0.12 * sizeY, {render: {visible: renderStuff}, isStatic: true, restitution: 0.3}),
    Bodies.rectangle((1 - 0.405) * sizeX, 0.48 * sizeY, 0.03 * sizeX, 0.12 * sizeY, {render: {visible: renderStuff}, isStatic: true, restitution: 0.3}),

    Bodies.rectangle(0.235 * sizeX, 0.802 * sizeY, 0.03 * sizeX, 0.12 * sizeY, {render: {visible: renderStuff}, isStatic: true, restitution: 0.3}),
    Bodies.rectangle(0.50 * sizeX, 0.802 * sizeY, 0.03 * sizeX, 0.12 * sizeY, {render: {visible: renderStuff}, isStatic: true, restitution: 0.3}),
    Bodies.rectangle((1 - 0.24) * sizeX, 0.802 * sizeY, 0.03 * sizeX, 0.12 * sizeY, {render: {visible: renderStuff}, isStatic: true, restitution: 0.3}),

    // Bodies.rectangle(sizeX*boundariesXrel[0] + boundariesWidth/2,sizeY/2,boundariesWidth,sizeY + 2 * offset, { render:{visible:true}, isStatic: true,restitution: 0.3 })

  ];
    // Bodies.rectangle(sizeX*boundariesXrel[1] + boundariesWidth/2,sizeY/2,boundariesWidth,sizeY + 2 * offset, { render:{visible:false}, isStatic: true,restitution: 0.3 })];

  for( var k = 0; k < bodies.length; k++ )
  {
    bodies[k].collisionFilter.group = 0;
    bodies[k].collisionFilter.category = 0x01;
    bodies[k].collisionFilter.mask = 0x03; // Dont collide with particles    

    Matter.Composite.add(boundaries,bodies[k]);
  }

  var bottomEntry = Bodies.rectangle(sizeX/2,sizeY + offset,sizeX + 2 * offset,50,{render:{visible:false}, isStatic: true,restitution: 0.3 });
  bottomEntry.collisionFilter.group = 0;
  bottomEntry.collisionFilter.category = 0x04;
  bottomEntry.collisionFilter.mask = 0x03; // Dont collide with particles    

  Matter.Composite.add(entry,bottomEntry);

  Engine.run(engine);

  Matter.Events.on(engine, 'collisionStart', function(e) {
    var pairs = e.pairs;

    // change object colours to show those starting a collision
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if (pair.bodyA.speed > speedSound || pair.bodyB.speed > speedSound) {
          var hoursNow = new Date().getHours();
          if (hoursNow >= 10 && hoursNow < 22) {
            if (new Date().getTime() - lastSound > SOUND_INTERVAL) {
              sounds[Math.floor(Math.random() * sounds.length)].play();
              lastSound = new Date().getTime();
            }
          }
        }
    }
  });


  // Position normalized from 0 to 1, speed in px/sec, spin in rad/s
  // 
  var clipRange = function(value,min,max)
  {
    if(value >= min && value <= max)
        return value;
    else if(value < min)
        return min;
    else
        return max;
  }

  var randomIntFromInterval = function(min,max)
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  
  var addEmoji = function(userId,xPosNorm,xSpeed,ySpeed,spin,spriteIndex,floodProtect){

    var now = new Date();

    if(floodProtect && userId in lastAdd && (now.getTime()-lastAdd[userId].getTime() < floodTimeoutAdd))
      return;

    lastAdd[userId] = now;      

    xPosNorm = clipRange(xPosNorm,0,1);
    xSpeed = clipRange(xSpeed,-30,30);
    ySpeed = clipRange(ySpeed,-30,30);
    spin = clipRange(spin,-0.5,0.5);
    spriteIndex = clipRange(parseInt(spriteIndex),0,emojisTextures.length-1);

    var sizeMultiplier = Common.random(minSizeMult10,maxSizeMult10)/10; 
    var radius = sizeMultiplier*baseSize/2;

    var posX = (sizeX-2*offset-(baseSize*sizeMultiplier)/ 2) *xPosNorm + offset + (baseSize*sizeMultiplier)/ 2; // (sizeX-2*offset)/2-baseSize*sizeMultiplier;
    var posY = sizeY + offset; //baseSize*sizeMultiplier*2-offset;

    var emoji = Bodies.circle(
      posX,
      posY,
      radius,
      {
        density: Common.random(2,10)/10000,//  0.0005,
        frictionAir: 0.003, 
        restitution: 0.85,
        friction: 0.003,
        render: {
          sprite: {
            texture: emojisTextures[spriteIndex],
            xScale:baseSize/textureSize*sizeMultiplier,
            yScale:baseSize/textureSize*sizeMultiplier
          }
        }
    });

    Matter.Body.setVelocity(emoji,
        { x : xSpeed*speedScale,
          y : ySpeed*speedScale  });      

    Matter.Body.setAngularVelocity(emoji,spin*spinScale);
    
    emoji.collisionFilter.group = 0;
    emoji.collisionFilter.category = 0x02;
    emoji.collisionFilter.mask = 0x03; // Collide with other emojis and walls  

    window.setTimeout(function(){
      emoji.collisionFilter.mask = 0x0F; // Collide with everything   
    },50);


    console.log("[addEmoji] Pos: ["+posX+":"+posY+"] Speed: ["+(xSpeed*speedScale)+":"+(ySpeed*speedScale)+"] Spin: "+spin*spinScale); 

    Matter.Composite.add(emojis,emoji);

  };

  window.setInterval(function(){

    if(((new Date()).getTime()-lastInteraction.getTime()) > autoEmojiTimeout*1000)
    {
      var speedXrand = (Math.random()*40-20);
      speedXrand += speedXrand < 0 ? -10:10;

      var speedYrand = -(Math.random()*20+1);
      speedYrand += speedYrand < 0 ? -10:10;

      addEmoji(
        0,
        Math.random(),
        speedXrand,
        speedYrand,
        Math.random()-0.5,
        randomIntFromInterval(0,90),
        false);

    }
    // Matter.Common.choose(emojisTextures[spriteIndex]);

  },autoEmojiInterval);


  /*
   * Particles cleanup
   */
  window.setInterval(function(){
    
    var bodies = Composite.allBodies(emojis);

    for (var i = bodies.length-1; i >= 0; i--)
    {
      if(bodies.length > maxEmojis)
      {        
        var fade = 1-((bodies.length - maxEmojis)*1/randomIntFromInterval(decreaseFactorMin,decreaseFactorMax));

        Matter.Body.scale(bodies[i], fade, fade);
        bodies[i].render.sprite.xScale *= fade;
        bodies[i].render.sprite.yScale *= fade;

       // console.log(bodies[i].area);

        if(bodies[i].area < minSizeBeforeDispose)
        {
          Matter.Composite.remove(emojis,bodies[i]);

          for(var j=0;j<10;j++)
          {
            var fragment = Bodies.circle(
              bodies[i].position.x,
              bodies[i].position.y,
              10,
              {
                density: 0.1,
                frictionAir: 0,
                restitution: 1,
                friction: 0,
                render:{
                  fillStyle:'white',
                  strokeStyle:'white',
                  lineWidth:0
                },
                collisionFilter:{
                  group:0,
                  category:0x04,
                  mask:0x06
                }
            });

            Matter.Body.setVelocity(fragment, {x:Common.random(-20,20),y:Common.random(-20,20)});      
            
            Matter.Composite.add(fragments,fragment);
          }

          var hoursNow = new Date().getHours();
          if (hoursNow >= 18 && hoursNow < 22) {
            if (new Date().getTime() - lastSound > SOUND_INTERVAL) {
              pop.play();
              lastSound = new Date().getTime();
            }
          }
        }
      }
    }    

    var bodies = Composite.allBodies(fragments);

    for (var i = bodies.length-1; i >= 0; i--)
    {
      if(bodies[i].position.x < 0 || bodies[i].position.x > sizeX || bodies[i].position.y < 0 || bodies[i].position.y > sizeY )
        Matter.Composite.remove(fragments,bodies[i]);
    }

  },cleanupInterval);

  /*
   * Websocket stuff
   */
  function onOpen(connection) {
    console.log("Connection with server opened");

    connection.sendMessage({
      type: 'hello',
      data: {
        game: 'emoji-bin'
      }
    });
  };

  function onMessage(connection, parsedMessage) {

    if (parsedMessage.type == "addEmoji") {
      lastInteraction = new Date();
      addEmoji(
        parsedMessage.data.userId,
        parsedMessage.data.xPos,
        parsedMessage.data.xSpeed/12,
        parsedMessage.data.ySpeed/12,
        parsedMessage.data.spin,
        parsedMessage.data.spriteIndex,
        true);
    }
  };  

  var connection = new WebsocketConnection(
    'jebediah.pimp-my-wall.ch',
    8000, {
      open: onOpen,
      close: function() {},
      message: onMessage
    }, {
      autoConnect: true,
      autoReconnect: true
    }
  );

  var playNowBanner = null;
  var playNowText = null;
  function showPlayNow() {
    console.log('play now');
    if (!playNowBanner) {
      playNowBanner = $('<div>').css({
        background: 'linear-gradient(to bottom, rgba(252, 206, 2, 0.7), rgba(255, 164, 0, 0.7) 100%)',
        height: '0px',
        width: '100%',
        zIndex: 20,
        opacity: 1,
        position: 'fixed',
        transition: 'height 0.2s ease-out',
        bottom: '26%',
        left: 0,
        overflow: 'hidden'
      });
      var txt = 'Starten Sie jetzt mit diesem Spiel! Klicken Sie einfach auf: www.pmwapp.ch mit Ihrem Smartphone. &mdash; Jouez avec cette oeuvre maintenant! Connectez-vous avec votre smartphone sur www.pmwapp.ch!';
      playNowText = $('<div>');
      playNowText.html(txt);
      playNowText.css({
        position: 'absolute',
        left: '100%',
        width: '100%',
        whiteSpace: 'nowrap',
        color: 'white',
        fontSize: '50px',
        lineHeight: '100px',
        fontFamily: 'sans-serif',
        'font-smooth': 'auto',
        '-webkit-font-smoothing' : 'auto'
      });
      playNowBanner.append(playNowText);
      $("body").append(playNowBanner);
    }
    setTimeout(function () {
      playNowBanner.css({
        height: '100px'
      });
      playNowText.animate({
        left: '-500%'
      }, 30000, 'linear', function () {
        playNowBanner.css({
          height: '0px'
        })
        playNowText.css({
          left: '100%'
        })
      })
    }, 100)
  };

  showPlayNow();

  var playNowInterval = setInterval(showPlayNow, 1 * 40 * 1000);

});

