import { Route,Routes,useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header,Footer } from './components/Layout';
import CartDrawer from './components/Cart';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import { CartPage,Checkout,Collections,NotFound,Wishlist } from './pages/OtherPages';
import { useStore } from './state/Store';
export default function App(){const{toast}=useStore();const location=useLocation();useEffect(()=>{document.title=`${location.pathname==='/'?'Made for your moments':location.pathname.split('/')[1].replace(/^./,s=>s.toUpperCase())} — SHRISHTI`;},[location]);return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main"><Routes><Route path="/" element={<Home/>}/>{['/shop','/jewellery','/clothing','/category/:slug'].map(path=><Route key={path} path={path} element={<Catalogue/>}/>)}<Route path="/product/:slug" element={<ProductDetail/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/wishlist" element={<Wishlist/>}/><Route path="/collections" element={<Collections/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/><CartDrawer/><div className={`toast ${toast?'visible':''}`} role="status" aria-live="polite">{toast}</div></>;}
