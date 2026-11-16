import {test,expect} from '@playwright/test';

test('mobile cart, variant separation, buy now, focus trap and reduced motion',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/product/embroidered-kurta-set');
 await page.getByRole('button',{name:'M',exact:true}).click();
 await page.getByRole('button',{name:'Sage',exact:true}).click();
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'tests/screenshots/product-mobile.png',fullPage:true,animations:'disabled'});
 await page.getByRole('button',{name:'Add to bag',exact:true}).click();
 const dialog=page.getByRole('dialog');
 await expect(dialog).toContainText('Size M · Sage');
 const bounds=await dialog.boundingBox();expect(bounds.x).toBe(0);expect(bounds.width).toBe(390);
 await dialog.getByLabel('Increase quantity').click();
 await expect(dialog.locator('.summary-line')).toContainText('₹6,980');
 await page.screenshot({path:'tests/screenshots/cart-mobile.png',animations:'disabled'});
 await page.keyboard.press('Tab');
 expect(await dialog.evaluate(el=>el.contains(document.activeElement))).toBeTruthy();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('button',{name:'Add to bag',exact:true})).toBeFocused();
 await page.getByRole('button',{name:'L',exact:true}).click();
 await page.getByRole('button',{name:'Buy now · Demo'}).click();
 await expect(page).toHaveURL('/checkout');
 await expect(page.locator('.checkout-summary .summary-line')).toHaveCount(3);
 await page.goto('/cart');
 await expect(page.locator('.cart-item')).toHaveCount(2);
 await page.reload();await expect(page.locator('.cart-item')).toHaveCount(2);
 await page.getByRole('button',{name:'Search products',exact:true}).click();
 await page.getByLabel('Search catalogue').fill('no-such-piece');
 await expect(page.getByText('No pieces found. Try “gold”, “cotton”, or “bridal”.')).toBeVisible();
 await page.keyboard.press('Escape');
 await page.goto('/unknown-page');await expect(page.getByRole('heading',{name:'Something lovely is elsewhere.'})).toBeVisible();
});

test('image fallback and invalid variant recovery',async({page})=>{
 await page.route('**/assets/necklace.jpg',route=>route.abort());
 await page.goto('/product/ruby-palakka-necklace');
 await expect(page.locator('.gallery-main img')).toHaveAttribute('src','/assets/fallback.svg');
 await page.evaluate(()=>localStorage.setItem('shrishti-cart',JSON.stringify([
 {id:'nonexistent',size:'',color:'',quantity:1},
 {id:'p8',size:'XXL',color:'Rose',quantity:1},
 {id:'p1',size:'',color:'',quantity:-1},
 {id:'p1',size:'',color:'',quantity:1},
 {id:'p1',size:'',color:'',quantity:2}
 ])));
 await page.reload();await page.getByRole('button',{name:'Open shopping bag (3)'}).click();
 await expect(page.getByRole('dialog').locator('.cart-item')).toHaveCount(1);
 await expect(page.getByRole('dialog').locator('.summary-line')).toContainText('₹7,470');
});
