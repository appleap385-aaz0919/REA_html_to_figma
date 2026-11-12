from pathlib import Path
from html import escape
import json, textwrap
root=Path(__file__).resolve().parent
out=[]
def rect(x,y,w,h,fill="#ffffff",stroke="#dbe0e6",r=0):
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>')
def text(x,y,value,size=16,fill="#253348",weight=400):
    out.append(f'<text x="{x}" y="{y}" font-family="Noto Sans KR, sans-serif" font-size="{size}" font-weight="{weight}" fill="{fill}">{escape(str(value))}</text>')
def lines(x,y,values,size=16,gap=25,fill="#253348",weight=400):
    for i,v in enumerate(values):text(x,y+i*gap,v,size,fill,weight)
def field(x,y,w,label,disabled=False):
    rect(x,y,w,32,"#f3f4f6" if disabled else "#fff",r=4)
    text(x+10,y+21,label,12,"#8390a0" if disabled else "#35465b")
    text(x+w-17,y+21,"⌄",13,"#8290a0")
def check(x,y,label):
    rect(x,y,12,12,"#0875d1","#0875d1",2);text(x+2,y+10,"✓",10,"#fff")
    text(x+18,y+11,label,12)
def cue(x,y,n):
    out.append(f'<circle cx="{x}" cy="{y}" r="15" fill="#ed263a" stroke="white" stroke-width="3"/>')
    text(x,y+5,f"{n:02}",12,"white",700)
    out[-1]=out[-1].replace('<text ', '<text text-anchor="middle" ')
out.append('<svg xmlns="http://www.w3.org/2000/svg" width="2300" height="1580" viewBox="0 0 2300 1580">')
rect(0,0,2300,1580,"#fff","#fff")
rect(40,32,2220,70,"#f2f3f5","#f2f3f5")
text(60,62,"화면 ID   MST_ITM_01",16,weight=700)
text(370,62,"메뉴   문항 관리  /  전체 문항",16,weight=700)
text(60,87,"화면명   전체 문항 목록 · 기본 조회",16)
text(1650,62,"작성일   2026.11.11",15)
text(1900,62,"Ver   0.1",15)
text(2080,62,"검토용 시안",15,weight=700)
text(48,145,"전체 문항",28,weight=700)
text(250,144,"기본 조회 상태",16,"#6e7c8d")
text(1580,145,"화면 설명 · 동작 및 정책",25,weight=700)
# App screen
X,Y,W,H=48,175,1490,1040
rect(X,Y,W,H,"#f8f9fb","#b9c8d8")
rect(X,Y,211,H,"#0870cb","#0870cb")
text(X+15,Y+33,"문제은행 마스터 CMS",18,"#fff",700)
menus=[("홈",95),("문항 관리",135),("전체 문항",175),("HML 문항 등록",212),("디피니션 문항 등록",249),("쌍둥이 그룹 관리",286),("평가지 관리",342),("문항 출처 관리",388),("랩",434)]
for label,dy in menus:
    if label=="전체 문항":rect(X+9,Y+dy-23,193,34,"#fff","#fff",5)
    text(X+26 if dy<160 or dy>300 else X+43,Y+dy,label,15,"#0870cb" if label=="전체 문항" else "#e3f1ff",500)
rect(X+212,Y,W-212,49,"#fff","#fff")
rect(X+212,Y+49,W-212,3,"#0870cb","#0870cb")
text(X+228,Y+30,"마스터",14,"#0870cb",700)
text(X+1115,Y+30,"접속자 jaehyuk.myung",12)
rect(X+1360,Y+10,112,30,"#0870cb","#0870cb",3);text(X+1375,Y+30,"로그아웃",13,"#fff")
text(X+228,Y+78,"시스템 관리  ›  문항 관리  ›  전체 문항",12,"#667388")
text(X+228,Y+107,"전체 문항",21,weight=700)
# Tree
tx,ty=X+228,Y+127
rect(tx,ty,286,884,r=5)
field(tx+14,ty+17,75,"22");field(tx+95,ty+17,84,"학교급 선택");field(tx+185,ty+17,87,"과목군 선택")
check(tx+27,ty+72,"전체")
# Search
cx,cy=X+528,Y+127
rect(cx,cy,31,32,r=4);text(cx+10,cy+22,"«",17)
text(cx+42,cy+22,"선택한 단원 내에서 검색됩니다.",13,"#0870cb")
fy=cy+45;rect(cx,fy,944,164,r=5)
field(cx+14,fy+16,96,"문항 ID")
rect(cx+117,fy+16,190,32,r=4);text(cx+127,fy+37,"문항 ID / 지문 ID / 지문 / 문제",11,"#8a96a6")
field(cx+315,fy+16,117,"난이도 전체")
field(cx+440,fy+16,125,"생성 방식 전체")
field(cx+573,fy+16,110,"형태1 전체")
field(cx+691,fy+16,110,"형태2 전체",True)
field(cx+809,fy+16,119,"형태3 전체",True)
text(cx+16,fy+76,"등록일",12)
rect(cx+70,fy+55,165,32,r=4);text(cx+81,fy+76,"시작일 ~ 종료일",12,"#8a96a6")
for i,l in enumerate(["7일","30일","90일","전체"]):
    rect(cx+243+i*43,fy+55,43,32,"#f0f7ff" if i==3 else "#fff")
    text(cx+253+i*43,fy+76,l,12,"#0870cb" if i==3 else "#344455")
