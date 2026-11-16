export interface Product { id: string; slug: string; title: string; category: string; type: 'Jewellery'|'Clothing'; price: number; originalPrice?: number; description: string; tags: string[]; images: string[]; stock: boolean; sizes?: string[]; colors?: string[]; material: string; }
export const categories = [
 {name:'Jewellery',slug:'jewellery',image:'necklace'}, {name:'Bridal Sets',slug:'bridal-sets',image:'bridal'},
 {name:'Earrings',slug:'earrings',image:'earrings'}, {name:'Necklaces',slug:'necklaces',image:'temple'},
 {name:'Bangles',slug:'bangles',image:'bangles'}, {name:'Sarees',slug:'sarees',image:'saree'},
 {name:'Kurtas',slug:'kurtas',image:'kurta'}, {name:'Festive Wear',slug:'festive-wear',image:'festive'}
];
const entries: [string,string,number,string,string[]][] = [
 ['Ruby Palakka Necklace','Necklaces',2490,'necklace',['ruby','temple','festive']],
 ['Temple Jhumka Earrings','Earrings',1290,'earrings',['temple','gold','classic']],
 ['Rose Banarasi Silk Saree','Sarees',5990,'saree',['pink','silk','festive']],
 ['Bridal Kundan Set','Bridal Sets',7490,'temple',['bridal','kundan','wedding']],
 ['Kemp Heritage Bangles','Bangles',1890,'bangles',['ruby','gold','temple']],
 ['Coin Onam Necklace','Necklaces',2790,'temple',['onam','temple','gold']],
 ['Pearl Drop Earrings','Earrings',990,'jewels',['pearl','minimal']],
 ['Embroidered Kurta Set','Kurtas',3490,'kurta',['embroidered','cotton','festive']],
 ['Crimson Festive Silk Saree','Sarees',6490,'hero',['red','silk','bridal']],
 ['Antique Lakshmi Haar','Necklaces',3990,'necklace',['temple','antique','gold']],
 ['Chandbali Pearl Earrings','Earrings',1590,'earrings',['pearl','bridal']],
 ['Gulabi Cotton Kurta','Kurtas',1990,'kurta',['cotton','pink','everyday']],
 ['Royal Temple Bridal Set','Bridal Sets',8990,'temple',['temple','bridal','wedding']],
 ['Meenakari Bangle Pair','Bangles',2290,'bangles',['festive','green','gold']],
 ['Ivory Chanderi Saree','Sarees',4590,'saree',['ivory','silk','festive']],
 ['Marigold Occasion Set','Festive Wear',4990,'festive',['yellow','festive','occasion']],
 ['Everyday Gold Hoops','Earrings',790,'jewels',['minimal','everyday']],
 ['Lotus Pendant Necklace','Necklaces',1690,'necklace',['lotus','gold','everyday']],
 ['Heritage Silk Kurta','Kurtas',2990,'kurta',['silk','classic']],
 ['Emerald Bridal Ensemble','Festive Wear',7990,'bridal',['green','bridal','wedding']],
 ['Floral Cuff Bangles','Bangles',1490,'bangles',['floral','gold','classic']],
 ['Sundari Kundan Bridal Set','Bridal Sets',6990,'necklace',['kundan','bridal','pearl']],
 ['Sage Cotton Blend Kurta','Kurtas',1790,'kurta',['green','cotton','everyday']],
 ['Aarohi Festive Ensemble','Festive Wear',5490,'festive',['festive','red','occasion']]
];
export const slugify = (value:string) => value.toLowerCase().replace(/[^a-z0-9]+/g,'-');
export const products: Product[] = entries.map(([title,category,price,image,tags],i)=>{
 const clothing=['Sarees','Kurtas','Festive Wear'].includes(category);
 return {id:`p${i+1}`,slug:slugify(title),title,category,type:clothing?'Clothing':'Jewellery',price,
 ...(i===0||i===2?{originalPrice:price+700}:{}),
 description:clothing?'Soft textures, thoughtful details, and a little celebration in every fold. An effortless piece for moments you will remember.':'An ode to time-honoured artistry. Delicate details and a warm golden finish bring a little everyday ceremony to your collection.',
 tags,images:[`/assets/${image}.${image === 'kurta' || image === 'bangles' ? 'svg' : 'jpg'}`,`/assets/${image}-detail.${image === 'kurta' || image === 'bangles' ? 'svg' : 'jpg'}`],stock:i!==20,
 ...(clothing?{sizes:['S','M','L','XL'],colors:category==='Kurtas'?['Rose','Sage']:['As pictured']}:{}),
 material:clothing?'Demo: silk-look or cotton-blend textile; dry clean recommended.':'Demo: gold-tone plated alloy with imitation stones; keep away from water.'};
});
export const money=(value:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);

