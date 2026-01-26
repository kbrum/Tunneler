# Project Tunneler - Contexto e Regras do Agente

## 1. Visão Geral do Projeto
O **Tunneler** é um gerenciador de conexões SSH moderno e robusto, inspirado em ferramentas como o Termius.
O objetivo principal é oferecer uma interface gráfica (GUI) via Wails para gerenciar múltiplos servidores, transferir arquivos e criar túneis de rede.

### Funcionalidades Chave
1.  **Gerenciamento de Sessões SSH:**
    *   Suporte a múltiplas abas/sessões simultâneas.
    *   Organização de hosts (grupos, tags).
    *   Armazenamento seguro de credenciais.
2.  **SFTP (File Transfer):**
    *   Interface visual para upload/download de arquivos entre local e remoto.
3.  **Tunelamento (Tunneling):**
    *   Criação de túneis (Port Forwarding: Local, Remote, Dynamic) para comunicação entre máquinas.
    *   Futuramente: Gerenciamento de túneis reversos ou VPNs simplificadas.
4.  **Interface/CLI:**
    *   Foco atual: Desktop App (Wails).
    *   Futuro: CLI integrada e possível Interface Web.

## 2. Stack Tecnológica
*   **Core/Backend:** Go (Golang) + Wails v2.
*   **Frontend:** React + TypeScript + Vite.
*   **Estilização:** Tailwind CSS.
*   **Armazenamento:** SQLite (local).

---

## 3. Regras Operacionais para o Agente

### Documentação
*   **NÃO crie múltiplos arquivos `.md` espalhados.**
*   Toda documentação deve ser centralizada ou estar na raiz.
*   Não crie READMEs dentro de subpastas (ex: `src/components/README.md` é PROIBIDO).

### Arquitetura Backend (Clean/Hexagonal)
*   **`internal/domain`**: Entidades e Interfaces puras. Sem dependências externas.
*   **`internal/service`**: Regra de negócio pura.
*   **`internal/infra`**: Implementações concretas (SSH client, SQLite driver).
*   **`app.go`**: Apenas a ponte para o Frontend.

### Arquitetura Frontend (Feature-Based)
*   **`src/features/`**: Cada funcionalidade é uma ilha isolada.
*   **`src/components/`**: Apenas componentes visuais genéricos e sem lógica de negócio.
*   **Imports Absolutos:** Sempre use `@/` (ex: `@/components/Button`).
*   **Nomenclatura:** `PascalCase` para Componentes, `kebab-case` para arquivos utilitários e pastas.

### Desenvolvimento
*   Ao criar código, priorize a segurança (especialmente lidando com chaves SSH e senhas).
*   Mantenha a separação estrita entre o Frontend (Visual) e o Backend (Lógica pesada/Conexão).
