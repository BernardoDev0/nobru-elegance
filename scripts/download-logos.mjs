// Script para baixar logos automaticamente
// Execute com: node scripts/download-logos.mjs

import https from 'https';
import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logosDir = join(__dirname, '../public/logos');

// Criar diretório se não existir
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const logos = [
  { name: 'sawala', url: 'https://logo.clearbit.com/sawala.co' },
  { name: 'ilhapura', url: 'https://logo.clearbit.com/ilhapura.com.br' },
  { name: 'lopes', url: 'https://logo.clearbit.com/lopes.com.br' },
  { name: 'performance', url: 'https://logo.clearbit.com/performance.com.br' },
  { name: 'deugro', url: 'https://logo.clearbit.com/deugro.com' },
  { name: 'petrohouse', url: 'https://logo.clearbit.com/petrohouse.com.br' },
  { name: 'honda', url: 'https://logos-world.net/wp-content/uploads/2020/05/Honda-Logo.png' },
  { name: 'toyota', url: 'https://logos-world.net/wp-content/uploads/2020/05/Toyota-Logo.png' },
  { name: 'byd', url: 'https://logos-world.net/wp-content/uploads/2021/03/BYD-Logo.png' },
  { name: 'casashopping', url: 'https://logo.clearbit.com/casashopping.com.br' },
  { name: 'jeep', url: 'https://logos-world.net/wp-content/uploads/2020/06/Jeep-Logo.png' },
  { name: 'ram', url: 'https://logos-world.net/wp-content/uploads/2020/06/RAM-Logo.png' },
];

function downloadLogo(name, url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const filePath = join(logosDir, `${name}.png`);
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ ${name} baixado com sucesso`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Seguir redirect
        downloadLogo(name, response.headers.location).then(resolve).catch(reject);
      } else {
        console.log(`✗ Falha ao baixar ${name}: Status ${response.statusCode}`);
        reject(new Error(`Status ${response.statusCode}`));
      }
    });
    
    request.on('error', (err) => {
      console.log(`✗ Erro ao baixar ${name}: ${err.message}`);
      reject(err);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function downloadAllLogos() {
  console.log('Iniciando download dos logos...\n');
  
  for (const logo of logos) {
    try {
      await downloadLogo(logo.name, logo.url);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay entre downloads
    } catch (error) {
      console.log(`  ⚠ Logo ${logo.name} não pôde ser baixado automaticamente`);
      console.log(`  Você pode baixar manualmente de: ${logo.url}`);
    }
  }
  
  console.log('\nDownload concluído!');
  console.log(`Logos salvos em: ${logosDir}`);
  console.log('\nAgora atualize ClientesSection.tsx para usar os logos locais!');
}

downloadAllLogos();

