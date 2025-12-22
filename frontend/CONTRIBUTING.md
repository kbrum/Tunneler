# Convenções de Código - Frontend (React + TypeScript)

## Imports

### Absolutos

Todo import deve ser absoluto. Evite caminhos relativos complexos (`../../`).

### Direção

Respeite a hierarquia e o isolamento de módulos. Evite imports cruzados entre features.

## Nomenclatura e Arquivos

### Sem Abreviações

Não use abreviações, exceto quando forem amplamente conhecidas (`i`, `err`).
O código deve ser autoexplicativo.

### Arquivos

- **PascalCase:** Para arquivos cujo “dono” é um Componente ou uma Classe.
  - ✅ `LoginScreen.tsx`
- **kebab-case:** Para todo o resto (módulos, funções, utilitários).
  - ✅ `api-client.ts`, `format-date.ts`

### Pastas

- Use **kebab-case** para nomes de diretórios.

## Componentes (React)

### Nomes

Todo componente deve estar em **PascalCase**.

### Complexidade

Evite componentes grandes com funções de renderização aninhadas. Se o JSX ficar complexo, extraia para um novo componente.

### Props

Evite passar mais de 3 props individualmente. Prefira agrupar em objetos ou usar Context/Slots se apropriado.

### Exports

**Evite `export default`**. Use _Named Exports_ (`export const Component = ...`) para garantir consistência na renomeação e refatoração.
