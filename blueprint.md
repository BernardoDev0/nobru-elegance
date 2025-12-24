# NOBRU Buffet - Blueprint de Design V2 (Luxo Moderno)

## Status Atual

- A Seção Hero está aprovada: background dark teal, tipografia elegante e formulário estilo "glass". Manter esse padrão.

## Correções Imediatas

- **Botão Secundário (Hero):** O botão ao lado do principal está invisível no estado normal. Ele deve ter uma borda fina (border-1) e texto na cor `nobru-olive` ou `nobru-silver`. No hover, ele pode preencher.

## Diretrizes de Design para Novas Seções

1.  **Espaçamento (O Segredo do Luxo):** Use `py-32` ou `py-40` entre seções. O respiro é fundamental.

2.  **Backgrounds:** Alterne entre o fundo principal `nobru-cream` (#F8F5F0) e seções com fundo `nobru-teal` (#0D3B3F) para criar ritmo, mas evite mudanças bruscas.

3.  **Cards e Elementos:**

    - Não usar sombras pesadas. Use `shadow-sm` ou apenas bordas muito sutis.

    - Use cantos arredondados suaves (`rounded-xl` ou `rounded-2xl`).

## Estrutura das Próximas Seções

### 1. Seção "Por Que Escolher" (Diferenciais)

- **Inspiração:** Os 3 pilares do site de referência.

- **Design NOBRU:** Em vez de blocos grandes, use ícones de linha fina (Lucide icons) nas cores dourado/oliva. Títulos serifados, textos curtos. Layout limpo de 3 colunas com muito espaço entre elas. Fundo: `nobru-cream`.

### 2. Seção "Nossos Serviços" (Corporativo/Social)

- **Inspiração:** Cards com foto e botão.

- **Design NOBRU:** Cards minimalistas. A imagem deve ter um tratamento de cor suave. O título do serviço deve ser a estrela. Botões "fantasma" elegantes (cor oliva). Fundo: Pode ser um gradiente muito sutil ou o próprio `nobru-cream`.

### 3. Seção Carrossel de Clientes (Confiança)

- **Regra de Ouro:** Todos os logos devem estar em **grayscale (escala de cinza)** e com opacidade 60% por padrão.

- **Interação:** Ao passar o mouse (hover), o logo ganha sua cor original e 100% de opacidade.

- **Layout:** Um slider infinito e suave (`framer-motion`), sem setas de navegação pesadas.

## Stack Técnica

- React + Tailwind CSS + Framer Motion + Lucide Icons.

- Manter animações de entrada suaves (fade-in-up) conforme o scroll.
