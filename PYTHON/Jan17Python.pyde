def setup():
    size(640, 380)
    noStroke()

def draw():
    if  mouseX > 300:
        background(190,80,190)
        
    else: 
        background(255,0,10)
    
    if  mousePressed:
        fill(0)
    else:
        fill(255)
    ellipse(mouseX, mouseY, 80, 80)
    
    x = mouseX
    y = mouseY
    ix = width - mouseX   
    iy = height - mouseY   

    fill(255, 150)
    ellipse(x, height/3, y, y)
    fill(0, 170)
    ellipse(ix, height/2, iy, iy)
