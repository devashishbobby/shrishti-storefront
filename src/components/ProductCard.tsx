import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Heart, Plus } from 'lucide-react';
import type { Product } from '../data/products';
import { money } from '../data/products';
import { useStore } from '../state/Store';
export function Photo({src,alt,className='',eager=false}:{src:string;alt:string;className?:string;eager?:boolean}){return <img className={className} src={src} alt={alt} loading={eager?'eager':'lazy'} onError={e=>{if(!e.currentTarget.src.endsWith('/assets/fallback.svg'))e.currentTarget.src='/assets/fallback.svg';}}/>;}
export default function ProductCard({product:p}:{product:Product}){
 const {wishlist,toggleWish,add}=useStore();const[added,setAdded]=useState(false);
 return <article className="product-card"><div className="product-image"><Link to={`/product/${p.slug}`} aria-label={`View ${p.title}`}><Photo src={p.images[0]} alt={p.title}/></Link>{p.originalPrice&&<span className="product-badge">DEMO EDIT</span>}<button className={`wish-button ${wishlist.includes(p.id)?'saved':''}`} aria-label={`${wishlist.includes(p.id)?'Remove':'Save'} ${p.title} ${wishlist.includes(p.id)?'from':'to'} wishlist`} aria-pressed={wishlist.includes(p.id)} onClick={()=>toggleWish(p.id)}><Heart size={18} fill={wishlist.includes(p.id)?'currentColor':'none'}/></button><div className="quick-add">{p.sizes?<Link to={`/product/${p.slug}`}>Choose size <ArrowUpRight size={16}/></Link>:<button disabled={!p.stock} onClick={()=>{if(add(p.id)){setAdded(true);setTimeout(()=>setAdded(false),1600);}}}>{added?<Check size={16}/>:<Plus size={16}/>} {p.stock?(added?'Added to bag':'Quick add'):'Unavailable'}</button>}</div></div><div className="product-copy"><span className="eyebrow small">{p.category}</span><Link to={`/product/${p.slug}`}><h3>{p.title}</h3></Link><div className="price">{money(p.price)}{p.originalPrice&&<del>{money(p.originalPrice)}</del>}</div></div></article>;
}
