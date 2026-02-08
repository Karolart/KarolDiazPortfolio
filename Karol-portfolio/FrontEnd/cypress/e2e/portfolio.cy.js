describe('Portfolio – Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('renders the main call to action', () => {
    cy.get('[data-cy="intro-explore"]').click()
  })
})
