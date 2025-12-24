# Arquitetura do Backend (Clean Architecture)

Este projeto segue uma adaptação da Clean Architecture para Go e Wails, visando desacoplamento, testabilidade e organização.

## Estrutura de Diretórios (`internal/`)

### 1. `domain/` (O Núcleo)
*   **O que é:** Contém as definições puras do sistema.
*   **Conteúdo:** Structs (Entidades), Interfaces (Contratos) e Erros de negócio.
*   **Regra de Ouro:** Não importa NENHUMA outra camada. É independente de frameworks, banco de dados ou protocolo de comunicação.
*   *Exemplo:* `type User struct {...}`, `type UserRepository interface {...}`.

### 2. `service/` (Regra de Negócio)
*   **O que é:** Onde a mágica acontece. Implementa os Casos de Uso.
*   **Conteúdo:** Funções que orquestram a lógica (validações complexas, regras de negócio).
*   **Regra de Ouro:** Depende apenas de `domain`. Recebe `infra` via injeção de dependência.
*   *Exemplo:* `AuthService` que recebe um `UserRepository` e valida se o usuário pode logar.

### 3. `infra/` (Infraestrutura)
*   **O que é:** Implementações técnicas e acesso a dados.
*   **Conteúdo:** Clientes de Banco de Dados (Supabase), Sistema de Arquivos (OS), Drivers.
*   **Regra de Ouro:** É a única camada que conhece os detalhes "sujos" externos.
*   *Exemplo:* `SupabaseUserRepository` (que faz chamadas HTTP para o Supabase).

### 4. `adapter/` (Interface Adapters / Wails IPC)
*   **O que é:** A porta de entrada para o Frontend.
*   **Conteúdo:** Controllers expostos ao Wails via IPC (ex: `UserController`).
*   **Função:** Recebe chamadas do JavaScript, converte dados de entrada (strings/primitivos), chama o `service` (ou `repository` em casos simples) e retorna a resposta.
*   **Regra de Ouro:** Não contém regra de negócio complexa. Funciona como um tradutor entre a Tela e o Backend.

---

## Outros Arquivos

### `app.go`
*   **Função:** Orquestrador do Ciclo de Vida (Startup/Shutdown). Centraliza a inicialização dos Controllers (`adapter`) e gerencia o contexto da aplicação.

### `main.go`
*   **Função:** Ponto de entrada (Entry Point). Faz a "Costura" das dependências (Cria Client -> Cria Repo -> Cria Controller -> Cria App) e inicializa o Wails.
