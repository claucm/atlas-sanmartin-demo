const lesions=[
{name:'Ameloblastoma convencional',type:'tumor',group:'Tumor odontogénico epitelial',image:'Ameloblastoma_Convencional.jpg',text:'Lesión odontogénica caracterizada por islotes y cordones de epitelio ameloblástico en un estroma fibroso.'},
{name:'Mixoma odontogénico',type:'tumor',group:'Tumor ectomesenquimatoso',image:'Mixoma.jpg',text:'Células fusiformes y estrelladas distribuidas en un estroma mixoide abundante.'},
{name:'Cementoblastoma',type:'tumor',group:'Tumor mesenquimatoso',image:'Cementoblastoma.jpg',text:'Neoplasia benigna formadora de cemento asociada a la raíz dental.'},
{name:'Fibroma cemento-osificante',type:'tumor',group:'Lesión fibro-ósea',image:'Fibroma_Cemento_Osificante.jpg',text:'Proliferación fibrosa bien delimitada con material mineralizado variable.'},
{name:'Quiste odontogénico',type:'quiste',group:'Quiste odontogénico',image:'quiste.jpg',text:'Cavidad patológica revestida por epitelio odontogénico.'},
{name:'Quiste gingival',type:'quiste',group:'Quiste odontogénico',image:'quiste-gingival.jpg',text:'Pequeño quiste de tejidos blandos derivado de restos de la lámina dental.'}
];
const cards=document.querySelector('#cards'),dialog=document.querySelector('#detail'),body=document.querySelector('#detailBody');
function render(filter='todos',query=''){const q=query.toLowerCase();const rows=lesions.filter(x=>(filter==='todos'||x.type===filter)&&(!q||x.name.toLowerCase().includes(q)||x.group.toLowerCase().includes(q)));cards.innerHTML=rows.map((x,i)=>`<article class="card"><img src="${x.image}" alt="${x.name}"><div><small>${x.group.toUpperCase()}</small><h3>${x.name}</h3><p>${x.text}</p><button data-name="${x.name}">Ver ficha →</button></div></article>`).join('')||'<p>No se encontraron coincidencias.</p>';}
render();
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter,document.querySelector('#query').value)});
document.querySelector('#searchForm').onsubmit=e=>{e.preventDefault();document.querySelector('#atlas').scrollIntoView();render('todos',document.querySelector('#query').value)};
cards.onclick=e=>{const name=e.target.dataset.name;if(!name)return;const x=lesions.find(v=>v.name===name);body.innerHTML=`<img class="detail-image" src="${x.image}" alt="${x.name}"><div class="detail-copy"><p class="eyebrow">FICHA HISTOPATOLÓGICA</p><h2>${x.name}</h2><p><strong>${x.group}</strong></p><p>${x.text}</p><p>Esta ficha forma parte de la demostración estática temporal. La versión WordPress incluirá contenido académico ampliado, galerías y gestión editorial.</p></div>`;dialog.showModal()};
document.querySelector('.close').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog)dialog.close()};
