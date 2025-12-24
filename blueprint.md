# NOBRU Buffet - Projeto de Design Clean & Sofisticado

## Contexto Visual
- **Estilo:** Ultra-minimalista, luxuoso, com muito espaço negativo (padding).
- **Inspiração:** Sites de arquitetura e tecnologia premium (estilo Apple).
- **Imagens:** Devem ser tratadas como elementos de fundo ou integradas com máscaras suaves. Deixar placeholders cinza neutro para as imagens.

## Identidade Visual (Cores Reais)
- **Deep Forest Teal:** #0D3B3F (Primária/Dark)
- **Muted Olive:** #A8A86B (Apoio/Destaque)
- **Silver Grey:** #A9B1A9 (Neutros/Bordas)
- **Warm Cream:** #F8F5F0 (Background/Cor de fundo principal)

## Regras de Componentes
1. **Logo:** NÃO gerar logo. Usar um placeholder de texto elegante ou apenas um slot vazio.
2. **Hero:** Background image com overlay suave, formulário lateral transparente e tipografia serifada.
3. **Imagens:** Nunca ocupar 100% da viewport sem respiro. Usar bordas arredondadas leves (rounded-lg) e sombras sutis.
4. **Carrossel de Clientes:** Slider infinito horizontal com logos em tons de cinza (grayscale) que ganham cor no hover.

## Stack Técnica & Animações
- **Framework:** React + Tailwind CSS + Lucide Icons.
- **Animações:** Usar Framer Motion para micro-interações (fade-in ao rolar, hover scales suaves).
- **Configuração:** Armazenar as cores acima no `tailwind.config.ts` em vez de usar hexadecimais soltos.