text(cx+435,fy+76,"배포",12)
for xx,l in [(477,"전체"),(536,"배포됨"),(610,"미배포")]:check(cx+xx,fy+64,l)
field(cx+730,fy+55,198,"배포 대상 전체",True)
text(cx+16,fy+131,"상태",12)
for xx,l in [(56,"전체"),(114,"초안"),(173,"실패(재등록)"),(288,"승인(사용)"),(387,"승인(미사용)"),(498,"폐기")]:check(cx+xx,fy+119,l)
rect(cx+776,fy+108,72,32,r=4);text(cx+790,fy+129,"초기화",12)
rect(cx+856,fy+108,72,32,"#0870cb","#0870cb",4);text(cx+876,fy+129,"조회",12,"#fff",600)
# Table
ly=fy+182;field(cx,ly,108,"10개씩 보기")
text(cx+120,ly+21,"검색결과 · 35,566건",12,"#6b7788")
tabley=ly+42
rect(cx,tabley,944,552,r=4)
widths=[74,229,112,101,105,52,51,75,40,105]
heads=["문항 ID","문제","출처","단원","형태","난이도","쌍둥이","상태","배포","등록자·등록일"]
pos=[cx]
for w in widths:pos.append(pos[-1]+w)
rect(cx,tabley,944,32,"#f0f3f6")
for i,h in enumerate(heads):text(pos[i]+8,tabley+21,h,11,"#66758a")
ids=["2089392","2089391","2089390","2089389","2089387","2089385","2089384","2089383","2089382","2089386"]
for i,id in enumerate(ids):
    yy=tabley+32+i*52
    rect(cx,yy,944,52,"#fff","#e3e7ec")
    status="폐기" if i<5 else "초안" if i<9 else "승인(사용)"
    text(cx+8,yy+21,id,12)
    if i<4 or 5<=i<9:text(cx+8,yy+39,"지문 ID …",10,"#6e7d90")
    text(pos[1]+8,yy+24,"문항 내용 및 수식 미리보기 …",12,"#0875d1")
    text(pos[2]+8,yy+24,"22-H-MA-…",11)
    lines(pos[3]+8,yy+20,["행렬의 뜻","하위 단원"],11,17)
    lines(pos[4]+8,yy+20,["주관식-단답형","일반형"],11,17)
    text(pos[5]+15,yy+26,"하",12)
    text(pos[6]+12,yy+26,"0개",12,"#0875d1")
    text(pos[7]+8,yy+26,status,11)
    text(pos[8]+14,yy+26,"-",12)
    lines(pos[9]+6,yy+20,["jaehyuk.myung","2026-11-10"],10,17)
text(cx,tabley+576,"총 35,566건 중 1∼10 표시",12,"#6b7788")
for i,label in enumerate(["«","‹","1","2","3","4","5","›","»"]):
    rect(cx+340+i*34,tabley+558,31,30,"#0870cb" if i==2 else "#fff",r=3)
    text(cx+350+i*34,tabley+579,label,12,"#fff" if i==2 else "#0870cb")
