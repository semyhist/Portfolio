from PIL import Image
import os

pub = 'public'
white = Image.open(pub + '/logowhitetrans.png').convert('RGBA')
print('Loaded:', white.size)

def make_on_black(size):
    bg = Image.new('RGBA', (size, size), (0, 0, 0, 255))
    icon = white.resize((size, size), Image.LANCZOS)
    bg.paste(icon, (0, 0), icon)
    return bg

make_on_black(32).convert('RGB').save(pub+'/favicon-32x32.png')
make_on_black(16).convert('RGB').save(pub+'/favicon-16x16.png')
make_on_black(180).convert('RGB').save(pub+'/apple-touch-icon.png')
make_on_black(192).convert('RGB').save(pub+'/android-chrome-192x192.png')
make_on_black(512).convert('RGB').save(pub+'/android-chrome-512x512.png')
make_on_black(150).convert('RGB').save(pub+'/mstile-150x150.png')

ico16 = make_on_black(16).convert('RGB')
ico32 = make_on_black(32).convert('RGB')
ico48 = make_on_black(48).convert('RGB')
ico16.save(pub+'/favicon.ico', format='ICO', append_images=[ico32, ico48])

og = Image.new('RGB', (1200, 630), (0, 0, 0))
sz = 380
icon = white.resize((sz, sz), Image.LANCZOS)
og.paste(icon, ((1200-sz)//2, (630-sz)//2), icon)
os.makedirs(pub+'/images', exist_ok=True)
og.save(pub+'/images/og-image.png')

print('ALL DONE')
for f in ['favicon.ico','apple-touch-icon.png','favicon-32x32.png','favicon-16x16.png','android-chrome-192x192.png','android-chrome-512x512.png','mstile-150x150.png','images/og-image.png']:
    p = pub+'/'+f
    size = os.path.getsize(p) if os.path.exists(p) else 'MISSING'
    print(f, '->', size)
