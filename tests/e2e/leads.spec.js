const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker')

test("deve cadastrar um lead na fila de espera", async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.HaveText(message)
});

test("não deve cadastrar quando o e-mail já existe", async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Leandro Teste', 'leandro@teste.com.br')

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.HaveText(message)
});

test("não deve cadastrar quando o e-mail já existe (VIA API)", async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.HaveText(message)
  
});

test("não deve cadastrar com email incorreto", async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Leandro teste', 'leandro.com.br')
  await page.landing.alertHaveText('Email incorreto');
});

test("não deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'leandro@teste.com.br')
  await page.landing.alertHaveText("Campo obrigatório")
});

test("não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'leandro@teste.com.br')
  await page.landing.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhum campo é preenchido", async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')
  await page.landing.alertHaveText(["Campo obrigatório", "Campo obrigatório",]);
});
