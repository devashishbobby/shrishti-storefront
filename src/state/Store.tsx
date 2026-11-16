import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { products } from '../data/products';
export interface CartLine {id:string;size:string;color:string;quantity:number;}
const key=(l:Pick<CartLine,'id'|'size'|'color'>)=>`${l.id}:${l.size}:${l.color}`;
function readCart():CartLine[]{
 try{const raw:unknown=JSON.parse(localStorage.getItem('shrishti-cart')||'[]');if(!Array.isArray(raw))return[];
 const valid:CartLine[]=[];for(const item of raw){if(!item||typeof item!=='object')continue;const p=products.find(p=>p.id===item.id);if(!p||!p.stock||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>99||typeof item.size!=='string'||typeof item.color!=='string')continue;if(p.sizes&&!p.sizes.includes(item.size))continue;if(p.colors&&!p.colors.includes(item.color))continue;const match=valid.find(l=>key(l)===key(item));if(match)match.quantity=Math.min(99,match.quantity+item.quantity);else valid.push({id:item.id,size:item.size,color:item.color,quantity:item.quantity});}return valid;
 }catch{return[];}
}
function readWishlist():string[]{try{const raw:unknown=JSON.parse(localStorage.getItem('shrishti-wishlist')||'[]');return Array.isArray(raw)?[...new Set(raw.filter((id):id is string=>typeof id==='string'&&products.some(p=>p.id===id)))]:[];}catch{return[];}}
interface Store {cart:CartLine[];wishlist:string[];cartOpen:boolean;setCartOpen:(open:boolean)=>void;add:(id:string,size?:string,color?:string,quantity?:number)=>boolean;change:(line:CartLine,delta:number)=>void;remove:(line:CartLine)=>void;toggleWish:(id:string)=>void;count:number;subtotal:number;toast:string;notify:(message:string)=>void;clear:()=>void;}
const Context=createContext<Store|null>(null);
export function StoreProvider({children}:{children:ReactNode}){
 const [cart,setCart]=useState<CartLine[]>(readCart);const [wishlist,setWishlist]=useState<string[]>(readWishlist);const[cartOpen,setCartOpen]=useState(false);const[toast,setToast]=useState('');
 useEffect(()=>{try{localStorage.setItem('shrishti-cart',JSON.stringify(cart));}catch{/* Storage unavailable: session continues. */}},[cart]);
 useEffect(()=>{try{localStorage.setItem('shrishti-wishlist',JSON.stringify(wishlist));}catch{/* Storage unavailable: session continues. */}},[wishlist]);
 useEffect(()=>{if(toast){const timer=setTimeout(()=>setToast(''),2800);return()=>clearTimeout(timer);}},[toast]);
 function add(id:string,size='',color='',quantity=1){const p=products.find(p=>p.id===id);if(!p||!p.stock)return false;if(p.sizes&&!p.sizes.includes(size))return false;if(p.colors&&!p.colors.includes(color))return false;const line={id,size,color,quantity:Math.max(1,Math.min(99,quantity))};setCart(prev=>{const exists=prev.find(l=>key(l)===key(line));return exists?prev.map(l=>key(l)===key(line)?{...l,quantity:Math.min(99,l.quantity+line.quantity)}:l):[...prev,line];});setToast('A little lovely, added to your bag');return true;}
 return <Context.Provider value={{cart,wishlist,cartOpen,setCartOpen,add,change:(line,delta)=>setCart(prev=>prev.map(l=>key(l)===key(line)?{...l,quantity:Math.max(1,Math.min(99,l.quantity+delta))}:l)),remove:line=>setCart(prev=>prev.filter(l=>key(l)!==key(line))),toggleWish:id=>setWishlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]),count:cart.reduce((n,l)=>n+l.quantity,0),subtotal:cart.reduce((n,l)=>n+(products.find(p=>p.id===l.id)?.price||0)*l.quantity,0),toast,notify:setToast,clear:()=>setCart([])}}>{children}</Context.Provider>;
}
export const useStore=()=>{const value=useContext(Context);if(!value)throw new Error('Store provider missing');return value;};
