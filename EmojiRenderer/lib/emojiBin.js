$("document").ready(function() {

  var maxEmojis = 30;
  var decreaseFactor = 1/2000;
  var minSizeBeforeDispose = 100;

  var baseSize = 32;
  var textureSize = 160;

  var autoEmojiTimeout = 10;
  var autoEmojiInterval = 2000;
  var cleanupInterval = 60;

  var speedScale = 1;
  var spinScale = 1;

  var floodDelay = 300;
  var lastInteraction = new Date();
  var lastAdd = new Date();

  var sizeX = $(window).width();
  var sizeY = $(window).height();

  console.log("Creating a "+sizeX+" x "+sizeY+" simulation");

  var $worldSelector = $("#world");

  $worldSelector.css({
    width:sizeX,
    height:sizeY
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
  var emojis = Matter.Composite.create();
  var fragments = Matter.Composite.create();

  World.add(world, boundaries);
  World.add(world, emojis);
  World.add(world, fragments);

  var bodies = [Bodies.rectangle(sizeX/2, -offset, sizeX + 2 * offset, 50, { render:{visible:false}, isStatic: true,restitution: 0.3 }),
    Bodies.rectangle(sizeX/2, sizeY + offset, sizeX + 2 * offset, 50, { render:{visible:false}, isStatic: true,restitution: 0.3 }),
    Bodies.rectangle(sizeX + offset, sizeY/2, 50, sizeY + 2 * offset, { render:{visible:false}, isStatic: true,restitution: 0.3 }),
    Bodies.rectangle(-offset, sizeY/2, 50, sizeY + 2 * offset, { render:{visible:false}, isStatic: true,restitution: 0.3 })];

  for(var k=0;k<bodies.length;k++)
  {
    bodies[k].collisionFilter.group = 0;
    bodies[k].collisionFilter.category = 0x01;
    bodies[k].collisionFilter.mask = 0x03; // Dont collide with particles    

    Matter.Composite.add(boundaries,bodies[k]);
  }

  Engine.run(engine);

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
  
  var addEmoji = function(xPosNorm,xSpeed,ySpeed,spin,spriteIndex,floodProtection){

    if(floodProtection && ((new Date()).getTime() - lastAdd.getTime()) < floodDelay )
      return;

    lastAdd = new Date();

    xPosNorm = clipRange(xPosNorm,0,1);
    xSpeed = clipRange(xSpeed,-15,15);
    ySpeed = clipRange(ySpeed,-15,15);
    spin = clipRange(spin,-0.5,0.5);
    spriteIndex = clipRange(parseInt(spriteIndex),0,emojisTextures.length-1);

    var sizeMultiplier = Common.random(30,40)/10; 
    var radius = sizeMultiplier*baseSize/2;

    var posX = sizeX*xPosNorm + offset + (baseSize*sizeMultiplier)/ 2; // (sizeX-2*offset)/2-baseSize*sizeMultiplier;
    var posY = sizeY - offset - (baseSize*sizeMultiplier) / 2; //baseSize*sizeMultiplier*2-offset;

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
    emoji.collisionFilter.mask = 0x07; // Collie with everything   

    console.log("[addEmoji] Pos: ["+posX+":"+posY+"] Speed: ["+(xSpeed*speedScale)+":"+(ySpeed*speedScale)+"] Spin: "+spin*spinScale); 

    Matter.Composite.add(emojis,emoji);
  };

  window.setInterval(function(){

    if(((new Date()).getTime()-lastInteraction.getTime()) > autoEmojiTimeout*1000)
    {
      addEmoji(
        Math.random(),
        Math.random()*100-50,
        Math.random()*50+10,
        Math.random()-0.5,
        randomIntFromInterval(0,emojisTextures.length-1),
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
        var fade = 1-((bodies.length - maxEmojis)*decreaseFactor);

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
              1,
              {
                density: 0.1,
                frictionAir: 0,
                restitution: 1,
                friction: 0,
                render:{
                  fillStyle:'black',
                  strokeStyle:'black',
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
        parsedMessage.data.xPos,
        parsedMessage.data.xSpeed,
        parsedMessage.data.ySpeed,
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

});

