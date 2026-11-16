import {test,expect} from '@playwright/test';

test('complete shopping flow, variants, totals, persistence, wishlist, checkout',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('heading',{level:1})).toContainText('Every Celebration');
 await page.getByRole('link',{name:'Shop Jewellery',exact:true}).click();
 await expect(page.locator('.result-count')).toHaveText('14 lovely finds');
 await page.getByLabel('Sort products').selectOption('low');
 await expect(page.locator('.product-card h3').first()).toHaveText('Everyday Gold Hoops');
 await page.getByLabel('Search this collection').fill('ruby');
 await expect(page.locator('.product-card')).toHaveCount(2);
 await page.getByLabel('Search this collection').fill('nonsense-empty');
 await expect(page.getByRole('heading',{name:'No finds just yet.'})).toBeVisible();
 await page.getByRole('button',{name:'Clear search & filters'}).click();
 await page.getByLabel('Save Ruby Palakka Necklace to wishlist').click();
 await page.getByRole('link',{name:'View Ruby Palakka Necklace'}).click();
 await page.getByRole('button',{name:'Show product image 2'}).click();
 await expect(page.getByRole('button',{name:'Show product image 2'})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Add to bag',exact:true}).click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 await dialog.getByLabel('Increase quantity').click();
 await expect(dialog.locator('.summary-line')).toContainText('₹4,980');
 await dialog.getByLabel('Decrease quantity').click();
 await expect(dialog.getByLabel('Decrease quantity')).toBeDisabled();
 await page.keyboard.press('Escape');
 await page.reload();
 await page.getByRole('button',{name:'Open shopping bag (1)'}).click();
 await expect(dialog.locator('.cart-item')).toHaveCount(1);
 await page.keyboard.press('Escape');
 await page.goto('/product/embroidered-kurta-set');
 await page.getByRole('button',{name:'Add to bag',exact:true}).click();
 await expect(page.getByRole('alert')).toHaveText('Choose your size to continue.');
 await page.getByRole('button',{name:'M',exact:true}).click();
 await page.getByRole('button',{name:'Add to bag',exact:true}).click();
 await expect(dialog).toContainText('Size M');
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Add to bag',exact:true}).click();
 await expect(dialog.locator('.cart-item')).toHaveCount(2);
 await expect(dialog.locator('.summary-line')).toContainText('₹9,470');
 await dialog.getByRole('link',{name:'Demo checkout'}).click();
 await expect(page.getByText('Just a preview. No real payment or order.')).toBeVisible();
 await page.getByRole('button',{name:'Continue to demo review'}).click();
 await page.getByRole('button',{name:'Complete demo · No payment'}).click();
 await expect(page.getByText('No order was placed, no payment was taken,',{exact:false})).toBeVisible();
 await page.goto('/wishlist');await expect(page.locator('.product-card')).toHaveCount(1);
 await page.reload();await expect(page.locator('.product-card')).toHaveCount(1);
 await page.getByLabel('Remove Ruby Palakka Necklace from wishlist').click();
 await expect(page.getByRole('heading',{name:'A wishlist waiting to happen'})).toBeVisible();
});

test('filters, category routes, quick add, remove, search, newsletter and invalid storage',async({page})=>{
 await page.goto('/shop');await page.getByRole('checkbox',{name:/Necklaces/}).click();await expect(page.locator('.product-card')).toHaveCount(4);
 await page.getByLabel('Under ₹2,000',{exact:true}).check();await expect(page.locator('.product-card')).toHaveCount(1);
 await page.getByRole('button',{name:'Clear all',exact:true}).click();await expect(page.locator('.product-card')).toHaveCount(24);
 await page.locator('.product-card').first().getByRole('button',{name:'Quick add'}).click();
 await page.getByRole('button',{name:'Open shopping bag (1)'}).click();await page.getByRole('dialog').getByLabel('Remove Ruby Palakka Necklace from bag').click();
 await expect(page.getByRole('dialog').getByRole('heading',{name:'Your next favourite awaits'})).toBeVisible();await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Search products',exact:true}).click();await page.getByLabel('Search catalogue').fill('cotton');await expect(page.getByRole('dialog').locator('.product-card')).toHaveCount(3);
 await page.keyboard.press('Escape');
 for(const slug of ['bridal-sets','earrings','necklaces','bangles','sarees','kurtas','festive-wear']){await page.goto(`/category/${slug}`);expect(await page.locator('.product-card').count()).toBeGreaterThan(0);}
 await page.getByLabel('Email address').fill('demo@example.test');await page.getByLabel('Subscribe to demo newsletter').click();await expect(page.getByText('Thank you! Demo only — you have not been subscribed.')).toBeVisible();
 await page.evaluate(()=>{localStorage.setItem('shrishti-cart','{"broken":true}');localStorage.setItem('shrishti-wishlist','invalid-json');});await page.reload();await page.goto('/cart');await expect(page.getByRole('heading',{name:'A little room for something lovely'})).toBeVisible();
});

for(const width of [360,375,390,430,768,1024,1440])test(`responsive ${width}px, images, navigation and no overflow`,async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width,height:900});
 for(const route of ['/','/shop','/clothing','/product/embroidered-kurta-set','/cart','/wishlist','/collections','/checkout']){
 await page.goto(route);await page.locator('footer').scrollIntoViewIfNeeded();await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));await page.evaluate(()=>Promise.all([...document.images].map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.onload=resolve;img.onerror=resolve;}))));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`overflow at ${route}`).toBeTruthy();
 expect(await page.locator('img').evaluateAll(imgs=>imgs.every(img=>img.naturalWidth>0)),`images at ${route}`).toBeTruthy();
 }
 if(width<700){await page.goto('/');await page.getByLabel('Open navigation menu').click();await page.getByRole('dialog').getByRole('link',{name:'Clothing',exact:true}).click();await expect(page).toHaveURL(/clothing/);await page.getByRole('button',{name:'Filters',exact:true}).click();await page.getByRole('dialog').getByRole('checkbox',{name:/Kurtas/}).click();await page.getByRole('button',{name:'Show 4 pieces'}).click();await expect(page.locator('.product-card')).toHaveCount(4);}
 expect(errors).toEqual([]);
 await page.goto('/');await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`tests/screenshots/home-${width}.png`,fullPage:true,animations:'disabled'});
});

