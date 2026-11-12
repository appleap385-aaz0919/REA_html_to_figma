print((await figma.listAvailableFontsAsync()).filter(f=>/Noto|Nanum|Pretendard|Malgun|Inter/.test(f.fontName.family)).filter(f=>/Regular|Bold/.test(f.fontName.style)).map(f=>f.fontName));
