const { test, expect } = require('@playwright/test')

test('deve logar como administrador', async ({ page }) => {

    await page.goto('https://qas.central-brf.com.br/login');

    await page.getByPlaceholder("e-mail").fill('terezinha.075@uorak.com');
    await page.getByPlaceholder("Senha").fill('Central@24');
    await page.locator('button:has-text("Entrar")').click();

    const loginUser = page.locator('.menu-trigger-p.slds-text-align_right.slds-truncate.slds-text-title_bold.lwc-5uc1gleli5');
    await expect(loginUser).toHaveText("TEREZINHA DE JESUS MENDES GAMA");
})

test('não deve logar, sem o e-mail preenchido', async ({ page }) => {

    await page.goto('https://qas.central-brf.com.br/login');

    await page.getByPlaceholder("e-mail").fill('');
    await page.getByPlaceholder("Senha").fill('Central@24');
    await page.locator('button:has-text("Entrar")').click();
    
    const loginUser = page.locator('.slds-card__body.slds-card__body_inner');
    await expect(loginUser).toHaveText('Preencha o e-mail. Esqueci a minha senhaEntrarNão tem conta? Cadastre-se');

})

test('não deve logar, sem a senha preenchida preenchido', async ({ page }) => {

    await page.goto('https://qas.central-brf.com.br/login');

    await page.getByPlaceholder("e-mail").fill('terezinha.075@uorak.com');
    await page.getByPlaceholder("Senha").fill('');
    await page.locator('button:has-text("Entrar")').click();
    
    const loginUser = page.locator('.slds-card__body.slds-card__body_inner');
    await expect(loginUser).toContainText('Preencha a senha.');

})

test('não deve logar, Falha no login. Verifique suas credenciais.', async ({ page }) => {

    await page.goto('https://qas.central-brf.com.br/login');

    await page.getByPlaceholder("e-mail").fill('leandroabudjacob@hotmail.com');
    await page.getByPlaceholder("Senha").fill('pwd123');
    await page.locator('button:has-text("Entrar")').click();
    
    const loginUser = page.locator('.slds-text-color_error');
    await expect(loginUser).toContainText('Falha no login. Verifique suas credenciais.');

})

test('deve buscar um produto pelo nome', async ({ page }) => {

    await page.goto('https://qas.central-brf.com.br/login');

    await page.getByPlaceholder("e-mail").fill('terezinha.075@uorak.com');
    await page.getByPlaceholder("Senha").fill('Central@24');
    await page.locator('button:has-text("Entrar")').click();

    const loginUser = page.locator('.menu-trigger-p.slds-text-align_right.slds-truncate.slds-text-title_bold.lwc-5uc1gleli5');
    await expect(loginUser).toHaveText("TEREZINHA DE JESUS MENDES GAMA");
    
    await page.goto('https://qas.central-brf.com.br/global-search/Coxas%20e%20Sobrecoxas%20de%20Frango');


    const produtoTexto = "Coxas e Sobrecoxas de Frango com osso e pele Sadia Caixa 15Kg -Caixa c/1";
    const produto = page.locator(`text="${produtoTexto}"`);
    await produto.click();
});

test('deve adicionar um produto ao carrinho', async ({ page }) => {

    await page.goto('https://qas.central-brf.com.br/login')

    await page.getByPlaceholder("e-mail").fill('terezinha.075@uorak.com')
    await page.getByPlaceholder("Senha").fill('Central@24')
    await page.locator('button:has-text("Entrar")').click()

    const loginUser = page.locator('.menu-trigger-p.slds-text-align_right.slds-truncate.slds-text-title_bold.lwc-5uc1gleli5')
    await expect(loginUser).toHaveText("TEREZINHA DE JESUS MENDES GAMA")
    
    await page.goto('https://qas.central-brf.com.br/global-search/Coxas%20e%20Sobrecoxas%20de%20Frango')


    const produtoTexto = "Coxas e Sobrecoxas de Frango com osso e pele Sadia Caixa 15Kg -Caixa c/1"
    const produto = page.locator(`text="${produtoTexto}"`)
    await produto.click()

    const btnAdicionarCarrinho = page.locator('button:has-text("Adicionar ao carrinho")')
    await btnAdicionarCarrinho.click()

    const toast = page.locator('.toast-container')
    await expect(toast).toContainText('Adicionado ao carrinho', { timeout: 10000 })
})

test('deve exibir o produto no carrinho após adicioná-lo', async ({ page }) => {

    await page.goto('https://qas.central-brf.com.br/login')

    await page.getByPlaceholder("e-mail").fill('terezinha.075@uorak.com')
    await page.getByPlaceholder("Senha").fill('Central@24')
    await page.locator('button:has-text("Entrar")').click()

    const loginUser = page.locator('.menu-trigger-p.slds-text-align_right.slds-truncate.slds-text-title_bold.lwc-5uc1gleli5')
    await expect(loginUser).toHaveText("TEREZINHA DE JESUS MENDES GAMA")

    await page.goto('https://qas.central-brf.com.br/global-search/Coxas%20e%20Sobrecoxas%20de%20Frango')

    const produtoTexto = "Coxas e Sobrecoxas de Frango com osso e pele Sadia Caixa 15Kg -Caixa c/1"
    await page.locator(`text="${produtoTexto}"`).click()

    const btnAdicionarCarrinho = page.locator('button:has-text("Adicionar ao carrinho")')
    await btnAdicionarCarrinho.click()

    const toast = page.locator('.toast-container')
    await expect(toast).toContainText('Adicionado ao carrinho', { timeout: 10000 })

    const verCarrinhoBtn = page.locator('button[aria-label="Ver Carrinho"]')
    await verCarrinhoBtn.click()

    await expect(page).toHaveURL(/.*\/cart/)

    const itemCarrinho = page.locator(`text="${produtoTexto}"`)
    await expect(itemCarrinho).toBeVisible()
});











