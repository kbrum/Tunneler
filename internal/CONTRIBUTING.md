# Convenções de Código - Backend (Go)

## Nomenclatura

### Arquivos
*   Use sempre **`snake_case`**.
    *   ✅ `user_service.go`, `ssh_session.go`
    *   ❌ `UserService.go`, `userRepository.go`
*   Arquivos de teste devem terminar com `_test.go`.

### Funções e Variáveis
*   **Público (Exportado):** Use **`PascalCase`**.
    *   ✅ `func GetSession()`, `type User struct`
*   **Privado (Interno):** Use **`camelCase`**.
    *   ✅ `func validatePassword()`, `var dbConnection`

### Siglas (Acronyms)
Siglas devem ser consistentemente maiúsculas ou minúsculas (padrão Go).
*   ✅ `UserID`, `ServeHTTP`, `ID`, `SSHClient`
*   ❌ `UserId`, `ServeHttp`, `Id`, `SshClient`

## Estilo e Boas Práticas

### Tratamento de Erros
*   Verifique erros imediatamente após a chamada da função.
*   Não ignore erros com `_` a menos que seja absolutamente seguro.

### Comentários
*   Use comentários para explicar o *porquê* (decisões complexas), não o *o que* (código óbvio).
*   Funções exportadas devem ter comentários de documentação começando com o nome da função.