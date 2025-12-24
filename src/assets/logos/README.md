# Logos dos Clientes

Para adicionar os logos das empresas localmente:

1. Baixe os logos das empresas em formato PNG ou SVG
2. Salve-os nesta pasta com os seguintes nomes:
   - `sawala.png`
   - `ilhapura.png`
   - `lopes.png`
   - `performance.png`
   - `deugro.png`
   - `petrohouse.png`
   - `honda.png`
   - `toyota.png`
   - `byd.png`
   - `casashopping.png`
   - `jeep.png`
   - `ram.png`

3. Depois, atualize o arquivo `ClientesSection.tsx` para importar os logos locais:

```typescript
import sawalaLogo from "@/assets/logos/sawala.png";
import ilhapuraLogo from "@/assets/logos/ilhapura.png";
// ... etc

const clientes: Cliente[] = [
  { name: "Sawala", id: 1, logo: sawalaLogo },
  // ... etc
];
```

## Fontes para baixar logos:

- **Honda, Toyota, BYD, Jeep, RAM**: https://www.1000logos.net/
- **Outras empresas**: Sites oficiais ou Google Images (busque por "logo [empresa] png transparent")

