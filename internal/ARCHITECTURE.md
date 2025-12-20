# Arquitetura do Backend (Clean Architecture / Hexagonal)

Este projeto segue uma adaptação da Clean Architecture para Go e Wails, visando desacoplamento, testabilidade e organização.

## Estrutura de Diretórios (`internal/`)

O diretório `internal` é protegido pelo compilador Go, impedindo importações externas.

### 1. `domain/` (O Núcleo)
*   **O que é:** Contém as definições puras do sistema.
*   **Conteúdo:** Structs (Entidades), Interfaces (Contratos) e Erros de domínio.
*   **Regra de Ouro:** Não importa NENHUMA outra camada (nem `service`, nem `infra`). É independente de frameworks e bancos de dados.
*   *Exemplo:* `type User struct {...}`, `type UserRepository interface {...}`.

### 2. `service/` (Regra de Negócio)
*   **O que é:** Onde a mágica acontece. Implementa os casos de uso da aplicação.
*   **Conteúdo:** Funções e métodos que executam a lógica (login, cálculos, processamento).
*   **Regra de Ouro:** Depende apenas de `domain`. Recebe implementações (como banco de dados) via interfaces (Injeção de Dependência).
*   *Exemplo:* `AuthService` que recebe um `UserRepository` e valida senhas.

### 3. `infra/` (Infraestrutura)
*   **O que é:** O mundo real e "sujo". Implementações concretas das interfaces definidas em `domain`.
*   **Conteúdo:** Conexões com Banco de Dados, Sistema de Arquivos, APIs Externas (HTTP clients), Websockets.
*   **Regra de Ouro:** É a camada que "suja as mãos". O resto do sistema não sabe se você usa SQLite ou Postgres, apenas `infra` sabe.

---

## Outros Diretórios

### `pkg/` (Utilitários)
*   **O que é:** Código genérico que poderia ser uma biblioteca open-source.
*   **Conteúdo:** Formatadores de data, loggers customizados, helpers de string. Pode ser importado por qualquer camada.

### `app.go` (A Ponte)
*   **O que é:** O controlador específico do Wails.
*   **Função:** Recebe chamadas do Frontend (JS), converte dados se necessário, chama os `services` apropriados e retorna o resultado para a UI.

### `main.go` (O Entry Point)
*   **O que é:** Onde tudo começa.
*   **Função:** Inicializa as configurações, cria instâncias de `infra`, injeta elas nos `services`, injeta os `services` no `app.go` e inicia a janela do Wails.
