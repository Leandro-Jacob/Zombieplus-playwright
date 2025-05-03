const { test, expect } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('(1)deve poder cadastrar um novo filme', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isloggedIn()
    await page.movies.create('Nome do filme', 'Sinopse do filme', 'Netflix', '1980')
})

test('(2)deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create

    await login.visit()
    await login.submit('admin@zombieplus.com', 'pwd123')
    await login.isloggedIn()

    await movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await expect(page.locator('.toast')).toHaveText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')
})

test('(3)deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create
    await executeSQL("DELETE from movies WHERE title = '${movie.title}';")

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isloggedIn()

    await page.movies.create(movie)
    await page.toast.containText('Cadastro realizado com sucesso!')
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isloggedIn()

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])

})
