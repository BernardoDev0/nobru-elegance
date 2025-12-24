# NOBRU Buffet - Site Institucional

Site institucional do NOBRU Buffet desenvolvido com React, TypeScript e Tailwind CSS.

## Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Biblioteca de animações
- **shadcn/ui** - Componentes UI

## Como executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Estrutura do Projeto

```
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes UI reutilizáveis (shadcn/ui)
├── hooks/           # Custom hooks React
├── lib/             # Utilitários
├── presentation/    # Componentes e páginas da aplicação
│   ├── components/  # Componentes da aplicação
│   └── pages/       # Páginas/rotas
└── imagens/         # Imagens do buffet
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

