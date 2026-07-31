const catalogImages = slug => [
  {label:'Histología delimitada',src:`catalog/${slug}-histologia-delimitada.jpg`},
  {label:'Histología original',src:`catalog/${slug}-histologia-original.png`},
  {label:'Radiografía delimitada',src:`catalog/${slug}-radiografia-delimitada.jpg`},
  {label:'Radiografía original',src:`catalog/${slug}-radiografia-original.png`}
];

const lesions = [
  {name:'Ameloblastoma convencional',type:'tumor',group:'Tumor odontogénico epitelial',slug:'ameloblastoma-convencional',text:'Comparación histológica y radiográfica del patrón convencional.'},
  {name:'Ameloblastoma uniquístico',type:'tumor',group:'Tumor odontogénico epitelial',slug:'ameloblastoma-uniquistico',text:'Serie de imágenes del patrón uniquístico y su delimitación diagnóstica.'},
  {name:'Ameloblastoma periférico',type:'tumor',group:'Tumor odontogénico epitelial',slug:'ameloblastoma-periferico',text:'Correlación visual de la variante periférica.'},
  {name:'Ameloblastoma metastásico',type:'tumor',group:'Tumor odontogénico epitelial',slug:'ameloblastoma-metastasico',text:'Imágenes histológicas y radiográficas asociadas al diagnóstico.'},
  {name:'Ameloblastoma adenoide',type:'tumor',group:'Tumor odontogénico epitelial',slug:'ameloblastoma-adenoide',text:'Comparación de campos histológicos y radiográficos del patrón adenoide.'},
  {name:'Tumor odontogénico adenomatoide',type:'tumor',group:'Tumor odontogénico epitelial',slug:'tumor-odontogenico-adenomatoide',text:'Serie radiográfica e histológica del tumor odontogénico adenomatoide.'},
  {name:'Tumor odontogénico epitelial calcificante',type:'tumor',group:'Tumor odontogénico epitelial',slug:'tumor-odontogenico-epitelial-calcificante',text:'Imágenes originales y delimitadas para correlación diagnóstica.'},
  {name:'Tumor odontogénico escamoso',type:'tumor',group:'Tumor odontogénico epitelial',slug:'tumor-odontogenico-escamoso',text:'Correlación histológica y radiográfica del tumor odontogénico escamoso.'},
  {name:'Tumor odontogénico primordial',type:'tumor',group:'Tumor odontogénico',slug:'tumor-primordial',text:'Serie de apoyo visual del tumor odontogénico primordial.'},
  {name:'Tumor odontogénico de células fantasmas',type:'tumor',group:'Tumor odontogénico epitelial',slug:'tumor-celulas-fantasmas',text:'Campos con delimitación de los componentes relevantes para su estudio.'},
  {name:'Fibroma ameloblástico',type:'tumor',group:'Tumor odontogénico mixto',slug:'fibroma-ameloblastico',text:'Imágenes histológicas y radiográficas del fibroma ameloblástico.'},
  {name:'Fibroma odontogénico',type:'tumor',group:'Tumor odontogénico mesenquimatoso',slug:'fibroma-odontogenico',text:'Comparación visual del fibroma odontogénico.'},
  {name:'Fibroma cemento-osificante',type:'tumor',group:'Lesión fibro-ósea',slug:'fibroma-cemento-osificante',text:'Serie histológica y radiográfica del fibroma cemento-osificante.'},
  {name:'Mixoma odontogénico',type:'tumor',group:'Tumor odontogénico mesenquimatoso',slug:'mixoma',text:'Correlación de la matriz mixoide con su presentación radiográfica.'},
  {name:'Cementoblastoma',type:'tumor',group:'Tumor odontogénico mesenquimatoso',slug:'cementoblastoma',text:'Imágenes delimitadas y originales asociadas al cementoblastoma.'},
  {name:'Odontoma',type:'tumor',group:'Tumor odontogénico mixto',slug:'odontoma',text:'Serie histológica y radiográfica para el estudio del odontoma.'},
  {name:'Quiste odontogénico',type:'quiste',group:'Quiste odontogénico',image:'quiste.jpg',text:'Cavidad patológica revestida por epitelio odontogénico.'},
  {name:'Quiste gingival',type:'quiste',group:'Quiste odontogénico',image:'quiste-gingival.jpg',text:'Pequeño quiste de tejidos blandos derivado de restos de la lámina dental.'}
].map(item => ({...item,images:item.slug ? catalogImages(item.slug) : [{label:'Imagen disponible',src:item.image}]}));

const cards = document.querySelector('#cards');
const dialog = document.querySelector('#detail');
const detailBody = document.querySelector('#detailBody');

function render(filter='todos',query='') {
  const q = query.toLocaleLowerCase('es');
  const rows = lesions.filter(item => (filter === 'todos' || item.type === filter) && (!q || item.name.toLocaleLowerCase('es').includes(q) || item.group.toLocaleLowerCase('es').includes(q)));
  cards.innerHTML = rows.map(item => `<article class="card"><img src="${item.images[0].src}" alt="${item.name}"><div><small>${item.group.toUpperCase()}</small><h3>${item.name}</h3><p>${item.text}</p><button data-name="${item.name}">Ver ${item.images.length} imágenes →</button></div></article>`).join('') || '<p>No se encontraron coincidencias.</p>';
}

render();
document.querySelectorAll('.filters button').forEach(button => { button.onclick = () => { document.querySelectorAll('.filters button').forEach(item => item.classList.remove('active')); button.classList.add('active'); render(button.dataset.filter,document.querySelector('#query').value); }; });
document.querySelector('#searchForm').onsubmit = event => { event.preventDefault(); document.querySelector('#atlas').scrollIntoView(); render('todos',document.querySelector('#query').value); };
cards.onclick = event => {
  const name = event.target.dataset.name;
  if (!name) return;
  const item = lesions.find(lesion => lesion.name === name);
  const gallery = item.images.map(image => `<figure><img src="${image.src}" alt="${item.name}: ${image.label}"><figcaption>${image.label}</figcaption></figure>`).join('');
  detailBody.innerHTML = `<div class="detail-copy"><p class="eyebrow">GALERÍA HISTOLÓGICA Y RADIOGRÁFICA</p><h2>${item.name}</h2><p><strong>${item.group}</strong></p><p>${item.text}</p></div><div class="diagnostic-gallery">${gallery}</div>`;
  dialog.showModal();
};
document.querySelector('.close').onclick = () => dialog.close();
dialog.onclick = event => { if (event.target === dialog) dialog.close(); };
