# NOBRU Buffet - Blueprint de Design V3 (Refinado & Funcional)

## Ajustes de Ambiente Visual

- **Menos Branco, Mais Textura:** Reduzir a predominância do branco puro. Alternar fundos entre `nobru-cream` (#F8F5F0) e `nobru-silver-grey` (#A9B1A9 com opacidade de 10%). 

- **Profundidade:** Adicionar gradientes suaves e sombras internas quase imperceptíveis para dar dimensão às seções.

## Seção: Nossos Serviços (REVISADA)

- **Remover:** Casamentos.

- **Categorias Oficiais:**

    1. **Eventos Corporativos:** Coffee breaks, almoços executivos e convenções.

    2. **Eventos Sociais:** Aniversários, celebrações e festas temáticas.

    3. **Experiências Gastronômicas:** Jantares particulares e menus degustação exclusivos.

- **Imagens:** Manter placeholders cinza, mas com proporções mais elegantes.

## Identidade e Logo

- **Componente de Logo:** Usar a imagem `nobru-logo.png` importada. O logo deve aparecer em versão clara no header (sobre fundos escuros) e pode ser invertido em contextos de fundo claro.

## Funcionalidade & Interação

- **Botões:** Todos os botões devem ter estados de `:hover` e `:active` definidos. Implementar scroll suave (smooth scroll) para as âncoras das seções.

- **Formulário:** O botão "Solicitar Orçamento" deve disparar uma animação de sucesso ou um alerta funcional após a validação básica dos campos.

## Stack Técnica

- React + Tailwind CSS + Framer Motion + Lucide Icons.

- Manter animações de entrada suaves (fade-in-up) conforme o scroll.
