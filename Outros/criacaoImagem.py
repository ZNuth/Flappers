from PIL import Image
import random, PIL

WIDTH, HEIGHT = 518, 1520 

img = Image.new("RGBA", (WIDTH, HEIGHT))
datas = img.getdata()
newData = []

Ymax = random.randint(52,147)
Xmax = random.randint(WIDTH / 2, WIDTH - 56)

NextYmax = Ymax + random.randint(62,171)
NextXmax = random.randint(Xmax - 79, Xmax + 42)
if NextXmax >= WIDTH or NextXmax == Xmax:
    NextXmax -= random.randint(11, 27)

ultimoX = Xmax


for y in range(HEIGHT):  # Y Representa a Altura 
    x = 0

    while x < WIDTH:
        color = (0,0,0,0)
        x += 1

        if x < Xmax and y < Ymax:
            if Xmax > NextXmax:
                if x <= ultimoX:
                    color = (25,170,10,255) # VERDE
                    ultimoX -= Ymax / NextYmax

            elif Xmax < NextXmax:
                if x < ultimoX:
                    color = (25,10,100,255) # AZUL ESCURO
                    ultimoX += NextYmax / Ymax
        
        if y == Ymax:
            ultimoX = Xmax

        if y >= Ymax:
            if y == NextYmax:
                Ymax = y + random.randint(52,147)
                Xmax = NextXmax

                NextYmax = Ymax + random.randint(92,173)
                NextXmax = random.randint(Xmax - 93, Xmax + 72)
                if NextXmax >= WIDTH or NextXmax == Xmax:
                    NextXmax -= random.randint(21, 43)

                ultimoX = Xmax

            else:
                if x <= NextXmax:
                    if NextXmax < Xmax:
                        if x <= ultimoX:
                            color = (255,170,10,255) # AMARELO
                            ultimoX += NextYmax / Ymax

                    elif NextXmax > Xmax:
                        if x <= ultimoX:
                            color = (255,0,0,255) # Vermelho
                            ultimoX -= (Ymax / NextYmax) - 0.65



                
        newData.append(color)

img.putdata(newData)
imgRot = img.rotate(90, PIL.Image.NEAREST, expand = 1)
img.save("cenarioTeste.png", "PNG")
imgRot.save("cenarioTesteRot.png", "PNG")