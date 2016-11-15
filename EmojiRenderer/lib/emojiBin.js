$("document").ready(function() {
var emojisTextures = [
"images/Emoji%20Smiley/Emoji%20Smiley-01.png",
"images/Emoji%20Smiley/Emoji%20Smiley-02.png",
"images/Emoji%20Smiley/Emoji%20Smiley-03.png",
"images/Emoji%20Smiley/Emoji%20Smiley-04.png",
"images/Emoji%20Smiley/Emoji%20Smiley-05.png",
"images/Emoji%20Smiley/Emoji%20Smiley-06.png",
"images/Emoji%20Smiley/Emoji%20Smiley-07.png",
"images/Emoji%20Smiley/Emoji%20Smiley-08.png",
"images/Emoji%20Smiley/Emoji%20Smiley-09.png",
"images/Emoji%20Smiley/Emoji%20Smiley-10.png",
"images/Emoji%20Smiley/Emoji%20Smiley-11.png",
"images/Emoji%20Smiley/Emoji%20Smiley-12.png",
"images/Emoji%20Smiley/Emoji%20Smiley-13.png",
"images/Emoji%20Smiley/Emoji%20Smiley-14.png",
"images/Emoji%20Smiley/Emoji%20Smiley-15.png",
"images/Emoji%20Smiley/Emoji%20Smiley-16.png",
"images/Emoji%20Smiley/Emoji%20Smiley-17.png",
"images/Emoji%20Smiley/Emoji%20Smiley-18.png",
"images/Emoji%20Smiley/Emoji%20Smiley-19.png",
"images/Emoji%20Smiley/Emoji%20Smiley-20.png",
"images/Emoji%20Smiley/Emoji%20Smiley-21.png",
"images/Emoji%20Smiley/Emoji%20Smiley-22.png",
"images/Emoji%20Smiley/Emoji%20Smiley-23.png",
"images/Emoji%20Smiley/Emoji%20Smiley-24.png",
"images/Emoji%20Smiley/Emoji%20Smiley-25.png",
"images/Emoji%20Smiley/Emoji%20Smiley-26.png",
"images/Emoji%20Smiley/Emoji%20Smiley-27.png",
"images/Emoji%20Smiley/Emoji%20Smiley-28.png",
"images/Emoji%20Smiley/Emoji%20Smiley-29.png",
"images/Emoji%20Smiley/Emoji%20Smiley-30.png",
"images/Emoji%20Smiley/Emoji%20Smiley-31.png",
"images/Emoji%20Smiley/Emoji%20Smiley-32.png",
"images/Emoji%20Smiley/Emoji%20Smiley-33.png",
"images/Emoji%20Smiley/Emoji%20Smiley-34.png",
"images/Emoji%20Smiley/Emoji%20Smiley-35.png",
"images/Emoji%20Smiley/Emoji%20Smiley-36.png",
"images/Emoji%20Smiley/Emoji%20Smiley-37.png",
"images/Emoji%20Smiley/Emoji%20Smiley-38.png",
"images/Emoji%20Smiley/Emoji%20Smiley-39.png",
"images/Emoji%20Smiley/Emoji%20Smiley-40.png",
"images/Emoji%20Smiley/Emoji%20Smiley-41.png",
"images/Emoji%20Smiley/Emoji%20Smiley-42.png",
"images/Emoji%20Smiley/Emoji%20Smiley-43.png",
"images/Emoji%20Smiley/Emoji%20Smiley-44.png",
"images/Emoji%20Smiley/Emoji%20Smiley-45.png",
"images/Emoji%20Smiley/Emoji%20Smiley-46.png",
"images/Emoji%20Smiley/Emoji%20Smiley-47.png",
"images/Emoji%20Smiley/Emoji%20Smiley-48.png",
"images/Emoji%20Smiley/Emoji%20Smiley-49.png",
"images/Emoji%20Smiley/Emoji%20Smiley-50.png",
"images/Emoji%20Smiley/Emoji%20Smiley-51.png",
"images/Emoji%20Smiley/Emoji%20Smiley-52.png",
"images/Emoji%20Smiley/Emoji%20Smiley-53.png",
"images/Emoji%20Smiley/Emoji%20Smiley-54.png",
"images/Emoji%20Smiley/Emoji%20Smiley-55.png",
"images/Emoji%20Smiley/Emoji%20Smiley-56.png",
"images/Emoji%20Smiley/Emoji%20Smiley-57.png",
"images/Emoji%20Smiley/Emoji%20Smiley-58.png",
"images/Emoji%20Smiley/Emoji%20Smiley-59.png",
"images/Emoji%20Smiley/Emoji%20Smiley-60.png",
"images/Emoji%20Smiley/Emoji%20Smiley-61.png",
"images/Emoji%20Smiley/Emoji%20Smiley-62.png",
"images/Emoji%20Smiley/Emoji%20Smiley-63.png",
"images/Emoji%20Smiley/Emoji%20Smiley-64.png",
"images/Emoji%20Smiley/Emoji%20Smiley-65.png",
"images/Emoji%20Smiley/Emoji%20Smiley-66.png",
"images/Emoji%20Smiley/Emoji%20Smiley-67.png",
"images/Emoji%20Smiley/Emoji%20Smiley-68.png",
"images/Emoji%20Smiley/Emoji%20Smiley-69.png",
"images/Emoji%20Smiley/Emoji%20Smiley-70.png",
"images/Emoji%20Smiley/Emoji%20Smiley-71.png",
"images/Emoji%20Smiley/Emoji%20Smiley-72.png",
"images/Emoji%20Smiley/Emoji%20Smiley-73.png",
"images/Emoji%20Smiley/Emoji%20Smiley-74.png",
"images/Emoji%20Smiley/Emoji%20Smiley-75.png",
"images/Emoji%20Smiley/Emoji%20Smiley-76.png",
"images/Emoji%20Smiley/Emoji%20Smiley-77.png",
"images/Emoji%20Smiley/Emoji%20Smiley-78.png",
"images/Emoji%20Smiley/Emoji%20Smiley-79.png",
"images/Emoji%20Smiley/Emoji%20Smiley-80.png",
"images/Emoji%20Smiley/Emoji%20Smiley-81.png",
"images/Emoji%20Smiley/Emoji%20Smiley-82.png",
"images/Emoji%20Smiley/Emoji%20Smiley-83.png",
"images/Emoji%20Smiley/Emoji%20Smiley-84.png",
"images/Emoji%20Smiley/Emoji%20Smiley-85.png",
"images/Emoji%20Smiley/Emoji%20Smiley-86.png",
"images/Emoji%20Smiley/Emoji%20Smiley-87.png",
"images/Emoji%20Smiley/Emoji%20Smiley-88.png",
"images/Emoji%20Smiley/Emoji%20Smiley-89.png",
"images/Emoji%20Smiley/Emoji%20Smiley-90.png",
"images/Emoji%20Smiley/Emoji%20Smiley-91.png",
"images/Emoji%20Smiley/Emoji%20Smiley-92.png",
"images/Emoji%20Smiley/Emoji%20Smiley-93.png",
"images/Emoji%20Smiley/Emoji%20Smiley-94.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-95.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-96.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-97.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-98.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-99.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-100.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-101.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-102.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-103.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-104.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-105.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-106.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-107.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-108.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-109.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-110.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-111.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-112.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-113.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-114.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-115.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-116.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-117.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-118.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-119.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-120.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-121.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-122.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-123.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-124.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-125.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-126.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-127.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-128.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-129.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-130.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-131.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-132.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-133.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-134.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-135.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-136.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-137.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-138.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-139.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-140.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-141.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-142.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-143.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-144.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-145.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-146.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-147.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-148.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-149.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-150.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-151.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-152.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-153.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-154.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-155.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-156.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-157.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-158.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-159.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-160.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-161.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-162.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-163.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-164.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-165.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-166.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-167.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-168.png",
// "images/Emoji%20Smiley/Emoji%20Smiley-169.png",
"images/Emoji%20Smiley/Emoji%20Smiley-170.png",
"images/Emoji%20Smiley/Emoji%20Smiley-171.png",
"images/Emoji%20Smiley/Emoji%20Smiley-172.png",
"images/Emoji%20Smiley/Emoji%20Smiley-173.png",
"images/Emoji%20Smiley/Emoji%20Smiley-174.png",
"images/Emoji%20Smiley/Emoji%20Smiley-175.png",
"images/Emoji%20Smiley/Emoji%20Smiley-176.png",
"images/Emoji%20Smiley/Emoji%20Smiley-177.png"
// 
];

  var maxEmojis = 30;
  var decreaseFactor = 1/2000;
  var minSizeBeforeDispose = 100;

  var baseSize = 24;
  var textureSize = 160;

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
    bodies[k].collisionFilter.category = 0b0001;
    bodies[k].collisionFilter.mask = 0b0011; // Dont collide with particles    

    Matter.Composite.add(boundaries,bodies[k]);
  }

  Engine.run(engine);

  window.setInterval(function(){


    var sizeMultiplier = Common.random(20,30)/10; 
    var radius = sizeMultiplier*baseSize/2;

    var posX = (sizeX-2*offset)/2-baseSize*sizeMultiplier;
    var posY = sizeY-baseSize*sizeMultiplier*2-offset;

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
            texture: Matter.Common.choose(emojisTextures),
            xScale:baseSize/textureSize*sizeMultiplier,
            yScale:baseSize/textureSize*sizeMultiplier
          }
        }
    });

    Matter.Body.setVelocity(emoji, {x:Common.random(-6,6),y:Common.random(-5,-15)});      
    Matter.Body.setAngularVelocity(emoji, Common.random(-10,10)/40);
    
    emoji.collisionFilter.group = 0;
    emoji.collisionFilter.category = 0b0010;
    emoji.collisionFilter.mask = 0b0111; // Collie with everything    

    Matter.Composite.add(emojis,emoji);

  },300);


  window.setInterval(function(){
    
    var bodies = Composite.allBodies(emojis);

    console.log(bodies.length);

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
                  fillStyle:'white',
                  strokeStyle:'white',
                  lineWidth:0
                },
                collisionFilter:{
                  group:0,
                  category:0b0100,
                  mask:0b0110
                }
            });

            Matter.Body.setVelocity(fragment, {x:Common.random(-20,20),y:Common.random(-20,20)});      
            
            Matter.Composite.add(fragments,fragment);
          }
        }
      }
    }    


    var bodies = Composite.allBodies(fragments);

    console.log(bodies.length);

    for (var i = bodies.length-1; i >= 0; i--)
    {
      if(bodies[i].position.x < 0 || bodies[i].position.x > sizeX || bodies[i].position.y < 0 || bodies[i].position.y > sizeY )
        Matter.Composite.remove(fragments,bodies[i]);
    }

  },200);

});

