# Projeto de Desenvolvimento da Aplicação para Controle de Campeonatos de Pro-Clubs do EAFC

## Stack de Desenvolvimento

Desenvolver a aplicação em Typescript, SCSS e HTML.

Separar server e client, usar as melhores praticas de desenvolvimento como SOLID. 
No client devemos usar lit como framework, eu prefiro por ser leve e ter boas funcionalidades.

## Requisitos não-funcionais

A aplicação deve funcionar tanto para navegadores quanto para celulares.
Deve ser visualmente moderna e atraente. Com fácil acesso as funções principais

A principio vamos usar hospedagem e bancos de dados gratuitos pois o acesso será apenas de um grupo de amigos. Usar firebase no plano spark e quando não tivermos a função lá dar opções gratuitas de outras ferramentas ou opções mais baratas.

## Requisitos funcionais
Cada requisito será definido em um arquivo de Requisito Funcional. Então pedirei individualmente para cada um o desenvolvimento

## Orientações Gerais (Para Agentes de IA e Desenvolvedores)

- **Estrutura de Pastas**: Manter o projeto estritamente dividido entre `client/` (frontend Lit) e `server/` (backend ou BFF em Node.js/TypeScript).
- **Scripts NPM**: Criar no `package.json` raiz (ou nos respectivos subdiretórios) scripts claros para instalação (`install`), compilação (`build`), desenvolvimento (`dev`) e deploy (`deploy`).
- **Segurança**: Não commitar dados sensíveis. Utilizar o arquivo `.env` para gerenciar variáveis de ambiente e garantir que o `.gitignore` o ignore.
- **Qualidade de Código**: Sempre que possível criar testes automatizados para as funcionalidades e adotar as práticas SOLID.
- **Documentação de Mudanças**: Qualquer alteração arquitetural deve ser refletida na documentação ou avisada explicitamente.