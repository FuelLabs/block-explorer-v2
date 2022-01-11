/// <reference types="Cypress" />

import { Transaction, Provider, TransactionType, InputType } from '@fuel-ts/fuels'

describe('Homepage', () => {
  it('Visit', () => {
    cy.visit('localhost:3000')
  })
  describe('Recent blocks', () => {
    it('should visit block by height', () => {
      cy.visit('localhost:3000')
      cy.get('#recent-block-link').first().click()
      cy.url().should('include', '/block')
    })
    it('should visit transactions', () => {
      cy.visit('localhost:3000')
      cy.get('#recent-block-transactions-link').click()
      cy.url().should('include', '/transactions')
    })
  
    it('should visit producer', () => {
      cy.visit('localhost:3000')
      cy.get('#recent-block-producer-link').click()
      cy.url().should('include', '/address')
    })
  })
  describe('Recent transactions', () => {
    it('should visit transaction page', () => {
      cy.visit('localhost:3000')
      cy.get('#recent-transaction-link').click()
      cy.url().should('include', '/transaction')
    })
  })
})
