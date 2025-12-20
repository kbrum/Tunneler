# Arquitetura do Frontend (Feature-Based)

Este projeto segue uma estrutura baseada em **Features** com convenções rigorosas para garantir escalabilidade e manutenibilidade.

## 1. Convenções Gerais

### Imports
*   **Todo import deve ser absoluto:** Use aliases (`@/`) para evitar caminhos relativos (`../../`). Isso previne quebras ao mover arquivos.

### Nomenclatura e Clareza
*   **Sem abreviações:** O código deve ser autoexplicativo. Use `index` em loops simples, mas evite `usr`, `btn`, etc. Clareza > Brevidade.
*   **Sem `export default`:** Use apenas *Named Exports*. Isso garante que o nome do componente seja consistente em todo o projeto e facilita refatoração.

## 2. Convenções de Componentes

*   **Nomenclatura:** Todo componente deve estar em **PascalCase**.
*   **Complexidade:** Evite funções de renderização aninhadas dentro de componentes. Mantenha a estrutura simples.
*   **Props:** Evite passar mais de 3 props individualmente. Se necessário, agrupe em um objeto ou use composição.

## 3. Convenções de Arquivos e Pastas

### Pastas
*   **Padrão:** Sempre **kebab-case**.
*   *Motivo:* Evita problemas em sistemas operacionais case-sensitive (Linux).

### Arquivos
*   **PascalCase:** Para arquivos cujo conteúdo principal é um **Componente** ou uma **Classe**.
    *   Ex: `UserProfile.tsx`, `AuthService.ts`.
*   **kebab-case:** Para todo o resto (módulos, funções, utilitários).
    *   Ex: `auth-utils.ts`, `api-client.ts`, `formatters.ts`.

## 4. Estrutura de Diretórios

### `src/components` (Componentes Globais)
*   Contém componentes compartilhados por toda a aplicação.
*   **Regra:** NÃO podem conter regra de negócio. São puramente visuais (UI Kit).

### `src/features` (Funcionalidades)
Cada pasta aqui representa uma funcionalidade isolada do sistema.

**Exemplo de estrutura:**
```text
src/features/awesome-feature/
├── actions/       # Requisições de API e hooks de data fetching
├── assets/        # Arquivos estáticos exclusivos da feature
├── components/    # Componentes exclusivos da feature
├── hooks/         # Hooks exclusivos da feature
├── stores/        # Gerenciamento de estado local
├── types/         # Tipos TypeScript locais
└── utils/         # Funções utilitárias locais
```

### Regra de Ouro: Isolamento
*   **Evite imports entre features a todo custo.**
*   Features devem ser ilhas isoladas.
*   Se algo precisa ser usado em mais de um lugar, ele **não pertence a uma feature** e deve ser movido para o escopo global (`src/components`, `src/utils`, etc.).