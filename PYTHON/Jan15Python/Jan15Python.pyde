def setup():
    size(640, 380)

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
    
