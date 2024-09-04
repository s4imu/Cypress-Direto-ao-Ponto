describe("Transações", () => {
  beforeEach("Acessar a plataforma devfinance", () => {
    cy.visit("https://devfinance-agilizei.netlify.app/");
  });
  it("Cadastrar uma entrada", () => {
    criarTransacao("Freela", 500, "2024-09-02");
    cy.get("tbody tr td.description").should("have.text", "Freela");
  });

  it("Cadastrar uma saída", () => {
    criarTransacao("Abastecer Carro", -100, "2024-09-03");
    cy.get("tbody tr td.description").should("have.text", "Abastecer Carro");
  });

  it("Excluir transação Parent", () => {
    criarTransacao("Freela", 100, "2024-09-03");
    criarTransacao("Salario", 1200, "2024-09-03");

    cy.contains(".description", "Freela")
      .parent() // navegar para o elemento pai
      .find("img") //encontrar um elemento
      .click();

    cy.get("tbody tr").should("have.length", 1);
  });

  it.only("Excluir transação Siblings", () => {
    criarTransacao("Freela", 100, "2024-09-03");
    criarTransacao("Salario", 1200, "2024-09-03");

    cy.contains(".description", "Freela")
      .siblings() // buscar elementos irmaos
      .children("img") // encontrar um elemento com um filho especifico
      .click();

    cy.get("tbody tr").should("have.length", 1);
  });
});

function criarTransacao(descricao, valor, data) {
  cy.contains("Nova Transação").click();
  cy.get("#description").type(descricao);
  cy.get("#amount").type(valor);
  cy.get("#date").type(data); //yyyy-mm-dd
  cy.contains("button", "Salvar").click();
}