# cues
for n,x,y in [(1,X+13,Y+139),(2,tx+3,ty+4),(3,cx+1,cy+1),(4,cx+7,fy+4),(5,cx+318,fy+3),(6,cx+576,fy+4),(7,cx+2,fy+53),(8,cx+435,fy+52),(9,cx+4,fy+103),(10,cx+1,ly+1),(11,cx+1,tabley+34),(12,cx+330,tabley+558)]:cue(x,y,n)
# Notes
notes=[
("업무 메뉴","문항 관리에서 전체 문항으로 진입합니다. 현재 메뉴를 선택 상태로 표시합니다. HML·디피니션 등록, 쌍둥이 그룹 관리는 별도 화면입니다."),
("분류와 단원 범위","교육과정·학교급·과목군을 선택하고 단원 트리에서 검색 범위를 정합니다. 안내 문구는 ‘선택한 단원 내에서 검색됩니다.’입니다."),
("단원 패널 접기","접기 버튼으로 단원 패널의 표시 영역을 조절합니다. 화면의 검색 조건과 목록을 함께 볼 때 사용합니다."),
("키워드 검색","문항 ID·지문 ID·지문·문제·출처코드·등록자 ID·원본 파일명 중 검색 기준을 선택하고 키워드를 입력합니다."),
("난이도·생성 방식","난이도는 최상·상·중·하·최하로 조회합니다. 생성 방식은 HML 변환·디피니션·AI생성·복제를 제공합니다."),
("문항 형태의 연동","형태1은 객관식·주관식·서술형입니다. 초기에는 형태2·형태3이 비활성입니다. 상위 형태에 따라 하위 선택지를 갱신합니다."),
("등록일 조건","기간 입력과 7일·30일·90일·전체 단축 버튼을 제공합니다. 기본 조회 화면은 전체 기간을 표시합니다."),
("배포 조건","전체·배포됨·미배포를 선택합니다. 배포 대상 선택은 현재 조건에 따라 활성 상태가 달라집니다. 배포 상태와 문항 상태는 별개입니다."),
("상태 및 조회","초안·실패(재등록)·승인(사용)·승인(미사용)·폐기로 조회합니다. ‘조회’로 조건을 적용하고 ‘초기화’로 필터를 초기화합니다."),
("건수·표시 개수","페이지당 10·30·50·100개 표시 옵션을 제공합니다. 검색 건수와 표시 구간은 현재 조건의 조회 결과로 갱신합니다."),
("문항 행과 상세 이동","문제 링크를 누르면 해당 문항 상세로 이동합니다. 세트 문항은 문항 ID와 지문 ID를 함께 표시합니다. 검색 조건·페이지 정보를 상세 이동에 전달합니다."),
("페이지 이동","숫자 및 맨 앞·이전·다음·맨 뒤 버튼으로 이동합니다. 현재 페이지를 구분하며 목록 아래에 전체 건수와 표시 구간을 보여줍니다.")
]
ny=175
rect(1580,ny,672,42,"#202832","#202832")
text(1600,ny+28,"No.",16,"#fff",700);text(1660,ny+28,"Description",17,"#fff",700)
ny+=42
for i,(title,body) in enumerate(notes):
    wrapped=textwrap.wrap(body,width=34)
    hh=38+len(wrapped)*24+17
    rect(1580,ny,672,hh,"#fff","#d3d9e1")
    rect(1580,ny,62,hh,"#f5f6f8","#d3d9e1")
    text(1598,ny+30,f"{i+1:02}",17,weight=700)
    text(1660,ny+28,title,18,weight=700)
    lines(1660,ny+54,wrapped,16,24)
    ny+=hh
# Footer below UI
text(48,1265,"표시·해석 정책",23,weight=700)
lines(48,1303,[
"• 화면은 실제 CMS의 배치와 컨트롤을 기준으로 재현했습니다. 문항 행은 검토용 예시로 축약했습니다.",
"• 문항 상태는 초안 R / 실패 F / 승인(사용) Y / 승인(미사용) N / 폐기 D입니다.",
"• 쌍둥이 개수, 지문 ID, 배포 정보는 서로 다른 관계 정보입니다. 상태만으로 관계를 판단하지 않습니다.",
"• 상세·수정·세트·쌍둥이 팝업은 후속 화면설계서에서 각각 작성합니다."
],17,30)
text(48,1455,"확인 근거   개발 CMS 화면 · 전체 문항 목록 · 2026.11.11 확인",14,"#6b7788")
text(48,1482,"경로   /item/all/list.donga?unitCurriculum=22",14,"#6b7788")
text(48,1532,"MST_ITM_01   ·   Master CMS 화면설계서   ·   1차 검토",14,"#6b7788")
out.append("</svg>")
out[0]=f'<svg xmlns="http://www.w3.org/2000/svg" width="2300" height="{max(ny+60,1580)}" viewBox="0 0 2300 {max(ny+60,1580)}">'
out[1]=out[1].replace('height="1580"', f'height="{max(ny+60,1580)}"')
(root/"MST_ITM_01.svg").write_text("\n".join(out),encoding="utf-8")
(root/"MST_ITM_01-spec.json").write_text(json.dumps({"screenId":"MST_ITM_01","page":"01 문항 관리","section":"MST_ITM_01 전체 문항 목록","notes":notes,"rowData":"축약 예시","source":"cms-knowledge/master-cms/evidence/3476-storyboard-all-items-reference-top.json"},ensure_ascii=False,indent=2),encoding="utf-8")
print(root/"MST_ITM_01.svg")

