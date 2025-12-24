## Otimização Mobile & UX de Luxo
- **Hero (Início):** A imagem de fundo deve usar `object-cover` e `object-position: center`. No mobile, garantir que o foco da imagem não corte elementos vitais. Adicionar um overlay de gradiente para garantir que o texto branco seja 100% legível.
- **Menu de Navegação Mobile:** - Substituir o menu padrão por um overlay de tela cheia (Full-screen Overlay).
  - Background: `bg-nobru-teal/95` com `backdrop-blur-lg`.
  - Animação: Itens do menu devem ter um "staggered fade-in" (aparecer um por um de baixo para cima) usando Framer Motion.
  - Performance: Usar `will-change-transform` para evitar engasgos na animação.

## Galeria de Portfólio Inteligente
- **Limitação de Exibição:** Mostrar apenas 4 imagens inicialmente no mobile e 6 no desktop.
- **Botão "Veja Mais":** Um botão elegante com borda fina (outline) que, ao ser clicado, expande o grid suavemente.
- **Grid:** Usar `aspect-square` para as miniaturas para manter a ordem visual.

## Validação e Estética de Formulário (Revisão)
- **Data Picker:** Proibido usar o nativo do navegador. Implementar um calendário customizado estilo "Popover" em `nobru-teal`.
- **Formato:** Brasileiro (DD/MM/YYYY).
- **Máscaras:** Telefone `(99) 99999-9999` e Data `99/99/9999`.