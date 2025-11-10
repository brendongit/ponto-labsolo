# MeuPonto

Sistema de registro de ponto digital desenvolvido em React JS com design mobile-first.

## Funcionalidades

- Registro de entrada e saída diária
- Detecção automática de localização (bairro)
- Adicionar custos extras de transporte (Uber)
- Marcar Uber como pago ou não pago
- Dashboard com relatórios mensais
- Geração de PDF personalizado com todos os registros
- Edição e exclusão de registros
- Armazenamento local (localStorage)

## Tecnologias Utilizadas

- React JS (Vite)
- TailwindCSS
- React Router DOM
- date-fns
- jsPDF + jsPDF-AutoTable
- UUID
- Lucide React (ícones)

## Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── Navigation.jsx      # Navegação entre páginas
│   ├── PointCard.jsx        # Card de registro individual
│   ├── ReportTable.jsx      # Tabela de registros (desktop)
│   └── PDFButton.jsx        # Botão de geração de PDF
├── pages/
│   ├── Dashboard.jsx        # Dashboard com relatórios
│   └── PointRegister.jsx    # Página de registro de ponto
├── context/
│   └── PointContext.jsx     # Context API para estado global
├── utils/
│   ├── dateUtils.js         # Funções de manipulação de datas
│   ├── pdfGenerator.js      # Geração de PDF
│   └── geolocation.js       # Geolocalização
├── App.jsx
├── main.jsx
└── index.css
```

## Como Usar

### Bater Ponto

1. Acesse a página "Bater Ponto"
2. Clique em "Bater Ponto de Entrada" ao chegar
3. A localização será detectada automaticamente
4. Ao sair, clique em "Bater Ponto de Saída"
5. Escolha se deseja adicionar custo de Uber/transporte

### Dashboard

1. Visualize o resumo do mês atual
2. Use as setas para navegar entre meses
3. Veja todos os registros em formato de cards
4. Edite ou exclua registros clicando nos ícones
5. Marque Ubers como pagos ou não pagos
6. Clique em "Gerar Relatório PDF" para exportar

## Estrutura de Dados

Os dados são armazenados no localStorage com a seguinte estrutura:

```json
{
  "user": {
    "name": "Brendon Ribeiro"
  },
  "records": [
    {
      "id": "uuid-gerado",
      "date": "2025-11-10",
      "entry": "08:30",
      "exit": "18:00",
      "duration": "9h 30m",
      "uberCost": 23.50,
      "paid": false,
      "location": "Santa Cruz, RJ"
    }
  ]
}
```

## Geolocalização

O aplicativo usa a Geolocation API do navegador combinada com a API do OpenStreetMap (Nominatim) para detectar automaticamente o bairro/região onde o ponto está sendo batido.

## PDF Gerado

O relatório PDF contém:
- Nome do usuário
- Período selecionado
- Tabela com todos os registros (Data, Entrada, Saída, Duração, Uber, Status, Local)
- Totalizadores (horas trabalhadas, dias, custos)
- Destaque em vermelho para Ubers não pagos

## Responsividade

O design é mobile-first, otimizado para dispositivos móveis mas com suporte completo para desktop.

## Próximas Melhorias

- [ ] Migração para backend (API REST)
- [ ] Autenticação de usuários
- [ ] Múltiplos usuários
- [ ] Notificações
- [ ] Tema escuro/claro
- [ ] Backup em nuvem
- [ ] Exportação para Excel
- [ ] Gráficos e estatísticas

## Licença

Projeto pessoal - Livre para uso e modificação
