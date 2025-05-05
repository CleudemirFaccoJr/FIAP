This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Preciso modificar o seguinte:
Levantamento das Entidades

Considerando os modais e a dashboard, podemos expandir um pouco a lista inicial de classes. Aqui está uma análise:

Transacao: (Já tínhamos) Continua sendo fundamental para representar cada transação financeira.
ContaCorrente: (Já tínhamos) Essencial para gerenciar o saldo e o histórico de transações.
Usuario: Este se torna mais relevante agora, já que você tem um modal de criação de conta. Ele representará o usuário que possui a conta corrente.
Extrato: Embora você possa argumentar que o extrato é apenas uma parte da ContaCorrente, podemos considerar criar uma classe Extrato para encapsular a lógica de formatação e exibição do extrato, caso ela se torne complexa. Isso ajudaria a manter a ContaCorrente mais focada na lógica de negócios da conta.
Justificativas e Detalhes

Transacao:
Atributos: tipo (depósito, saque, transferência), valor, data.
Métodos: formatarData().
ContaCorrente:
Atributos: saldo, transacoes (uma lista de objetos Transacao).
Métodos: depositar(), sacar(), transferir(), getExtrato(), getSaldo().
Usuario:
Atributos: id, nome, email, conta (uma instância de ContaCorrente).
Métodos: criarConta() (pode estar na classe Usuario ou em um serviço separado de criação de usuário).
Extrato (Opcional):
Atributos: transacoes (a lista de transações a serem exibidas).
Métodos: formatarExtrato() (para organizar as transações para exibição), filtrarTransacoes() (se você tiver filtragem no extrato).
Relação com os Elementos da Interface

Modal de Criação de Conta: Está diretamente ligado à classe Usuario (e ContaCorrente). O processo de criação de conta envolve criar um novo Usuario e associar a ele uma nova ContaCorrente.
Dashboard: Exibe informações da ContaCorrente (saldo, extrato) e permite criar novas Transacaos.
Modal de Edição de Transação: Manipula objetos Transacao existentes.
Modal de Exclusão de Transação: Remove objetos Transacao da lista de transacoes da ContaCorrente.
Diagrama de Classes (Conceitual)

É útil visualizar as relações entre as classes. Um diagrama de classes UML básico poderia mostrar:

Usuario tem uma ContaCorrente.
ContaCorrente tem muitas Transacaos.
Extrato (se existir) usa dados de ContaCorrente.
Próximos Passos

Implemente as Classes: Crie os arquivos .tsx para cada classe e defina os atributos e métodos.
Refatore os Componentes: Modifique seus componentes Next.js para usar as classes. Em vez de manipular dados diretamente, eles devem interagir com os objetos das classes.
Gerencie o Estado: Use o useState do React para armazenar instâncias dessas classes e atualizar a interface quando os dados mudarem.
Essa estrutura orientada a objetos tornará seu código mais organizado, reutilizável e fácil de manter.